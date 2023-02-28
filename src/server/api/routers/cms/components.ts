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

    if(!site) {
      return
    }

    const components = site?.theme.components

    const componentsWithType = [];

    for(const component of components) {
      const type = await ctx.prisma.feature.findFirst({
      where: {
       component: {
        some: {
          id: component.id
        }
       }
      },
      select: {
        type: true
      }
    })

    const componentType = type?.type.toLowerCase().replace('_', '-')
    componentsWithType.push({...component, type: componentType})
    }

    return componentsWithType
  }),
})
