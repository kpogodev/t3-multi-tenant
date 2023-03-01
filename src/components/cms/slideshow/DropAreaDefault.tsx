import UploadImageIcon from "components/icons/UploadImageIcon"

const DropAreaDefault = () => {
  return (
    <div className='pointer-events-none my-auto text-center'>
      <UploadImageIcon className='mx-auto h-12 w-12 opacity-60' />
      <div className='flex text-sm font-medium text-primary'>
        <p className='pl-1 text-xl'>Upload your photos</p>
      </div>
      <p className='text-sm opacity-80'>up to 10MB at once</p>
    </div>
  )
}
export default DropAreaDefault
