import { useContext } from "react"
import { ContentPageContext } from "themes/boilerplate/context/ContentPageContext"
import DisplayRichText from "components/common/DisplayRichText"

const MainContent = () => {
  const { pageData } = useContext(ContentPageContext)

  return (
    <div className='mx-auto flex w-full max-w-screen-md flex-col gap-5 py-10'>
      <h1 className='text-4xl font-extrabold'>{pageData?.pageName}</h1>
      <DisplayRichText className='prose prose-lg' data={pageData?.content?.richText} />
    </div>
  )
}
export default MainContent
