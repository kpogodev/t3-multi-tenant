import { createContext, useState, useCallback } from "react"

type UseAdminStateManagerResult = ReturnType<typeof useAdminStateManager>

export const AdminContext = createContext<UseAdminStateManagerResult>({} as UseAdminStateManagerResult)

const useAdminStateManager = () => {
  const [currentView, setCurrentView] = useState<string>("default")
  const [darkTheme, setDarkTheme] = useState<boolean>(false)

  const changeView = useCallback((view: string) => {
    setCurrentView(view)
  }, [])

  const toggleDarkTheme = useCallback(() => {
    console.log("toggleDarkTheme")
    setDarkTheme((prev) => !prev)
  }, [])

  return {
    darkTheme,
    currentView,
    changeView,
    toggleDarkTheme,
  }
}

export default function AdminContextProvider({ children }: { children: React.ReactNode }) {
  return <AdminContext.Provider value={useAdminStateManager()}>{children}</AdminContext.Provider>
}
