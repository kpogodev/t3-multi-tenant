import Image from "next/image"
import { useContext, useRef } from "react"
import { ContentPageContext } from "components/site/context/ContentPageContext"
import LoadingSkeleton from "components/common/LoadingSkeleton"
import { Swiper, SwiperSlide, type SwiperProps, type SwiperRef } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper"
import cn from "classnames"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "swiper/css/autoplay"

interface SlideshowProps {
  wrapperClassName?: string
}

const SlideshowContentPage = ({ wrapperClassName }: SlideshowProps) => {
  const { slideshowContenentPage: slideshow } = useContext(ContentPageContext)
  const swiperRef = useRef<SwiperRef["swiper"]>()

  if (!slideshow || typeof slideshow === "undefined")
    return <LoadingSkeleton className={cn(wrapperClassName ? wrapperClassName : "", "relative")} />

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
    noSwiping: true,
    resizeObserver: true,
    updateOnWindowResize: true,
    onInit: (swiper) => (swiperRef.current = swiper),
  }

  // This is a hack to force the swiper to re-render when the slides change
  const swiperKey = slideshow.slides.reduce((acc, curr) => acc + curr.id, "")

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative")}>
      <Swiper key={swiperKey} {...swiperProps} className='absolute inset-0 h-full w-full'>
        {slideshow.slides.map((slide) => (
          <SwiperSlide key={slide.id} className='swiper-no-swiping relative'>
            {slide.image ? (
              <Image src={slide.image?.secure_url} fill className='object-cover' alt='' />
            ) : (
              <p className='text-2xl text-white'>No image uploaded</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default SlideshowContentPage
