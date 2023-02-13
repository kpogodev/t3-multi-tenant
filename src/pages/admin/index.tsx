import type { GetServerSideProps, NextPage } from "next"
import { getServerAuthSession } from "../../server/auth"
import AdminContextProvider from "../../components/admin/context/AdminContext"
import "react-toastify/dist/ReactToastify.css"
import Layout from "../../components/admin/Layout"

export const getServerSideProps: GetServerSideProps = async (context) => {
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
