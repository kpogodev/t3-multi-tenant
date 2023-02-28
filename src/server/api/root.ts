import { domainRouter } from "./routers/admin/domain";
import { platformRouter } from "./routers/admin/platform";
import { siteRouter } from "./routers/admin/site";
import { themeRouter } from "./routers/admin/theme";
import { userRouter } from "./routers/admin/user";
import { componentsRouter } from "./routers/cms/components";
import { pageRouter } from "./routers/cms/page";
import { pageContentRouter } from "./routers/cms/pageContent";
import { contentRouter } from "./routers/sites/content";
import { homepageRouter } from "./routers/sites/homepage";
import { navigationRouter } from "./routers/sites/navigation";
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
    platform: platformRouter,
  }),
  cms: createTRPCRouter({
    page: pageRouter,
    pageContent: pageContentRouter,
    components: componentsRouter,
  }),
  sites: createTRPCRouter({
    content: contentRouter,
    homepage: homepageRouter,
    navigation: navigationRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
