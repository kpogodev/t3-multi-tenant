import Slideshow from "components/cms/slideshow/Slideshow"
import SlidesUploader from "./SlidesUploader"
import SlidesList from "./SlidesList"
import { motion } from "framer-motion"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const SlideshowView = () => {
  const ctx = useContext(CmsContext)

  return (
    <motion.div
      key={ctx.currentView.id}
      className='grid w-full grid-cols-3 gap-5 p-5 xl:gap-10 xl:p-10'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <div className='col-span-3 flex w-full max-w-full flex-col gap-5 xl:col-span-2'>
        <Slideshow wrapperClassName='w-full max-w-full h-[32vw] min-h-[400px] bg-black' />
        <SlidesUploader wrapperClassName='w-full' />
      </div>
      <SlidesList wrapperClassName='col-span-3 xl:col-span-1 flex flex-col justify-end min-h-[400px] gap-4 rounded-md bg-base-200 p-5 shadow-md' />
    </motion.div>
  )
}
export default SlideshowView
