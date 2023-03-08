import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import cn from "classnames"
import { generateRandomKey } from "utils/generateRandomKey"
import { capitalizeString } from "utils/capitalizeString"

interface SidebarMenuProps {
  menu: SidebarMenuItem[]
}

interface SidebarMenuItem {
  category: string
  views: string[] | SidebarMenuComponentItem[]
}

interface SidebarMenuComponentItem {
  id?: string
  name: string
  type: string
}

const SidebarMenu = ({ menu }: SidebarMenuProps) => {
  const ctx = useContext(CmsContext)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.dataset.id) {
      ctx.changeView(e.currentTarget.value, e.currentTarget.dataset.id)
      return
    }
    ctx.changeView(e.currentTarget.value)
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
              <button
                className={cn({ active: view === ctx.currentView })}
                onClick={handleClick}
                value={typeof view === "string" ? view : view.type.toLowerCase().replace("_", "-")}
                data-id={typeof view === "string" ? "" : view.id}
              >
                {typeof view === "string"
                  ? capitalizeString(view.replaceAll("-", " "))
                  : capitalizeString(view.name.replace("-", " "))}
              </button>
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
export default SidebarMenu
