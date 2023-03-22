import { useState } from "react"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import { motion } from "framer-motion"
import Image from "next/image"
import cn from "classnames"
import { api } from "utils/api"
import { toast } from "react-toastify"
import DeleteIcon from "components/icons/DeleteIcon"
import EditIcon from "components/icons/EditIcon"
import NewsForm from "./NewsForm"

type NewsItem = inferRouterOutputs<AppRouter>["cms"]["news"]["getNews"][0]

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, delay: 0.5 } },
  exit: { opacity: 0 },
}

const NewsItem = ({ news }: { news: NewsItem }) => {
  const [editMode, setEditMode] = useState(false)
  const formattedDate = news.date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const client = api.useContext()

  const { mutate: deleteNews } = api.cms.news.deleteNews.useMutation({
    onSuccess: () => {
      toast.success("News deleted")
      void client.cms.news.getNews.invalidate()
    },
  })

  if (editMode) return <NewsForm editMode closeSelf={() => setEditMode(false)} newsId={news.id} />

  return (
    <motion.div
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      key={news.id}
      className='w-full overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-md md:grid md:grid-cols-3'
      layout
    >
      {news.image && (
        <div className='relative aspect-[16/9] w-full md:min-h-full'>
          <Image src={news.image.secure_url} fill className='object-cover' alt='' />
        </div>
      )}
      <div className={cn(!news.image ? "md:col-span-3" : "md:col-span-2", "flex flex-col items-start gap-2 p-5")}>
        <h3 className='text-lg font-bold'>{news.title}</h3>
        <p className='line-clamp-3 md:line-clamp-4 2xl:line-clamp-5'>{news.content}</p>
        <div className='mt-5 flex w-full flex-wrap justify-between gap-2 md:mt-auto'>
          <p className='text-base-500 text-sm font-medium italic'>
            Posted by: {news.author ? news.author : "anonymous"}
          </p>
          <p className='text-base-500 text-sm font-medium italic'>{formattedDate}</p>
        </div>
      </div>
      <div className='flex justify-end bg-base-200 md:col-span-3 md:gap-2 md:border-t md:border-base-300 md:p-2'>
        <button
          className='btn-error btn flex-grow rounded-none hover:brightness-90 md:flex-grow-0 md:rounded-md'
          onClick={() => deleteNews(news.id)}
        >
          <DeleteIcon className='mr-2 h-4 w-4' />
          delete
        </button>
        <button
          className='btn-primary btn flex-grow rounded-none md:flex-grow-0 md:rounded-md'
          onClick={() => setEditMode(true)}
        >
          <EditIcon className='mr-2 h-4 w-4' />
          edit
        </button>
      </div>
    </motion.div>
  )
}
export default NewsItem
