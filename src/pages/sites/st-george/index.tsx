import type { NextPage, GetServerSidePropsContext } from "next"
import HomepageContextProvider from "../../../components/site/context/HomepageContext"
import NavbarHome from "../../../components/site/NavbarHome"
import PrefetchHomeData from "../../../utils/sites/PrefetchHomeData"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return PrefetchHomeData(context)
}

const Index: NextPage<{ domain: string }> = ({ domain }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      <NavbarHome />
      <h1 className='m-10 text-center text-4xl font-extrabold'>Welcome to St. George Template</h1>
    </HomepageContextProvider>
  )
}

export default Index
