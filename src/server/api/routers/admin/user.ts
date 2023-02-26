import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"

export const userRouter = createTRPCRouter({
  getPotentialTenants: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      where: {
        role: "TENANT",
        site: null,
      },
    })

    return users
  }),
})
