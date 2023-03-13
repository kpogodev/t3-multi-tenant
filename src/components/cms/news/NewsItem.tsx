import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import { motion } from "framer-motion"

type NewsItem = inferRouterOutputs<AppRouter>["cms"]["news"]["getNews"][0]

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const NewsItem = ({ news }: { news: NewsItem }) => {
  return (
    <motion.div key={news.id} className='w-full rounded-md border border-base-300 bg-base-100 p-5 shadow-md' layout>
      <h3 className='text-xl font-bold'>{news.title}</h3>
      <p className='text-base'>{news.content}</p>
      {news.date.toLocaleDateString()}
    </motion.div>
  )
}
export default NewsItem
