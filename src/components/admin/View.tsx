import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import DomainList from "./DomainList"
import AddDomain from "./AddDomain"
import AddSite from "./AddSite"
import AddTheme from "./AddTheme"
import SiteList from "./SiteList"
import ThemeList from "./ThemeList"
import AssociateTenant from "./AssociateTenant"

type ViewType = { [key: string]: JSX.Element }

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
  }

  return <main className='flex w-full flex-col gap-10 p-10'>{view[ctx.currentView]}</main>
}
export default View
