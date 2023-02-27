import { type SVGIcon } from "types/icons"

const FolderIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={props.className ? props.className : "mr-2 h-4 w-4 fill-none stroke-current"}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
      ></path>
    </svg>
  )
}
export default FolderIcon
