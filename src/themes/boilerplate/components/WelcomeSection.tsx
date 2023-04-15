import { useContext } from "react"
import { HomepageContext } from "../context/HomepageContext"
import Image from "next/image"
import Link from "next/link"

const WelcomeSection = () => {
  const { welcomeSection } = useContext(HomepageContext)

  // Data fallbacks
  const imageSrc = welcomeSection?.image?.secure_url ?? ""
  const linkUrl = welcomeSection?.linkUrl ? `/${welcomeSection?.linkUrl}` : "/"

  return (
    <div className='bg-slate-50 py-20 px-5'>
      <div className='mx-auto flex max-w-6xl items-center gap-20'>
        <div className='relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-xl'>
          <Image src={imageSrc} alt='Welcome Image' fill className='object-cover' />
        </div>
        <div className='flex flex-col items-start gap-10'>
          <h2 className='max-w-[14ch] text-5xl font-extrabold uppercase'>{welcomeSection?.header}</h2>
          <p className='max-w-[60ch] text-xl leading-relaxed'>{welcomeSection?.text}</p>
          <Link className='btn bg-sky-700' href={linkUrl}>
            {welcomeSection?.linkText}
          </Link>
        </div>
      </div>
    </div>
  )
}
export default WelcomeSection
