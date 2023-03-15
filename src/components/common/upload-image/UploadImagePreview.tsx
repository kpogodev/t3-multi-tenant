import Image from "next/image"
import { motion } from "framer-motion"

interface UploadImagePreviewProps {
  fileData: string
}

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const UploadImagePreview = ({ fileData }: UploadImagePreviewProps) => {
  return (
    <motion.div
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='relative h-full w-full overflow-hidden'
    >
      <Image src={fileData} className='object-cover' fill alt='' sizes='20vw' />
    </motion.div>
  )
}
export default UploadImagePreview
