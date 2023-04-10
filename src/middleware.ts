import { type NextRequest, NextResponse } from "next/server"
import { fetchThemeName } from "utils/middlewareHelper"

const apexDomain = process.env.NODE_ENV === "development" ? "localhost:3000" : "kpwebdev.com"
const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|auth|cms|admin|sites|[\\w-]+\\.\\w+).*)"],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()
  const { pathname } = req.nextUrl
  const hostname = req.headers.get("host") as string

  const domain = hostname.includes(apexDomain) ? hostname.replace(`.${apexDomain}`, ".kpwebdev.com") : hostname

  if (domain.startsWith(apexDomain)) return NextResponse.next()

  const themeName = await fetchThemeName({ protocol, domain, apexDomain })

  if (!themeName) return NextResponse.rewrite(`${protocol}://${apexDomain}/404`)

  url.pathname = `/sites/${themeName}${pathname}`

  return NextResponse.rewrite(new URL(url))
}
