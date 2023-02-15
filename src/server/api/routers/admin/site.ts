import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../../trpc"

export const siteRouter = createTRPCRouter({
  addSite: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        themeId: z.string(),
        domainId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const site = await ctx.prisma.site.create({
        data: {
          name: input.name,
          domain: {
            connect: {
              id: input.domainId,
            },
          },
          theme: {
            connect: {
              id: input.themeId,
            },
          },
        },
        include: {
          theme: true,
          domain: true,
        },
      })

      return site
    }),
  addTenant: protectedProcedure
    .input(
      z.object({
        siteId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const site = await ctx.prisma.site.update({
        where: {
          id: input.siteId,
        },
        data: {
          tenantId: input.userId,
        },
      })

      if (!site) throw new Error("Site not found")

      return site
    }),
  getSites: publicProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany()
    return sites
  }),
  getUnassociatedSites: protectedProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany({
      where: {
        tenantId: null,
      },
    })
    return sites
  }),
  deleteSite: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const site = await ctx.prisma.site.findFirst({
      where: {
        id: input,
      },
    })

    if (!site) throw new Error("Site not found")

    const deletedSite = await ctx.prisma.site.delete({
      where: {
        id: input,
      },
    })

    return deletedSite
  }),
})
