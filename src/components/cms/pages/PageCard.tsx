import PageIcon from "components/icons/PageIcon"
import { capitalizeString } from "utils/capitalizeString"
import { api } from "utils/api"
import { toast } from "react-toastify"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"

interface PageCardProps {
  id: string
  name: string
}

const PageCard = ({ id, name }: PageCardProps) => {
  const ctx = useContext(CmsContext)
  const { mutate: deletePage } = api.cms.page.deletePage.useMutation()
  const client = api.useContext()

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.value
    deletePage(id, {
      onSuccess: () => {
        toast.success("Page deleted")
        void client.cms.page.getPagesBySiteId.invalidate()
      },
    })
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (name.toLowerCase() === "news") return ctx.changeView("news")
    if (name.toLowerCase() === "events") return ctx.changeView("events")
    const id = e.currentTarget.value
    ctx.changeView("edit-page")
    ctx.changeCurrentPageId(id)
  }

  return (
    <div className='relative z-0 flex grow flex-col items-center gap-5 rounded-md bg-base-200 p-4 shadow-md'>
      <h3 className='text-center text-xl font-bold'>{capitalizeString(name)}</h3>
      <PageIcon className='aspect-square w-1/2 opacity-30' />
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
export default PageCard
