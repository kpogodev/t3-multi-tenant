import { createTRPCRouter, protectedProcedure } from "server/api/trpc"

export const generalRouter = createTRPCRouter({
  getComponents: protectedProcedure.query(async ({ ctx }) => {
    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        components: {
          include: {
            feature: {
              select: {
                type: true,
              }
            }
          },
        },
      },
    })
    if (!site) {
      throw new Error("Site not found")
    }

    return site.components
  }),
})
