import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import AddSubpages from "./AddSubpages"
import SubpagesList from "./SubpagesList"
import Heading from "../../common/Heading"
import RichTextEditor from "../../common/RichTextEditor"

const EditPage = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='flex w-full flex-col items-start gap-10'>
      <div className='flex w-full items-center justify-between'>
        <Heading text='Edit Page Content' />
        <button className='btn-secondary btn' onClick={() => void ctx.changeView(ctx.prevView)}>
          Go Back
        </button>
      </div>
      <RichTextEditor />
      <div className='divider'></div>
      <AddSubpages />
      <SubpagesList />
    </div>
  )
}
export default EditPage
