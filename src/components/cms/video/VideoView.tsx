import Heading from "components/common/Heading"
import { motion } from "framer-motion"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import VideoUploadForm from "./VideoUploadForm"
import VideoPlayer from "./VideoPlayer"
import { api } from "utils/api"
import VideoDeleteButton from "./VideoDeleteButton"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const VideoView = () => {
  const ctx = useContext(CmsContext)

  const { data: videoData } = api.cms.components.video.getVideo.useQuery({ componentId: ctx.currentView.id ?? "" })

  return (
    <motion.div
      key={ctx.currentView.id}
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col gap-10 p-5 pb-32 xl:p-10'
      layout
    >
      <div className='flex w-full max-w-2xl flex-col gap-10'>
        <Heading text={`Edit - ${ctx.currentNavHeader}`} />
        {videoData?.secure_url ? (
          <>
            <VideoPlayer src={videoData.secure_url} />
            <VideoDeleteButton videoId={videoData.id} />
          </>
        ) : (
          <>
            <p className='text-gray-500'>No video uploaded yet</p>
            <VideoUploadForm />
          </>
        )}
      </div>
    </motion.div>
  )
}
export default VideoView
