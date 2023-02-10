import { type NextRequest, NextResponse } from "next/server"
import { fetchThemeName } from "./utils/middlewareHelper"

const apexDomain = process.env.NODE_ENV === "development" ? "localhost:3000" : "devtestingxyz.store"
const protocol = process.env.NODE_ENV === "development" ? "http" : "https"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)", "/"],
}

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host")
  const currentHost = hostname?.replace(`.${apexDomain}`, "") as string

  if (currentHost === "cms") {
    return NextResponse.rewrite(`${protocol}://${apexDomain}/cms`)
  }

  if (currentHost === "admin") {
    return NextResponse.rewrite(`${protocol}://${apexDomain}/admin`)
  }

  const themeName = await fetchThemeName({ domain: currentHost, protocol, apexDomain })

  if (!themeName) return NextResponse.rewrite(`${protocol}://${apexDomain}/404`)

  return NextResponse.rewrite(`${protocol}://${apexDomain}/sites/${themeName}`)
}

