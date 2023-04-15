import { useContext } from "react"
import { HomepageContext } from "../context/HomepageContext"

const VideoBackgroundHome = () => {
  const { videoBackground } = useContext(HomepageContext)

  const videoType =
    videoBackground?.resource_type && videoBackground.format
      ? `${videoBackground?.resource_type}/${videoBackground?.format}`
      : "video/mp4"

  return (
    <div className='relative z-0 h-[40vw] min-h-[300px] w-full bg-black'>
      <div className='absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-[rgb(30_64_175_/_0.7)] to-transparent' />
      {videoBackground?.secure_url && (
        <video className='absolute top-0 left-0 -z-10 h-full w-full object-cover' autoPlay loop muted>
          <source src={videoBackground?.secure_url} type={videoType} />
        </video>
      )}
    </div>
  )
}
export default VideoBackgroundHome
