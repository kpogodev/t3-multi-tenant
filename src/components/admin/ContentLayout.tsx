import { type ReactElement } from "react"

const ContentLayout = ({children}: {children?: ReactElement | ReactElement[]}) => {
  return (
    <div className="w-full p-10 flex flex-col gap-10">
      {children}
    </div>
  )
}
export default ContentLayout