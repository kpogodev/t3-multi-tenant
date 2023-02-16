import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import Pages from "./pages"

type ViewType = { [key: string]: JSX.Element }

const View = () => {
  const ctx = useContext(CmsContext)

  const view: ViewType = {
    default: <></>,
    pages: <Pages />,
  }

  return <main className='flex w-full flex-col gap-10 p-10'>{view[ctx.currentView]}</main>
}
export default View
