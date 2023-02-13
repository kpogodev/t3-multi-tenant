import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

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
  getSites: publicProcedure.query(async ({ ctx }) => {
    const sites = await ctx.prisma.site.findMany()
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
