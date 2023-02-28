import { z } from "zod"
import { createTRPCRouter, protectedProcedure } from "server/api/trpc"

export const componentsRouter = createTRPCRouter({
  getComponents: protectedProcedure.query(async ({ ctx }) => {

    const site = await ctx.prisma.site.findUnique({
      where: {
        userId: ctx.session.user.id
      },
      select: {
        theme: {
          select: {
            components: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }

    })

    const components = site?.theme.components
    
    return components
  }),
})
