import CancelIcon from "components/icons/CancelIcon"
import { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import cn from "classnames"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode | React.ReactNode[]
  boxClassName?: string
}

const Modal = ({ isOpen, onClose, boxClassName, children }: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false)
  const modalRootRef = useRef<HTMLElement | null>(null)

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return
    onClose()
  }

  useEffect(() => {
    if (typeof document !== "undefined") {
      const el = document.getElementById("modal-root")
      modalRootRef.current = el
      setIsMounted(true)
    }

    return () => {
      modalRootRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Escape") return
        onClose()
      }

      window.addEventListener("keydown", handleKeyDown)

      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const renderModal = () => {
    return (
      <div
        className={cn(isOpen && "pointer-events-auto visible opacity-100", "modal modal-bottom sm:modal-middle")}
        onClick={handleOutsideClick}
      >
        <div className={cn("modal-box relative overflow-visible", boxClassName)}>
          <button className='btn-primary btn-sm btn-circle btn absolute right-2 top-2' onClick={onClose}>
            <CancelIcon className='h-3 w-3' />
          </button>
          {children}
        </div>
      </div>
    )
  }

  return isOpen && isMounted && modalRootRef.current ? ReactDOM.createPortal(renderModal(), modalRootRef.current) : null
}

export default Modal
