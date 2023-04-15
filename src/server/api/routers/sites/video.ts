import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

const domainName = (dom: string) => {
  return process.env.NODE_ENV === "production" ? dom : dom.replace(".localhost:3000", ".kpwebdev.com")
}

export const videoBlockRouter = createTRPCRouter({
  getVideoByName: publicProcedure
    .input(
      z.object({
        name: z.string(),
        domain: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const video = await ctx.prisma.site.findFirst({
        where: {
          domain: {
            name: domainName(input.domain),
          },
        },
        select: {
          components: {
            where: {
              name: input.name,
              feature: {
                type: "VIDEO",
              },
            },
            select: {
              componentsRelation: {
                select: {
                  video: true
                },
              },
            },
          },
        },
      })

      if (!video) throw new TRPCError({ code: "NOT_FOUND" , message: "Video not found" })

      const response = video.components.map((component) => component?.componentsRelation?.video)[0]

      return response
    }),
})
