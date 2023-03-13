import { type SVGIcon } from "types/icons"

const AddIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={props.className ? props.className : "h-6 w-6"}
      fill={props.fill ? props.fill : "currentColor"}
      viewBox='0 0 24 24'
    >
      <path
        xmlns='http://www.w3.org/2000/svg'
        d='m12 1a11 11 0 1 0 11 11 11.013 11.013 0 0 0 -11-11zm5 12h-4v4a1 1 0 0 1 -2 0v-4h-4a1 1 0 0 1 0-2h4v-4a1 1 0 0 1 2 0v4h4a1 1 0 0 1 0 2z'
      />
    </svg>
  )
}
export default AddIcon
