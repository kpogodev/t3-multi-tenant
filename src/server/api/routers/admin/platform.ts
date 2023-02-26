import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { FeatureType } from "@prisma/client"
import { TRPCClientError } from "@trpc/client"

export const platformRouter = createTRPCRouter({
  addFeature: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.nativeEnum(FeatureType),
      })
    )
    .mutation(async ({ input, ctx }) => {

      const isAdmin = ctx.session.user.role === "ADMIN"
      if (!isAdmin) {
        throw new TRPCClientError("UNAUTHORIZED")
      }

      const feature = await ctx.prisma.feature.create({
        data: {
          name: input.name,
          type: input.type,
        },
      })

      return feature
    }),
})
