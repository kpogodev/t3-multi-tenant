import { useState } from "react"

type ViewType = {
  view: string
  id?: string
}

const useCustomRouter = () => {
  const [prevView, setPrevView] = useState<ViewType>({ view: "default" })
  const [currentView, setCurrentView] = useState<ViewType>({ view: "default" })

  const changeView = ({ view, id }: ViewType) => {
    setPrevView(currentView)
    setCurrentView({ view, id })
  }

  return { prevView, currentView, changeView }
}

export default useCustomRouter
