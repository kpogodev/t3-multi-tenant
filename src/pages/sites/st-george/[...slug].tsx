import type { NextPage } from "next"
import { useRouter } from "next/router"

const Page: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return <div>Welcome to St. George Template - {slug?.length && slug[slug.length - 1]}</div>
}
export default Page
