import PageIcon from "../../icons/PageIcon"
import { capitalizeString } from "../../../utils/capitalizeString"
import { api } from "../../../utils/api"
import { toast } from "react-toastify"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"

interface SubpageCardProps {
  id: string
  name: string
}

const SubpageCard = ({ id, name }: SubpageCardProps) => {
  const ctx = useContext(CmsContext)
  const { mutate: deleteSubpage } = api.cms.page.deleteSubpage.useMutation()
  const client = api.useContext()

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    deleteSubpage(id, {
      onSuccess: () => {
        toast.success("Subpage deleted")
        void client.cms.page.getSubpagesByPageId.invalidate()
      },
    })
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    // ctx.changeView("edit-page")
    // ctx.changeCurrentPageId(id)
  }

  return (
    <div className='relative z-0 flex h-[300px] grow flex-col items-center rounded-md bg-base-200 p-4 shadow-md'>
      <h3 className='text-center text-xl font-bold'>{capitalizeString(name)}</h3>
      <PageIcon className='opacity-30' />
      <div className='mt-auto flex w-full justify-center gap-2'>
        <button className='btn-primary btn-sm btn' value={id} onClick={handleEdit}>
          Edit
        </button>
        <button className='btn-error btn-sm btn' value={id} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  )
}
export default SubpageCard
