import Image from "next/image"
import { generateRandomKey } from "utils/generateRandomKey"

interface UploadImagePreviewProps {
  fileData: string
}

const UploadImagePreview = ({ fileData }: UploadImagePreviewProps) => {
  return (
    <div key={generateRandomKey()} className='relative h-full w-full overflow-hidden'>
      <Image src={fileData} className='object-cover' fill alt='' sizes='20vw' />
    </div>
  )
}
export default UploadImagePreview
