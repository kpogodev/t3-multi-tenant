import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import AddSubpages from "./AddSubpages"
import SubpagesList from "./SubpagesList"
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

const EditPage = () => {
  const ctx = useContext(CmsContext)

  return (
    <motion.div
      key='edit-page'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col items-start gap-5 p-5 xl:gap-10 xl:p-10'
    >
      <div className='flex w-full items-center justify-between'>
        <button className='btn-secondary btn ml-auto' onClick={() => void ctx.changeView({ view: "pages" })}>
          Go Back
        </button>
      </div>
      <Heading text='Page Name' />
      <EditPageName pageId={ctx.currentView.id} />
      <div className='divider'></div>
      <Heading text='Main Content' />
      <PageContentEditor />
      <div className='divider'></div>
      <Heading text='Page Options' />
      <PageOptions />
      <div className='divider'></div>
      <AddSubpages />
      <SubpagesList />
    </motion.div>
  )
}
export default EditPage
