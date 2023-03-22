import { useState, useRef } from "react"
import cn from "classnames"
import NewsItem from "./NewsItem"
import AddIcon from "components/icons/AddIcon"
import CancelIcon from "components/icons/CancelIcon"
import NewsForm from "./NewsForm"
import { AnimatePresence, motion } from "framer-motion"
import { api } from "utils/api"

interface NewsListProps {
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const NewsList = ({ wrapperClassName }: NewsListProps) => {
  const [showForm, setShowForm] = useState(false)

  const { data: news } = api.cms.news.getNews.useQuery()

  const formCancelRef = useRef<{ onCancellation: () => void }>(null)

  const handleToggleForm = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowForm((prev) => !prev)
    if (showForm) {
      formCancelRef.current?.onCancellation()
    }
  }

  return (
    <motion.div className={cn(wrapperClassName ? wrapperClassName : "")}>
      {showForm ? (
        <button className='btn-primary btn' onClick={handleToggleForm}>
          <CancelIcon className='mr-2 h-4 w-4' /> Cancel
        </button>
      ) : (
        <button className='btn-primary btn' onClick={handleToggleForm}>
          <AddIcon className='mr-2 h-5 w-5' /> Add New
        </button>
      )}
      <AnimatePresence>
        {showForm && <NewsForm ref={formCancelRef} />}
        {news?.length && news.map((newsItem) => <NewsItem key={newsItem.id} news={newsItem} />)}
      </AnimatePresence>
    </motion.div>
  )
}
export default NewsList
