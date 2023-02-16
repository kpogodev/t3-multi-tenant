import { api } from "../../../utils/api"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"

const PageList = () => {
  const ctx = useContext(CmsContext)
  const { data: pages } = api.cms.page.getPages.useQuery(ctx.site?.id ?? "")
  return (
    <div className='flex gap-2 p-10'>
      {pages?.map((page) => (
        <div className='badge-primary badge' key={page.id}>
          {page.name}
        </div>
      ))}
    </div>
  )
}
export default PageList
