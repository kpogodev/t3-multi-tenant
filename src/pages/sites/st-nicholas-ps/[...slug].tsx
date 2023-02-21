/*eslint-disable */
import type { NextPage, InferGetServerSidePropsType, GetServerSidePropsContext } from "next"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import superjson from "superjson"
import PageNotFoundRedirectHelper from "../../../utils/PageNotFoundRedirectHelper"
import { api } from "../../../utils/api"
import { createInnerTRPCContext } from "../../../server/api/trpc"
import { useRouter } from "next/router"
import { appRouter } from "../../../server/api/root"
import DisplayRichText from "../../../components/common/DisplayRichText"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const host = context.req.headers.host
  const domain = host?.split(".")[0] as string

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({ session: null }),
    transformer: superjson,
  })

  await ssg.sites.content.getPageContent.prefetch(domain)

  // helper function to check if the route exists and return 404 if not
  return await PageNotFoundRedirectHelper(context, () => {
    return {
      props: {
        trpcState: ssg.dehydrate(),
        domain,
      },
    }
  })
}

const Page: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const { data } = api.sites.content.getPageContent.useQuery(props.domain, { enabled: !!props.domain })
  const router = useRouter()
  const content = data?.find((item) => item.slug === router.query.slug?.join("/")).content.published

  return (
    <div className=''>
      <DisplayRichText data={content} className='prose mx-auto py-20' />
    </div>
  )
}
export default Page
/*eslint-enable */
