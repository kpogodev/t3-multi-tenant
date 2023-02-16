import AddPages from "./AddPages"
import PageList from "./PageList"

const PagesView = () => {
  return (
    <div className='flex w-full flex-col gap-10'>
      <AddPages />
      <PageList />
    </div>
  )
}
export default PagesView
