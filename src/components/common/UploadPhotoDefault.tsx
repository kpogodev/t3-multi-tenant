import UploadImageIcon from "components/icons/UploadImageIcon"
import { motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

interface UploadPhotoDefaultProps {
  infoText: string
}

const UploadPhotoDefault = ({ infoText }: UploadPhotoDefaultProps) => {
  return (
    <motion.div
      key='drop-area-default'
      className='pointer-events-none my-auto p-2 text-center'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <UploadImageIcon className='mx-auto aspect-square w-full max-w-[80px] opacity-60' />
      <div className='flex text-sm font-medium text-primary'>
        <p className='pl-1 text-xl'>Upload image</p>
      </div>
      <p className='text-sm opacity-80'>{infoText}</p>
    </motion.div>
  )
}
export default UploadPhotoDefault
