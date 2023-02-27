import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"

const ThemeNameInput = () => {
  const ctx = useContext(ThemeFormContext)
  return (
    <div className='form-control w-full'>
      <label className='label'>
        <span className='label-text'>Theme name</span>
      </label>
      <input
        type='text'
        placeholder='new-theme-name'
        className='input-bordered input w-full max-w-xs'
        value={ctx.themeName}
        onChange={ctx.onThemeNameChange}
      />
    </div>
  )
}
export default ThemeNameInput
