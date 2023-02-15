import { domainRouter } from "./routers/admin/domain";
import { siteRouter } from "./routers/admin/site";
import { themeRouter } from "./routers/admin/theme";
import { userRouter } from "./routers/admin/user";
import { pageRouter } from "./routers/cms/page";
import { createTRPCRouter } from "./trpc";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  admin: createTRPCRouter({
    domain: domainRouter,
    site: siteRouter,
    theme: themeRouter,
    user: userRouter,
  }),
  cms: createTRPCRouter({
    page: pageRouter
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
