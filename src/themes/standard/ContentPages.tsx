import type { IPageProps } from "pages/sites/standard/[...slug]"
import ContentPageContextProvider from "./context/ContentPageContext"
import MainContent from "./components/MainContent"
import SlideshowContentPage from "./components/SlideshowContentPage"

const ContentPages = ({ slug, domain }: IPageProps) => {
  return (
    <ContentPageContextProvider initialParams={{ slug, domain }}>
      <SlideshowContentPage wrapperClassName='w-full h-[35vw] min-h-[300px]' />
      <MainContent />
    </ContentPageContextProvider>
  )
}
export default ContentPages
