import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { Prisma } from "@prisma/client"
import cloudinary from "utils/cloudinary"
import { TRPCClientError } from "@trpc/client"

export const pageContentRouter = createTRPCRouter({
  getDraftByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
      select: {
        richTextDraft: true,
      },
    })

    const draft = pageContent?.richTextDraft
    return draft
  }),
  getPublishedByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
      select: {
        richText: true,
      },
    })

    const published = pageContent?.richText

    return published
  }),
  updateDraft: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        draft: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const pageContent = await ctx.prisma.pageContent.update({
        where: {
          pageId: input.pageId,
        },
        data: {
          richTextDraft: input.draft as Prisma.InputJsonValue,
        },
      })

      return pageContent
    }),
  updatePublished: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        published: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const pageContent = await ctx.prisma.pageContent.update({
        where: {
          pageId: input.pageId,
        },
        data: {
          richText: input.published as Prisma.InputJsonValue,
          richTextDraft: Prisma.DbNull,
        },
      })
      return pageContent
    }),
  uploadRichTextImage: protectedProcedure.input(z.object({ imgData: z.string() })).mutation(async ({ ctx, input }) => {
    const siteName = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        name: true,
      },
    })

    if(!siteName) {
      return new TRPCClientError("Site name not found")
    }

    const siteNameSlug = siteName.name.toLowerCase().replace(/ /g, "_")

    const response = await cloudinary.uploader.upload(input.imgData, {
      folder: `sites/${siteNameSlug}/images`,
    })

    return { link: response.secure_url}
  }),
})
