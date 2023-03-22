import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import Heading from "components/common/Heading"
import PageContentEditor from "./PageContentEditor"

const EditSubpage = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='flex w-full flex-col items-start gap-10 p-5 xl:p-10'>
      <div className='flex w-full items-center justify-between'>
        <Heading text='Edit Main Content Area' />
        <button className='btn-secondary btn' onClick={() => void ctx.changeView(ctx.prevView)}>
          Go Back
        </button>
      </div>
      <PageContentEditor />
    </div>
  )
}
export default EditSubpage
