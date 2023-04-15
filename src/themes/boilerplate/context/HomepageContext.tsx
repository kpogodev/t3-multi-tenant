import { createContext } from "react"
import { api } from "utils/api"

type UseHomepageStateManagerResult = ReturnType<typeof useHomepageStateManager>

export const HomepageContext = createContext<UseHomepageStateManagerResult>({} as UseHomepageStateManagerResult)

const useHomepageStateManager = ({ domain }: IProviderProps["initialParams"]) => {
  const { data: videoBackground } = api.sites.video.getVideoByName.useQuery(
    { domain, name: "Homepage Video Background" },
    { enabled: !!domain }
  )
  return {
    videoBackground,
  }
}

interface IProviderProps {
  children: React.ReactNode | React.ReactNode[]
  initialParams: { domain: string }
}

export default function HomepageContextProvider({ children, initialParams }: IProviderProps) {
  return <HomepageContext.Provider value={useHomepageStateManager(initialParams)}>{children}</HomepageContext.Provider>
}
