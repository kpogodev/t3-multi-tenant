import HomepageContextProvider from "./context/HomepageContext"
import SlideshowHomeMain from "./components/SlideshowHomeMain"
import Navbar from "components/site/Navbar"

const Homepage = ({ domain }: { domain: string }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      {/* Your Code */}
      <Navbar domain={domain} />
      <SlideshowHomeMain wrapperClassName='w-full min-h-[300px] h-[40vw]' />
    </HomepageContextProvider>
  )
}
export default Homepage
