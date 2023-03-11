import { type SVGIcon } from "types/icons"

const SidebarIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={props.className ? props.className : "h-6 w-6"}
      fill={props.fill ? props.fill : "currentColor"}
      viewBox='0 0 24 24'
    >
      <path d='m2 7.8v8.4c0 1.5.4 2.7 1 3.7.3.4.7.8 1.1 1.1.8.6 1.9.9 3.1 1v-20c-3.3.2-5.2 2.4-5.2 5.8z' />
      <path d='m21 4.1c-.3-.4-.7-.8-1.1-1.1-1-.7-2.2-1-3.7-1h-7.5v20h7.5c3.6 0 5.8-2.2 5.8-5.8v-8.4c0-1.5-.4-2.7-1-3.7zm-5.5 9.9c.3.3.3.8 0 1.1-.1.1-.3.2-.5.2s-.4-.1-.5-.2l-2.6-2.6c-.3-.3-.3-.8 0-1.1l2.6-2.6c.3-.3.8-.3 1.1 0s.3.8 0 1.1l-2 2z' />
    </svg>
  )
}
export default SidebarIcon
