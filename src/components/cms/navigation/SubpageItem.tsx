import type { inferRouterOutputs } from "@trpc/server"
import { Draggable } from "react-beautiful-dnd"
import type { AppRouter } from "server/api/root"

type SubpageType = inferRouterOutputs<AppRouter>["cms"]["navigation"]["getNavigation"][0]["children"][0]

interface SubpageItemProps {
  child: SubpageType
  index: number
}

const SubpageItem = ({ child, index }: SubpageItemProps) => {
  return (
    <Draggable draggableId={child.id} index={index} key={child.id}>
      {(provided) => (
        <div
          className='rounded-lg border border-base-300 bg-base-100 p-2 shadow-md transition-[filter] hover:brightness-90'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            ...provided.draggableProps.style,
          }}
        >
          <h3>{child.name}</h3>
        </div>
      )}
    </Draggable>
  )
}
export default SubpageItem
