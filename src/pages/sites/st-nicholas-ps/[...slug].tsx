import type { NextPage, GetServerSidePropsContext } from "next"
import PageNotFoundRedirectHelper from "utils/sites/PageNotFoundRedirectHelper"
import ContentPageContextProvider from "components/site/context/ContentPageContext"
import MainContent from "components/site/MainContent"
import Navbar from "components/site/Navbar"
import PrefetchPageData from "themes/st-nicholas-ps/utils/PrefetchPageData"
import SlideshowContentPage from "themes/st-nicholas-ps/components/SlideshowContentPage"

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
        <SlideshowContentPage wrapperClassName='w-full h-[35vw] min-h-[300px]' />
        <MainContent />
      </div>
    </ContentPageContextProvider>
  )
}
export default Page
