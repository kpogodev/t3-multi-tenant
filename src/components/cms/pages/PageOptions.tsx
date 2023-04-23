import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import { toast } from "react-toastify"

const PageOptions = () => {
  const [pageOptions, setPageOptions] = useState({
    withNews: false,
    withEvents: false,
    hidden: false,
  })

  const ctx = useContext(CmsContext)
  const client = api.useContext()

  api.cms.page.getPageById.useQuery(ctx.currentView.id ?? "", {
    onSuccess: (data) => {
      if (data) {
        setPageOptions({
          withNews: data.withNews,
          withEvents: data.withEvents,
          hidden: data.hidden,
        })
      }
    },
  })

  const { mutate: updatePageOptions } = api.cms.page.editPageOptions.useMutation({
    onSuccess: () => {
      toast.success("Page options updated")
      void client.cms.page.getPageById.invalidate()
    },
  })

  const handleCheckBoxUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPageOptions((prev) => ({ ...prev, [name]: checked }))
    updatePageOptions({ id: ctx.currentView.id ?? "", ...pageOptions, [name]: checked })
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='form-control'>
        <label className='label cursor-pointer gap-2'>
          <span className='label-text'>Page with News</span>
          <input
            name='withNews'
            type='checkbox'
            className='checkbox'
            checked={pageOptions.withNews}
            onChange={handleCheckBoxUpdate}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer gap-2'>
          <span className='label-text'>Page with Events</span>
          <input
            name='withEvents'
            type='checkbox'
            className='checkbox'
            checked={pageOptions.withEvents}
            onChange={handleCheckBoxUpdate}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer gap-2'>
          <span className='label-text'>Hidden Page</span>
          <input
            name='hidden'
            type='checkbox'
            className='checkbox'
            checked={pageOptions.hidden}
            onChange={handleCheckBoxUpdate}
          />
        </label>
      </div>
    </div>
  )
}
export default PageOptions
