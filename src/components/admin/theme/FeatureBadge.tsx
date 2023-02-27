import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"

interface IFeatureBadge {
  featureName: string
  featureId: string
  featureType: string
}
const FeatureBadge = ({ featureName, featureId, featureType }: IFeatureBadge) => {
  const ctx = useContext(ThemeFormContext)
  return (
    <div
      className='badge-secondary badge badge-lg cursor-grab'
      draggable
      onDragStart={(e) => ctx.onFeatureDragStart({e, featureId, featureName, featureType})}
    >
      {featureName}
    </div>
  )
}
export default FeatureBadge
