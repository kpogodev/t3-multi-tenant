import type { IPageProps } from "pages/sites/boilerplate/[...slug]"
import ContentPageContextProvider from "./context/ContentPageContext"
import MainContent from "./components/MainContent"
import SlideshowContentPage from "./components/SlideshowContentPage"

const ContentPages = ({ slug, domain }: IPageProps) => {
  return (
    <ContentPageContextProvider initialParams={{ slug, domain }}>
      <SlideshowContentPage wrapperClassName='w-full h-[35vw] min-h-[300px]' />
      <div className='px-5'>
        <MainContent />
      </div>
    </ContentPageContextProvider>
  )
}
export default ContentPages
