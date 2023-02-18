import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import cn from "classnames"
import { generateRandomKey } from "../../utils/generateRandomKey"
import { capitalizeString } from "../../utils/capitalizeString"

const adminMenuStructure = [
  {
    category: "Domains",
    views: ["add-domain", "domain-list"],
  },
  {
    category: "Sites",
    views: ["add-site", "associate-tenant", "site-list"],
  },
  {
    category: "Themes",
    views: ["add-theme", "theme-list"],
  },
] as const

const SidebarMenu = () => {
  const ctx = useContext(AdminContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ctx.changeView(e.currentTarget.value)
  }

  return (
    <ul className='menu rounded-box w-full bg-base-100 p-2'>
      {adminMenuStructure.map((item) => (
        <div key={generateRandomKey()}>
          <li className='menu-title'>
            <span>{item.category}</span>
          </li>
          {item.views.map((view) => (
            <li key={generateRandomKey()}>
              <button className={cn({ active: view === ctx.currentView })} onClick={handleClick} value={view}>
                {capitalizeString(view.replaceAll("-", " "))}
              </button>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
export default SidebarMenu
