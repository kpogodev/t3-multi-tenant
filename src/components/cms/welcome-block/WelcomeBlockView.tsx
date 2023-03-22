import { motion } from "framer-motion"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import WelcomeContentForm from "./WelcomeContentForm"
import WelcomeImage from "./WelcomeImage"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const WelcomeBlockView = () => {
  const ctx = useContext(CmsContext)

  return (
    <motion.div
      key={ctx.currentView.id}
      className='mx-auto grid w-full max-w-screen-md gap-10 p-5 lg:max-w-screen-xl lg:grid-cols-3 xl:p-10'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className='lg:col-span-1'>
        <WelcomeImage />
      </div>
      <div className='lg:col-span-2'>
        <WelcomeContentForm />
      </div>
    </motion.div>
  )
}
export default WelcomeBlockView
