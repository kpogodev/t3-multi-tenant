import { useState } from "react"
import { api } from "utils/api"
import Heading from "components/common/Heading"
import { toast } from "react-toastify"

const AddPages = () => {
  const [name, setName] = useState<string>("")
  const clinet = api.useContext()
  const { mutate: addPage } = api.cms.page.addPage.useMutation({
    onSuccess: () => {
      toast.success("Page added successfully")
      setName("")
      void clinet.cms.page.getPagesBySiteId.invalidate()
    },
    onError: (error) => {
      console.log(error.message)
      toast.error(error.message)
    },
  })

  const onAddPageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addPage(name)
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
