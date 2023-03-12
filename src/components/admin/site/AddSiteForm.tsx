import { useState } from "react"
import { api } from "utils/api"
import { toast } from "react-toastify"
import Select, { type SingleValue } from "react-select"
import { reactSelectStyles } from "styles/reactSelectStyles"

const AddSiteForm = () => {
  const [websiteName, setWebsiteName] = useState<string>("")
  const [domainId, setDomainId] = useState<string>("")
  const [themeId, setThemeId] = useState<string>("")
  const [withNewsPage, setWithNewsPage] = useState<boolean>(true)
  const [withEventsPage, setWithEventsPage] = useState<boolean>(true)

  const { data: domains } = api.admin.domain.getAvailableDomains.useQuery()
  const { data: themes } = api.admin.theme.getThemes.useQuery()

  const addSite = api.admin.site.addSite.useMutation({
    onSuccess: () => {
      setWebsiteName("")
      setDomainId("")
      setThemeId("")
      setWithNewsPage(true)
      setWithEventsPage(true)
      toast.success("Site added successfully")
    },
    onError: () => {
      toast.error("Error adding site")
    },
  })

  const onWebsiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteName(e.target.value)
  }

  const onAddSiteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!websiteName.length) {
      return toast.error("Please enter a website name")
    }
    if (!domainId.length) {
      return toast.error("Please select a domain")
    }
    if (!themeId.length) {
      return toast.error("Please select a theme")
    }

    addSite.mutate({
      name: websiteName,
      domainId: domainId,
      themeId: themeId,
      withNewsPage,
    })
  }

  const handleDomainChange = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option) return
    setDomainId(option.value)
  }

  const handleThemeChange = (option: SingleValue<{ label: string; value: string }>) => {
    if (!option) return
    setThemeId(option.value)
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
        <Select
          styles={reactSelectStyles}
          options={domains?.map((dom) => ({ label: dom.name, value: dom.id }))}
          onChange={(selected) => void handleDomainChange(selected)}
        />
      </div>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Associate with theme</span>
        </label>
        <Select
          styles={reactSelectStyles}
          options={themes?.map((theme) => ({ label: theme.name, value: theme.id }))}
          onChange={(selected) => void handleThemeChange(selected)}
        />
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>With news page</span>
          <input
            className='checkbox'
            type='checkbox'
            checked={withNewsPage}
            onChange={(e) => setWithNewsPage(e.target.checked)}
          />
        </label>
      </div>
      <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text'>With events page</span>
          <input
            className='checkbox'
            type='checkbox'
            checked={withEventsPage}
            onChange={(e) => setWithEventsPage(e.target.checked)}
          />
        </label>
      </div>
      <button className='btn-primary btn mt-10' type='submit'>
        Add Site
      </button>
    </form>
  )
}
export default AddSiteForm
