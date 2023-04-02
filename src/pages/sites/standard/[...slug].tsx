import type { NextPage, GetServerSidePropsContext } from "next"
import PageNotFoundRedirectHelper from "utils/sites/PageNotFoundRedirectHelper"
import PrefetchPageData from "themes/standard/utils/PrefetchPageData"
import Layout from "themes/standard/Layout"
import ContentPages from "themes/standard/ContentPages"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await PageNotFoundRedirectHelper(context, () => PrefetchPageData(context))
}

export interface IPageProps {
  domain: string
  slug: string | string[]
}

const Page: NextPage<IPageProps> = (props) => {
  return (
    <Layout domain={props.domain}>
      <ContentPages {...props} />
    </Layout>
  )
}
export default Page
