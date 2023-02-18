import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import dynamic from "next/dynamic"

type ViewType = { [key: string]: JSX.Element }

const PagesView = dynamic(() => import("./pages/PagesView"))
const EditPage = dynamic(() => import("./pages/EditPage"))

const View = () => {
  const ctx = useContext(CmsContext)

  const view: ViewType = {
    default: <></>,
    pages: <PagesView />,
    "edit-page": <EditPage />,
  }

  return <main className='flex w-full flex-col gap-10 p-10'>{view[ctx.currentView]}</main>
}
export default View
