import { useCallback, useState } from "react"
import { api } from "utils/api"
import PageItem from "./PageItem"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import type { DropResult } from "react-beautiful-dnd"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

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

  // Mutate Page/Subpage Order
  const { mutate: reorderPages } = api.cms.navigation.reorderPages.useMutation({
    onSuccess: () => {
      toast.success("Navigation structure updated")
      void client.cms.navigation.getNavigation.invalidate()
    },
  })

  // Mutate Page/Subpage Parent
  const { mutate: movePage } = api.cms.navigation.movePage.useMutation({
    onSuccess: () => {
      toast.success("Navigation structure updated")
      void client.cms.navigation.getNavigation.invalidate()
    },
  })

  // Mutate Subapge to become a Page
  const { mutate: transformIntoPage } = api.cms.navigation.transformIntoPage.useMutation({
    onSuccess: () => {
      toast.success("Subpage successfuly transformed into a Page")
      void client.cms.navigation.getNavigation.invalidate()
    },
  })

  // Mutate Page to become a Subpage
  const { mutate: transformIntoSubpage } = api.cms.navigation.transformIntoSubpage.useMutation({
    onSuccess: () => {
      toast.success("Page successfuly transformed into a Subpage")
      void client.cms.navigation.getNavigation.invalidate()
    },
  })

  // Handle Reordering of Pages
  const handlePageReorder = (result: DropResult) => {
    if (!result.destination || !result.source) return
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

  // Handle Reordering of Subpages
  const handleSubpageReorder = (result: DropResult) => {
    if (!result.destination || !result.source) return
    const pageId = result.source.droppableId.split("-")[2]
    const page = pages?.find((page) => page.id === pageId)

    if (!page) return

    const items = [...page.children]
    const [reorderedItem] = items.splice(result.source.index, 1)

    if (!reorderedItem) return

    items.splice(result.destination.index, 0, reorderedItem)
    items.forEach((item, index) => {
      item.order = index
    })
    const newPages = pages?.map((page) => {
      if (page.id === pageId) {
        page.children = items
      }
      return page
    })
    setPages(newPages)
    reorderPages(items.map((item) => ({ pageId: item.id, newOrder: item.order })))
  }

  // Move Subpage to another Page
  const handleMoveSubpageToAnotherPage = (result: DropResult) => {
    if (!result.destination || !result.source) return
    const sourcePageId = result.source.droppableId.split("-")[2]
    const destinationPageId = result.destination.droppableId.split("-")[2]
    if (!sourcePageId || !destinationPageId) return

    const sourcePage = pages?.find((page) => page.id === sourcePageId)
    const destinationPage = pages?.find((page) => page.id === destinationPageId)

    if (!sourcePage || !destinationPage) return

    const sourceItems = [...sourcePage.children]
    const destinationItems = [...destinationPage.children]
    const [movedItem] = sourceItems.splice(result.source.index, 1)

    if (!movedItem) return

    const updatedMovedItem = {
      ...movedItem,
      parentId: destinationPageId,
    }

    destinationItems.splice(result.destination.index, 0, updatedMovedItem)

    sourceItems.forEach((item, index) => {
      item.order = index
    })
    destinationItems.forEach((item, index) => {
      item.order = index
    })

    const newPages = pages?.map((page) => {
      if (page.id === sourcePageId) {
        page.children = sourceItems
      }
      if (page.id === destinationPageId) {
        page.children = destinationItems
      }
      return page
    })

    movePage({ pageId: movedItem.id, newParentId: destinationPageId })
    setPages(newPages)
  }

  // Transform Subpage into a top level Page
  const handleTransformIntoPage = (result: DropResult) => {
    if (!result.destination || !result.source) return
    const sourcePageId = result.source.droppableId.split("-")[2]
    const sourcePage = pages?.find((page) => page.id === sourcePageId)

    if (!sourcePage) return

    const sourceItems = [...sourcePage.children]
    const [movedItem] = sourceItems.splice(result.source.index, 1)
    if (!movedItem) return

    sourceItems.forEach((item, index) => {
      item.order = index
    })

    const newParentChildren = sourceItems.map((item) => {
      return { pageId: item.id, newOrder: item.order }
    })

    transformIntoPage({ pageId: movedItem.id, parentChildren: newParentChildren, newOrder: pages.length })
  }

  // Transform Page into a Subpage
  const handleTransformIntoSubpage = (result: DropResult) => {
    if (!result.combine) return
    const newParentPage = pages?.find((page) => page.id === result.combine?.draggableId)
    if (!newParentPage) return

    const sourceItems = [...pages]
    const [movedItem] = sourceItems.splice(result.source.index, 1)

    if (!movedItem) return
    if (movedItem.children.length > 0) return toast.error("Cannot transform a page with subpages into a subpage")

    sourceItems.forEach((item, index) => {
      item.order = index
    })

    const updatedPages = sourceItems.map((item) => ({ pageId: item.id, newOrder: item.order }))

    transformIntoSubpage({
      pageId: movedItem.id,
      newParentId: newParentPage.id,
      newOrder: newParentPage.children.length,
      pages: updatedPages,
    })
  }

  // Event Handlers
  const handleOnDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleOnDragEnd = (result: DropResult) => {
    setIsDragging(false)

    if (result.combine) return handleTransformIntoSubpage(result)

    if (!result.destination || !result.source) return

    if (result.destination.droppableId === "page-list" && pages) return handlePageReorder(result)

    if (result.source.droppableId.startsWith("subpage-list")) {
      if (result.source.droppableId === result.destination.droppableId) return handleSubpageReorder(result)

      if (result.destination.droppableId.startsWith("subpage-list")) return handleMoveSubpageToAnotherPage(result)

      if (result.destination.droppableId === "pop-subpage") return handleTransformIntoPage(result)
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd} onDragStart={handleOnDragStart}>
      <div>
        <Droppable droppableId='page-list' type='PAGES' isCombineEnabled={true}>
          {(provided, snapshot) => (
            <motion.div
              className='flex flex-col gap-2'
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "rgba(0,0,0,0.1)" : "transparent",
              }}
              layout
            >
              {pages?.map((page, index) => (
                <PageItem key={page.id} page={page} index={index} isDragging={isDragging} />
              ))}
              {provided.placeholder}
            </motion.div>
          )}
        </Droppable>
        <Droppable droppableId='pop-subpage' type='SUBPAGES'>
          {(provided, snapshot) => (
            <div
              className='relative z-0 mt-2 h-[60px] w-full border-2 border-dashed border-base-300'
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                background: snapshot.isDraggingOver ? "rgba(0,0,0,0.1)" : "transparent",
              }}
            >
              <span className='absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-semibold italic text-base-content'>
                Drop Subpage here to transfrom it into Page
              </span>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  )
}
export default NavigationList
