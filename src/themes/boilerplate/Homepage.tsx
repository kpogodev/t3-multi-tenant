import VideoBackgroundHome from "./components/VideoBackgroundHome"
import WelcomeSection from "./components/WelcomeSection"
import HomepageContextProvider from "./context/HomepageContext"

const Homepage = ({ domain }: { domain: string }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      <VideoBackgroundHome />
      <div>
        <WelcomeSection />
      </div>
    </HomepageContextProvider>
  )
}
export default Homepage
