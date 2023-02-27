import { type SVGIcon } from "types/icons"

const DragAndDropIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={props.fill ? props.fill : "currentColor"}
      className={props.className}
      viewBox='0 0 24 24'
    >
      <path d='m14 6h2v2h5c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711v7.5l-6-3.5.036 8.062 2.223-2.15 1.782 3.088h-11.041c-.26522 0-.51957-.1054-.70711-.2929-.18753-.1875-.29289-.4419-.29289-.7071v-5h-2v-2h2v-5c0-.26522.10536-.51957.29289-.70711.18754-.18753.44189-.29289.70711-.29289h5zm8 11.338v3.662c.0001.1042-.0161.2078-.048.307l-1.96-3.394zm-18-3.338v2h-2v-2zm0-4v2h-2v-2zm0-4v2h-2v-2zm0-4v2h-2v-2zm4 0v2h-2v-2zm4 0v2h-2v-2zm4 0v2h-2v-2z' />
    </svg>
  )
}
export default DragAndDropIcon
