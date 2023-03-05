import PlatformIcon from "components/icons/PlatformIcon"
import SignInButtonGithub from "./SignInButtonGithub"
import SignInButtonGoogle from "./SignInButtonGoogle"

export default function LoginForm() {
  return (
    <div className='flex w-full max-w-lg flex-col items-center gap-10 rounded-sm bg-white p-10 shadow-md'>
      <div className='flex items-center justify-center gap-4'>
        <PlatformIcon className='w-1/6' />
        <h2 className='text-4xl font-bold leading-none'>Web Platform</h2>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <SignInButtonGithub />
        <SignInButtonGoogle />
      </div>
    </div>
  )
}
