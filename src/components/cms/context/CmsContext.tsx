import { createContext, useState, useCallback } from "react"
import { type Session } from "next-auth"
import { api } from "utils/api"
import { capitalizeString } from "utils/capitalizeString"

type UseCmsStateManagerResult = ReturnType<typeof useCmsStateManager>

export const CmsContext = createContext<UseCmsStateManagerResult>({} as UseCmsStateManagerResult)

const useCmsStateManager = (userId: string, session: Session) => {
  const [prevView, setPrevView] = useState<string>("default")
  const [currentView, setCurrentView] = useState<string>("default")
  const [currentPageId, setCurrentPageId] = useState<string>("")
  const [currentComponentId, setCurrentComponentId] = useState<string>("")
  const [currentNavHeader, setCurrentNavHeader] = useState<string>("")
  const [darkTheme, setDarkTheme] = useState<boolean>(false)

  const { data: site } = api.admin.site.getSiteByTenantId.useQuery(userId, { enabled: userId ? true : false })
  const { data: components } = api.cms.components.general.getComponents.useQuery(undefined, {
    enabled: userId ? true : false,
  })

  const changeCurrentPageId = useCallback((id: string) => {
    setCurrentPageId(id)
  }, [])

  const toggleDarkTheme = useCallback(() => {
    setDarkTheme((prev) => !prev)
  }, [])

  const changeView = (view: string, id?: string) => {
    setPrevView(currentView)
    setCurrentView(view)

    if (typeof id === "string") {
      setCurrentComponentId(id)
      setCurrentNavHeader(components?.find((component) => component.id === id)?.name ?? "")
    } else {
      setCurrentComponentId("")
      setCurrentNavHeader(capitalizeString(view.replaceAll("-", " ")))
    }
  }

  return {
    site,
    currentView,
    darkTheme,
    currentPageId,
    currentComponentId,
    currentNavHeader,
    prevView,
    components,
    session,
    changeView,
    toggleDarkTheme,
    changeCurrentPageId,
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
