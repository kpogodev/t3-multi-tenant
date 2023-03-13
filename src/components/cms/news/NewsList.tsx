import { useState } from "react"
import cn from "classnames"
import NewsItem from "./NewsItem"
import AddIcon from "components/icons/AddIcon"
import CancelIcon from "components/icons/CancelIcon"
import NewsForm from "./NewsForm"
import { AnimatePresence , motion} from "framer-motion"
import { api } from "utils/api"

interface NewsListProps {
  wrapperClassName?: React.HTMLAttributes<HTMLDivElement>["className"]
}

const NewsList = ({ wrapperClassName }: NewsListProps) => {
  const [showForm, setShowForm] = useState(false)

  const { data: news } = api.cms.news.getNews.useQuery()

  return (
    <motion.div className={cn(wrapperClassName ? wrapperClassName : "")} layout>
      {showForm ? (
        <button className='btn-primary btn' onClick={() => setShowForm(false)}>
          <CancelIcon className='mr-2 h-4 w-4' /> Cancel
        </button>
      ) : (
        <button className='btn-primary btn' onClick={() => setShowForm(true)}>
          <AddIcon className='mr-2 h-5 w-5' /> Add New
        </button>
      )}
      <AnimatePresence>
        {showForm && <NewsForm />}
        {news?.length && news.map((newsItem) => <NewsItem key={newsItem.id} news={newsItem} />)}
      </AnimatePresence>
    </motion.div>
  )
}
export default NewsList
