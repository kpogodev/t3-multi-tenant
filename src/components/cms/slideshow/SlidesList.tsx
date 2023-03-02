import Image from "next/image"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import DragIcon from "components/icons/DragIcon"
import { Reorder } from "framer-motion"
import { useState } from "react"

type Slideshow = inferRouterOutputs<AppRouter>["cms"]["components"]["getSlideshow"]

interface SlidesListProps {
  wrapperClassName?: string
  slideshow: Slideshow
}

const SlidesList = ({ slideshow }: SlidesListProps) => {
  const [list, setList] = useState<typeof slideshow.slides>(() => slideshow.slides)
  const [orderHasChanged, setOrderHasChanged] = useState(false)

  const serializeSlidesId = (array: Slideshow["slides"]): string => {
    return array.map((arr) => arr.id).join("")
  }

  const handleOnReorder = (newOrder: typeof slideshow.slides) => {
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

  return (
    <div className='col-span-1 flex min-h-[400px] flex-col rounded-md bg-base-200 p-5 shadow-md'>
      <h3 className='mb-4 text-2xl font-bold'>Slides:</h3>
      <Reorder.Group className='flex w-full flex-col gap-2' values={list} onReorder={handleOnReorder} axis='y' >
        {list.length > 0 ? (
          list.map((slide) => (
            <Reorder.Item
              key={slide.id}
              value={slide}
              className='relative flex w-full gap-4 rounded-md bg-base-100 p-2 shadow-sm'
            >
              <div className='relative h-16 w-20 overflow-hidden rounded-md'>
                {slide.image && <Image src={slide.image?.secure_url} fill className='object-cover' alt='' />}
              </div>
              <p className='text-sm font-semibold'>
                Optimized size: {slide.image?.bytes ? `${(+slide.image?.bytes / 1000).toFixed(2)}KB` : "Unknown"}
              </p>
              <DragIcon className='absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 cursor-grab opacity-30 transition-opacity hover:opacity-60' />
            </Reorder.Item>
          ))
        ) : (
          <li className='w-full rounded-md bg-base-100 p-4 shadow-sm'>There is no slides</li>
        )}
      </Reorder.Group>
      <ul className='flex w-full flex-col gap-2'></ul>
      {orderHasChanged && (
        <div className='mt-4 flex justify-between'>
          <p>Changed has been detected</p>
          <button className='btn-primary btn-sm btn'>Save</button>
        </div>
      )}
    </div>
  )
}
export default SlidesList
