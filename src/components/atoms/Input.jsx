import React, { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const hasValue = value && value.length > 0
  const isFloating = isFocused || hasValue

  const inputType = type === 'password' && showPassword ? 'text' : type

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <ApperIcon name={icon} className="h-5 w-5" />
          </div>
        )}
        
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          required={required}
          className={`
            w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
            ${icon ? 'pl-11' : ''}
            ${type === 'password' ? 'pr-11' : ''}
            ${error 
              ? 'border-error focus:border-error focus:ring-error' 
              : 'border-gray-200 focus:border-accent focus:ring-accent'
            }
            ${disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'}
            focus:outline-none focus:ring-2 focus:ring-opacity-20
            placeholder-transparent
          `}
          placeholder={placeholder}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name={showPassword ? 'EyeOff' : 'Eye'} className="h-5 w-5" />
          </button>
        )}
        
        {label && (
          <label
            className={`
              absolute left-4 transition-all duration-200 pointer-events-none
              ${icon ? 'left-11' : 'left-4'}
              ${isFloating
                ? 'top-0 text-xs bg-white px-1 -translate-y-1/2 text-accent'
                : 'top-1/2 -translate-y-1/2 text-gray-500'
              }
              ${error && isFloating ? 'text-error' : ''}
            `}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-error flex items-center">
          <ApperIcon name="AlertCircle" className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  )
}

export default Input