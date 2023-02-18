import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"

const EditPage = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='flex w-full flex-col gap-10'>
      {ctx.currentPageId}
      <button className='btn-secondary btn' onClick={() => void ctx.changeView(ctx.prevView)}>
        Go Back
      </button>
    </div>
  )
}
export default EditPage
