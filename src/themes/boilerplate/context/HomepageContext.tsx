import { createContext } from "react"
import { api } from "utils/api"

type UseHomepageStateManagerResult = ReturnType<typeof useHomepageStateManager>

export const HomepageContext = createContext<UseHomepageStateManagerResult>({} as UseHomepageStateManagerResult)

const useHomepageStateManager = ({ domain }: IProviderProps["initialParams"]) => {
  // Fetch Homepage Video Background
  const { data: videoBackground } = api.sites.video.getVideoByName.useQuery(
    { domain, name: "Homepage Video Background" },
    { enabled: !!domain }
  )

  // Fetch Welcome Section
  const { data: welcomeSection } = api.sites.compound.getCompoundByName.useQuery(
    {
      domain,
      name: "Welcome Section",
    },
    { enabled: !!domain }
  )

  return {
    videoBackground,
    welcomeSection,
  }
}

interface IProviderProps {
  children: React.ReactNode | React.ReactNode[]
  initialParams: { domain: string }
}

export default function HomepageContextProvider({ children, initialParams }: IProviderProps) {
  return <HomepageContext.Provider value={useHomepageStateManager(initialParams)}>{children}</HomepageContext.Provider>
}
