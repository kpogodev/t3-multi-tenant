import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import UploadPhotoForm from "components/common/UploadPhotoForm"
import { toast } from "react-toastify"
import Image from "next/image"
import EditIcon from "components/icons/EditIcon"
import DeleteIcon from "components/icons/DeleteIcon"
import cn from "classnames"
import { AnimatePresence, motion } from "framer-motion"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const WelcomeImage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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

  const { mutate: reuploadImage } = api.cms.components.welcomeBlock.reuploadImage.useMutation({
    onMutate: () => setIsUploading(true),
    onSuccess: () => {
      setIsUploading(false)
      setIsSuccessful(true)
      setIsEditing(false)
      toast.success("Image re-uploaded successfully")
      void client.cms.components.welcomeBlock.getWelcomeBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
      setIsUploading(false)
    },
  })

  const { mutate: deleteImage } = api.cms.components.welcomeBlock.deleteImage.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully")
      void client.cms.components.welcomeBlock.getWelcomeBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  if (!welcomeData?.image)
    return (
      <UploadPhotoForm
        wrapperClassName='w-full border-2 border-dashed aspect-[16/9] lg:aspect-[3/4] rounded-md transition-colors hover:bg-base-200'
        isSuccessful={isSuccessful}
        isUploading={isUploading}
        uploadImageCallback={(data) => {
          uploadImage({ welcomeBlockId: welcomeData?.id ?? ctx.currentComponentId, image: data as string })
        }}
      />
    )

  return (
    <div className='relative z-0'>
      <AnimatePresence>
        {isEditing ? (
          <UploadPhotoForm
            wrapperClassName='w-full border-2 border-dashed aspect-[16/9] lg:aspect-[3/4] rounded-md transition-colors hover:bg-base-200'
            isSuccessful={isSuccessful}
            isUploading={isUploading}
            uploadImageCallback={(data) => {
              if (typeof welcomeData.image?.id !== "undefined" && typeof welcomeData.image?.public_id !== "undefined") {
                reuploadImage({
                  imageId: welcomeData.image?.id,
                  imagePublicId: welcomeData.image?.public_id,
                  image: data as string,
                })
              }
            }}
          />
        ) : (
          <motion.div variants={animVariants} initial='initial' animate='animate' exit='exit'>
            <Image
              className='aspect-[16/9] w-full object-cover lg:aspect-[3/4]'
              src={welcomeData.image.secure_url}
              width={welcomeData.image.width}
              height={welcomeData.image.height}
              alt=''
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className='absolute top-2 right-2 z-20 flex gap-2'>
        <button
          className={cn(
            isEditing ? "btn-secondary" : "btn-primary",
            "btn-square btn-sm btn shadow-md transition-colors"
          )}
          onClick={() => setIsEditing((prev) => !prev)}
        >
          <EditIcon className='h-4 w-4' />
        </button>
        <button
          className='btn-primary btn-square btn-sm btn shadow-md'
          onClick={() => {
            if (typeof welcomeData.image?.id !== "undefined" && typeof welcomeData.image?.public_id !== "undefined") {
              void deleteImage({ imageId: welcomeData.image?.id, imagePublicId: welcomeData.image?.public_id })
            }
          }}
        >
          <DeleteIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}
export default WelcomeImage
