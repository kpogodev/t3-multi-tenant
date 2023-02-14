import AssociateTenantForm from "./AssociateTenantForm"
import Heading from "./Heading"

const AssociateTenant = () => {

  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Associate Tenant' />
      <AssociateTenantForm />
    </div>
  )
}
export default AssociateTenant
