import type { NextPage, GetServerSidePropsContext } from "next"
import PageNotFoundRedirectHelper from "utils/sites/PageNotFoundRedirectHelper"
import PrefetchPageData from "themes/st-nicholas-ps/utils/PrefetchPageData"
import ContentPages from "themes/st-nicholas-ps/content-pages"



export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await PageNotFoundRedirectHelper(context, () => PrefetchPageData(context))
}

export interface IPageProps {
  domain: string
  slug: string | string[]
}

const Page: NextPage<IPageProps> = (props) => {
  return <ContentPages {...props} />
}
export default Page
