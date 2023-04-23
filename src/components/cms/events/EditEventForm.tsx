import { useRef, useState } from "react"
import { toast } from "react-toastify"
import moment from "moment"
import DatePicker from "react-datepicker"
import Heading from "components/common/Heading"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import DeleteIcon from "components/icons/DeleteIcon"
import "react-datepicker/dist/react-datepicker.css"

interface EditEventProps {
  onEditEvent: (newTitle: string, newStart: Date, newEnd: Date) => void
  onRemoveEvent: () => void
  title: string
  start: Date
  end: Date
}

const EditEventForm = ({ title, start, end, onEditEvent, onRemoveEvent }: EditEventProps) => {
  const [startDate, setStartDate] = useState<Date>(start)
  const [endDate, setEndDate] = useState<Date>(end)
  const inputTitleRef = useRef<HTMLInputElement>(null)

  const verifyStartDate = (pickedDate: Date) => {
    const today = moment().startOf("day").toDate()

    if (pickedDate < today) {
      toast.warning("You can't add events in the past")
      return false
    }

    if (pickedDate > endDate) {
      toast.warning("Start date must be before end date")
      return false
    }

    return true
  }

  const verifyEndDate = (pickedDate: Date) => {
    if (!startDate) return false
    if (pickedDate >= startDate) return true
  }

  const handleStartDateChange = (date: Date) => {
    if (!verifyStartDate(date)) return
    setStartDate(date)
  }

  const handleEndDateChange = (date: Date) => {
    if (!verifyEndDate(date)) return toast.warning("End date must be after start date")
    setEndDate(date)
  }

  const handleOnSave = () => {
    const newTitle = inputTitleRef.current?.value
    if (!newTitle) return toast.error("Title is required")
    if (!startDate || !endDate) return toast.error("Both, start and end date are required")
    onEditEvent(newTitle, startDate, endDate)
  }

  return (
    <div className='flex w-full flex-col gap-3'>
      <Heading text='Edit Event' />
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Title</span>
        </label>
        <input
          ref={inputTitleRef}
          type='text'
          placeholder='Event Title...'
          className='input-bordered input w-full'
          defaultValue={title}
        />
      </div>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Start Date</span>
        </label>
        <DatePicker
          className='input-bordered input w-full'
          selected={startDate}
          dateFormat='dd/MM/yyyy - h:mm aa'
          showTimeSelect
          popperPlacement='top-start'
          onChange={handleStartDateChange}
        />
      </div>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>End Date</span>
        </label>
        <DatePicker
          className='input-bordered input w-full'
          selected={endDate}
          dateFormat='dd/MM/yyyy - h:mm aa'
          showTimeSelect
          popperPlacement='top-start'
          onChange={handleEndDateChange}
        />
      </div>
      <button className='btn-primary btn' onClick={handleOnSave}>
        <CheckMarkIcon className='mr-2 h-4 w-4' />
        Save Changes
      </button>
      <button className='btn-outline btn-error btn' onClick={onRemoveEvent}>
        <DeleteIcon className='mr-2 h-4 w-4' />
        Delete Event
      </button>
    </div>
  )
}
export default EditEventForm
