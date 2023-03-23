import { useState } from "react"
import { api } from "utils/api"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import { toast } from "react-toastify"

interface EditPageNameProps {
  pageId?: string
}

const EditPageName = ({ pageId }: EditPageNameProps) => {
  const [pageName, setPageName] = useState("")

  const client = api.useContext()

  const { data: pageData } = api.cms.page.getPageById.useQuery(pageId ?? "", {
    enabled: !!pageId,
    onSuccess: (data) => {
      data && setPageName(data.name)
    },
  })

  const { mutate: updatePageName } = api.cms.page.editPageName.useMutation({
    onSuccess: () => {
      toast.success("Page name has been updated")
      void client.cms.page.getPageById.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const initialPageName = pageData?.name ?? ""

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (initialPageName.toLowerCase().trim() === pageName.toLowerCase().trim()) return
    if (!pageName) return toast.error("Page name cannot be empty")
    if (!pageId) return

    updatePageName({ id: pageId, name: pageName })
  }

  return (
    <form className='flex flex-col gap-2' onSubmit={onSubmit}>
      <p className='max-w-[60ch] font-light'>You can change name of this page here:</p>
      <div className='form-control'>
        <div className='input-group'>
          <input
            type='text'
            className='input-bordered input'
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
          />
          <button
            type='submit'
            className='btn-primary btn'
            disabled={initialPageName.toLowerCase().trim() === pageName.toLowerCase().trim()}
          >
            <CheckMarkIcon className='mr-2 h-4 w-4' />
            Save
          </button>
        </div>
      </div>
      <p className='max-w-[60ch] font-light italic'>* Keep in mind, page name must be unique</p>
    </form>
  )
}
export default EditPageName
