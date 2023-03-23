import AddPages from "./AddPages"
import PageList from "./PageList"
import { motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const PagesView = () => {
  return (
    <motion.div
      key='pages-view'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col gap-10 p-5 xl:p-10'
    >
      <AddPages />
      <PageList />
    </motion.div>
  )
}
export default PagesView
