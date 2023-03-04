import Image from "next/image"
import { generateRandomKey } from "utils/generateRandomKey"
import { AnimatePresence, motion } from "framer-motion"

interface DropImagesPreviewProps {
  filesData: string[]
}

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0 },
}

const DropImagesPreview = ({ filesData }: DropImagesPreviewProps) => {
  return (
    <motion.div
      key='drop-images-preview'
      className='grid h-full w-full grid-cols-5 gap-2'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <AnimatePresence>
        {filesData.map(
          (data, index) =>
            index <= 3 && (
              <motion.div
                key={generateRandomKey()}
                className='relative h-full w-full overflow-hidden rounded-md shadow-sm'
                variants={animVariants}
              >
                <Image src={data} className='object-cover' fill alt='' sizes='20vw' />
              </motion.div>
            )
        )}
        {filesData.length > 4 && (
          <motion.div
            key={generateRandomKey()}
            variants={animVariants}
            className='grid h-full w-full place-items-center rounded-md bg-base-200 shadow-sm'
          >
            <span className='text-4xl font-bold'>+{filesData.length - 4}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
export default DropImagesPreview
