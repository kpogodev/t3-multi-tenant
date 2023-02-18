import { api } from "../../../utils/api"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import PageCard from "./PageCard"

const PageList = () => {
  const ctx = useContext(CmsContext)
  const { data: pages } = api.cms.page.getPagesBySiteId.useQuery(ctx.site?.id ?? "")

  return (
    <div className='grid grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4'>
      {pages?.map((page) => (
        <PageCard key={page.id} id={page.id} name={page.name} />
      ))}
    </div>
  )
}
export default PageList
