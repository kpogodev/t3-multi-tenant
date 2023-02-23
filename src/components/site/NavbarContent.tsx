import Link from "next/link"
import { useContext } from "react"
import { ContentPageContext } from "./context/ContentPageContext"

const NavbarContent = () => {
  const ctx = useContext(ContentPageContext)
  const pages = ctx.navData?.pages

  return (
    <nav className='navbar bg-slate-200 shadow-md'>
      <div className='flex-1'>
        <Link className='btn-ghost btn text-xl normal-case' href='/'>
          St Nicholas PS
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
export default NavbarContent
