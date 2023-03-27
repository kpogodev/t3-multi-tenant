import { useState, useContext, useRef } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import UploadImageForm from "components/common/upload-image/UploadImageForm"
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

const CompoundImage = () => {
  const [isUploading, setIsUploading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const ctx = useContext(CmsContext)
  const client = api.useContext()
  const uploaderRef = useRef<{ resetTempFiles: () => void }>(null)

  const { data: compoundData } = api.cms.components.compoundBlock.getCompoundBlock.useQuery(
    {
      componentId: ctx.currentView.id ?? "",
    },
    { enabled: !!ctx.currentView.id }
  )

  const { mutate: uploadImage } = api.cms.components.compoundBlock.uploadImage.useMutation({
    onMutate: () => setIsUploading(true),
    onSuccess: () => {
      setIsUploading(false)
      toast.success("Image uploaded successfully")
      uploaderRef.current?.resetTempFiles()
      void client.cms.components.compoundBlock.getCompoundBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
      setIsUploading(false)
    },
  })

  const { mutate: reuploadImage } = api.cms.components.compoundBlock.reuploadImage.useMutation({
    onMutate: () => setIsUploading(true),
    onSuccess: () => {
      setIsUploading(false)
      setIsEditing(false)
      toast.success("Image re-uploaded successfully")
      uploaderRef.current?.resetTempFiles()
      void client.cms.components.compoundBlock.getCompoundBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
      setIsUploading(false)
    },
  })

  const { mutate: deleteImage } = api.cms.components.compoundBlock.deleteImage.useMutation({
    onSuccess: () => {
      toast.success("Image deleted successfully")
      void client.cms.components.compoundBlock.getCompoundBlock.invalidate()
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  if (!compoundData?.image)
    return (
      <UploadImageForm
        ref={uploaderRef}
        wrapperClassName='w-full border-2 border-dashed aspect-[16/9] lg:aspect-[3/4] rounded-md transition-colors hover:bg-base-200'
        isUploading={isUploading}
        uploadImageCallback={(data) => {
          uploadImage({ compoundBlockId: compoundData?.id ?? ctx.currentView.id ?? "", image: data as string })
        }}
      />
    )

  return (
    <div className='relative z-0 bg-black'>
      <AnimatePresence>
        {isEditing ? (
          <UploadImageForm
            ref={uploaderRef}
            wrapperClassName='w-full border-2 border-dashed aspect-[16/9] lg:aspect-[3/4] transition-colors hover:bg-base-200 bg-base-100'
            isUploading={isUploading}
            uploadImageCallback={(data) => {
              if (
                typeof compoundData.image?.id !== "undefined" &&
                typeof compoundData.image?.public_id !== "undefined"
              ) {
                reuploadImage({
                  imageId: compoundData.image?.id,
                  imagePublicId: compoundData.image?.public_id,
                  image: data as string,
                })
              }
            }}
          />
        ) : (
          <motion.div variants={animVariants} initial='initial' animate='animate' exit='exit'>
            <Image
              className='aspect-[16/9] w-full object-cover lg:aspect-[3/4]'
              src={compoundData.image.secure_url}
              width={compoundData.image.width}
              height={compoundData.image.height}
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
            if (typeof compoundData.image?.id !== "undefined" && typeof compoundData.image?.public_id !== "undefined") {
              void deleteImage({ imageId: compoundData.image?.id, imagePublicId: compoundData.image?.public_id })
            }
          }}
        >
          <DeleteIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
  )
}
export default CompoundImage
