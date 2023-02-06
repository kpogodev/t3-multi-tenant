import PlatformIcon from "../icons/PlatformIcon"

const Sidebar = () => {
  return (
    <aside className='w-full bg-base-200 py-5 px-4'>
      <h2 className='text-xl font-bold flex items-center gap-3 mb-16'>
        <PlatformIcon className='w-16 block' /> Web Platform
      </h2>
    </aside>
  )
}
export default Sidebar