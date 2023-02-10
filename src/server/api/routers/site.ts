import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const siteRouter = createTRPCRouter({
  addSite: publicProcedure
    .input(
      z.object({
        name: z.string(),
        themeId: z.string(),
        domainId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const site = await ctx.prisma.site.create({
        data: {
          name: input.name,
          domain: {
            connect: {
              id: input.domainId,
            },
          },
          theme: {
            connect: {
              id: input.themeId,
            }
          }
        },
        include: {
          theme: true,
          domain: true,
        }
      })

      return site;
    }),
});
