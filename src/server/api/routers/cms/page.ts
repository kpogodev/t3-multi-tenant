import { z } from "zod"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "server/api/trpc"
import { slugifyString } from "utils/slugifyString"
import { TRPCError } from "@trpc/server"
import { capitalizeString } from "utils/capitalizeString"

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

    const formatSlug = (page: (typeof pages)[0]) => {
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
      include: {
        pages: true,
      }
    })

    if (!site) throw new Error("Site not found")

    const pagesTotalCount = site.pages.length > 0 ? site.pages.filter(page => !page.parentId ).length : 0

    const page = await ctx.prisma.page.create({
      data: {
        name: capitalizeString(input),
        siteId: site.id,
        slug: slugifyString(input),
        order: pagesTotalCount,
        content: {
          create: {},
        },
      },
    })

    if (!page)
      throw new TRPCError({
        code: "CONFLICT",
        message: "Page already exists",
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
        include: {
          pages: true,
        },
      })

      if (!site) throw new Error("Site not found")

      const sibilingPagesTotalCount = site.pages.filter(page => page.parentId === input.parentId).length

      const page = await ctx.prisma.page.create({
        data: {
          name: capitalizeString(input.name),
          parentId: input.parentId,
          siteId: site.id,
          slug: slugifyString(input.name),
          order: sibilingPagesTotalCount,
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
      orderBy: {
        name: "asc",
      },
    })
    return pages
  }),
  getSpecialPages: protectedProcedure.query(async ({ ctx }) => {
    const pages = await ctx.prisma.page.findMany({
      where: {
        site: {
          userId: ctx.session.user.id,
        }
      },
    })

    if(!pages) throw new TRPCError({ code: 'NOT_FOUND', message: 'No pages found'})

    const pageWithNews = pages.find(page => page.withNews)
    const pageWithEvents = pages.find(page => page.withEvents)

    const specialPages = []
    if(pageWithNews) specialPages.push('news')
    if(pageWithEvents) specialPages.push('events')

    return specialPages
  }),
  editPageName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.page
        .update({
          where: {
            id: input.id,
          },
          data: {
            name: capitalizeString(input.name),
            slug: slugifyString(input.name),
          },
        })
        .catch((err) => {
          if (err)
            throw new TRPCError({
              code: "CONFLICT",
              message: "Page name must be unique",
            })
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
