import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-accent text-white hover:bg-opacity-90 focus:ring-accent',
    secondary: 'bg-secondary text-white hover:bg-opacity-90 focus:ring-secondary',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    ghost: 'text-gray-600 hover:text-accent hover:bg-gray-50 focus:ring-gray-300',
    danger: 'bg-error text-white hover:bg-opacity-90 focus:ring-error'
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  }
  
  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
    xl: 'h-6 w-6'
  }

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`

  const handleClick = (e) => {
    if (disabled || loading) return
    onClick?.(e)
  }

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading && (
        <ApperIcon
          name="Loader2"
          className={`${iconSizes[size]} animate-spin mr-2`}
        />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon
          name={icon}
          className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`}
        />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon
          name={icon}
          className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`}
        />
      )}
    </motion.button>
  )
}

export default Button