import NewsList from "./NewsList"

const NewsView = () => {
  return (
    <div className='flex w-full flex-col overflow-hidden rounded-lg border border-base-300 shadow-sm'>
      <h3 className='bg-base-200 p-5 text-xl font-semibold text-base-content'>News List</h3>
      <NewsList wrapperClassName='p-5 flex flex-col gap-3 items-stretch' />
    </div>
  )
}
export default NewsView
