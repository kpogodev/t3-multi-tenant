import PageIcon from "../../icons/PageIcon"
import { capitalizeString } from "../../../utils/capitalizeString"
import { api } from "../../../utils/api"
import { toast } from "react-toastify"

interface PageCardProps {
  id: string
  name: string
}

const PageCard = ({ id, name }: PageCardProps) => {
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

  return (
    <div className='relative z-0 flex h-[300px] grow flex-col items-center rounded-md bg-base-200 p-4 shadow-md'>
      <h3 className='text-center text-xl font-bold'>{capitalizeString(name)}</h3>
      <PageIcon className='opacity-30' />
      <div className='mt-auto flex w-full justify-center gap-2'>
        <button className='btn-primary btn-sm btn' value={id}>
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
