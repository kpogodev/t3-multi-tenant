import { useState, useRef } from "react"
import { api } from "../../utils/api"
import { toast } from "react-toastify"
import { generateRandomKey } from "../../utils/generateRandomKey"

const AddSiteForm = () => {
  const [websiteName, setWebsiteName] = useState<string>("")
  const domainRef = useRef<HTMLSelectElement>(null)
  const themeRef = useRef<HTMLSelectElement>(null)
  const { data: domains } = api.domain.getAvailableDomains.useQuery()
  const { data: themes } = api.theme.getThemes.useQuery()
  const addSite = api.site.addSite.useMutation()

  const onWebsiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteName(e.target.value)
  }

  const onAddSiteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const domain = domainRef.current?.value
    const theme = themeRef.current?.value

    if (!websiteName.length) {
      return toast.error("Please enter a website name")
    }
    if (!domain) {
      return toast.error("Please select a domain")
    }
    if (!theme) {
      return toast.error("Please select a theme")
    }

    const themeId = themes?.find((th) => th.name === theme)?.id as string
    const domainId = domains?.find((dom) => dom.name === domain)?.id as string

    addSite.mutate(
      {
        name: websiteName,
        domainId: domainId,
        themeId: themeId,
      },
      {
        onSuccess: (data) => {
          toast.success("Site added successfully")
          console.log(data)
        },
        onError: (err) => {
          toast.error("Error adding site")
        },
      }
    )
  }

  return (
    <form className='flex max-w-xs flex-col gap-3' onSubmit={onAddSiteSubmit}>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Website Name</span>
        </label>
        <input
          value={websiteName}
          onChange={onWebsiteNameChange}
          type='text'
          placeholder='Type here'
          className='input-bordered input w-full max-w-xs'
        />
      </div>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Associate with domain</span>
        </label>
        <select className='select-bordered select' ref={domainRef} defaultValue='Choose Domain'>
          <option disabled selected>
            Choose Domain
          </option>
          {domains?.map((dom) => (
            <option key={generateRandomKey()}>{dom.name}</option>
          ))}
        </select>
      </div>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Associate with theme</span>
        </label>
        <select className='select-bordered select' ref={themeRef}>
          <option disabled selected>
            Choose Theme
          </option>
          {themes?.map((theme) => (
            <option key={generateRandomKey()}>{theme.name}</option>
          ))}
        </select>
      </div>
      <button className='btn-primary btn mt-10' type='submit'>
        Add Site
      </button>
    </form>
  )
}
export default AddSiteForm
