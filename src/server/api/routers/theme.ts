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
})
