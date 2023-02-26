import type { NextPage, GetServerSidePropsContext } from "next"
import PageNotFoundRedirectHelper from "utils/sites/PageNotFoundRedirectHelper"
import ContentPageContextProvider from "components/site/context/ContentPageContext"
import MainContent from "components/site/MainContent"
import PrefetchPageData from "utils/sites/PrefetchPageData"
import Navbar from "components/site/Navbar"

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
      {/* Your Code */}
      <div className='min-h-screen w-full flex-col'>
        <Navbar domain={domain} />
        <MainContent />
      </div>
    </ContentPageContextProvider>
  )
}
export default Page
