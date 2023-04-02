import { useState, useContext } from "react"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import CancelIcon from "components/icons/CancelIcon"
import EditIcon from "components/icons/EditIcon"
import { api } from "utils/api"
import { CmsContext } from "../context/CmsContext"
import { toast } from "react-toastify"

const TextBlockForm = () => {
  const [text, setText] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const ctx = useContext(CmsContext)
  const client = api.useContext()

  const { data: textBlock } = api.cms.components.textBlock.getTextBlock.useQuery(
    {
      componentId: ctx.currentView.id ?? "",
    },
    {
      onSuccess: (data) => {
        setText(data.text ?? "")
      },
    }
  )

  const { mutate: updateTextBlock } = api.cms.components.textBlock.updateTextBlock.useMutation({
    onSuccess: () => {
      setIsEditing(false)
      toast.success("Text has been updated")
      void client.cms.components.textBlock.getTextBlock.invalidate()
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!textBlock) return
    updateTextBlock({
      textBlockId: textBlock.id,
      text,
    })
  }

  return (
    <form className='flex w-full max-w-xl flex-col items-start gap-5' onSubmit={handleSubmit}>
      <textarea
        className='textarea-bordered textarea min-h-[200px] w-full'
        disabled={!isEditing}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
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
export default TextBlockForm
