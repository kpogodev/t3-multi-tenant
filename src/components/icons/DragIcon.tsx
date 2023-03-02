import { type SVGIcon } from "types/icons"

const DragIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={props.className ? props.className : "h-6 w-6"}
      fill={props.fill ? props.fill : "currentColor"}
      viewBox='0 0 24 24'
    >
      <path d='m10 19a2 2 0 1 1 -2-2 2 2 0 0 1 2 2zm-2-9a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0-7a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm8 14a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0-7a2 2 0 1 0 2 2 2 2 0 0 0 -2-2zm0-7a2 2 0 1 0 2 2 2 2 0 0 0 -2-2z' />
    </svg>
  )
}
export default DragIcon
