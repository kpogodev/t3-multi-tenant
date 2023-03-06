import type { NextPage, GetServerSideProps } from "next"
import LoginForm from "components/auth/LoginForm"
import { getServerAuthSession } from "server/auth"

const SignIn: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#fafafa]' data-theme='fantasy'>
      <LoginForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (session) {
    return {
      redirect: {
        destination: session.user.role === ("ADMIN" || "DEV") ? "/admin" : "/cms",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default SignIn
