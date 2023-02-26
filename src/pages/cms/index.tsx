import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next"
import CmsContextProvider from "components/cms/context/CmsContext"
import Layout from "components/cms/Layout"
import { getServerAuthSession, type UserRole } from "server/auth"

interface getSSProps {
  userId: string
  role: UserRole
}

export const getServerSideProps: GetServerSideProps<getSSProps> = async (context) => {
  const session = await getServerAuthSession(context)

  const refPath = context.req.url ?? "/"
  context.res.setHeader("Set-Cookie", `refPath=${refPath}; HttpOnly`)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  return {
    props: {
      userId: session.user.id,
      role: session.user.role,
    },
  }
}

const CMS: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ userId, role }) => {
  return (
    <CmsContextProvider userId={userId}>
      <Layout />
    </CmsContextProvider>
  )
}

export default CMS
