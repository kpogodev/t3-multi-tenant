import Link from "next/link"
import PlatformIcon from "components/icons/PlatformIcon"
import SidebarMenu from "./SidebarMenu"

const Sidebar = () => {
  return (
    <aside className='w-full bg-base-200 py-5 px-4 flex flex-col'>
      <Link href='/admin' className='text-xl font-bold flex items-center gap-3 mb-6'>
        <PlatformIcon className='w-16 block' /> Web Platform
      </Link>
      <SidebarMenu />
    </aside>
  )
}
export default Sidebar