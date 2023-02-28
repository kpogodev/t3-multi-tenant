import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"
import ChosenFeatureList from "./ChosenFeatureList"
import FeatureList from "./FeatureList"
import ThemeNameInput from "./ThemeNameInput"
import WarningBlock from "./WarningBlock"

const AddThemeForm = () => {
  const ctx = useContext(ThemeFormContext)
  return (
    <form className='form-control flex w-full flex-col items-start gap-5' onSubmit={ctx.onThemeSubmit}>
      <WarningBlock />
      <ThemeNameInput />
      <FeatureList />
      <ChosenFeatureList />
      <button className='btn-primary btn mt-5' type='submit'>
        Add theme
      </button>
    </form>
  )
}
export default AddThemeForm
