import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "../trpc"

export const themeRouter = createTRPCRouter({
  addTheme: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const theme = await ctx.prisma.theme.create({
        data: {
          name: input.name,
        },
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
