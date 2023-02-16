import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "../../../utils/api"

const AddPages = () => {
  const ctx = useContext(CmsContext)
  const [name, setName] = useState("")
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
          void clinet.cms.page.getPages.invalidate()
        },
      }
    )
  }

  return (
    <form className='form-control mt-4' onSubmit={onAddPageSubmit}>
      <div className='input-group'>
        <input
          type='text'
          placeholder='Search…'
          className='input-bordered input'
          onChange={(e) => void setName(e.target.value)}
        />
        <button type='submit' className='btn'>
          Add Page
        </button>
      </div>
    </form>
  )
}
export default AddPages
