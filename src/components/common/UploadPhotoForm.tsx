import { useEffect } from "react"
import cn from "classnames"
import { AnimatePresence } from "framer-motion"
import useFileUplaoder from "hooks/useFileUploader"
import UploadPhotoDefault from "./UploadPhotoDefault"
import UploadPhotoPreview from "./UploadPhotoPreview"
import UploadProgess from "./UploadProgess"
import UploadIcon from "components/icons/UploadIcon"

interface UploadPhotoFormProps {
  wrapperClassName?: string
  uploadImageCallback: <T>(data: T) => void
  isUploading: boolean
  isSuccessful: boolean
}

const UploadPhotoForm = ({
  wrapperClassName,
  uploadImageCallback,
  isUploading,
  isSuccessful = false,
}: UploadPhotoFormProps) => {
  const { files, resetFiles, handleChange, handleSubmit } = useFileUplaoder({
    limit: 10 * 1024 * 1024, // in bytes
    onSubmit: (files) => {
      const imageData = files[0] as string
      uploadImageCallback(imageData)
    },
  })

  useEffect(() => {
    if (isSuccessful && files.length > 0) {
      resetFiles()
    }
  }, [isSuccessful, files.length, resetFiles])

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "", "relative")}>
      <form className='h-full w-full' onSubmit={handleSubmit}>
        <label className='flex h-full flex-col items-center'>
          <input
            type='file'
            className='absolute inset-0 cursor-pointer opacity-0'
            accept='image/png, image/jpeg, image/jpg'
            onChange={handleChange}
          />
          <AnimatePresence mode='wait'>
            {files.length === 0 ? (
              <UploadPhotoDefault infoText='Up to 10MB' />
            ) : (
              <UploadPhotoPreview fileData={files[0] as string} />
            )}
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
    </div>
  )
}
export default UploadPhotoForm
