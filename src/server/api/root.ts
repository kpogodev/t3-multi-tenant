import { domainRouter } from "./routers/domain";
import { siteRouter } from "./routers/site";
import { createTRPCRouter } from "./trpc";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  domain: domainRouter,
  site: siteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
