import { useContext } from "react"
import { ContentPageContext } from "./context/ContentPageContext"
import DisplayRichText from "../common/DisplayRichText"

const MainContent = () => {
  const { pageData } = useContext(ContentPageContext)

  return (
    <div className='mx-auto flex max-w-screen-md flex-col gap-5 py-10 px-5'>
      <h1 className='text-4xl font-extrabold'>{pageData?.pageName}</h1>
      <DisplayRichText className='prose prose-lg' data={pageData?.content?.published} />
    </div>
  )
}
export default MainContent
