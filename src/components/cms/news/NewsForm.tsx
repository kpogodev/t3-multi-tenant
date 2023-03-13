import { useState, useRef } from "react"
import UploadPhotoForm from "components/common/upload-image/UploadImageForm"
import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import DatePickerWrapper from "./DatePickerWrapper"
import { api } from "utils/api"
import { toast } from "react-toastify"
import Image from "next/image"

const animVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

type ImageDataType = {
  url: string
  id: string
  width: number
  height: number
}

const NewsForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [imageData, setImageData] = useState<ImageDataType | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const mainSubmitRef = useRef<HTMLButtonElement>(null)

  const client = api.useContext()

  const { mutate: uploadImage } = api.cms.news.uploadNewsImage.useMutation({
    onSuccess: (data) => {
      setImageData(data)
      setIsUploading(false)
    },
  })

  const { mutate: addNews } = api.cms.news.addNews.useMutation({
    onSuccess: () => {
      toast.success("News added successfully")
      setSelectedDate(new Date())
      setTitle("")
      setAuthor("")
      setText("")
      setImageData(null)
      setIsUploading(false)
      setIsSuccessful(false)
      void client.cms.news.getNews.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!title) return toast.error("Title is required")
    if (!text) return toast.error("Text is required")
    if (!selectedDate) return toast.error("Date is required")

    addNews({
      title,
      author,
      content: text,
      date: selectedDate,
      imageId: imageData?.id,
    })
  }

  return (
    <motion.div
      className='flex w-full flex-wrap gap-4 rounded-md border border-base-300 bg-base-200 p-4 shadow-md'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      {imageData ? (
        <div className='relative min-h-[150px] min-w-[280px] flex-grow'>
          <Image src={imageData.url} fill alt='' className='object-cover' />
        </div>
      ) : (
        <UploadPhotoForm
          uploadImageCallback={(data) => uploadImage(data as string)}
          wrapperClassName='min-h-[150px] border-2 border-dashed border-base-300 bg-base-100 flex-grow min-w-[280px]'
          uploadImagePlaceholderProps={{
            iconClasses: "mx-auto aspect-square w-full max-w-[40px] opacity-60",
            labelClasses: "flex text-md font-medium text-base-content",
            infoClasses: "text-xs opacity-80",
            infoText: "Up to 10MB",
          }}
          isUploading={isUploading}
        />
      )}
      <form className='flex flex-grow flex-wrap gap-4' onSubmit={handleSubmit}>
        <div className='flex min-w-[280px] flex-grow flex-wrap gap-4'>
          <div className='form-control w-full'>
            <label className='input-group input-group-vertical'>
              <span>Title</span>
              <input
                type='text'
                placeholder='News title...'
                className='input-bordered input font-bold'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className='form-control min-w-[200px] flex-grow'>
            <label className='input-group input-group-vertical'>
              <span>Author</span>
              <input
                type='text'
                placeholder='News author...'
                className='input-bordered input italic'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
          </div>
          <div className='form-control min-w-[200px] flex-grow'>
            <label>
              <span className='block w-full rounded-tl-lg rounded-tr-lg bg-base-300 px-4'>Date</span>
              <DatePickerWrapper>
                <DatePicker
                  className='input-bordered input w-full rounded-tl-none rounded-tr-none'
                  selected={selectedDate}
                  onChange={(date) => void setSelectedDate(date)}
                  dateFormat='dd/MM/yyyy'
                />
              </DatePickerWrapper>
            </label>
          </div>
        </div>
        <div className='form-control min-h-[150px] w-full'>
          <label className='input-group input-group-vertical h-full'>
            <span>Text</span>
            <textarea
              className='textarea-bordered textarea h-full resize-none'
              placeholder='News text...'
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </label>
        </div>
        <button className='btn-primary btn ml-auto' type='submit' ref={mainSubmitRef}>
          Save
        </button>
      </form>
    </motion.div>
  )
}
export default NewsForm
