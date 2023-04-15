import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import { toast } from "react-toastify"
import Image from "next/image"

interface APIResponse {
  public_id: string
  width: number
  height: number
  format: string
  secure_url: string
  resource_type: "video" | "image" | "raw" | "auto"
  created_at: string
}

const VideoUploadForm = () => {
  const [video, setVideo] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const ctx = useContext(CmsContext)

  const client = api.useContext()

  const { data: videoData } = api.cms.components.video.getVideo.useQuery({ componentId: ctx.currentView.id ?? "" })

  const { mutate: updateVideo } = api.cms.components.video.updateVideo.useMutation({
    onSuccess: () => {
      void client.cms.components.video.getVideo.invalidate()
      setIsUploading(false)
      toast.success("Video uploaded successfully")
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    setVideo(file || null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!video) return toast.error("Please select a video to upload")
    if (!videoData) return toast.error("This component is not connected with a database record yet")

    const formData = new FormData()
    formData.append("video", video)
    formData.append("userId", ctx.session.user.id)

    try {
      setIsUploading(true)
      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      })
      const data = (await response.json()) as APIResponse
      updateVideo({ ...data, videoId: videoData.id })
    } catch (error) {
      setIsUploading(false)
      toast.error("Error uploading video")
    }
  }

  return (
    <form onSubmit={(e) => void handleSubmit(e)} className='flex items-end gap-4'>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Upload Video</span>
        </label>
        <input
          type='file'
          accept='video/*'
          className='file-input-bordered file-input w-full max-w-xs'
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      <button className='btn-primary btn' type='submit' disabled={isUploading}>
        {isUploading && <Image width={20} height={20} className='mr-1 block h-4 w-4' src='/spinner.gif' alt='' />}
        Upload
      </button>
    </form>
  )
}
export default VideoUploadForm
