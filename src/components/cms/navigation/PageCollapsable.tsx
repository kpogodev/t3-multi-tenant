import { useState } from "react"
import { motion } from "framer-motion"
import ArrowDownIcon from "components/icons/ArrowDownIcon"
import cn from "classnames"
import { Draggable } from "react-beautiful-dnd"
import type { inferRouterOutputs } from "@trpc/server"
import type { AppRouter } from "server/api/root"

type PageType = inferRouterOutputs<AppRouter>["cms"]["navigation"]["getNavigation"][0]

interface PageCollapsableProps {
  page: PageType
  index: number
  isDragging: boolean
}

const PageCollapsable = ({ page, index, isDragging }: PageCollapsableProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToogle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <Draggable draggableId={page.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <motion.div
            className='min-w-[300px] rounded-lg border border-base-300 bg-base-100'
            layout={!isDragging}
            style={{ boxShadow: "1px 3px 9px rgba(0,0,0,0.12)", borderRadius: "0.5rem" }}
          >
            <motion.div layout={!isDragging ? "position" : false} className='flex w-full justify-between p-3'>
              <motion.h3 layout={!isDragging ? "position" : false}>{page.name}</motion.h3>
              <motion.button
                layout={!isDragging ? "position" : false}
                className='btn-primary btn-xs btn-circle btn'
                onClick={handleToogle}
              >
                <ArrowDownIcon
                  className={cn(isOpen ? "rotate-180" : "rotate-0", "h-3 w-3 origin-center transition-transform")}
                />
              </motion.button>
            </motion.div>
            {isOpen && (
              <motion.div
                layout
                className='flex flex-col gap-2 p-3'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p>Some text</p>
                <p>Some text</p>
                <p>Some text</p>
                <p>Some text</p>
                <p>Some text</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </Draggable>
  )
}
export default PageCollapsable
