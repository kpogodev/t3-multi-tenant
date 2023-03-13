import { useState } from "react"
import cn from "classnames"
import NewsItem from "./NewsItem"
import AddIcon from "components/icons/AddIcon"
import CancelIcon from "components/icons/CancelIcon"
import NewsForm from "./NewsForm"
import { AnimatePresence } from "framer-motion"
import { api } from "utils/api"

interface NewsListProps {
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const NewsList = ({ wrapperClassName }: NewsListProps) => {
  const [showForm, setShowForm] = useState(false)

  const { data: news } = api.cms.news.getNews.useQuery()

  return (
    <div className={cn(wrapperClassName ? wrapperClassName : "")}>
      {showForm ? (
        <button className='btn-primary btn' onClick={() => setShowForm(false)}>
          <CancelIcon className='mr-2 h-4 w-4' /> Cancel
        </button>
      ) : (
        <button className='btn-primary btn' onClick={() => setShowForm(true)}>
          <AddIcon className='mr-2 h-5 w-5' /> Add New
        </button>
      )}
      <AnimatePresence>{showForm && <NewsForm />}</AnimatePresence>
    </div>
  )
}
export default NewsList
