import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc"
import { Prisma } from '@prisma/client'

export const pageContentRouter = createTRPCRouter({
  getDraftByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
    })

    return pageContent?.draft
  }),
  getPublishedByPageId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.findUnique({
      where: {
        pageId: input,
      },
    })

    return pageContent?.published
  }),
  updateDraft: protectedProcedure.input(z.object({
    pageId: z.string(),
    draft: z.string(),
  })).mutation(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.update({
      where: {
        pageId: input.pageId,
      },
      data: {
        draft: input.draft,
      },
    })

    return pageContent
  }),
  updatePublished: protectedProcedure.input(z.object({
    pageId: z.string(),
    published: z.string(),
  })).mutation(async ({ input, ctx }) => {
    const pageContent = await ctx.prisma.pageContent.update({
      where: {
        pageId: input.pageId,
      },
      data: {
        published: input.published,
        draft: Prisma.DbNull,
      },
    })

    console.log(pageContent)

    return pageContent
  }),
})
