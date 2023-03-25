import Heading from "components/common/Heading"
import { motion } from "framer-motion"
import NavigationList from "./NavigationList"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const NavigationView = () => {
  return (
    <motion.div
      key='pages-view'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col gap-10 p-5 xl:p-10'
      layout
    >
      <Heading text='Navigation Structure' />
      <NavigationList />
    </motion.div>
  )
}
export default NavigationView
