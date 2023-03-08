import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "server/api/trpc"
import { toCamelCase } from "utils/toCamelCase"

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
          theme: {
            select: {
              id: true,
            },
          },
        },
      })

      if (!site) throw new Error("Site not created")

      const themeFeautes = await ctx.prisma.feature.findMany({
        where: {
          themeId: site.theme.id,
        },
      })

      if (themeFeautes.length > 0) {
        for (const feature of themeFeautes) {
          const compotentsRelationModel = toCamelCase(feature.type).trim()

          await ctx.prisma.component.create({
            data: {
              site: {
                connect: {
                  id: site.id,
                },
              },
              feature: {
                connect: {
                  id: feature.id,
                },
              },
              name: feature.name,
              componentsRelation: {
                create: {
                  [compotentsRelationModel]: {
                    create: {}
                  }
                }
              }
            },
          })
        }
      }

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
          userId: input.userId,
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
        userId: null,
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
  getSiteByTenantId: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: input,
      },
    })

    return site
  }),
})
