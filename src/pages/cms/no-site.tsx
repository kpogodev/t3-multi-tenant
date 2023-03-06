import type { GetServerSidePropsContext, NextPage } from "next"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { getServerAuthSession } from "server/auth"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const NoSite: NextPage = () => {
  return (
    <div className='grid h-screen w-full place-items-center p-5'>
      <div className='flex flex-col items-center gap-4'>
        <Image width={200} height={200} src='/no-site.svg' alt='No Website' />
        <p className='max-w-[60ch] text-center text-xl font-bold'>
          It looks like you don&apos;t have any website associated with your account yet. Please contact your
          administrator to get started.
        </p>
        <button className='btn-accent btn' onClick={() => void signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
export default NoSite
