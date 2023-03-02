import cn from "classnames"

const LoadingSkeleton = ({
  className,
  children,
}: {
  className: string
  children?: React.ReactNode | React.ReactNode[]
}) => {
  return <div className={cn(className, "animate-pulse")}>{children}</div>
}
export default LoadingSkeleton
