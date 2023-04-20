import superjson from "superjson"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { createInnerTRPCContext } from "server/api/trpc"
import { appRouter } from "server/api/root"
import type { GetServerSidePropsContext } from "next"


const PrefetchPageData = async (context: GetServerSidePropsContext) => {
    const domain = context.req.headers.host
    const slug = context.params?.slug

    const ssg = createProxySSGHelpers({
      router: appRouter,
      ctx: createInnerTRPCContext({ session: null }),
      transformer: superjson,
    })

    // Prefetch data queries
    if (domain && slug) {
      await ssg.sites.navigation.getNavigation.prefetch(domain)
      await ssg.sites.content.getPageContent.prefetch({ domain, pageSlug: slug })
      await ssg.sites.news.getNews.prefetch({domain, limit: 20})
      await ssg.sites.slideshow.getSlideshowByName.prefetch({ domain, name: 'Content Page Slideshow' })
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        domain,
        slug,
      },
    }

}

export default PrefetchPageData