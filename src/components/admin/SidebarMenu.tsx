import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import cn from 'classnames'

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
      {adminMenuStructure.map((item, index) => (
        <>
          <li className='menu-title' key={index}>
            <span>{item.category}</span>
          </li>
          {item.views.map((view, index) => (
            <li key={index}>
              <button className={cn({active: view === ctx.currentView})} onClick={handleClick} value={view}>{capitalize(view.replaceAll('-', ' '))}</button>
            </li>
          ))}
        </>
      ))}
    </ul>
  )
}
export default SidebarMenu
