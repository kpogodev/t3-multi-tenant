import { type SVGIcon } from "types/icons"

export default function DarkModeIcon({ ...props }: SVGIcon) {
  return (
    <svg
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      className={props.className}
      fill={props.fill ? props.fill : "currentColor"}
    >
      <path
        d='m18.3284 14.8687c-5.0794 0-9.19705-4.1177-9.19705-9.19707 0-.92917.13779-1.82615.39405-2.67163-3.77643 1.14461-6.5254 4.65276-6.5254 8.803 0 5.0794 4.11765 9.197 9.197 9.197 4.1502 0 7.6584-2.749 8.803-6.5254-.8455.2563-1.7425.3941-2.6716.3941z'
      />
    </svg>
  )
}
