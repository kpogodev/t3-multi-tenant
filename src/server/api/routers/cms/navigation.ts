import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

export const navigationRouter = createTRPCRouter({
  getNavigation: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        pages: true,
      },
    })

    if (!site) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Site not found",
      })
    }

    const pages = site.pages.filter((page) => page.parentId === null)

    const navigation = pages.map((page) => {
      const children = site.pages.filter((child) => child.parentId === page.id)
      const formatedChildren = children.map((child) => ({
        id: child.id,
        name: child.name,
        order: child.order,
        parentId: child.parentId,
      }))

      return {
        id: page.id,
        name: page.name,
        order: page.order,
        children: formatedChildren,
      }
    })

    return navigation
  }),
})
