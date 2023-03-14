import { motion } from "framer-motion"
import NewsList from "./NewsList"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const NewsView = () => {
  return (
    <motion.div
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col overflow-hidden rounded-lg border border-base-300 shadow-sm'
    >
      <h3 className='bg-base-200 p-5 text-xl font-semibold text-base-content'>News List</h3>
      <NewsList wrapperClassName='p-5 flex flex-col gap-3 md:gap-5 items-stretch' />
    </motion.div>
  )
}
export default NewsView
