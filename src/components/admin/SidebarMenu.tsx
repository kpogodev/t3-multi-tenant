import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import cn from "classnames"
import { generateRandomKey } from "../../utils/generateRandomKey"

const adminMenuStructure = [
  {
    category: "Domains",
    views: ["add-domain", "domain-list"],
  },
  {
    category: "Sites",
    views: ["add-site", "site-list"],
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

  const capitalize = (s: string) => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  return (
    <ul className='menu rounded-box w-full bg-base-100 p-2'>
      {adminMenuStructure.map((item) => (
        <>
          <li className='menu-title' key={generateRandomKey()}>
            <span>{item.category}</span>
          </li>
          {item.views.map((view) => (
            <li key={generateRandomKey()}>
              <button className={cn({ active: view === ctx.currentView })} onClick={handleClick} value={view}>
                {capitalize(view.replaceAll("-", " "))}
              </button>
            </li>
          ))}
        </>
      ))}
    </ul>
  )
}
export default SidebarMenu
