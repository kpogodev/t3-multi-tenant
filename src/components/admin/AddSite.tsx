import AddSiteForm from "./AddSiteForm"
import Heading from "./Heading"

const AddSite = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Add Site' />
      <AddSiteForm />
    </div>
  )
}
export default AddSite
