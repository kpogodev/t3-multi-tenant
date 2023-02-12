import type { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { getServerAuthSession } from "../../server/auth"
import AdminContextProvider from "../../components/admin/context/AdminContext"
import View from "../../components/admin/View"
import Header from "../../components/admin/Header"
import Sidebar from "../../components/admin/Sidebar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context)

  if (!session) {
    const refPath = context.req.url ?? "/"
    context.res.setHeader("Set-Cookie", `refPath=${refPath}; Path=${refPath}; HttpOnly`)

    return {
      redirect: {
        destination: "/auth/sign-in",
        permanent: false,
      },
    }
  }

  return {
    props: {
      userSession: session,
    },
  }
}

const Admin = ({ userSession }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <AdminContextProvider>
      <div className='grid w-full grid-cols-w-sidebar' data-theme='fantasy'>
        <>
          <Sidebar />
          <div className='flex min-h-screen w-full flex-col justify-start'>
            <Header />
            <View />
          </div>
        </>
        <ToastContainer
          position='bottom-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </AdminContextProvider>
  )
}

export default Admin
