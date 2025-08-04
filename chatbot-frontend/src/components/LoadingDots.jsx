import { motion } from 'framer-motion'

const LoadingDots = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  }

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  }

  return (
    <div className="flex space-x-1 justify-center items-center">
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0 }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.1 }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        variants={dotVariants}
        initial="initial"
        animate="animate"
        transition={{ ...dotTransition, delay: 0.2 }}
      />
    </div>
  )
}

export default LoadingDots
