import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import dynamic from "next/dynamic"
import { AnimatePresence } from "framer-motion"
import WelcomeBlockView from "./welcome-block/WelcomeBlockView"

const EditPage = dynamic(() => import("./pages/EditPage"))
const EditSubpage = dynamic(() => import("./pages/EditSubpage"))
const SlideshowView = dynamic(() => import("./slideshow/SlideshowView"))
const PagesView = dynamic(() => import("./pages/PagesView"))

type ViewType = { [key: string]: JSX.Element }

const View = () => {
  const ctx = useContext(CmsContext)

  const view: ViewType = {
    default: <></>,
    metadata: <></>,
    pages: <PagesView />,
    "edit-page": <EditPage />,
    "edit-subpage": <EditSubpage />,
    slideshow: <SlideshowView />,
    "welcome-block": <WelcomeBlockView />,
  }

  return (
    <main className='flex w-full flex-col gap-5 p-5 xl:gap-10 xl:p-10'>
      <AnimatePresence mode='wait'>{view[ctx.currentView]}</AnimatePresence>
    </main>
  )
}
export default View
