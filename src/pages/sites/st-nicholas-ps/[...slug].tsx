import type { NextPage, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import PageNotFoundRedirectHelper from "../../../utils/PageNotFoundRedirectHelper"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // helper function to check if the route exists and return 404 if not
  return await PageNotFoundRedirectHelper(context, () => {
    return {
      props: {
        // props for your component
      },
    }
  })
}

const Page: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return <div>Welcome to St. Nicholas Primary School Template - {slug?.length && slug[slug.length - 1]} page</div>
}
export default Page
