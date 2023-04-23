import { Calendar, momentLocalizer } from "react-big-calendar"
import type { CalendarProps } from "react-big-calendar"
import moment from "moment"

const localizer = momentLocalizer(moment)

const BigCalendar = (props: Omit<CalendarProps, "localizer">) => {
  return <Calendar {...props} localizer={localizer} />
}

export default BigCalendar
