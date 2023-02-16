import { api } from "../../../utils/api"
import { useContext } from "react"
import { CmsContext } from "../context/CmsContext"
import PageIcon from "../../icons/PageIcon"

const capitalize = (s: string) => {
  return s
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

const PageList = () => {
  const ctx = useContext(CmsContext)
  const { data: pages } = api.cms.page.getPages.useQuery(ctx.site?.id ?? "")
  return (
    <div className='flex flex-wrap gap-4'>
      {pages?.map((page) => (
        <div
          className='relative z-0 flex h-[300px] grow flex-col items-center rounded-md bg-base-200 p-4 shadow-md'
          key={page.id}
        >
          <h3 className='text-center text-xl font-bold'>{capitalize(page.name)}</h3>
          <PageIcon className='opacity-30' />
          <div className='mt-auto flex w-full justify-center gap-2'>
            <button className='btn-primary btn-sm btn'>Edit</button>
            <button className='btn-error btn-sm btn'>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PageList
