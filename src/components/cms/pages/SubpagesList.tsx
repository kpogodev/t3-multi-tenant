import { api } from "utils/api"
import { useContext } from "react"
import SubpageCard from "./SubpageCard"
import { CmsContext } from "../context/CmsContext"

const SubpagesList = () => {
  const ctx = useContext(CmsContext)
  const { data: subpages } = api.cms.page.getSubpagesByPageId.useQuery(ctx.currentPageId)

  return (
    <div className='w-full'>
      <p className='mb-4'>
        Currently there is {subpages?.length} {subpages && subpages?.length > 1 ? "subpages" : "subpage"}
      </p>
      <div className='grid w-full grid-cols-[repeat(auto-fit,_minmax(240px,_1fr))] gap-4'>
        {subpages?.map((subpage) => (
          <SubpageCard key={subpage.id} id={subpage.id} name={subpage.name} />
        ))}
      </div>
    </div>
  )
}
export default SubpagesList
