import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next"
import LoginForm from "../../components/auth/LoginForm"
import { getServerAuthSession } from "../../server/auth"

const SignIn = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-[#fafafa]' data-theme='fantasy'>
      <LoginForm />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (session) {
    const refPath = context.req.cookies.refPath?.length ? context.req.cookies.refPath : "/"
    context.res.setHeader("Set-Cookie", `refPath=; Path=/; HttpOnly`)

    return {
      redirect: {
        destination: refPath,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default SignIn
