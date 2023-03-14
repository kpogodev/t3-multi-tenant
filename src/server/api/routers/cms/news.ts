import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"
import cloudinary from "utils/cloudinary"

export const newsRouter = createTRPCRouter({
  getNews: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        news: {
          orderBy: {
            date: "desc",
          },
          include: {
            image: {
              select: {
                id: true,
                bytes: true,
                width: true,
                height: true,
                secure_url: true,
                public_id: true,
                created_at: true,
              },
            },
          }
        },
      },
    })

    if (!site) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Site not found",
      })
    }

    return site.news
  }),
  getNewsById: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const news = await ctx.prisma.news.findUnique({
      where: {
        id: input,
      },
    })

    if (!news) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "News not found",
      })
    }

    return news
  }),
  addNews: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        date: z.date(),
        author: z.string().optional(),
        imageId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const site = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      })

      if (!site) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Site not found",
        })
      }

      const news = await ctx.prisma.news.create({
        data: {
          title: input.title,
          content: input.content,
          author: input.author,
          date: input.date,
          siteId: site.id,
        },
      })

      if (!news)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "News couldn't be created",
        })

      if (typeof input.imageId !== "undefined") {
        try {
          await ctx.prisma.externalImage.update({
            where: {
              id: input.imageId,
            },
            data: {
              newsId: news.id,
            },
          })
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Image couldn't be updated",
          })
        }
      }

      return news
    }),
  uploadNewsImage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    })

    if (!site) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Site not found",
      })
    }

    const siteNameSlug = site.name.toLowerCase().replace(/ /g, "_")

    const image = await cloudinary.uploader.upload(input, {
      folder: `sites/${siteNameSlug}/news`,
      transformation: { width: 1024, height: 768, crop: "fill", format: "webp", quality: "auto", fetch_format: "webp" },
      format: "webp",
    })

    if (!image)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Image couldn't be uploaded to cloudinary",
      })

    const imageDbResponse = await ctx.prisma.externalImage.create({
      data: {
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
    })

    return {
      id: imageDbResponse.id,
      url: imageDbResponse.secure_url,
      width: imageDbResponse.width,
      height: imageDbResponse.height,
    }
  }),
  deleteNewsImage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const image = await ctx.prisma.externalImage.findUnique({
      where: {
        id: input,
      },
    })

    if (!image) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Image not found",
      })
    }

    await cloudinary.uploader
      .destroy(image.public_id, {
        invalidate: true,
      })
      .catch((err) => {
        if (err)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Image couldn't be deleted from cloudinary",
          })
      })

    await ctx.prisma.externalImage.delete({ where: { id: input } })

    return true
  }),
  deleteNews: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const news = await ctx.prisma.news.findUnique({
      where: {
        id: input,
      },
      include: {
        image: true,
      }
    })

    if (!news) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "News not found",
      })
    }

    if (news.image) {
      await cloudinary.uploader
        .destroy(news.image.public_id, {
          invalidate: true,
        })
        .catch((err) => {
          if (err)
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Image couldn't be deleted from cloudinary",
            })
        })
    }

    await ctx.prisma.news.delete({ where: { id: input } })

    return true
  })
})
