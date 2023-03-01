import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import cloudinary from "utils/cloudinary"

export const componentsRouter = createTRPCRouter({
  getComponents: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        theme: {
          select: {
            components: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    if (!site) {
      throw new Error("Site not found")
    }

    const components = site?.theme.components
    const componentsWithType = []

    for (const component of components) {
      const type = await ctx.prisma.feature.findFirst({
        where: {
          component: {
            some: {
              id: component.id,
            },
          },
        },
        select: {
          type: true,
        },
      })

      const componentType = type?.type.toLowerCase().replace("_", "-")
      componentsWithType.push({ ...component, type: componentType })
    }

    return componentsWithType
  }),
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
          },
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
              }
            }
          },
        },
      })

      if (!slideshow) {
        throw new Error("Slideshow not found")
      }

      return slideshow
    }),
    uploadSlideshowImages: protectedProcedure.input(z.object({
      slideshowId: z.string(),
      images: z.array(z.string())
    })).mutation(async ({ ctx, input }) => {
      const siteName = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        select: {
          name: true,
        }
      })

      if(!siteName) throw new Error("Site name not found")

      const siteNameSlug = siteName.name.toLowerCase().replace(/ /g, "_")

      const slideshow = await ctx.prisma.slideshow.findFirst({
        where: {
          id: input.slideshowId,
        },
        include: {
          component: {
            include: {
              component: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      })

      if(!slideshow) throw new Error("Slideshow not found")

      const slideshowName = slideshow?.component?.component.name.toLowerCase().replace(/ /g, "_") ?? `${slideshow.id}`

      const imagesUploadPromises = input.images.map(async (image) => {
        return await cloudinary.uploader.upload(image, {folder: `sites/${siteNameSlug}/slideshows/${slideshowName}`,})
      })

      const imagesUploadResponses = await Promise.all(imagesUploadPromises)

      if(imagesUploadResponses.length === 0) throw new Error("No images uploaded")

      for (const [index, image] of imagesUploadResponses.entries()) {
        await ctx.prisma.slide.create({
          data: {
            slideshow: {
              connect: {
                id: input.slideshowId,
              }
            },
            order: index,
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
              }
            }
          }
        })
      }


      return slideshow
    })
})
