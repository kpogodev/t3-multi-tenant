import VideoBackgroundHome from "./components/VideoBackgroundHome"
import HomepageContextProvider from "./context/HomepageContext"

const Homepage = ({ domain }: { domain: string }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      <VideoBackgroundHome />
    </HomepageContextProvider>
  )
}
export default Homepage
