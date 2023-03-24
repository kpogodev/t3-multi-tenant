import { useCallback, useState } from "react"
import { api } from "utils/api"
import PageCollapsable from "./PageCollapsable"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import type { DropResult, DroppableProvided } from "react-beautiful-dnd"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import { toast } from "react-toastify"

type PagesType = inferRouterOutputs<AppRouter>["cms"]["navigation"]["getNavigation"]

const NavigationList = () => {
  const [pages, setPages] = useState<PagesType>([])
  const [isDragging, setIsDragging] = useState(false)
  const client = api.useContext()

  // Get Initial Navigation Structure
  api.cms.navigation.getNavigation.useQuery(undefined, {
    onSuccess: (data) => {
      setPages(data.sort((a, b) => a.order - b.order))
    },
  })

  const { mutate: reorderPages } = api.cms.navigation.reorderPages.useMutation({
    onSuccess: () => {
      toast.success("Pages have been reordered")
      void client.cms.navigation.getNavigation.invalidate()
    },
  })

  const handleOnDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleOnDragEnd = (result: DropResult) => {
    setIsDragging(false)
    if (!result.destination || !result.source) return

    if (result.destination.droppableId === "page-list" && pages) {
      const items = [...pages]
      const [reorderedItem] = items.splice(result.source.index, 1)
      if (!reorderedItem) return
      items.splice(result.destination.index, 0, reorderedItem)
      items.forEach((item, index) => {
        item.order = index
      })
      setPages(items)
      reorderPages(items.map((item) => ({ pageId: item.id, newOrder: item.order })))
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
      <Droppable droppableId='page-list'>
        {(provided: DroppableProvided) => (
          <div className='flex flex-col gap-2' {...provided.droppableProps} ref={provided.innerRef}>
            {pages?.map((page, index) => (
              <PageCollapsable key={page.id} page={page} index={index} isDragging={isDragging} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
export default NavigationList
