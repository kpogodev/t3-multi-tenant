import { domainRouter } from "./routers/admin/domain";
import { siteRouter } from "./routers/admin/site";
import { themeRouter } from "./routers/admin/theme";
import { userRouter } from "./routers/admin/user";
import { sldieshowRouter } from "./routers/cms/components/slideshow";
import { generalRouter } from "./routers/cms/components/general";
import { pageRouter } from "./routers/cms/page";
import { pageContentRouter } from "./routers/cms/pageContent";
import { contentRouter } from "./routers/sites/content";
import { homepageRouter } from "./routers/sites/homepage";
import { navigationRouter } from "./routers/sites/navigation";
import { createTRPCRouter } from "./trpc";
import { slideshowRouter } from "./routers/sites/slideshow";
import { welcomeBlockRouter } from "./routers/cms/components/welcomeBlock";
import { newsRouter } from "./routers/cms/news";
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
    page: pageRouter,
    pageContent: pageContentRouter,
    news: newsRouter,
    components: createTRPCRouter({
      general: generalRouter,
      slideshow: sldieshowRouter,
      welcomeBlock: welcomeBlockRouter,
    }),
  }),
  sites: createTRPCRouter({
    content: contentRouter,
    homepage: homepageRouter,
    navigation: navigationRouter,
    slideshow: slideshowRouter
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
