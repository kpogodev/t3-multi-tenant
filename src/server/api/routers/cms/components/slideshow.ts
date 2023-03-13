import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import cloudinary from "utils/cloudinary"

export const sldieshowRouter = createTRPCRouter({
  getSlideshow: protectedProcedure
    .input(
      z.object({
        componentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const slideshow = await ctx.prisma.slideshow.findFirst({
        where: {
          component: {
            componentId: input.componentId,
          }
        },
        include: {
          slides: {
            include: {
              image: {
                select: {
                  public_id: true,
                  asset_id: true,
                  secure_url: true,
                  bytes: true,
                  width: true,
                  height: true,
                },
              },
            },
            orderBy: {
              order: "asc",
            },
          },
        },
      })

      if (!slideshow) {
        throw new Error("Slideshow not found")
      }

      return slideshow
    }),
  updateSlideshowInterval: protectedProcedure
    .input(z.object({ slideshowId: z.string(), interval: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const slideshow = await ctx.prisma.slideshow.update({
        where: {
          id: input.slideshowId,
        },
        data: {
          interval: input.interval,
        },
      })

      if (!slideshow) {
        throw new Error("Slideshow not found")
      }

      return slideshow
    }),
  uploadSlideshowImages: protectedProcedure
    .input(
      z.object({
        slideshowId: z.string(),
        images: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const siteInfo = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          name: true,
        },
      })

      if (!siteInfo) throw new Error("Site name not found")

      const slideshow = await ctx.prisma.slideshow.findFirst({
        where: {
          id: input.slideshowId,
        },
        include: {
          component: {
            select: {
              component: {
                select: {
                  name: true,
                }
              }
            }
          },
          slides: true,
        },
      })

      if (!slideshow) throw new Error("Slideshow not found")
      const slideshowSize = slideshow.size

      // 100MB limit
      if (slideshowSize >= 104857600) throw new Error("Slideshow size limit reached")

      const siteNameSlug = siteInfo.name.toLowerCase().replace(/ /g, "_")
      const slideshowName = slideshow?.component?.component?.name.toLowerCase().replace(/ /g, "_") ?? `${slideshow.id}`

      const imagesUploadPromises = input.images.map(async (image) => {
        return await cloudinary.uploader.upload(image, {
          folder: `sites/${siteNameSlug}/slideshows/${slideshowName}`,
          transformation: { width: 1920, height: 1080, crop: "fill", format:"webp", quality: "auto", fetch_format: "auto" },
          format: "webp",
        })
      })

      const imagesUploadResponses = await Promise.all(imagesUploadPromises)

      if (imagesUploadResponses.length === 0) throw new Error("No images uploaded")

      for (const [index, image] of imagesUploadResponses.entries()) {
        await ctx.prisma.slide.create({
          data: {
            slideshow: {
              connect: {
                id: input.slideshowId,
              },
            },
            order: +slideshow?.slides?.length + index,
            image: {
              create: {
                public_id: image.public_id,
                asset_id: image?.asset_id as string,
                width: image.width,
                height: image.height,
                format: image.format,
                resource_type: image.resource_type,
                created_at: image.created_at,
                bytes: image.bytes,
                type: image.type,
                placeholder: image.placeholder,
                url: image.url,
                secure_url: image.secure_url,
                folder: image?.folder as string,
                access_mode: image.access_mode,
              },
            },
          },
        })
      }

      await ctx.prisma.slideshow.update({
        where: {
          id: input.slideshowId,
        },
        data: {
          size: slideshowSize + imagesUploadResponses.reduce((acc, curr) => acc + curr.bytes, 0),
        },
      })

      return slideshow
    }),
  updateSlidesOrder: protectedProcedure
    .input(
      z.array(
        z.object({
          slideId: z.string(),
          order: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      for (const slide of input) {
        await ctx.prisma.slide.update({
          where: {
            id: slide.slideId,
          },
          data: {
            order: slide.order,
          },
        })
      }

      return true
    }),
  deleteSlide: protectedProcedure
    .input(
      z.object({
        slideId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const slide = await ctx.prisma.slide.findFirst({
        where: {
          id: input.slideId,
        },
        include: {
          image: true,
          slideshow: true,
        },
      })

      if (!slide) throw new Error("Slide not found")

      await ctx.prisma.slide.delete({
        where: {
          id: input.slideId,
        },
      })

      if (!slide.image) throw new Error("Image not found")

      await ctx.prisma.slideshow.update({
        where: {
          id: slide.slideshow.id,
        },
        data: {
          size: slide.slideshow.size - slide.image.bytes,
        },
      })

      await cloudinary.uploader
        .destroy(slide.image.public_id, {
          invalidate: true,
        })
        .catch((err) => {
          if (err) throw new Error("Cloudinary error")
        })

      return true
    }),
})
