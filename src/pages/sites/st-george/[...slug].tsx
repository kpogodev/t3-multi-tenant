import type { NextPage, GetServerSidePropsContext } from "next"
import PageNotFoundRedirectHelper from "../../../utils/sites/PageNotFoundRedirectHelper"
import ContentPageContainer from "../../../components/site/ContentPageContainer"
import ContentPageContextProvider from "../../../components/site/context/ContentPageContext"
import MainContent from "../../../components/site/MainContent"
import PrefetchPageData from "../../../utils/sites/PrefetchPageData"
import Navbar from "../../../components/site/Navbar"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return await PageNotFoundRedirectHelper(context, () => PrefetchPageData(context))
}

export interface IPageProps {
  domain: string
  slug: string | string[]
}

const Page: NextPage<IPageProps> = ({ domain, slug }) => {
  return (
    <ContentPageContextProvider initialParams={{ slug, domain }}>
      <ContentPageContainer>
        <Navbar domain={domain} />
        <MainContent />
      </ContentPageContainer>
    </ContentPageContextProvider>
  )
}
export default Page
