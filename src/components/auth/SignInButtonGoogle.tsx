import { signIn } from "next-auth/react"
import GoogleIcon from "components/icons/GoogleIcon"

export default function SignInButtonGoogle() {
  return (
    <button onClick={() => void signIn("google")} className='btn-primary btn gap-2'>
      <GoogleIcon className='h-6 w-6' />
      Sign in with Google
    </button>
  )
}
