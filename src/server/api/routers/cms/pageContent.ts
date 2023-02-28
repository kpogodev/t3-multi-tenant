import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { Prisma } from "@prisma/client"

export const pageContentRouter = createTRPCRouter({
  getDraftByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
      select: {
        richTextDraft: true,
      }
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
      }
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
          richTextDraft: input.draft,
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
          richText: input.published,
          richTextDraft: Prisma.DbNull,
        },
      })

      return pageContent
    }),
})
