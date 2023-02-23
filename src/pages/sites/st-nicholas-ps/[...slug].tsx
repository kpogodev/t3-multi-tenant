import type { NextPage, GetServerSidePropsContext } from "next"
import { createProxySSGHelpers } from "@trpc/react-query/ssg"
import superjson from "superjson"
import PageNotFoundRedirectHelper from "../../../utils/PageNotFoundRedirectHelper"
import { api } from "../../../utils/api"
import { createInnerTRPCContext } from "../../../server/api/trpc"
import { appRouter } from "../../../server/api/root"
import DisplayRichText from "../../../components/common/DisplayRichText"
import { useRouter } from "next/router"
import ContentPageLayout from "../../../components/site/ContentPageLayout"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await PageNotFoundRedirectHelper(context, async () => {
    const domain = context.req.headers.host
    const slug = context.params?.slug

    const ssg = createProxySSGHelpers({
      router: appRouter,
      ctx: createInnerTRPCContext({ session: null }),
      transformer: superjson,
    })

    if (domain && slug) {
      await ssg.sites.content.getPageContent.prefetch({ domain, pageSlug: slug })
    }

    return {
      props: {
        trpcState: ssg.dehydrate(),
        domain,
        slug,
      },
    }
  })
}

interface PageProps {
  domain: string
  slug: string | string[]
}

const Page: NextPage<PageProps> = ({ domain, slug }) => {
  const { data: pageData } = api.sites.content.getPageContent.useQuery(
    { pageSlug: slug, domain },
    { enabled: !!domain || !!slug }
  )

  return (
    <ContentPageLayout>
      <div className="max-w-screen-md flex flex-col gap-5 mx-auto py-10 px-5">
        <h1 className='text-4xl font-extrabold'>{pageData?.pageName}</h1>
        <DisplayRichText className="prose prose-lg" data={pageData?.content?.published} />
      </div>
    </ContentPageLayout>
  )
}
export default Page
