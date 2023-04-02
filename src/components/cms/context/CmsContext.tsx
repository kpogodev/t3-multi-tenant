import { createContext, useState, useCallback } from "react"
import type { Session } from "next-auth"
import { api } from "utils/api"
import useCustomRouter from "hooks/useCustomRouter"
import { capitalizeString } from "utils/capitalizeString"

type UseCmsStateManagerResult = ReturnType<typeof useCmsStateManager>

export const CmsContext = createContext<UseCmsStateManagerResult>({} as UseCmsStateManagerResult)

const useCmsStateManager = (userId: string, session: Session) => {
  const { currentView, prevView, changeView } = useCustomRouter()
  const [darkTheme, setDarkTheme] = useState<boolean>(false)
  //Fetch essential data
  const { data: site } = api.admin.site.getSiteByTenantId.useQuery(userId, { enabled: !!userId })
  const { data: components, isLoading: componetsAreLoading } = api.cms.components.general.getComponents.useQuery(
    undefined,
    { enabled: !!userId }
  )

  const currentNavHeader = !currentView.id
    ? capitalizeString(currentView.view.replace("-", " "))
    : components?.find((c) => c.id === currentView.id)?.name ?? ""

  const toggleDarkTheme = useCallback(() => {
    setDarkTheme((prev) => !prev)
  }, [])

  return {
    site,
    currentView,
    darkTheme,
    currentNavHeader,
    componetsAreLoading,
    prevView,
    components,
    session,
    changeView,
    toggleDarkTheme,
  }
}

export default function CmsContextProvider({
  children,
  userId,
  session,
}: {
  children: React.ReactNode
  userId: string
  session: Session
}) {
  return <CmsContext.Provider value={useCmsStateManager(userId, session)}>{children}</CmsContext.Provider>
}
