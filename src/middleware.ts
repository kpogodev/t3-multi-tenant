import { type NextRequest, NextResponse, NextFetchEvent } from "next/server"

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)", "/"],
}

export default async function middleware(req: NextRequest, event: NextFetchEvent) {
  const url = req.nextUrl
  const hostname = req.headers.get("host")
  const path = url.pathname

  const currentHost = hostname?.replace(".localhost:3000", "") as string

  if (currentHost === "cms") {
    return NextResponse.rewrite(`http://localhost:3000/cms`)
  }

  if (currentHost === "admin") {
    return NextResponse.rewrite(`http://localhost:3000/admin`)
  }

  const themeName = await fetchThemeName(currentHost)

  if (!themeName) return NextResponse.rewrite(`http://localhost:3000/404`)

  return NextResponse.rewrite(`http://localhost:3000/sites/${themeName}`)
}


// Helper function to fetch the theme name from the database
async function fetchThemeName(domain: string) {
  const response = await fetch("http://localhost:3000/api/site", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(`${domain}.devtestingxyz.store`),
  })

  const {themeName} = await response.json() as {themeName: string}

  return themeName
}
