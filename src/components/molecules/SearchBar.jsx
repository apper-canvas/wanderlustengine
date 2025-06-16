import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search destinations, packages..." }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <ApperIcon name="Search" className="h-5 w-5" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-4 text-lg border-2 border-gray-200 rounded-full focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all duration-200"
        />
        
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="h-5 w-5" />
          </button>
        )}
        
        <div className="absolute right-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="rounded-full px-6"
          >
            Search
          </Button>
        </div>
      </div>
    </motion.form>
  )
}

export default SearchBar