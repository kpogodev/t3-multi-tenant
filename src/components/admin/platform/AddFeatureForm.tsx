import { useState } from "react"
import { toast } from "react-toastify"
import { api } from "utils/api"
import type { FeatureType } from "@prisma/client"

const AddFeatureForm = () => {
  const [featureName, setFeatureName] = useState<string>()

  const addFeature = api.admin.platform.addFeature.useMutation({
    onSuccess: () => {
      toast.success("Feature added")
      setFeatureName("")
    },
    onError: (err) => {
      toast.error(err.message)
    },
  })

  const onFeatureNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatureName(e.target.value.trim())
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!featureName) {
      return toast.error("Please enter a feature name")
    }

    const featureType = featureName.toUpperCase() as FeatureType

    addFeature.mutate({ name: featureName, type: featureType })
  }

  return (
    <form className='form-control flex w-full max-w-xs flex-col gap-3' onSubmit={onSubmit}>
      <div className='form-control w-full max-w-xs'>
        <label className='label'>
          <span className='label-text'>Feature Name</span>
        </label>
        <input
          type='text'
          placeholder='Type here'
          className='input-bordered input w-full max-w-xs'
          onChange={onFeatureNameChange}
        />
      </div>
      <button className='btn-primary btn mt-10' type='submit'>
        Add feature
      </button>
    </form>
  )
}
export default AddFeatureForm
