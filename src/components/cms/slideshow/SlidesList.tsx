import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import Image from "next/image"
import { useState, useContext, useRef } from "react"
import { Reorder, motion, AnimatePresence } from "framer-motion"
import { api } from "utils/api"
import { toast } from "react-toastify"
import { CmsContext } from "../context/CmsContext"
import DragIcon from "components/icons/DragIcon"
import DeleteIcon from "components/icons/DeleteIcon"
import cn from "classnames"
import AvailableSpace from "./AvailableSpace"

type Slideshow = inferRouterOutputs<AppRouter>["cms"]["components"]["slideshow"]["getSlideshow"]
interface SlidesListProps {
  wrapperClassName?: string
}

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const SlidesList = ({ wrapperClassName }: SlidesListProps) => {
  const [list, setList] = useState<Slideshow["slides"] | undefined | []>([])
  const [orderHasChanged, setOrderHasChanged] = useState(false)

  const client = api.useContext()
  const ctx = useContext(CmsContext)
  const listRef = useRef<HTMLUListElement>(null)

  const { data: slideshow } = api.cms.components.slideshow.getSlideshow.useQuery(
    { componentId: ctx.currentComponentId },
    { enabled: !!ctx.currentComponentId, onSuccess: (data) => setList(data.slides) }
  )

  const { mutate: deleteSlide, isLoading: isDeleting } = api.cms.components.slideshow.deleteSlide.useMutation({
    onSuccess: () => {
      toast.success("Slide has been deleted")
      void client.cms.components.slideshow.getSlideshow.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const { mutate: updateSlidesOrder } = api.cms.components.slideshow.updateSlidesOrder.useMutation({
    onSuccess: () => {
      toast.success("Order has been updated")
      setOrderHasChanged(false)
      void client.cms.components.slideshow.getSlideshow.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const serializeSlidesId = (array: Slideshow["slides"]) => {
    return array.map((arr) => arr.id).join("")
  }

  const handleOnReorder = (newOrder: Slideshow["slides"]) => {
    if (slideshow?.slides === undefined) return
    const newOrderUpdated = newOrder.map((slide, index) => ({ ...slide, order: index }))

    // Compare initial order with current order
    const initialSlidesId = serializeSlidesId(slideshow.slides)
    const currentSlidesId = serializeSlidesId(newOrderUpdated)

    if (initialSlidesId !== currentSlidesId) {
      setOrderHasChanged(true)
    } else {
      setOrderHasChanged(false)
    }

    setList(newOrderUpdated)
    return
  }

  const handleOrderUpdate = () => {
    if (list === undefined) return
    const payload = list.map((slide) => ({ slideId: slide.id, order: slide.order }))
    updateSlidesOrder(payload)
  }

  const handleDeleteSlide = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const slideId = e.currentTarget.value
    deleteSlide({ slideId })
    setOrderHasChanged(false)
  }

  return (
    <div className={wrapperClassName}>
      <h3 className='text-2xl font-bold'>Uploaded Slides:</h3>
      {typeof list !== "undefined" && (
        <Reorder.Group
          ref={listRef}
          className='mb-auto flex w-full flex-col gap-2'
          values={list}
          onReorder={handleOnReorder}
        >
          {list.length ? (
            list.map((slide) => (
              <Reorder.Item
                dragConstraints={listRef}
                key={slide.id}
                variants={animVariants}
                initial='initial'
                animate='animate'
                value={slide}
                className={cn(
                  isDeleting ? "opacity-50" : "",
                  "relative flex w-full items-stretch justify-between gap-4 rounded-md bg-base-100 p-2 shadow-sm"
                )}
              >
                <div className='relative h-16 w-20 overflow-hidden rounded-md'>
                  {slide.image && (
                    <Image src={slide.image?.secure_url} fill className='object-cover' alt='' sizes='10vw' />
                  )}
                </div>
                <DragIcon className='my-auto mr-auto h-8 w-8 cursor-grab opacity-30 transition-opacity hover:opacity-60' />
                <div className='flex flex-col items-end justify-between'>
                  <p className='text-sm font-semibold'>
                    Optimized size: {slide.image?.bytes ? `${(+slide.image?.bytes / 1024).toFixed(2)}KB` : "Unknown"}
                  </p>
                  <button
                    className='btn-error btn-sm btn-square btn hover:brightness-90'
                    value={slide.id}
                    onClick={handleDeleteSlide}
                  >
                    <DeleteIcon className='h-4 w-4' />
                  </button>
                </div>
              </Reorder.Item>
            ))
          ) : (
            <li className='w-full rounded-md bg-base-100 p-4 shadow-sm'>There is no slides</li>
          )}
        </Reorder.Group>
      )}
      <AnimatePresence>
        {orderHasChanged && (
          <motion.div
            key={slideshow?.id}
            variants={animVariants}
            initial='initial'
            animate='animate'
            exit='exit'
            className='flex justify-between'
          >
            <p>Order has changed</p>
            <button className='btn-primary btn-sm btn' onClick={handleOrderUpdate}>
              Save
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {slideshow?.size ? <AvailableSpace currentSize={slideshow?.size} maxSize={100 * 1024 * 1024} /> : <></>}
    </div>
  )
}
export default SlidesList
