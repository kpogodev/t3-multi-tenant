import type { GetServerSideProps, NextPage } from "next"
import { getServerAuthSession } from "server/auth"
import AdminContextProvider from "components/admin/context/AdminContext"
import Layout from "components/admin/Layout"
import "react-toastify/dist/ReactToastify.css"

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

  const isDeveloper = session.user?.role === "DEV" || session.user?.role === "ADMIN"

  if (!isDeveloper) {
    return {
      redirect: {
        destination: "/auth/not-authorized",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

const Admin: NextPage = () => {
  return (
    <AdminContextProvider>
      <Layout />
    </AdminContextProvider>
  )
}

export default Admin
