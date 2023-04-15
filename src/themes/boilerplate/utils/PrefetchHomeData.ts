import superjson from "superjson"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import { createInnerTRPCContext } from "server/api/trpc"
import { appRouter } from "server/api/root"
import type { GetServerSidePropsContext } from "next"


const PrefetchHomeData = async (context: GetServerSidePropsContext) => {
    const domain = context.req.headers.host

    const ssg = createProxySSGHelpers({
      router: appRouter,
      ctx: createInnerTRPCContext({ session: null }),
      transformer: superjson,
    })

    // Prefetch data queries
    if (domain) {
      await ssg.sites.navigation.getNavigation.prefetch(domain)
      await ssg.sites.video.getVideoByName.prefetch({ name: "Homepage Video Background", domain })
      await ssg.sites.compound.getCompoundByName.prefetch({ name: "Welcome Section", domain })
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        domain,
      },
    }

}

export default PrefetchHomeData