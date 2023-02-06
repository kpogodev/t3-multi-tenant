import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {addDomainToVercelProject} from "../../vercel";

export const domainRouter = createTRPCRouter({
  addDomain: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const domain = await addDomainToVercelProject(`${input.name}.devtestingxyz.store`);

      console.log(domain)

      if (!domain) {
        throw new Error("Domain already exists");
      }

      await ctx.prisma.domain.create({
        data: {
          name: domain.name,
          apexName: domain.apexName,
          verified: domain.verified,
        }
      })
    }),
  checkDomainAvailability: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const domain = await ctx.prisma.domain.findFirst({
        where: {
          name: input.name,
        },
      })

      return {
        available: !domain,
      };
    }),
});
