import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../../trpc"

export const contentRouter = createTRPCRouter({
  getPageContent: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const site = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: `${input}.kpwebdev.com`,
        },
      },
      include: {
        pages: true,
      },
    })

    if (!site) throw new Error("Site not found")

    const pages = await ctx.prisma.page.findMany({
      where: {
        siteId: site.id,
      },
      include: {
        content: true,
      },
    })

    return pages
  }),
})
