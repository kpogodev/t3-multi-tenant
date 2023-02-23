import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../../trpc"

export const navigationRouter = createTRPCRouter({
  getNavigation: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const domainToLookFor = process.env.NODE_ENV === "production" ? input : input.replace(".localhost:3000", ".kpwebdev.com")

    const pages = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: domainToLookFor,
        },
      },
      select: {
        pages: true,
      }
    })

    return pages
  })
})
