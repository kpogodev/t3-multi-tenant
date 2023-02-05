import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
import {addDomainToVercelProject} from "../../vercel";

export const domainRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const domain = await addDomainToVercelProject(input.name);
      console.log(domain)
    }),
});
