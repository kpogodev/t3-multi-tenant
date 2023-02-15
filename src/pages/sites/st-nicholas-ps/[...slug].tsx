import type { NextPage } from "next"
import { useRouter } from "next/router"

const Page: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return <div>Welcome to St. Nicholas Primary School Template - {slug?.length && slug[slug.length - 1]} page</div>
}
export default Page
