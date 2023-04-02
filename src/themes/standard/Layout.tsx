import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import cn from "classnames"
import { Merriweather } from "@next/font/google"
import styles from "./styles/Layout.module.css"

interface ILayoutProps {
  domain: string
  children: React.ReactNode | React.ReactNode[]
}

//Fonts
const merri = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-primary",
})

const Layout = (props: ILayoutProps) => {
  return (
    <div className={cn(styles.container, merri.className, "flex min-h-screen w-full flex-col")}>
      <Navbar domain={props.domain} />
      {props.children}
      <Footer />
    </div>
  )
}

export default Layout
