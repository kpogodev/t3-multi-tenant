import { motion } from "framer-motion"
import Calendar from "./Calendar"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const EventsView = () => {
  return (
    <motion.div
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-grow flex-col md:p-5 xl:p-10'
    >
      <div className='flex w-full flex-grow flex-col overflow-hidden border border-base-300 shadow-sm md:rounded-lg '>
        <h3 className='bg-base-200 p-5 text-xl font-semibold text-base-content'>Upcoming Events</h3>
        <Calendar />
      </div>
    </motion.div>
  )
}
export default EventsView
