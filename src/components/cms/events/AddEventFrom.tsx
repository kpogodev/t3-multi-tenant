import Heading from "components/common/Heading"
import AddIcon from "components/icons/AddIcon"
import { useRef } from "react"
import { toast } from "react-toastify"

interface AddEventFromProps {
  onAddEvent: (title: string) => void
}

const AddEventFrom = ({ onAddEvent }: AddEventFromProps) => {
  const inputTitleRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = inputTitleRef.current?.value
    if (!title) return toast.error("Please enter a title")
    onAddEvent(title)
  }

  return (
    <form className='flex w-full flex-col gap-3' onSubmit={handleSubmit}>
      <Heading text='New Event' />
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input ref={inputTitleRef} type='text' placeholder='Event Title...' className='input-bordered input w-full' />
      </div>
      <button className='btn-primary btn'>
        <AddIcon className='mr-2 h-4 w-4' />
        Add Event
      </button>
    </form>
  )
}
export default AddEventFrom
