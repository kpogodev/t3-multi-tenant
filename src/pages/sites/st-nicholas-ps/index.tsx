import type { NextPage, GetServerSidePropsContext } from "next"
import HomepageContextProvider from "components/site/context/HomepageContext"
import Navbar from "components/site/Navbar"
import PrefetchHomeData from "utils/sites/PrefetchHomeData"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return PrefetchHomeData(context)
}

const Index: NextPage<{ domain: string }> = ({ domain }) => {
  return (
    <HomepageContextProvider initialParams={{ domain }}>
      {/* Your Code */}
      <Navbar domain={domain} />
      <h1 className='m-10 text-center text-4xl font-extrabold'>Welcome to St. Nicholas Primary School Template</h1>
    </HomepageContextProvider>
  )
}

export default Index
