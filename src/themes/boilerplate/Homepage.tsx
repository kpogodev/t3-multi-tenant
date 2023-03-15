import HomepageContextProvider from "./context/HomepageContext"
import SlideshowHomeMain from "./components/SlideshowHomeMain"

const Homepage = ({ domain }: { domain: string }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      <SlideshowHomeMain wrapperClassName='w-full min-h-[300px] h-[40vw]' />
    </HomepageContextProvider>
  )
}
export default Homepage
