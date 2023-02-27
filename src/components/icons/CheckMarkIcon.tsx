import { type SVGIcon } from "types/icons"

const CheckMarkIcon = ({ ...props }: SVGIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={props.fill ? props.fill : "currentColor"}
      className={props.className}
      viewBox='0 0 520 520'
    >
      <path d='m79.423 240.755a47.529 47.529 0 0 0 -36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515l250.787-403.892c.041-.067.084-.134.128-.2 2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0 -19.362 1.343q-.135.166-.278.327l-252.922 285.764a10.961 10.961 0 0 1 -15.585.843l-83.94-76.386a47.319 47.319 0 0 0 -31.939-12.438z' />
    </svg>
  )
}
export default CheckMarkIcon
