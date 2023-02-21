import { type NextRequest, NextResponse } from "next/server"
import { fetchThemeName } from "./utils/middlewareHelper"

const apexDomain = process.env.NODE_ENV === "development" ? "localhost:3000" : "kpwebdev.com"
const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|auth|cms|admin|sites|[\\w-]+\\.\\w+).*)", "/"],
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const hostname = req.headers.get("host")
  const subDomain = hostname?.replace(`.${apexDomain}`, "") as string

  if(subDomain.length && !subDomain.startsWith(apexDomain)) {
    const themeName = await fetchThemeName({ protocol, subDomain, apexDomain })

    if (!themeName) {
      return NextResponse.rewrite(`${protocol}://${apexDomain}/404`)
    }

    console.log('Im here', `${protocol}://${apexDomain}/sites/${themeName}${pathname}`)

    if(process.env.NODE_ENV === "development") {
      return NextResponse.rewrite(`${protocol}://${apexDomain}/sites/${themeName}${pathname}`)
    } else {
        return NextResponse.rewrite(new URL(`/sites/${themeName}${pathname}`), req.url)
    }
  }

  return NextResponse.next()
}
