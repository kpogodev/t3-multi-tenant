import { useRef } from "react"

interface AddEventFromProps {
  onAddEvent: (title: string) => void
}

const AddEventFrom = ({ onAddEvent }: AddEventFromProps) => {
  const inputTitleRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = inputTitleRef.current?.value
    if (!title) return
    onAddEvent(title)
  }

  return (
    <form className='flex w-full flex-col gap-3' onSubmit={handleSubmit}>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input ref={inputTitleRef} type='text' placeholder='Event Title...' className='input-bordered input w-full' />
      </div>
      <button className='btn-primary btn'>Add Event</button>
    </form>
  )
}
export default AddEventFrom
