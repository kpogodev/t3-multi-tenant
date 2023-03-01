import Slideshow from "components/cms/slideshow/Slideshow"
import ImageUploader from "./ImageUploader"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"

const SlideshowView = () => {
  const ctx = useContext(CmsContext)

  const { data: slideshow } = api.cms.components.getSlideshow.useQuery(
    { componentId: ctx.currentComponentId },
    { enabled: !!ctx.currentComponentId }
  )
  return (
    <div className='flex flex-col gap-5'>
      <Slideshow wrapperClassName='max-w-4xl h-[50vmin] bg-black' />
      {slideshow && <ImageUploader slideshowId={slideshow.id} wrapperClassName='max-w-4xl w-full min-h-[200px]' />}
    </div>
  )
}
export default SlideshowView
