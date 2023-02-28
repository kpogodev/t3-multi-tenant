import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"

export const themeRouter = createTRPCRouter({
  addTheme: protectedProcedure
    .input(
      z.object({
        name: z.string().regex(/^[a-zA-Z0-9_-]+$/, {message: "Theme name can only contain letters, numbers, underscores and dashes"}),
        components: z.array(
          z.object({
            name: z.string(),
            featureId: z.string(),
            featureType: z.string(),
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
          // Asuming that enum value will be a single word in uppercase and the model name will be the same but in lowercase
          // TODO: Find a way to get the model name from the enum value and find solution for multi word enum values
          const compotentsRelationModel = component.featureType.toLowerCase()

          await ctx.prisma.component.create({
            data: {
              name: component.name.toLowerCase().replace(/ /g, "-"),
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
              componentsRelation: {
                create: {
                  [compotentsRelationModel]: {
                    create: {}
                  }
                }
              }
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
