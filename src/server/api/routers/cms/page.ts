import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../../trpc"
import { slugifyString } from "../../../../utils/slugifyString"

export const pageRouter = createTRPCRouter({
  addPage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        siteId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.page.create({
        data: {
          name: input.name,
          siteId: input.siteId,
          slug: slugifyString(input.name),
        },
      })
      return page
    }),
  getPages: protectedProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const pages = await ctx.prisma.page.findMany({
      where: {
        siteId: input,
      },
    })
    return pages
  }),
  editPageName: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const page = await ctx.prisma.page.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          slug: slugifyString(input.name),
        },
      })
      return page
    }),
  deletePage: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const page = await ctx.prisma.page.delete({
      where: {
        id: input,
      },
    })
    return page
  }),
})
