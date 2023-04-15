import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

const domainName = (dom: string) => {
  return process.env.NODE_ENV === "production" ? dom : dom.replace(".localhost:3000", ".kpwebdev.com")
}

export const compoundRouter = createTRPCRouter({
  getCompoundByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const compound = await ctx.prisma.site.findFirst({
        where: {
          domain: {
            name: domainName(input.domain),
          },
        },
        select: {
          components: {
            where: {
              feature: {
                type: "COMPOUND_BLOCK",
              },
            },
            select: {
              componentsRelation: {
                select: {
                  compoundBlock: {
                    include: {
                      image: true,
                    }
                  },
                },
              },
            },
          },
        },
      })

      if (!compound) throw new TRPCError({ code: "NOT_FOUND" , message: `${input.name} not found` })

      const response = compound.components.map((component) => component?.componentsRelation?.compoundBlock)[0]

      return response
    }),
})
