import UploadImageIcon from "components/icons/UploadImageIcon"
import { motion } from "framer-motion"
import type { UploadImagePlaceholderProps } from "./UploadImageForm"
import cn from "classnames"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}
const UploadImagePlaceholder = (props: UploadImagePlaceholderProps) => {
  return (
    <motion.div
      className='pointer-events-none my-auto p-2 text-center'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <UploadImageIcon
        className={cn(props.iconClasses ? props.iconClasses : "mx-auto aspect-square w-full max-w-[80px] opacity-60")}
      />
      <p className={cn(props.labelClasses ? props.labelClasses : "flex text-xl font-medium text-base-content")}>
        Upload image
      </p>
      <p className={cn(props.infoClasses ? props.infoClasses : "text-sm opacity-80")}>
        {props.infoText ? props.infoText : "Up to 10MB"}
      </p>
    </motion.div>
  )
}
export default UploadImagePlaceholder
