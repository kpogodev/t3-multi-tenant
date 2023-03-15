import type { NextPage, GetServerSidePropsContext } from "next"
import PrefetchHomeData from "themes/boilerplate/utils/PrefetchHomeData"
import Layout from "themes/boilerplate/Layout"
import Homepage from "themes/boilerplate/Homepage"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return PrefetchHomeData(context)
}

const Index: NextPage<{ domain: string }> = ({ domain }) => {
  return (
    <Layout domain={domain}>
      <Homepage domain={domain} />
    </Layout>
  )
}

export default Index
