import { useContext } from "react"
import { ThemeFormContext } from "../context/ThemeFormContext"

interface IFeatureBadge {
  name: string
  id: string
}
const FeatureBadge = ({ name, id }: IFeatureBadge) => {
  const ctx = useContext(ThemeFormContext)
  return (
    <div
      className='badge-secondary badge badge-lg cursor-grab'
      draggable
      onDragStart={(e) => ctx.onFeatureDragStart(e, id, name)}
    >
      {name}
    </div>
  )
}
export default FeatureBadge
