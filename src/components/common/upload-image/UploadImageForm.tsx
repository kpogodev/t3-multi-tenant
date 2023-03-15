import { useImperativeHandle, forwardRef } from "react"
import cn from "classnames"
import { AnimatePresence } from "framer-motion"
import useFileUplaoder from "hooks/useFileUploader"
import UploadImagePlaceholder from "./UploadImagePlaceholder"
import UploadImagePreview from "./UploadImagePreview"
import UploadImageProgess from "./UploadImageProgess"
import UploadIcon from "components/icons/UploadIcon"

export interface UploadImagePlaceholderProps {
  infoText?: string
  iconClasses?: React.HTMLAttributes<HTMLOrSVGElement>["className"]
  labelClasses?: React.HTMLAttributes<HTMLParagraphElement>["className"]
  infoClasses?: React.HTMLAttributes<HTMLParagraphElement>["className"]
}
interface UploadImageFormProps {
  uploadImageCallback: <T>(data: T) => void
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
  isUploading: boolean
  uploadImagePlaceholderProps?: UploadImagePlaceholderProps
  uploadSizeLimit?: number
}

const UploadImageForm = (
  {
    uploadImageCallback,
    wrapperClassName,
    isUploading,
    uploadImagePlaceholderProps,
    uploadSizeLimit = 10 * 1024 * 1024,
  }: UploadImageFormProps,
  ref: React.ForwardedRef<{ resetTempFiles: () => void }>
) => {
  const { files, resetFiles, handleChange, handleSubmit } = useFileUplaoder({
    limit: uploadSizeLimit, // in bytes
    onSubmit: (files) => {
      const imageData = files[0] as string
      uploadImageCallback(imageData)
    },
  })

  // Called on successfull upload to reset the temp data
  useImperativeHandle(
    ref,
    () => ({
      resetTempFiles: () => resetFiles(),
    }),
    [resetFiles]
  )

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
          <AnimatePresence>
            {files.length === 0 ? (
              <UploadImagePlaceholder {...uploadImagePlaceholderProps} />
            ) : (
              <UploadImagePreview fileData={files[0] as string} />
            )}
          </AnimatePresence>
          {isUploading && <UploadImageProgess />}
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
export default forwardRef(UploadImageForm)
