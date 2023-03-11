import type { GetServerSideProps, NextPage, InferGetServerSidePropsType } from "next"
import CmsContextProvider from "components/cms/context/CmsContext"
import Layout from "components/cms/Layout"
import { getServerAuthSession } from "server/auth"
import { prisma } from "server/db"
import { type Session } from "next-auth"

interface getSSProps {
  userId: string
  sessionData: Session
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

  if (!site) {
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
      sessionData: session,
    },
  }
}

const CMS: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({ userId, sessionData }) => {
  return (
    <CmsContextProvider userId={userId} session={sessionData}>
      <Layout />
    </CmsContextProvider>
  )
}

export default CMS
