import React from 'react'
import { motion } from 'framer-motion'

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'sm',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg'
  }

  const cardClasses = `
    bg-white rounded-lg border border-gray-100 
    ${shadows[shadow]} 
    ${paddings[padding]} 
    ${className}
  `

  if (hover) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ duration: 0.2 }}
        className={cardClasses}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  )
}

export default Card