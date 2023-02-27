import Heading from "components/common/Heading"
import AddFeatureForm from "./AddFeatureForm"

const AddFeature = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Add Feature' />
      <AddFeatureForm />
    </div>
  )
}
export default AddFeature
