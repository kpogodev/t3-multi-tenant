import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "server/api/trpc"
import { slugifyString } from "utils/slugifyString"
import { TRPCError } from "@trpc/server"

export const pageRouter = createTRPCRouter({
  getAllPagesSlug: protectedProcedure.query(async ({ ctx }) => {
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

    if (!pages || !pages.length) throw new Error("No pages found")

    const formatSlug = (page: typeof pages[0]) => {
      const parentPage = pages.find((parent) => parent.id === page.parentId)
      if (typeof parentPage === "undefined") return page.slug
      return `${parentPage?.slug}/${page.slug}`
    }

    const formattedPages = pages.map((page) => {
      return {
        name: page.name,
        slug: formatSlug(page),
      }
    })

    return formattedPages
  }),
  addPage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
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
          create: {},
        },
      },
    })

    if(!page) throw new TRPCError({
      code: 'CONFLICT',
      message: 'Page already exists'
    })

    return page
  }),
  addSubPage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        parentId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
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
            create: {},
          },
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
  getSpecialPages: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        pages: {
          where: {
            special: true,
          },
        }
      }
    })

    if (!site) throw new Error("Special Pages not found")

    const pages = site.pages
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
    // Delete all subpages
    await ctx.prisma.page.deleteMany({
      where: {
        parentId: input,
        AND: {
          id: {
            not: input,
          },
        },
      },
    })

    const page = await ctx.prisma.page.delete({
      where: {
        id: input,
      },
    })

    return page
  }),
  deleteSubpage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.delete({
      where: {
        id: input,
      },
    })

    return page
  }),
})
