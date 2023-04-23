import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import Heading from "components/common/Heading"
import PageContentEditor from "./PageContentEditor"
import EditPageName from "./EditPageName"
import { motion } from "framer-motion"
import PageOptions from "./PageOptions"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const EditSubpage = () => {
  const ctx = useContext(CmsContext)

  return (
    <motion.div
      key='edit-subpage'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col items-start gap-10 p-5 xl:p-10'
    >
      <div className='flex w-full items-center justify-between'>
        <button
          className='btn-secondary btn ml-auto'
          onClick={() => void ctx.changeView({ view: ctx.prevView.view, id: ctx.prevView.id })}
        >
          Go Back
        </button>
      </div>
      <Heading text='Subpage Name' />
      <EditPageName pageId={ctx.currentView.id} />
      <div className='divider'></div>
      <Heading text='Main Content' />
      <PageContentEditor />
      <div className='divider'></div>
      <Heading text='Page Options' />
      <PageOptions />
    </motion.div>
  )
}
export default EditSubpage
