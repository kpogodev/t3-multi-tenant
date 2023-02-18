import { prisma } from "../server/db"

export const getSitePages = async (domainToCheck: string) => {
  const domain = process.env.NODE_ENV === "production" ? domainToCheck : domainToCheck.replace(".localhost:3000", ".kpwebdev.com")
  const pages = await prisma.page.findMany({
    where: {
      site: {
        domain: {
          name: domain
        }
      }
    }
  })
  return pages
}