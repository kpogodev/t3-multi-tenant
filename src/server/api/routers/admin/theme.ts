import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"

export const themeRouter = createTRPCRouter({
  addTheme: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        components: z.array(
          z.object({
            name: z.string(),
            featureId: z.string(),
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

      if(theme) {
        for (const component of input.components) {
          await ctx.prisma.component.create({
            data: {
              name: component.name,
              feature: {
                connect: {
                  id: component.featureId,
                },
              },
              theme: {
                connect: {
                  id: theme.id,
                },
              },
            },
          })
        }
      }

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
