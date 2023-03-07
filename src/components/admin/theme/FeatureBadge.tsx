import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"
import { capitalizeString } from "utils/capitalizeString"
import type { FeatureType } from "@prisma/client"

const FeatureBadge = ({ type }: { type: FeatureType }) => {
  const ctx = useContext(ThemeFormContext)
  return (
    <div
      className='badge-secondary badge badge-lg cursor-grab'
      draggable
      onDragStart={(e) => ctx.onFeatureDragStart({ e, type })}
    >
      {capitalizeString(type.toLocaleLowerCase().replace("_", " "))}
    </div>
  )
}
export default FeatureBadge
