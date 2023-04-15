import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"

export const navigationRouter = createTRPCRouter({
  getNavigation: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const domainToLookFor = process.env.NODE_ENV === "production" ? input : input.replace(".localhost:3000", ".kpwebdev.com")

    const site = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: domainToLookFor,
        },
      },
      select: {
        id: true,
      }
    })

    if (!site) throw new Error("Site not found")

    const pages = await ctx.prisma.page.findMany({
      where: {
        siteId: site.id,
        parentId: null,
      },
      include: {
        children: true,
      },
      orderBy: {
        order: 'asc'
      }
    })

    const navigation = pages.map((page) => ({
      id: page.id,
      name: page.name,
      slug: page.slug,
      order: page.order,
      children: page.children.map((child) => ({
        id: child.id,
        name: child.name,
        slug: `${page.slug}/${child.slug}`,
        parentId: child.parentId,
        order: child.order,
      }))
    }))

    return navigation
  }),
})
