import CheckMarkIcon from "components/icons/CheckMarkIcon"
import DeleteIcon from "components/icons/DeleteIcon"
import EditIcon from "components/icons/EditIcon"
import { useState, useContext } from "react"
import { toast } from "react-toastify"
import { ThemeFormContext } from "../context/ThemeFormContext"

interface ChosenFeaturesProps {
  id: string
  badge: string
  featureId: string
  featureType: string
}

const ChosenFeatures = ({ id, badge, featureId, featureType }: ChosenFeaturesProps) => {
  const [componentName, setComponentName] = useState<string>("")
  const [nameLocked, setNameLocked] = useState<boolean>(false)
  const ctx = useContext(ThemeFormContext)

  const handleCheckClick = () => {
    if (!componentName.length) {
      return toast.error("Component name cannot be empty")
    }
    if (!nameLocked) {
      ctx.onComponentUpdate({ name: componentName, featureId, featureType })
    }

    setNameLocked((prev) => !prev)
  }

  return (
    <div className='relative flex w-full items-end gap-1 rounded-md bg-base-100 p-3 shadow-md'>
      <div className='badge-secondary badge absolute right-2 top-2 font-semibold shadow-md'>{badge}</div>
      <div className='form-control w-full'>
        <label className='label'>
          <span className='label-text'>Name:</span>
        </label>
        <input
          type='text'
          className='input-bordered input flex-grow'
          value={componentName}
          onChange={(e) => setComponentName(e.target.value)}
          disabled={nameLocked}
        />
      </div>
      <button className='btn-accent btn-square btn' type='button' onClick={handleCheckClick}>
        {nameLocked ? <EditIcon className='h-4 w-4' /> : <CheckMarkIcon className='h-4 w-4' />}
      </button>
      <button className='btn-error btn-square btn' type='button' onClick={() => ctx.deleteChosenFeature(id, featureId)}>
        <DeleteIcon className='h-4 w-4' />
      </button>
    </div>
  )
}
export default ChosenFeatures
