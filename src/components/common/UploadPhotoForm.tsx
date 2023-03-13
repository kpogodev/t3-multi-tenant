import { useEffect } from "react"
import cn from "classnames"
import { AnimatePresence } from "framer-motion"
import useFileUplaoder from "hooks/useFileUploader"
import UploadPhotoDefault from "./UploadPhotoPlaceholder"
import UploadPhotoPreview from "./UploadPhotoPreview"
import UploadProgess from "./UploadProgess"
import UploadIcon from "components/icons/UploadIcon"

export interface UploadPhotoPlaceholderProps {
  infoText?: string
  iconClasses?: React.HTMLAttributes<HTMLOrSVGElement>["className"]
  labelClasses?: React.HTMLAttributes<HTMLParagraphElement>["className"]
  infoClasses?: React.HTMLAttributes<HTMLParagraphElement>["className"]
}
interface UploadPhotoFormProps {
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
  uploadImageCallback: <T>(data: T) => void
  isUploading: boolean
  isSuccessful: boolean
  uploadPhotoPlaceholderProps?: UploadPhotoPlaceholderProps
}

const UploadPhotoForm = ({
  wrapperClassName,
  uploadImageCallback,
  isUploading,
  isSuccessful = false,
  uploadPhotoPlaceholderProps,
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
              <UploadPhotoDefault {...uploadPhotoPlaceholderProps} />
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
            className='btn-primary btn-md btn-circle btn absolute left-1/2 bottom-1 !-translate-x-1/2 transition-colors'
          >
            <UploadIcon />
          </button>
        )}
      </form>
    </div>
  )
}
export default UploadPhotoForm
