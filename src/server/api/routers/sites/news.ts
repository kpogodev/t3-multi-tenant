import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { TRPCError } from "@trpc/server"

export const newsRouter = createTRPCRouter({
  getNews: publicProcedure
    .input(
      z.object({
        domain: z.string(),
        limit: z.number().optional(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const domainToLookFor =
        process.env.NODE_ENV === "production" ? input.domain : input.domain.replace(".localhost:3000", ".kpwebdev.com")

      const news = await ctx.prisma.news.findMany({
        where: {
          site: {
            domain: {
              name: domainToLookFor,
            },
          },
        },
        orderBy: {
          date: "desc",
        },
        take: input.limit,
        skip: input.skip ?? 0,
        include: {
          image: {
            select: {
              id: true,
              secure_url: true,
              width: true,
              height: true,
              format: true,
              type: true,
            }
          }
        }
      })

      if(!news) throw new TRPCError({ code: 'NOT_FOUND' , message: 'News not found'})

      return news

    }),
})
