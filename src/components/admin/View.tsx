import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import dynamic from "next/dynamic"

type ViewType = { [key: string]: JSX.Element }

const AddDomain = dynamic(() => import("./AddDomain"))
const AssociateTenant = dynamic(() => import("./AssociateTenant"))
const DomainList = dynamic(() => import("./DomainList"))
const AddSite = dynamic(() => import("./AddSite"))
const SiteList = dynamic(() => import("./SiteList"))
const AddTheme = dynamic(() => import("./AddTheme"))
const ThemeList = dynamic(() => import("./ThemeList"))
const AddFeature = dynamic(() => import("./AddFeature"))

const View = () => {
  const ctx = useContext(AdminContext)

  const view: ViewType = {
    default: <></>,
    "add-domain": <AddDomain />,
    "associate-tenant": <AssociateTenant />,
    "domain-list": <DomainList />,
    "add-site": <AddSite />,
    "site-list": <SiteList />,
    "add-theme": <AddTheme />,
    "theme-list": <ThemeList />,
    "add-feature": <AddFeature />,
  }

  return <main className='flex w-full flex-col gap-10 p-10'>{view[ctx.currentView]}</main>
}
export default View
