import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"


const domainName = (dom: string) => {
  return process.env.NODE_ENV === "production" ? dom : dom.replace(".localhost:3000", ".kpwebdev.com")
}

export const compoundRouter = createTRPCRouter({
  getCompoundByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const compound = await ctx.prisma.site.findFirst({
      where: {
        domain: {
          name: domainName(input),
        },
      },
      select: {
        components: {
          where: {
            feature: {
              type: "COMPOUND_BLOCK"
            }
          },
          select: {
            componentsRelation: {
              select: {
                compoundBlock: {select: {
                  header: true,
                  id: true,
                  image: true,
                  text: true,
                  linkText: true,
                  linkUrl: true,
                }}
              }
            }
          }
        }
      }
    })

    if (!compound) throw new Error("Compound not found")

    return compound
  }),
})
