import FeatureBadge from "./FeatureBadge"
import type { FeatureType } from "@prisma/client"

const FeatureList = () => {
  const features: FeatureType[] = ["COMPOUND_BLOCK", "SLIDESHOW", "TEXT_BLOCK"]

  return (
    <div className='flex w-full max-w-xl flex-col gap-4'>
      <p className='text-lg'>Available Features:</p>
      <div className='flex flex-wrap gap-2'>
        {!!features ? (
          features.map((feature, index) => <FeatureBadge key={index} type={feature} />)
        ) : (
          <div className='badge badge-lg animate-pulse'>Loading...</div>
        )}
      </div>
    </div>
  )
}
export default FeatureList
