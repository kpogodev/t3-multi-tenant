import { createContext, useState, useCallback } from "react"
// import { useSession } from "next-auth/react"
import { api } from "utils/api"

type UseCmsStateManagerResult = ReturnType<typeof useCmsStateManager>

export const CmsContext = createContext<UseCmsStateManagerResult>({} as UseCmsStateManagerResult)

const useCmsStateManager = (userId: string) => {
  const [prevView, setPrevView] = useState<string>("default")
  const [currentView, setCurrentView] = useState<string>("default")
  const [currentPageId, setCurrentPageId] = useState<string>("")
  const [currentComponentId, setCurrentComponentId] = useState<string>("")
  const [darkTheme, setDarkTheme] = useState<boolean>(false)


  const { data: site } = api.admin.site.getSiteByTenantId.useQuery(userId, { enabled: userId ? true : false })
  const { data: components } = api.cms.components.getComponents.useQuery(undefined, { enabled: userId ? true : false })

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
    } else {
      setCurrentComponentId("")
    }
    return
  }

  return {
    site,
    currentView,
    darkTheme,
    currentPageId,
    currentComponentId,
    prevView,
    components,
    changeView,
    toggleDarkTheme,
    changeCurrentPageId,
  }
}

export default function CmsContextProvider({ children, userId }: { children: React.ReactNode; userId: string }) {
  return <CmsContext.Provider value={useCmsStateManager(userId)}>{children}</CmsContext.Provider>
}
