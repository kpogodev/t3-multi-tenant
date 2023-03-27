import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"
import CompoundBlockView from "./compound-block/CompoundBlockView"

const EditPage = dynamic(() => import("./pages/EditPage"))
const EditSubpage = dynamic(() => import("./pages/EditSubpage"))
const SlideshowView = dynamic(() => import("./slideshow/SlideshowView"))
const PagesView = dynamic(() => import("./pages/PagesView"))
const NewsView = dynamic(() => import("./news/NewsView"))
const NavigationView = dynamic(() => import("./navigation/NavigationView"))

type ViewType = { [key: string]: JSX.Element }

const Views = () => {
  const ctx = useContext(CmsContext)

  const view: ViewType = {
    default: <></>,
    metadata: <></>,
    navigation: <NavigationView />,
    pages: <PagesView />,
    news: <NewsView />,
    "edit-page": <EditPage />,
    "edit-subpage": <EditSubpage />,
    slideshow: <SlideshowView />,
    "compound-block": <CompoundBlockView />,
  }

  return (
    <main className='flex w-full flex-col gap-5 xl:gap-10'>
      <AnimatePresence mode='wait'>{view[ctx.currentView.view]}</AnimatePresence>
    </main>
  )
}
export default Views
