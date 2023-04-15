import Heading from "components/common/Heading"
import { motion } from "framer-motion"
import NavigationList from "./NavigationList"
import NavigationInstructions from "./NavigationInstructions"

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
      className='flex w-full flex-col gap-5 p-5 xl:p-10 pb-32'
      layout
    >
      <Heading text='Navigation Structure' />
      <NavigationInstructions />
      <NavigationList />
    </motion.div>
  )
}
export default NavigationView
