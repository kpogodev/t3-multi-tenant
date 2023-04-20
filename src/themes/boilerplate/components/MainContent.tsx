import { useContext } from "react"
import { ContentPageContext } from "themes/boilerplate/context/ContentPageContext"
import DisplayRichText from "components/common/DisplayRichText"
import LatestNews from "./LatestNews"

const MainContent = () => {
  const { pageData } = useContext(ContentPageContext)

  return (
    <div className='mx-auto flex w-full max-w-screen-md flex-col gap-5 py-10'>
      <h1 className='text-4xl font-extrabold'>{pageData?.pageName}</h1>
      {!pageData?.withNews && <DisplayRichText className='prose prose-lg' data={pageData?.content?.richText} />}
      {pageData?.withNews && <LatestNews />}
    </div>
  )
}
export default MainContent
