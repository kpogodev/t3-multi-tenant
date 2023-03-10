import Image from "next/image"
import { generateRandomKey } from "utils/generateRandomKey"

interface UploadPhotoPreviewProps {
  fileData: string
}

const UploadPhotoPreview = ({ fileData }: UploadPhotoPreviewProps) => {
  return (
    <div key={generateRandomKey()} className='relative h-full w-full overflow-hidden'>
      <Image src={fileData} className='object-cover' fill alt='' sizes='20vw' />
    </div>
  )
}
export default UploadPhotoPreview
