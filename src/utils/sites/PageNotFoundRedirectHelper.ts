import { prisma } from "server/db"
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next"

const PageNotFoundRedirectHelper = async (
  context: GetServerSidePropsContext,
  cb: () => Promise<GetServerSidePropsResult<{ [key: string]: unknown }>>
) => {
  if (
    typeof context.params === "undefined" ||
    typeof context.params.slug === "undefined" ||
    typeof context.req.headers.host === "undefined"
  )
    return { notFound: true }

  const hostDomain = context.req.headers.host
  const domainToCheck =
    process.env.NODE_ENV === "production" ? hostDomain : hostDomain.replace(".localhost:3000", ".kpwebdev.com")

  const siteSlugs = await prisma.page.findMany({
    where: {
      site: {
        domain: {
          name: domainToCheck,
        },
      },
    },
    select: {
      slug: true,
      children: true,
      special: true,
    },
  })

  const { slug } = context.params
  const formattedSlug = [...slug].join("/")

  const formattedSiteRouts = [
    ...siteSlugs.map((page) => page.slug),
    ...siteSlugs.map((page) => page.children.map((child) => `${page.slug}/${child.slug}`)).flat(),
  ]

  if (!formattedSiteRouts.includes(formattedSlug)) return { notFound: true }

  return cb()
}

export default PageNotFoundRedirectHelper