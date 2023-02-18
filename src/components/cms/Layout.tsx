import { useContext } from "react"
import { CmsContext } from "../../components/cms/context/CmsContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import View from "./View"

const Layout = () => {
  const ctx = useContext(CmsContext)

  return (
    <div className='grid w-full grid-cols-w-sidebar' data-theme={ctx.darkTheme ? "luxury" : "light"}>
      <Sidebar />
      <div className='flex min-h-screen w-full flex-col justify-start'>
        <Navbar />
        <View />
      </div>
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
