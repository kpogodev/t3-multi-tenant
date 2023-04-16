import { useState } from "react"
import { motion } from "framer-motion"
import ArrowDownIcon from "components/icons/ArrowDownIcon"
import cn from "classnames"
import { Draggable, Droppable } from "react-beautiful-dnd"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"
import SubpageItem from "./SubpageItem"

type PageType = inferRouterOutputs<AppRouter>["cms"]["navigation"]["getNavigation"][0]

interface PageCollapsableProps {
  page: PageType
  index: number
  isDragging: boolean
}

const PageCollapsable = ({ page, index, isDragging }: PageCollapsableProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Draggable draggableId={page.id} index={index} isDragDisabled={isOpen}>
      {(provided, snapshot) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <motion.div
            className={cn(
              snapshot.combineTargetFor ? "bg-base-200" : "bg-base-100",
              isOpen ? "border-info" : "border-base-300",
              "rounded-lg border transition-colors"
            )}
            layout={!isDragging}
            initial={{ boxShadow: "1px 2px 6px rgba(0,0,0,0.08)", borderRadius: "0.5rem" }}
          >
            <motion.div layout={!isDragging ? "position" : false} className='flex w-full justify-between p-3'>
              <motion.h3 className='font-semibold' layout={!isDragging ? "position" : false}>
                {page.name}
              </motion.h3>
              <motion.button
                layout={!isDragging ? "position" : false}
                className='btn-primary btn-xs btn-circle btn'
                onClick={handleToggle}
              >
                <ArrowDownIcon
                  className={cn(isOpen ? "rotate-180" : "rotate-0", "h-3 w-3 origin-center transition-transform")}
                />
              </motion.button>
            </motion.div>
            {isOpen && (
              <Droppable droppableId={`subpage-list-${page.id}`} type='SUBPAGES'>
                {(provided, snapshot) => (
                  <motion.div
                    layout={!isDragging}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className='flex flex-col gap-2 p-3'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={{
                      background: snapshot.isDraggingOver ? "rgba(0,0,0,0.1)" : "transparent",
                    }}
                  >
                    {page.children?.map((child, index) => (
                      <SubpageItem key={child.id} child={child} index={index} />
                    ))}
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
            )}
          </motion.div>
        </div>
      )}
    </Draggable>
  )
}
export default PageCollapsable
