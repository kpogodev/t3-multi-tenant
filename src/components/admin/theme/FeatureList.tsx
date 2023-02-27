import { api } from "utils/api"
import FeatureBadge from "./FeatureBadge"

const FeatureList = () => {
  const { data: features } = api.admin.platform.getFeatures.useQuery()

  return (
    <div className='flex w-full max-w-xl flex-col gap-4'>
      <p className='text-lg'>Available Features:</p>
      <div className='flex flex-wrap gap-2'>
        {!!features ? (
          features.map((feature) => <FeatureBadge key={feature.id} name={feature.name} id={feature.id} />)
        ) : (
          <div className='badge badge-lg animate-pulse'>Loading...</div>
        )}
      </div>
    </div>
  )
}
export default FeatureList
