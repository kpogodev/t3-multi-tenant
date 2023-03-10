import UploadImageIcon from "components/icons/UploadImageIcon"
import { motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const DropAreaDefault = () => {
  return (
    <motion.div
      key='drop-area-default'
      className='pointer-events-none my-auto text-center'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <UploadImageIcon className='mx-auto h-12 w-12 opacity-60' />
      <div className='flex text-sm font-medium text-primary'>
        <p className='pl-1 text-xl'>Upload your photos</p>
      </div>
      <p className='text-sm opacity-80'>up to 10MB at once</p>
    </motion.div>
  )
}
export default DropAreaDefault
