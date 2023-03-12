import Link from "next/link"
import PlatformIcon from "components/icons/PlatformIcon"
import SidebarMenu from "./SidebarMenu"
import { useContext, useState, useRef, useEffect } from "react"
import { CmsContext } from "./context/CmsContext"
import cn from "classnames"
import useMediaQuery from "hooks/useMediaQuery"
import SidebarIcon from "components/icons/SidebarIcon"
import CancelIcon from "components/icons/CancelIcon"

const sidebarStateClasses = {
  sidebarMobile: "fixed top-0 left-0 h-screen z-[999] overflow-hidden",
  sidebarWhenMenuClosed: "pointer-events-none",
  sidebarWhenMenuOpen: "backdrop-brightness-50 pointer-events-auto",
  sidebarMenuIsClosed: "-translate-x-full",
  sidebarMenuIsOpen: "translate-x-0",
} as const

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const isLargeScreen = useMediaQuery("(min-width: 1280px)")

  const ctx = useContext(CmsContext)

  const sidebarRef = useRef<HTMLDivElement>(null)

  const siteComponets =
    ctx.components?.map((component) => ({ id: component.id, name: component.name, type: component.feature.type })) ?? []

  const handleClose = (e: React.SyntheticEvent<HTMLElement>) => {
    if (e.type === "keydown") {
      if ((e as React.KeyboardEvent<HTMLElement>).key !== "Escape") return
      setMenuOpen(false)
    } else {
      if (e.target !== sidebarRef.current) return
      setMenuOpen(false)
    }
  }

  return (
    <aside
      ref={sidebarRef}
      className={cn(
        !isLargeScreen && sidebarStateClasses.sidebarMobile,
        menuOpen && !isLargeScreen && sidebarStateClasses.sidebarWhenMenuOpen,
        !menuOpen && !isLargeScreen && sidebarStateClasses.sidebarWhenMenuClosed,
        "w-full transition-all"
      )}
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div
        className={cn(
          menuOpen && !isLargeScreen && sidebarStateClasses.sidebarMenuIsOpen,
          !menuOpen && !isLargeScreen && sidebarStateClasses.sidebarMenuIsClosed,
          "flex h-full w-full max-w-xs flex-col bg-base-200 py-5 px-4 transition-transform duration-300 ease-in-out"
        )}
      >
        {!isLargeScreen && (
          <button
            className='h-20 btn-secondary btn-square btn pointer-events-auto absolute top-0 left-full rounded-[0_0_20px_0] shadow-lg'
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <CancelIcon className='h-4 w-4' /> : <SidebarIcon className='h-6 w-6' />}
          </button>
        )}
        <Link href='/cms' className='mb-6 flex items-center gap-3 text-xl font-bold'>
          <PlatformIcon className='block w-16' />
          CMS
        </Link>
        <SidebarMenu
          menu={[
            {
              category: "Site",
              views: ["pages", "metadata"],
            },
            {
              category: "Components",
              views: siteComponets,
            },
          ]}
        />
      </div>
    </aside>
  )
}
export default Sidebar
