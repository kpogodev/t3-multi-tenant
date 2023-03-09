import type { IPageProps } from "pages/sites/st-nicholas-ps/[...slug]"
import ContentPageContextProvider from "./context/ContentPageContext"
import Navbar from "components/site/Navbar"
import MainContent from "components/site/MainContent"
import SlideshowContentPage from "./components/SlideshowContentPage"

const ContentPages = ({ slug, domain }: IPageProps) => {
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
export default ContentPages
