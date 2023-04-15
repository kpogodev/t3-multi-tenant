import Heading from "components/common/Heading"
import TextBlockForm from "./TextBlockForm"
import { motion } from "framer-motion"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"


const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const TextBlockView = () => {
  const ctx = useContext(CmsContext)

  return (
    <motion.div
      key={ctx.currentView.id}
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col gap-10 p-5 pb-32 xl:p-10'
      layout
    >
      <Heading text={`Edit - ${ctx.currentNavHeader}`} />
      <TextBlockForm />
    </motion.div>
  )
}
export default TextBlockView
