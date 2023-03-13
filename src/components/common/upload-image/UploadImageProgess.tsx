import { useState, useEffect } from "react"
import type { CSSProperties } from "react"
import { motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const UploadImageProgess = () => {
  const [progress, setProgress] = useState<number>(0)
  const style = { "--value": progress } as CSSProperties

  useEffect(() => {
    const animate = () => {
      setProgress((prev) => (prev < 99 ? prev + 1 : 99))
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  return (
    <motion.div
      key='upload-progress'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[rgba(0,0,0,0.7)]'
    >
      <div className='radial-progress text-success' style={style}>
        {progress < 100 ? progress : 99}%
      </div>
      <p className='animate-pulse text-lg font-bold text-success'>Uploading...</p>
    </motion.div>
  )
}
export default UploadImageProgess
