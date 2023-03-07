import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"
import { FeatureType } from "@prisma/client"

export const themeRouter = createTRPCRouter({
  addTheme: protectedProcedure
    .input(
      z.object({
        name: z
          .string()
          .regex(/^[a-zA-Z0-9_-]+$/, {
            message: "Theme name can only contain letters, numbers, underscores and dashes",
          }),
        features: z.array(
          z.object({
            name: z.string(),
            type: z.nativeEnum(FeatureType),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const theme = await ctx.prisma.theme.create({
        data: {
          name: input.name,
        },
      })

      if(!theme) throw new Error("Theme not created")

      // Create theme's features
      await ctx.prisma.feature.createMany({
        data: input.features.map((feature) => ({...feature, themeId: theme.id})),
      })

      return theme
    }),
  getThemes: protectedProcedure.query(async ({ ctx }) => {
    const themes = await ctx.prisma.theme.findMany()
    return themes
  }),
  deleteTheme: protectedProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
    const theme = await ctx.prisma.theme.findFirst({
      where: {
        id: input,
      },
    })

    if (!theme) throw new Error("Theme not found")

    const deletedTheme = await ctx.prisma.theme.delete({
      where: {
        id: input,
      },
    })

    return deletedTheme
  }),
})
