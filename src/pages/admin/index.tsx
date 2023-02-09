import AdminContextProvider from "../../components/admin/context/AdminContext"
import View from "../../components/admin/View"
import Header from "../../components/admin/Header"
import Sidebar from "../../components/admin/Sidebar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Admin = () => {
  return (
    <div className='grid w-full grid-cols-w-sidebar'>
      <AdminContextProvider>
        <>
          <Sidebar />
          <div className='flex min-h-screen w-full flex-col justify-start' data-theme='fantasy'>
            <Header />
            <View />
          </div>
        </>
      </AdminContextProvider>
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
  )
}
export default Admin
