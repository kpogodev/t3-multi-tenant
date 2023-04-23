import { useState, useCallback } from "react"
import BigCalendar from "components/common/BigCalendar"
import Modal from "components/common/Modal"
import AddEventFrom from "./AddEventFrom"
import { toast } from "react-toastify"
import { api } from "utils/api"
import type { AppRouter } from "server/api/root"
import type { inferRouterOutputs } from "@trpc/server"
import type { SlotInfo } from "react-big-calendar"
import EditEventForm from "./EditEventForm"
import moment from "moment"

type CalendarEvent = inferRouterOutputs<AppRouter>["cms"]["events"]["getEvents"][0]

type FormType = "add" | "edit" | null

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [formType, setFormType] = useState<FormType>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null)
  const [toBeEditedEvent, setToBeEditedEvent] = useState<CalendarEvent | null>(null)

  const client = api.useContext()

  api.cms.events.getEvents.useQuery(undefined, {
    onSuccess: (data) => {
      setEvents(data)
    },
  })

  const { mutate: createEvent } = api.cms.events.createEvent.useMutation({
    onSuccess: (data) => {
      toast.success(`Event: "${data.title}" has been added`)
      void client.cms.events.getEvents.invalidate()
    },
  })

  const { mutate: updateEvent } = api.cms.events.editEvent.useMutation({
    onSuccess: () => {
      toast.success("Event has been updated")
      void client.cms.events.getEvents.invalidate()
    },
  })

  const { mutate: removeEvent } = api.cms.events.removeEvent.useMutation({
    onSuccess: () => {
      toast.success("Event has been removed")
      void client.cms.events.getEvents.invalidate()
    },
  })

  const verifySlot = (pickedDate: Date) => {
    const today = moment().startOf("day").toDate()
    if (pickedDate >= today) return true
  }

  const handleSelectSlot = useCallback((slot: SlotInfo) => {
    if (!verifySlot(slot.start)) return toast.error("You can't add events in the past")
    setModalOpen(true)
    setSelectedSlot(slot)
    setFormType("add")
  }, [])

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    setModalOpen(true)
    setToBeEditedEvent(event)
    setFormType("edit")
  }, [])

  const isAllDay = (start: Date, end: Date) => {
    const startHour = start.getHours()
    const endHour = end.getHours()

    if (startHour === 0 && endHour === 0) {
      return true
    }
    return false
  }

  const handleAddEvent = (title: string) => {
    if (!title || title.length === 0) return toast.error("Title is required")
    if (!selectedSlot) return toast.error("Something went wrong. If this persists, please contact support.")
    const { start, end } = selectedSlot

    if (!start || !end) return toast.error("Something went wrong. If this persists, please contact support.")

    createEvent({ title, start, end, allDay: isAllDay(start, end) })
    setModalOpen(false)
  }

  const handleEditEvent = (newTitle: string, newStart: Date, newEnd: Date) => {
    if (!toBeEditedEvent) return toast.error("Something went wrong. If this persists, please contact support.")
    updateEvent({
      id: toBeEditedEvent.id,
      title: newTitle,
      start: newStart,
      end: newEnd,
      allDay: isAllDay(newStart, newEnd),
    })
    setModalOpen(false)
  }

  const handleRemoveEvent = () => {
    if (!toBeEditedEvent) return toast.error("Something went wrong. If this persists, please contact support.")

    removeEvent({ id: toBeEditedEvent.id })
    setModalOpen(false)
  }



  return (
    <>
      <BigCalendar
        className='flex-grow'
        events={events}
        startAccessor='start'
        endAccessor='end'
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => handleSelectEvent(event as CalendarEvent)}
        selectable
        popup
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='block w-full'>
          {formType === "add" && <AddEventFrom onAddEvent={handleAddEvent} />}
          {formType === "edit" && toBeEditedEvent && (
            <EditEventForm
              onEditEvent={handleEditEvent}
              onRemoveEvent={handleRemoveEvent}
              title={toBeEditedEvent.title}
              start={toBeEditedEvent.start}
              end={toBeEditedEvent.end}
            />
          )}
        </div>
      </Modal>
    </>
  )
}

export default Calendar
