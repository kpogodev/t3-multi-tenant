import Link from "next/link"
import PlatformIcon from "components/icons/PlatformIcon"
import SidebarMenu from "./SidebarMenu"
import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"

const Sidebar = () => {
  const ctx = useContext(CmsContext)
  const siteComponets =
    ctx.components?.map((component) => ({ id: component.id, name: component.name, type: component?.type ?? "" })) ?? []

  return (
    <aside className='flex w-full flex-col bg-base-200 py-5 px-4'>
      <Link href='/admin' className='mb-6 flex items-center gap-3 text-xl font-bold'>
        <PlatformIcon className='block w-16' /> Web Platform - CMS
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
    </aside>
  )
}
export default Sidebar
