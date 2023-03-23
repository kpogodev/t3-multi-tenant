import { motion } from "framer-motion"
import { api } from "utils/api"

const animVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

const NavigationView = () => {
  const { data } = api.cms.navigation.getNavigation.useQuery()

  console.log(data)

  return (
    <motion.div
      key='pages-view'
      variants={animVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      className='flex w-full flex-col gap-10 p-5 xl:p-10'
    >
      nav view
    </motion.div>
  )
}
export default NavigationView
