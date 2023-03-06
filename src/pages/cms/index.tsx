import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next"
import CmsContextProvider from "components/cms/context/CmsContext"
import Layout from "components/cms/Layout"
import { getServerAuthSession, type UserRole } from "server/auth"
import { prisma } from "server/db"

interface getSSProps {
  userId: string
  role: UserRole
}

export const getServerSideProps: GetServerSideProps<getSSProps> = async (context) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  const site = await prisma.site.findFirst({
    where: {
      userId: session.user.id,
    },
  })

  if (!site || typeof site === "undefined") {
    return {
      redirect: {
        destination: "/cms/no-site",
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
