import type { NextPage, GetServerSidePropsContext } from "next"
import PrefetchHomeData from "themes/st-nicholas-ps/utils/PrefetchHomeData"
import Homepage from "themes/st-nicholas-ps/homepage"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return PrefetchHomeData(context)
}

const Index: NextPage<{ domain: string }> = ({ domain }) => {
  return <Homepage domain={domain} />
}

export default Index
