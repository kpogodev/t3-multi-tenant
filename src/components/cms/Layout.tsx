import { useContext } from "react"
import { CmsContext } from "components/cms/context/CmsContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Views from "./Views"

const Layout = () => {
  const ctx = useContext(CmsContext)

  return (
    <>
      <div className='w-full xl:grid xl:grid-cols-w-sidebar' data-theme={ctx.darkTheme ? "luxury" : "light"}>
        <Sidebar />
        <div className='flex min-h-screen w-full flex-col justify-start'>
          <Navbar />
          <Views />
        </div>
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
    </>
  )
}
export default Layout
