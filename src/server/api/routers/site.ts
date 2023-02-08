import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const siteRouter = createTRPCRouter({
  addSite: publicProcedure
    .input(
      z.object({
        name: z.string(),
        themeName: z.string(),
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
            create: {
              name: input.themeName,
            }
          }
        },
        include: {
          theme: true,
        }
      })

      return site;
    }),
});
