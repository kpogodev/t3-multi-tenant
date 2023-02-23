import Link from "next/link"
import { useContext } from "react"
import { HomepageContext } from "./context/HomepageContext"

const NavbarHome = () => {
  const ctx = useContext(HomepageContext)
  const pages = ctx.navData?.pages

  return (
    <nav className='navbar bg-slate-200 shadow-md'>
      <div className='flex-1'>
        <Link className='btn-ghost btn text-xl normal-case' href='/'>
          {ctx.navData?.name}
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal gap-1 px-1'>
          {pages &&
            pages.map((page) => (
              <li key={page.id}>
                <Link href={`/${page.slug}`}>{page.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}
export default NavbarHome
