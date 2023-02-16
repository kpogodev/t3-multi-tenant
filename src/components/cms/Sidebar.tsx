import Link from "next/link"
import PlatformIcon from "../icons/PlatformIcon"
import SidebarMenu from "./SidebarMenu"

const Sidebar = () => {
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
        ]}
      />
    </aside>
  )
}
export default Sidebar
