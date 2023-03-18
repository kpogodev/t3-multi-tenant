import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "server/api/trpc"

export const homepageRouter = createTRPCRouter({
  getHomepageComponents: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return null;
  }),
})
