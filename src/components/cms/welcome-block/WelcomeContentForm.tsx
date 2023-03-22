import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import Select, { type SingleValue } from "react-select"
import { toast } from "react-toastify"
import EditIcon from "components/icons/EditIcon"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import CancelIcon from "components/icons/CancelIcon"

const WelcomeContentForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [heading, setHeading] = useState("")
  const [paragraph, setParagraph] = useState("")
  const [linkText, setLinkText] = useState("")
  const [linkToPage, setLinkToPage] = useState("")

  const ctx = useContext(CmsContext)
  const client = api.useContext()

  const { data: welcomeBlock, isInitialLoading: initialLoadingWelcomeData } =
    api.cms.components.welcomeBlock.getWelcomeBlock.useQuery(
      {
        componentId: ctx.currentView.id ?? "",
      },
      {
        enabled: !!ctx.currentView.id,
        onSuccess: (data) => {
          setHeading(data.header ?? "")
          setParagraph(data.text ?? "")
          setLinkText(data.linkText ?? "")
          setLinkToPage(data.linkUrl ?? "")
          setIsEditing(false)
        },
      }
    )

  const { data: pages, isInitialLoading: initialLoadingPages } = api.cms.page.getAllPagesSlug.useQuery()

  const { mutate: updateWelcomeBlock } = api.cms.components.welcomeBlock.updateWelcomeBlock.useMutation({
    onSuccess: () => {
      toast.success("Content has been updated")
      void client.cms.components.welcomeBlock.getWelcomeBlock.invalidate()
    },
  })

  const handlePageLinkSelection = (selected: SingleValue<{ label: string; value: string }>) => {
    setLinkToPage(selected?.value ?? "")
  }

  const findPageName = (slug: string) => {
    const name = pages?.find((page) => page.slug === slug)?.name
    return name ?? "Please select a page"
  }

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!welcomeBlock) return

    updateWelcomeBlock({
      welcomeBlockId: welcomeBlock?.id,
      header: heading,
      text: paragraph,
      linkText: linkText,
      linkUrl: linkToPage,
    })
  }

  if (initialLoadingPages || initialLoadingWelcomeData) return <div>Loading...</div>

  return (
    <form className='flex h-full w-full flex-col gap-5' onSubmit={handleSave}>
      <label className='input-group input-group-vertical'>
        <span className='py-2 text-sm font-bold uppercase'>Heading</span>
        <input
          type='text'
          placeholder='There is no heading yet...'
          className='input-bordered input'
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          disabled={!isEditing}
        />
      </label>
      <label className='input-group input-group-vertical flex-grow'>
        <span className='py-2 text-sm font-bold uppercase'>Paragraph</span>
        <textarea
          className='textarea-bordered textarea h-full'
          placeholder='There is no text yet...'
          value={paragraph}
          onChange={(e) => setParagraph(e.target.value)}
          disabled={!isEditing}
        ></textarea>
      </label>
      <div className='grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-5'>
        <label className='input-group input-group-vertical w-full'>
          <span className='py-2 text-sm font-bold uppercase'>Link Text</span>
          <input
            type='text'
            placeholder='There is no link text yet...'
            className='input-bordered input'
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            disabled={!isEditing}
          />
        </label>
        <label className='w-full'>
          <span className='flex rounded-tl-lg rounded-tr-lg bg-base-300 px-4 py-2 text-sm font-bold uppercase'>
            Link to page
          </span>
          <Select
            styles={{
              control: (provided, state) => ({
                ...provided,
                backgroundColor: "hsl(var(--b1) / var(--tw-bg-opacity))",
                borderRadius: "0 0 var(--rounded-btn, 0.5rem) var(--rounded-btn, 0.5rem)",
                padding: "0.375rem",
                borderColor: "hsl(var(--bc) / var(--tw-border-opacity, 0.2))",
                opacity: state.isDisabled ? 0.5 : 1,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? "hsl(var(--bc) / var(--tw-bg-opacity, 0.3))"
                  : state.isFocused
                  ? "hsl(var(--bc) / var(--tw-bg-opacity, 0.15))"
                  : "transparent",
                color: "inherit",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "hsl(var(--b2,var(--b1))/var(--tw-bg-opacity, 1))",
              }),
              menuList: (provided) => ({
                ...provided,
                backgroundColor: "hsl(var(--b2,var(--b1))/var(--tw-bg-opacity, 1))",
              }),
              input: (provided) => ({
                ...provided,
                color: "inherit",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "inherit",
              }),
            }}
            defaultValue={{ label: findPageName(welcomeBlock?.linkUrl ?? ""), value: welcomeBlock?.linkUrl ?? "" }}
            options={pages?.map((page) => ({ label: page.name, value: page.slug }))}
            onChange={(selected) => handlePageLinkSelection(selected)}
            isDisabled={!isEditing}
          />
        </label>
      </div>
      <div className='flex w-full gap-5'>
        <button
          key='edit-btn'
          className='btn-primary btn flex-grow'
          type='button'
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <span className='flex'>
              <CancelIcon className='mr-2 h-4 w-4' /> Cancel
            </span>
          ) : (
            <span className='flex'>
              <EditIcon className='mr-2 h-4 w-4' /> Edit
            </span>
          )}
        </button>
        {isEditing && (
          <button key='save-btn' className='btn-primary btn flex-grow' type='submit'>
            <CheckMarkIcon className='mr-2 h-4 w-4' /> Save
          </button>
        )}
      </div>
    </form>
  )
}
export default WelcomeContentForm
