import { useContext, useState } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import { toast } from "react-toastify"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import { AnimatePresence, motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1, transition: { delay: 0.3 } },
  exit: { opacity: 0, scale: 0 },
}

const IntervalForm = () => {
  const [interval, setInterval] = useState(5000)
  const ctx = useContext(CmsContext)

  const client = api.useContext()

  const { mutate: updateInterval } = api.cms.components.slideshow.updateSlideshowInterval.useMutation({
    onSuccess: () => {
      toast.success("Interval updated")
      void client.cms.components.slideshow.getSlideshow.invalidate()
    },
    onError: (err) => toast.error(err.message),
  })

  const { data: slideshow } = api.cms.components.slideshow.getSlideshow.useQuery(
    { componentId: ctx.currentView.id ?? "" },
    {
      enabled: !!ctx.currentView.id,
      onSuccess: (data) => (data.interval ? setInterval(data.interval) : setInterval(5000)),
    }
  )

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (typeof slideshow === "undefined") return
    updateInterval({ slideshowId: slideshow.id, interval })
  }

  const intervalHasChanged = typeof slideshow !== "undefined" && slideshow.interval !== interval

  return (
    <motion.form
      className='absolute top-0 right-0 z-10 flex gap-2 rounded-bl-lg bg-primary px-4 py-2 shadow-md'
      layout
      onSubmit={handleSubmit}
    >
      <label className='text-md flex gap-1 font-semibold text-primary-content'>
        Interval:
        <input
          type='text'
          placeholder='Type here'
          className='max-w-[40px] border-b bg-transparent text-right text-primary-content'
          value={interval / 1000}
          onChange={(e) => setInterval(+e.target.value * 1000)}
        />
        seconds
      </label>
      <AnimatePresence>
        {intervalHasChanged && (
          <motion.button
            className='btn-secondary btn-square btn-xs btn'
            type='submit'
            variants={animVariants}
            initial='initial'
            animate='animate'
          >
            <CheckMarkIcon className='h-3 w-3' />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.form>
  )
}
export default IntervalForm
