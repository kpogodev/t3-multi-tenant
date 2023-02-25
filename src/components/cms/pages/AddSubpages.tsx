import { useState, useContext } from "react"
import { api } from "../../../utils/api"
import Heading from "../../common/Heading"
import { CmsContext } from "../context/CmsContext"

const AddSubpages = () => {
  const ctx = useContext(CmsContext)
  const [name, setName] = useState<string>("")
  const { mutate: addPage } = api.cms.page.addSubPage.useMutation()
  const clinet = api.useContext()

  const onAddSubpageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPage(
      { name, parentId: ctx.currentPageId },
      {
        onSuccess: () => {
          void clinet.cms.page.getSubpagesByPageId.invalidate()
          setName("")
        },
      }
    )
  }

  return (
    <div className='flex w-full flex-col gap-2'>
      <Heading text='Sub-Pages' />
      <p className='max-w-[60ch] font-light'>
        Pages added here will be associated with the current page. You can add unlimited number of sub-pages. If
        necessary, you will be able to associate them with the other pages later.
      </p>
      <form className='form-control mt-4' onSubmit={onAddSubpageSubmit}>
        <label htmlFor='page-name-input' className='label-text mb-1'>
          Sub-Page Name
        </label>
        <div className='input-group'>
          <input
            id='page-name-input'
            type='text'
            placeholder='Our Team...'
            className='input-bordered input'
            value={name}
            onChange={(e) => void setName(e.target.value)}
          />
          <button type='submit' className='btn'>
            Add Sub-page
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddSubpages
