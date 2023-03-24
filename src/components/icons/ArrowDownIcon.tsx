import { type SVGIcon } from "types/icons"

const ArrowDownIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={props.className ? props.className : "h-6 w-6"}
      fill={props.fill ? props.fill : "currentColor"}
      viewBox='0 0 123.958 123.958'
    >
      <path d='M117.979,28.017h-112c-5.3,0-8,6.4-4.2,10.2l56,56c2.3,2.3,6.1,2.3,8.401,0l56-56   C125.979,34.417,123.279,28.017,117.979,28.017z' />
    </svg>
  )
}
export default ArrowDownIcon
