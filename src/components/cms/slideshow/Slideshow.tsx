import Image from "next/image"
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper"
import { api } from "utils/api"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import cn from "classnames"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "swiper/css/autoplay"

interface SlideshowProps {
  wrapperClassName?: string
}

const Slideshow = ({ wrapperClassName }: SlideshowProps) => {
  const ctx = useContext(CmsContext)

  const { data: slideshow } = api.cms.components.getSlideshow.useQuery(
    { componentId: ctx.currentComponentId },
    { enabled: !!ctx.currentComponentId }
  )

  if (!slideshow) return <>Loading...</>

  const slides = slideshow.slides

  const swiperProps: SwiperProps = {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    modules: [Autoplay, EffectFade, Pagination],
    autoplay: {
      delay: slideshow.interval ?? 5000,
      disableOnInteraction: false,
    },
  }

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative")}>
      <Swiper {...swiperProps} className='h-full w-full'>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {slide.image ? (
              <Image
                src={slide.image?.secure_url}
                width={slide.image.width}
                height={slide.image.height}
                className='object-cover'
                alt=''
              />
            ) : (
              <p className='text-2xl text-white'>No image uploaded</p>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default Slideshow
