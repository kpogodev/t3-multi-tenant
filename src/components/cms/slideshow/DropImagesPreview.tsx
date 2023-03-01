import Image from "next/image"
import { generateRandomKey } from "utils/generateRandomKey"

interface DropImagesPreviewProps {
  filesData: string[]
}

const DropImagesPreview = ({ filesData }: DropImagesPreviewProps) => {
  return (
    <div className='grid h-full w-full grid-cols-5 gap-2'>
      {filesData.map(
        (data, index) =>
          index <= 3 && (
            <div key={generateRandomKey()} className='relative h-full w-full overflow-hidden rounded-md shadow-sm'>
              <Image src={data} className='object-cover' fill alt='' />
            </div>
          )
      )}
      {filesData.length > 4 && (
        <div className='grid aspect-square w-full place-items-center rounded-md bg-base-200 shadow-sm'>
          <span className='text-4xl font-bold'>+{filesData.length - 4}</span>
        </div>
      )}
    </div>
  )
}
export default DropImagesPreview
