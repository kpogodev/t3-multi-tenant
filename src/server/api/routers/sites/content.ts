import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"

export const contentRouter = createTRPCRouter({
  getPageContent: publicProcedure
    .input(
      z.object({
        domain: z.string(),
        pageSlug: z.string().or(z.array(z.string())),
      })
    )
    .query(async ({ ctx, input }) => {
      const domainToLookFor =
        process.env.NODE_ENV === "production" ? input.domain : input.domain.replace(".localhost:3000", ".kpwebdev.com")

      const slug =
        input.pageSlug instanceof Array
          ? input.pageSlug.length > 1
            ? input.pageSlug[1]
            : input.pageSlug[0]
          : input.pageSlug

      const site = await ctx.prisma.site.findFirst({
        where: {
          domain: {
            name: domainToLookFor,
          },
        },
        select: {
          id: true,
        },
      })

      if (!site) throw new Error("Site not found")

      const page = await ctx.prisma.page.findFirst({
        where: {
          siteId: site.id,
          slug: slug,
        },
        include: {
          content: true,
        },
      })

      if (!page) throw new Error("Page not found")

      const responseObj = {
        pageName: page.name,
        content: page.content,
        withNews: page.withNews,
        withEvents: page.withEvents,
      }

      return responseObj
    }),
})
