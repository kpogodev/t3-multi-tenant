import PlatformIcon from "../icons/PlatformIcon"
import SignInButtonGithub from "./SignInButtonGithub"

export default function LoginForm() {
  return (
    <div className='w-full max-w-lg p-10 shadow-md rounded-sm bg-white flex flex-col items-center gap-10'>
      <div className='flex gap-4 items-center justify-center'>
        <PlatformIcon className='w-1/6' />
        <h2 className='text-4xl font-bold leading-none'>CMS Platform</h2>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <SignInButtonGithub />
      </div>
    </div>
  )
}
