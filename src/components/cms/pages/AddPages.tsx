import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "../../../utils/api"
import Heading from "../Heading"

const AddPages = () => {
  const ctx = useContext(CmsContext)
  const [name, setName] = useState<string>("")
  const { mutate: addPage } = api.cms.page.addPage.useMutation()
  const clinet = api.useContext()

  const onAddPageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPage(
      {
        name,
        siteId: ctx.site?.id ?? "",
      },
      {
        onSuccess: () => {
          void clinet.cms.page.getPagesBySiteId.invalidate()
          setName("")
        },
      }
    )
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <Heading text='Pages' />
      <p className='max-w-[60ch] font-light'>
        Pages added here will be display in your navigation. You can add unlimited number of pages however, adding too
        many pages might affect the layout of your navigation bar.
      </p>
      <form className='form-control mt-4' onSubmit={onAddPageSubmit}>
        <label htmlFor='page-name-input' className='label-text mb-1'>
          Page Name
        </label>
        <div className='input-group'>
          <input
            id='page-name-input'
            type='text'
            placeholder='About Us...'
            className='input-bordered input'
            value={name}
            onChange={(e) => void setName(e.target.value)}
          />
          <button type='submit' className='btn'>
            Add Page
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddPages
