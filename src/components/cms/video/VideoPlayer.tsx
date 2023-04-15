type VideoPlayerProps = {
  src: string
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  return (
    <video className='aspect-video w-full max-w-3xl object-cover' controls autoPlay loop>
      <source src={src} type='video/mp4' />
    </video>
  )
}
export default VideoPlayer
