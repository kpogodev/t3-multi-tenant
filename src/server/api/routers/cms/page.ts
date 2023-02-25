import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc"
import { slugifyString } from "../../../../utils/slugifyString"

export const pageRouter = createTRPCRouter({
  addPage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {

      const site = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      })

      if (!site) throw new Error("Site not found")

      const page = await ctx.prisma.page.create({
        data: {
          name: input,
          siteId: site.id,
          slug: slugifyString(input),
          content: {
            create: {}
          }
        },
      })
      return page
    }),
  addSubPage: protectedProcedure.input(z.object({
    name: z.string(),
    parentId: z.string()
  })).mutation(async ({ input, ctx }) => {
      const site = await ctx.prisma.site.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
      })

      if (!site) throw new Error("Site not found")

    const page = await ctx.prisma.page.create({
      data: {
        name: input.name,
        parentId: input.parentId,
        siteId: site.id,
        slug: slugifyString(input.name),
        content: {
          create: {}
        }
      },
    })
    return page
  }),
  getPageById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.findUnique({
      where: {
        id: input,
      },
    })
    return page
  }),
  getSubpagesByPageId: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pages = await ctx.prisma.page.findMany({
      where: {
        parentId: input,
      },
    })
    return pages
  }),
  getPagesBySiteId: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
    })

    if (!site) throw new Error("Site not found")

    const pages = await ctx.prisma.page.findMany({
      where: {
        siteId: site.id,
        parentId: null,
      },
    })
    return pages
  }),
  editPageName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.page.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          slug: slugifyString(input.name),
        },
      })
      return page
    }),
  deletePage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.delete({
      where: {
        id: input,
      },
    })
    return page
  }),
})
