import Image from "next/image"
import { useContext, useRef } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import { Swiper, SwiperSlide, type SwiperProps, type SwiperRef } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper"
import cn from "classnames"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import LoadingSkeleton from "components/common/LoadingSkeleton"
import IntervalForm from "./IntervalForm"

type Slideshow = inferRouterOutputs<AppRouter>["cms"]["components"]["slideshow"]["getSlideshow"]
interface SlideshowProps {
  wrapperClassName?: string
}

const Slideshow = ({ wrapperClassName }: SlideshowProps) => {
  const ctx = useContext(CmsContext)
  const swiperRef = useRef<SwiperRef["swiper"]>()

  const { data: slideshow } = api.cms.components.slideshow.getSlideshow.useQuery(
    { componentId: ctx.currentView.id ?? "" },
    {
      enabled: !!ctx.currentView.id,
    }
  )

  if (!slideshow) return <LoadingSkeleton className={cn(wrapperClassName ? wrapperClassName : "", "relative")} />

  const swiperProps: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    modules: [Autoplay, EffectFade, Pagination],
    autoplay: {
      delay: slideshow.interval ?? 5000,
      disableOnInteraction: false,
    },
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    resizeObserver: true,
    updateOnWindowResize: true,
    onInit: (swiper) => (swiperRef.current = swiper),
  }

  // This is a hack to force the swiper to re-render when the slides change
  const swiperKey = slideshow.slides.reduce((acc, curr) => acc + curr.id, "")

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative shadow-md")}>
      <Swiper key={swiperKey} {...swiperProps} className='absolute inset-0 h-full w-full'>
        {slideshow.slides.map((slide) => (
          <SwiperSlide key={slide.id} className='relative'>
            {slide.image ? (
              <Image src={slide.image?.secure_url} fill className='object-cover' alt='' sizes='60vw' />
            ) : (
              <p className='text-2xl text-white'>No image uploaded</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <IntervalForm />
    </div>
  )
}
export default Slideshow
