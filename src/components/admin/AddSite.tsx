import AddSiteForm from "./AddSiteForm"
import Heading from "../common/Heading"

const AddSite = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Add Site' />
      <AddSiteForm />
    </div>
  )
}
export default AddSite
