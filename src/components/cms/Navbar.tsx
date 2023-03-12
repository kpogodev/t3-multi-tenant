import { useContext } from "react"
import { CmsContext } from "./context/CmsContext"
import { signOut } from "next-auth/react"
import Image from "next/image"
import LightModeIcon from "components/icons/LightModeIcon"
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import DarkModeIcon from "components/icons/DarkModeIcon"

const Navbar = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='navbar bg-primary pr-5 pl-14 xl:px-10'>
      <div className='flex-1'>
        <h2 className='text-xl font-bold text-primary-content'>{ctx.currentNavHeader}</h2>
      </div>
      <div className='flex-none'>
        <div className='form-control px-2'>
          <label className='label flex cursor-pointer gap-2 text-primary-content'>
            <LightModeIcon className='h-6 w-6' />
            <input type='checkbox' className='toggle' onInput={() => void ctx.toggleDarkTheme()} />
            <DarkModeIcon className='h-6 w-6' />
          </label>
        </div>
        <div className='dropdown-end dropdown'>
          <label tabIndex={0} className='btn-ghost btn-circle avatar btn'>
            <div className='w-10 rounded-full'>
              <Image src={ctx.session?.user.image ?? "/avatar-fallback.png"} alt='' width={40} height={40} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow-lg'
          >
            <li>
              <button onClick={() => void signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Navbar
