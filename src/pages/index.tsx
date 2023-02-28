import type { NextPage } from "next"
import Link from "next/link"

const Homepage: NextPage = () => {
  return (
    <div className='grid min-h-screen animate-[gradientAnim_20s_ease_infinite] place-items-center bg-gradient-to-r from-[#000428] to-[#333] bg-[length:400%_400%]'>
      <div className='flex flex-col justify-end gap-10 rounded-lg bg-[rgba(255,255,255,0.05)] p-20 backdrop-blur-sm shadow-lg'>
        <p className='text-4xl font-bold text-white'>Welcome To KPDEV Platform</p>
        <div className='flex justify-end gap-4'>
          <Link href='/admin' className='btn-outline btn text-[#fafafa]'>
            Go To Admin
          </Link>
          <Link href='/cms' className='btn-outline btn text-[#fafafa]'>
            Go To CMS
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Homepage
