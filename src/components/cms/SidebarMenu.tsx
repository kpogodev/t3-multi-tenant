import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import cn from "classnames"
import { generateRandomKey } from "../../utils/generateRandomKey"

interface SidebarMenuProps {
  menu: SidebarMenuItem[]
}

interface SidebarMenuItem {
  category: string
  views: string[]
}

const SidebarMenu = ({ menu }: SidebarMenuProps) => {
  const ctx = useContext(CmsContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    ctx.changeView(e.currentTarget.value)
  }

  const capitalize = (s: string) => {
    return s
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <ul className='menu rounded-box w-full bg-base-100 p-2'>
      {menu.map((item) => (
        <div key={generateRandomKey()}>
          <li className='menu-title'>
            <span>{item.category}</span>
          </li>
          {item.views.map((view) => (
            <li key={generateRandomKey()}>
              <button className={cn({ active: view === ctx.currentView })} onClick={handleClick} value={view}>
                {capitalize(view.replaceAll("-", " "))}
              </button>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
export default SidebarMenu
