import { useState, useCallback, useRef } from "react"
import BigCalendar from "components/common/BigCalendar"
import Modal from "components/common/Modal"
import type { Event } from "react-big-calendar"
import AddEventFrom from "./AddEventFrom"

interface CalendarEvent extends Event {
  id: number
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<Event | null>(null)

  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    if (!event) return
    setSelectedEvent(event)
  }, [])

  const handleSelectSlot = useCallback((event: Event) => {
    setModalOpen(true)
    setSelectedSlot(event)
  }, [])

  const handleAddEvent = (title: string) => {
    if (!selectedSlot) return

    const event: CalendarEvent = {
      id: events.length + 1,
      title,
      allDay: selectedSlot.allDay,
      start: selectedSlot.start,
      end: selectedSlot.end,
    }
    setEvents((events) => [...events, event])
    setModalOpen(false)
  }

  return (
    <>
      <BigCalendar
        events={events}
        startAccessor='start'
        endAccessor='end'
        className='flex-grow'
        allDayAccessor='allDay'
        onSelectEvent={(event) => handleSelectEvent(event as CalendarEvent)}
        onSelectSlot={handleSelectSlot}
        selectable
        popup
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div className='block w-full'>
          <AddEventFrom onAddEvent={handleAddEvent} />
        </div>
      </Modal>
    </>
  )
}

export default Calendar
