import { useContext } from "react"
import { AdminContext } from "components/admin/context/AdminContext"
import View from "components/admin/View"
import Navbar from "components/admin/Navbar"
import Sidebar from "components/admin/Sidebar"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const Layout = () => {
  const ctx = useContext(AdminContext)

  return (
    <div className='grid w-full grid-cols-w-sidebar' data-theme={ctx.darkTheme ? "luxury" : "light"}>
      <>
        <Sidebar />
        <div className='flex min-h-screen w-full flex-col justify-start'>
          <Navbar />
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
  )
}
export default Layout
