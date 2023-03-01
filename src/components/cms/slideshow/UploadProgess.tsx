import { useState, useEffect } from "react"
import type { CSSProperties } from "react"

const UploadProgess = () => {
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
    <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[rgba(0,0,0,0.7)]'>
      <div className='radial-progress text-info' style={style}>
        {progress < 100 ? progress : 99}%
      </div>
      <p className='animate-pulse text-xl font-extrabold text-info'>Uploading...</p>
    </div>
  )
}
export default UploadProgess
