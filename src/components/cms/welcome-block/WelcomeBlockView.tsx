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
      key={ctx.currentComponentId}
      className='mx-auto grid w-full max-w-screen-xl grid-cols-3 gap-10'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className='col-span-1'>
        <WelcomeImage />
      </div>
      <div className='col-span-2'>
        <WelcomeContentForm />
      </div>
    </motion.div>
  )
}
export default WelcomeBlockView
