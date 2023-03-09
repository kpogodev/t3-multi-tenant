import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"

type ViewType = { [key: string]: JSX.Element }

const EditPage = dynamic(() => import("./pages/EditPage"))
const SlideshowView = dynamic(() => import("./slideshow/SlideshowView"))
const PagesView = dynamic(() => import("./pages/PagesView"))

const View = () => {
  const ctx = useContext(CmsContext)

  const view: ViewType = {
    default: <></>,
    pages: <PagesView />,
    slideshow: <SlideshowView />,
    "welcome-block": <></>,
    "edit-page": <EditPage />,
  }

  return (
    <main className='flex w-full flex-col gap-5 p-5 xl:gap-10 xl:p-10'>
      <AnimatePresence mode='wait'>{view[ctx.currentView]}</AnimatePresence>
    </main>
  )
}
export default View
