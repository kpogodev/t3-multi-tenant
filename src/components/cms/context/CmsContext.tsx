import { createContext, useState, useCallback } from "react"
import { useSession } from "next-auth/react"
import { api } from "../../../utils/api"

type UseCmsStateManagerResult = ReturnType<typeof useCmsStateManager>

export const CmsContext = createContext<UseCmsStateManagerResult>({} as UseCmsStateManagerResult)

const useCmsStateManager = (userId: string) => {
  const [currentView, setCurrentView] = useState<string>("default")
  const [darkTheme, setDarkTheme] = useState<boolean>(false)

  const { data: session } = useSession()

  const { data:site } = api.admin.site.getSiteByTenantId.useQuery(userId)

  const changeView = useCallback((view: string) => {
    setCurrentView(view)
  }, [])

  const toggleDarkTheme = useCallback(() => {
    setDarkTheme((prev) => !prev)
  }, [])

  return {
    site,
    currentView,
    darkTheme,
    changeView,
    toggleDarkTheme,
  }
}

export default function CmsContextProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  return <CmsContext.Provider value={useCmsStateManager(userId)}>{children}</CmsContext.Provider>
}
