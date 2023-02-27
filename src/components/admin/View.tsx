import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import dynamic from "next/dynamic"

type ViewType = { [key: string]: JSX.Element }

const AddDomain = dynamic(() => import("./domain/AddDomain"))
const AssociateTenant = dynamic(() => import("./site/AssociateTenant"))
const DomainList = dynamic(() => import("./domain/DomainList"))
const AddSite = dynamic(() => import("./site/AddSite"))
const SiteList = dynamic(() => import("./site/SiteList"))
const AddTheme = dynamic(() => import("./theme/AddTheme"))
const ThemeList = dynamic(() => import("./theme/ThemeList"))
const AddFeature = dynamic(() => import("./platform/AddFeature"))

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
