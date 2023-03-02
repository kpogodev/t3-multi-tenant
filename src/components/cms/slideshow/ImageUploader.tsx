import { useState } from "react"
import cn from "classnames"
import UploadIcon from "components/icons/UploadIcon"
import useFileUploader from "hooks/useFileUploader"
import DropAreaDefault from "./DropAreaDefault"
import DropImagesPreview from "./DropImagesPreview"
import { api } from "utils/api"
import { toast } from "react-toastify"
import UploadProgess from "./UploadProgess"

interface ImageUploaderProps {
  slideshowId: string
  wrapperClassName?: string
}

const ImageUploader = ({ wrapperClassName, slideshowId }: ImageUploaderProps) => {
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const { mutate: uploadImages } = api.cms.components.uploadSlideshowImages.useMutation({
    onSuccess: () => {
      toast.success("Images uploaded successfully")
      setIsUploading(false)
      resetFiles()
    },
    onError: () => {
      toast.error("Failed to upload images")
      setIsUploading(false)
    },
  })

  const { files, currentLoad, handleChange, handleSubmit, resetFiles } = useFileUploader({
    onSubmit: (files) => {
      const images = files as string[]
      uploadImages({ slideshowId, images })
      setIsUploading(true)
    },
  })

  console.log(currentLoad)

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative rounded-md border-2 border-dashed")}>
      <form className='relative h-full w-full p-3 transition-colors hover:bg-base-200' onSubmit={handleSubmit}>
        <label className='flex h-full flex-col items-center'>
          <input
            type='file'
            onChange={handleChange}
            className='absolute top-0 left-0 block h-full w-full cursor-pointer opacity-0'
            accept='image/png, image/jpeg, image/jpg'
            multiple
          />
          {files.length > 0 && <DropImagesPreview filesData={files as string[]} />}
          {files.length === 0 && <DropAreaDefault />}
          {isUploading && <UploadProgess />}
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
      <label className='relative mt-4 flex w-full flex-col gap-2'>
        <progress
          className={cn(
            currentLoad.proportion < 0.5
              ? "progress-success"
              : currentLoad.proportion >= 0.5 && currentLoad.proportion < 0.8
              ? "progress-warning"
              : "progress-error",
            "progress w-full transition-all"
          )}
          value={currentLoad.load}
          max='10000'
        ></progress>
        <span className='mx-auto text-right text-sm font-semibold leading-none'>
          {currentLoad.load.toFixed(2)} kb / 10,000 kb
        </span>
      </label>
    </div>
  )
}
export default ImageUploader
