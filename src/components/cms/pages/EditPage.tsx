import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import AddSubpages from "./AddSubpages"

const EditPage = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='flex w-full items-start flex-col gap-10'>
      <button className='btn-secondary btn' onClick={() => void ctx.changeView(ctx.prevView)}>
        Go Back
      </button>
      <div className='divider'></div>
      <AddSubpages />
    </div>
  )
}
export default EditPage
