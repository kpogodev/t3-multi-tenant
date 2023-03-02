import Image from "next/image"
import { Swiper, SwiperSlide, type SwiperProps } from "swiper/react"
import { Autoplay, EffectFade, Pagination } from "swiper"
import cn from "classnames"
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"

type Slideshow = inferRouterOutputs<AppRouter>["cms"]["components"]["getSlideshow"]
interface SlideshowProps {
  wrapperClassName?: string
  slideshow?: Slideshow
}

const Slideshow = ({ slideshow, wrapperClassName }: SlideshowProps) => {
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
      <Swiper {...swiperProps} className='relative h-full w-full'>
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {slide.image ? (
              <Image
                src={slide.image?.secure_url}
                fill
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
