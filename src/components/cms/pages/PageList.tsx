import { api } from "utils/api"
import PageCard from "./PageCard"

const PageItem = () => {
  const { data: pages } = api.cms.page.getPagesBySiteId.useQuery()

  return (
    <div className='grid grid-cols-[repeat(auto-fill,_minmax(240px,_1fr))] gap-4'>
      {pages?.map((page) => (
        <PageCard key={page.id} id={page.id} name={page.name} />
      ))}
    </div>
  )
}
export default PageItem
