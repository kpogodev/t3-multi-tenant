import type { NextPage, GetServerSidePropsContext } from "next"
import Layout from "themes/boilerplate/Layout"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {},
  }
}

const Index: NextPage<{ domain: string }> = ({ domain }) => {
  return (
    <Layout domain={domain}>
      <h1>News</h1>
    </Layout>
  )
}

export default Index
