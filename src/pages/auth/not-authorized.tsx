import type { NextPage, GetServerSideProps } from "next"
import Link from "next/link"
import { getServerAuthSession } from "server/auth"

const NotAuthorized: NextPage = () => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-2 bg-[#fafafa]' data-theme='fantasy'>
      <p className='text-center text-2xl font-bold'>
        Currently you are not authorized to access admin dashboard. Please try again when administrator grants you an
        access.
      </p>
      <Link className='link-primary' href='/'>
        Go back to home page
      </Link>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  if (session.user?.role === "DEV" || session.user?.role === "ADMIN") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export default NotAuthorized
