import { type AppType } from "next/app"
import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { api } from "utils/api"

import "react-big-calendar/lib/css/react-big-calendar.css"
import "styles/globals.css"

const MyApp: AppType<{ session: Session | null }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <div id='modal-root' />
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
