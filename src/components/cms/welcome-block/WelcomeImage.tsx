import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import UploadPhotoForm from "components/common/UploadPhotoForm"
import { toast } from "react-toastify"
import Image from "next/image"

const WelcomeImage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)

  const ctx = useContext(CmsContext)
  const client = api.useContext()

  const { data: welcomeData } = api.cms.components.welcomeBlock.getWelcomeBlock.useQuery(
    {
      componentId: ctx.currentComponentId,
    },
    { enabled: !!ctx.currentComponentId }
  )

  const { mutate: uploadImage } = api.cms.components.welcomeBlock.uploadImage.useMutation({
    onMutate: () => setIsUploading(true),
    onSuccess: () => {
      setIsUploading(false)
      setIsSuccessful(true)
      toast.success("Image uploaded successfully")
      void client.cms.components.welcomeBlock.getWelcomeBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
      setIsUploading(false)
    },
  })

  console.log(welcomeData)

  if (!welcomeData?.image)
    return (
      <UploadPhotoForm
        wrapperClassName='w-full border-2 border-dashed aspect-[3/4] rounded-md transition-colors hover:bg-base-200'
        isSuccessful={isSuccessful}
        isUploading={isUploading}
        uploadImageCallback={(data) => {
          uploadImage({ welcomeBlockId: welcomeData?.id ?? ctx.currentComponentId, image: data as string })
        }}
      />
    )

  return (
    <div className='relative'>
      <Image
        src={welcomeData.image.secure_url}
        width={welcomeData.image.width}
        height={welcomeData.image.height}
        alt=''
      />
    </div>
  )
}
export default WelcomeImage
