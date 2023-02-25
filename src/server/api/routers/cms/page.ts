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
  addSubpage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        parentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const parent = await ctx.prisma.page.findUnique({
        where: {
          id: input.parentId,
        },
      })

      if (!parent) throw new Error("Parent page not found")

      const subpage = await ctx.prisma.subpage.create({
        data: {
          name: input.name,
          pageId: input.parentId,
          slug: `${parent.slug}/${slugifyString(input.name)}`,
        },
      })

      return subpage
    }),
  getPages: publicProcedure.query(async ({ ctx }) => {
    const pages = await ctx.prisma.page.findMany()
    return pages
  }),
  getPageById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.findUnique({
      where: {
        id: input,
      },
    })
    return page
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
      },
    })
    return pages
  }),
  getSubpages: publicProcedure.query(async ({ ctx }) => {
    const subpages = await ctx.prisma.subpage.findMany()
    return subpages
  }),
  getSubpageById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const subpage = await ctx.prisma.subpage.findFirst({
      where: {
        id: input,
      },
    })
    return subpage
  }),
  getSubpagesByPageId: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const subpages = await ctx.prisma.subpage.findMany({
      where: {
        pageId: input,
      },
    })
    return subpages
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
  editSubpageName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const parent = await ctx.prisma.page.findFirst({
        where: {
          subpages: {
            some: {
              id: input.id,
            },
          },
        },
      })

      if (!parent) throw new Error("Parent page not found")

      const subpage = await ctx.prisma.subpage.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          slug: `${parent.slug}/${slugifyString(input.name)}`,
        },
      })
      return subpage
    }),
  deletePage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.delete({
      where: {
        id: input,
      },
    })
    return page
  }),
  deleteSubpage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const subpage = await ctx.prisma.subpage.delete({
      where: {
        id: input,
      },
    })
    return subpage
  }),
})
