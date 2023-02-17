import type { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"
import { getSitePages } from "../../../utils/getSitePages"

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const slug = context.params?.slug
  const hostDomain = context.req.headers.host

  if (!hostDomain) return { notFound: true }
  const sitePages = await getSitePages(hostDomain)
  const existingSlugs = sitePages.map((page) => page.slug)

  if (slug && !existingSlugs.includes([...slug].join("/"))) return { notFound: true }

  return {
    props: {
      slug,
    },
  }
}

const Page: NextPage = () => {
  const router = useRouter()
  const { slug } = router.query
  return <div>Welcome to St. Nicholas Primary School Template - {slug?.length && slug[slug.length - 1]} page</div>
}
export default Page
