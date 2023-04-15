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
      const formatedChildren = children
        .map((child) => ({
          id: child.id,
          name: child.name,
          order: child.order,
          parentId: child.parentId,
        }))
        .sort((a, b) => a.order - b.order)

      return {
        id: page.id,
        name: page.name,
        order: page.order,
        children: formatedChildren,
      }
    })

    return navigation
  }),
  reorderPages: protectedProcedure
    .input(
      z.array(
        z.object({
          pageId: z.string(),
          newOrder: z.number(),
        })
      )
    )
    .mutation(async ({ ctx, input }) => {
      for (const page of input) {
        await ctx.prisma.page.update({
          where: {
            id: page.pageId,
          },
          data: {
            order: page.newOrder,
          },
        })
      }
      return
    }),
  movePage: protectedProcedure
    .input(
      z.object({
        pageId: z.string(),
        newParentId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.page.update({
        where: {
          id: input.pageId,
        },
        data: {
          parentId: input.newParentId ? input.newParentId : null,
        },
      })
      return
    }),
  transformIntoPage: protectedProcedure
    .input(
      z.object({
        parentChildren: z.array(
          z.object({
            pageId: z.string(),
            newOrder: z.number(),
          })
        ),
        pageId: z.string(),
        newOrder: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.page.update({
        where: {
          id: input.pageId,
        },
        data: {
          parentId: null,
          order: input.newOrder,
        },
      })

      for (const page of input.parentChildren) {
        await ctx.prisma.page.update({
          where: {
            id: page.pageId,
          },
          data: {
            order: page.newOrder,
          },
        })
      }
      return
    }),
})
