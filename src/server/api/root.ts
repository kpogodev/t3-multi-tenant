import { domainRouter } from "./routers/admin/domain";
import { siteRouter } from "./routers/admin/site";
import { themeRouter } from "./routers/admin/theme";
import { userRouter } from "./routers/admin/user";
import { sldieshowRouter } from "./routers/cms/components/slideshow";
import { generalRouter } from "./routers/cms/components/general";
import { pageRouter } from "./routers/cms/page";
import { pageContentRouter } from "./routers/cms/pageContent";
import { contentRouter } from "./routers/sites/content";
import { videoBlockRouter } from "./routers/sites/video";
import { navigationRouter } from "./routers/sites/navigation";
import { createTRPCRouter } from "./trpc";
import { slideshowRouter } from "./routers/sites/slideshow";
import { compoundBlockRouter } from "./routers/cms/components/compoundBlock";
import { newsRouter as cmsNewsRouter } from "./routers/cms/news";
import { navigationRouter as cmsNavigationRouter } from "./routers/cms/navigation";
import { textBlockRouter } from "./routers/cms/components/textBlock";
import { compoundRouter } from "./routers/sites/compound";
import { videoRouter } from "./routers/cms/components/video";
import { newsRouter } from "./routers/sites/news";
import { eventsRouter as cmsEventsRouter} from "./routers/cms/events";

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
    navigation: cmsNavigationRouter,
    news: cmsNewsRouter,
    events: cmsEventsRouter,
    components: createTRPCRouter({
      general: generalRouter,
      slideshow: sldieshowRouter,
      compoundBlock: compoundBlockRouter,
      textBlock: textBlockRouter,
      video: videoRouter
    }),
  }),
  sites: createTRPCRouter({
    content: contentRouter,
    video: videoBlockRouter,
    navigation: navigationRouter,
    slideshow: slideshowRouter,
    compound: compoundRouter,
    news: newsRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
