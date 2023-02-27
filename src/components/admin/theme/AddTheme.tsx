import AddThemeForm from "./AddThemeForm"
import Heading from "components/common/Heading"
import ThemeFormContextProvider from "../context/ThemeFormContext"

const AddTheme = () => {
  return (
    <div className='w-100 flex flex-col gap-3'>
      <Heading text='Add Theme' />
      <ThemeFormContextProvider>
        <AddThemeForm />
      </ThemeFormContextProvider>
    </div>
  )
}

export default AddTheme
