import { useState } from "react"
import { api } from "../../utils/api"
import { toast } from "react-toastify"

const AddThemeForm = () => {
  const [themeName, setThemeName] = useState<string>()

  const addTheme = api.theme.addTheme.useMutation()

  const onThemeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!themeName) return

    addTheme.mutate(
      { name: themeName },
      {
        onSuccess: () => {
          setThemeName("")
          toast.success("Theme added")
        },
      }
    )
  }

  return (
    <form className='form-control flex w-full max-w-xs flex-col gap-3' onSubmit={onSubmit}>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Theme name</span>
        </label>
        <input
          type='text'
          placeholder='Type here'
          className='input-bordered input w-full max-w-xs'
          onChange={onThemeNameChange}
        />
      </div>
      <button className='btn-primary btn mt-10' type='submit'>
        Add theme
      </button>
    </form>
  )
}
export default AddThemeForm
