import AddThemeForm from "./AddThemeForm"
import Heading from "components/common/Heading"

const AddTheme = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Add Theme' />
      <AddThemeForm />
    </div>
  )
}

export default AddTheme
