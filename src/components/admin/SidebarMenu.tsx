import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import cn from 'classnames'

const adminMenuStructure = [
  {
    category: "Domains",
    views: ["domain-list", "add-domain"],
  },
  {
    category: "Sites",
    views: ["site-list", "add-site"],
  },
  {
    category: "Themes",
    views: ["theme-list", "add-theme"],
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

  console.log(ctx.currentView)

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
