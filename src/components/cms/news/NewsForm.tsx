import { useState, useRef, useImperativeHandle, forwardRef } from "react"
import UploadPhotoForm from "components/common/upload-image/UploadImageForm"
import { motion } from "framer-motion"
import DatePicker from "react-datepicker"
import DatePickerWrapper from "./DatePickerWrapper"
import { api } from "utils/api"
import { toast } from "react-toastify"
import Image from "next/image"
import CheckMarkIcon from "components/icons/CheckMarkIcon"
import DeleteIcon from "components/icons/DeleteIcon"
import CancelIcon from "components/icons/CancelIcon"

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

type RefType = React.ForwardedRef<{ onCancellation: () => void }>

interface NewsFormProps {
  editMode?: boolean
  newsId?: string
  closeSelf?: () => void
}

const NewsForm = (props: NewsFormProps, ref: RefType) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [imageData, setImageData] = useState<ImageDataType | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const mainSubmitRef = useRef<HTMLButtonElement>(null)
  const uploaderRef = useRef<{ resetTempFiles: () => void }>(null)

  const client = api.useContext()

  // Runs only when editMode is true
  const { data: initialData } = api.cms.news.getNewsById.useQuery(props.newsId ?? "", {
    enabled: !!props.editMode,
    onSuccess: (data) => {
      setSelectedDate(new Date(data.date))
      setTitle(data.title)
      setAuthor(data.author ?? "")
      setText(data.content)
      if (data.image) {
        setImageData({
          url: data.image?.secure_url,
          id: data.image?.id,
          width: data.image?.width,
          height: data.image?.height,
        })
      }
    },
  })

  const { mutate: uploadImage } = api.cms.news.uploadNewsImage.useMutation({
    onMutate: () => setIsUploading(true),
    onSuccess: (data) => {
      toast.success("Image has been pre-uploaded")
      setImageData(data)
      setIsUploading(false)
      uploaderRef.current?.resetTempFiles()
    },
  })

  const { mutate: deleteImage } = api.cms.news.deleteNewsImage.useMutation({
    onSuccess: () => {
      toast.success("Image has been deleted")
      setImageData(null)
      void client.cms.news.getNews.invalidate()
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
      void client.cms.news.getNews.invalidate()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const { mutate: updateNews } = api.cms.news.updateNews.useMutation({
    onSuccess: () => {
      toast.success("News updated successfully")
      void client.cms.news.getNews.invalidate()
      typeof props.closeSelf !== "undefined" && props.closeSelf()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!title || !title.length) return toast.error("Title is required")
    if (!text || !text.length) return toast.error("Text is required")
    if (!selectedDate) return toast.error("Date is required")

    if (props.editMode && typeof props.newsId !== "undefined") {
      updateNews({
        newsId: props.newsId,
        title,
        author,
        content: text,
        date: selectedDate,
        imageId: imageData?.id,
      })
      return
    } else {
      addNews({
        title,
        author,
        content: text,
        date: selectedDate,
        imageId: imageData?.id,
      })
    }
  }

  useImperativeHandle(ref, () => ({
    onCancellation: () => {
      if (!imageData) return
      deleteImage(imageData.id)
    },
  }))

  // Used to self cancelation if editMode is true
  const handleSelfCancelation = () => {
    if (props.editMode && props.closeSelf) {
      if (typeof initialData !== "undefined" && !initialData.image && imageData) {
        deleteImage(imageData.id)
      }
      props.closeSelf()
    }
  }

  return (
    <motion.div
      className='flex w-full flex-wrap gap-4 lg:flex-nowrap'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      layout
    >
      <div className='relative min-h-[300px] min-w-[280px] flex-grow'>
        {imageData ? (
          <>
            <button
              className='btn-error btn-square btn-sm btn absolute top-2 right-2 z-10 shadow-md hover:brightness-90'
              onClick={() => {
                deleteImage(imageData.id)
                setImageData(null)
              }}
            >
              <DeleteIcon className='h-4 w-4' />
            </button>
            <Image src={imageData.url} fill alt='' className='object-cover' />
          </>
        ) : (
          <UploadPhotoForm
            ref={uploaderRef}
            uploadImageCallback={(data) =>
              uploadImage({
                imageDataString: data as string,
              })
            }
            wrapperClassName='border-2 border-dashed border-base-300 bg-base-100 flex-grow min-w-[280px] h-full'
            uploadImagePlaceholderProps={{
              iconClasses: "mx-auto aspect-square w-full max-w-[40px] opacity-60",
              labelClasses: "flex text-md font-medium text-base-content",
              infoClasses: "text-xs opacity-80",
              infoText: "Up to 10MB",
            }}
            isUploading={isUploading}
          />
        )}
      </div>
      <form className='flex flex-grow flex-wrap gap-4' onSubmit={handleSubmit}>
        <div className='flex min-w-[280px] flex-grow flex-wrap gap-4'>
          <div className='form-control w-full flex-grow'>
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
            <label className='w-full'>
              <span className='flex w-full rounded-tl-lg rounded-tr-lg bg-base-300 px-4'>Date</span>
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
        <div className='flex w-full items-center justify-center gap-2'>
          {props.editMode && (
            <button className='btn-outline btn ml-auto flex-grow' type='button' onClick={handleSelfCancelation}>
              <CancelIcon className='mr-2 h-4 w-4' />
              <span>Cancel</span>
            </button>
          )}
          <button className='btn-primary btn ml-auto flex-grow' type='submit' ref={mainSubmitRef}>
            <CheckMarkIcon className='mr-2 h-4 w-4' />
            <span>Save</span>
          </button>
        </div>
      </form>
    </motion.div>
  )
}
export default forwardRef(NewsForm)
