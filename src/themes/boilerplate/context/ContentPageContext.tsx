import { createContext } from "react"
import { api } from "utils/api"

type UseContentPageStateManagerResult = ReturnType<typeof useContentPageStateManager>

export const ContentPageContext = createContext<UseContentPageStateManagerResult>(
  {} as UseContentPageStateManagerResult
)

const useContentPageStateManager = ({ slug, domain }: IProviderProps["initialParams"]) => {
  const { data: pageData } = api.sites.content.getPageContent.useQuery(
    { pageSlug: slug, domain },
    { enabled: !!domain || !!slug }
  )

  const { data: slideshowContenentPage } = api.sites.slideshow.getSlideshowByName.useQuery(
    { domain, name: "Content Page Slideshow" },
    {
      enabled: !!domain,
    }
  )

  const { data: news } = api.sites.news.getNews.useQuery({ domain, limit: 20 }, { enabled: !!domain })

  return {
    slideshowContenentPage,
    pageData,
    news,
  }
}

interface IProviderProps {
  children: React.ReactNode | React.ReactNode[]
  initialParams: { slug: string | string[]; domain: string }
}

export default function ContentPageContextProvider({ children, initialParams }: IProviderProps) {
  return (
    <ContentPageContext.Provider value={useContentPageStateManager(initialParams)}>
      {children}
    </ContentPageContext.Provider>
  )
}
