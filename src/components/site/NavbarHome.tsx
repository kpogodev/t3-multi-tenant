import Link from "next/link"
import { useContext } from "react"
import { HomepageContext } from "./context/HomepageContext"

const NavbarHome = () => {
  const { navigation } = useContext(HomepageContext)

  return (
    <nav className='navbar bg-slate-200 shadow-md'>
      <div className='flex-1'>
        <Link className='btn-ghost btn text-xl normal-case' href='/'>
          Test Page
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal gap-1 px-1'>
          {!!navigation &&
            navigation.map((page) => (
              <li key={page.id}>
                <Link href={`/${page.slug}`}>{page.name}</Link>
                {page.children.length > 0 && (
                  <ul className='bg-base-100 p-2 shadow-md'>
                    {page.children.map((child) => (
                      <li key={child.id}>
                        <Link href={`/${child.slug}`}>{child.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </nav>
  )
}
export default NavbarHome
