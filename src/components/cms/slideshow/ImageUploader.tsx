import { useState, useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import { api } from "utils/api"
import { toast } from "react-toastify"
import cn from "classnames"
import UploadIcon from "components/icons/UploadIcon"
import useFileUploader from "hooks/useFileUploader"
import DropAreaDefault from "./DropAreaDefault"
import DropImagesPreview from "./DropImagesPreview"
import UploadProgess from "./UploadProgess"
import { AnimatePresence } from "framer-motion"

interface ImageUploaderProps {
  wrapperClassName?: string
}

const ImageUploader = ({ wrapperClassName }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const clinet = api.useContext()
  const ctx = useContext(CmsContext)

  const { data: slideshow } = api.cms.components.slideshow.getSlideshow.useQuery(
    { componentId: ctx.currentComponentId },
    { enabled: !!ctx.currentComponentId }
  )

  const { files, currentLoad, handleChange, handleSubmit, resetFiles } = useFileUploader({
    limit: 10 * 1024 * 1024, // in bytes
    onSubmit: (files) => {
      if (!slideshow) return
      if (currentLoad.proportion > 1) return toast.error("You can't upload more than 10mb at once")
      const images = files as string[]
      uploadImages({ slideshowId: slideshow.id, images })
      setIsUploading(true)
    },
  })

  const { mutate: uploadImages } = api.cms.components.slideshow.uploadSlideshowImages.useMutation({
    onSuccess: () => {
      toast.success("Images uploaded successfully")
      setIsUploading(false)
      void clinet.cms.components.slideshow.getSlideshow.invalidate()
      resetFiles()
    },

    onError: () => {
      toast.error("Failed to upload images")
      setIsUploading(false)
    },
  })

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative flex flex-col gap-5")}>
      <form
        className='relative min-h-[150px] w-full rounded-md border-2 border-dashed p-3 transition-colors hover:bg-base-200'
        onSubmit={handleSubmit}
      >
        <label className='flex h-full flex-col items-center'>
          <input
            type='file'
            onChange={handleChange}
            className='absolute top-0 left-0 block h-full w-full cursor-pointer opacity-0'
            accept='image/png, image/jpeg, image/jpg'
            multiple
          />
          <AnimatePresence mode='wait'>
            {files.length > 0 && <DropImagesPreview filesData={files as string[]} />}
            {files.length === 0 && <DropAreaDefault />}
            {isUploading && <UploadProgess />}
          </AnimatePresence>
        </label>
        {files.length > 0 && !isUploading && (
          <button
            title='upload images'
            type='submit'
            className='btn-primary btn-md btn-circle btn absolute left-1/2 bottom-1 -translate-x-1/2'
          >
            <UploadIcon />
          </button>
        )}
      </form>
      <div className='relative flex w-full flex-col gap-2'>
        <progress
          className={cn(
            currentLoad.proportion < 0.5
              ? "progress-success"
              : currentLoad.proportion >= 0.5 && currentLoad.proportion < 0.8
              ? "progress-warning"
              : "progress-error",
            "progress w-full transition-all"
          )}
          value={currentLoad.load / 1024}
          max={10486}
        ></progress>
        <p className='mx-auto text-right text-sm font-semibold leading-none'>
          {(currentLoad.load / 1024).toFixed(2)} KB / 10486 KB
        </p>
      </div>
    </div>
  )
}
export default ImageUploader
