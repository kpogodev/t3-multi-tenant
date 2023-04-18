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
      className='flex w-full flex-col md:p-5 xl:p-10 flex-grow'
    >
      <div className='flex w-full flex-col overflow-hidden border border-base-300 shadow-sm md:rounded-lg flex-grow '>
        <h3 className='bg-base-200 p-5 text-xl font-semibold text-base-content'>News List</h3>
        <NewsList wrapperClassName='flex flex-col gap-3 md:gap-5 items-stretch p-5' />
      </div>
    </motion.div>
  )
}
export default NewsView
