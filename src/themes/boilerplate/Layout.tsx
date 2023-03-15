import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import cn from "classnames"
import { Poppins } from "@next/font/google"
import styles from "./styles/Layout.module.css"

interface ILayoutProps {
  domain: string
  children: React.ReactNode | React.ReactNode[]
}

//Fonts
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-primary",
})

const Layout = (props: ILayoutProps) => {
  return (
    <div className={cn(styles.container, poppins.className, "flex min-h-screen w-full flex-col")}>
      <Navbar domain={props.domain} />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
