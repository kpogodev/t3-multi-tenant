import DeleteIcon from "components/icons/DeleteIcon"
import { toast } from "react-toastify"
import { api } from "utils/api"

const VideoDeleteButton = ({ videoId }: { videoId: string }) => {
  const client = api.useContext()

  const { mutate: deleteVideo } = api.cms.components.video.deleteVideo.useMutation({
    onSuccess: () => {
      void client.cms.components.video.getVideo.invalidate()
      toast.success("Video deleted successfully")
    },
  })

  const handleDelete = () => {
    deleteVideo({ videoId })
  }

  return (
    <button className='btn-error btn' onClick={handleDelete}>
      <DeleteIcon className='mr-1 h-4 w-4' />
      Delete Video
    </button>
  )
}
export default VideoDeleteButton
