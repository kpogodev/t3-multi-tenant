import Slideshow from "components/cms/slideshow/Slideshow"
import ImageUploader from "./ImageUploader"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import SlidesList from "./SlidesList"

const SlideshowView = () => {
  const ctx = useContext(CmsContext)

  const { data: slideshow } = api.cms.components.getSlideshow.useQuery(
    { componentId: ctx.currentComponentId },
    { enabled: !!ctx.currentComponentId }
  )
  return (
    <div className='grid w-full grid-cols-3 gap-10'>
      <div className='col-span-2 flex flex-col gap-5'>
        <Slideshow slideshow={slideshow} wrapperClassName='h-[50vmin] bg-black' />
        {slideshow && <ImageUploader slideshowId={slideshow.id} wrapperClassName='w-full min-h-[200px]' />}
      </div>
      {slideshow && <SlidesList slideshow={slideshow} />}
    </div>
  )
}
export default SlideshowView
