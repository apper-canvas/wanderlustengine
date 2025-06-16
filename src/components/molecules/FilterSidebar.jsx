import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const FilterSidebar = ({ onFiltersChange, isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    destination: '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      destination: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const destinations = [
    'Nepal', 'Indonesia', 'Argentina/Chile', 'Morocco', 'Iceland'
  ]

  const durations = [
    '5-7 days', '8-10 days', '11-14 days', '15+ days'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 lg:relative lg:w-64 lg:shadow-none lg:bg-surface"
          >
            <div className="p-6 h-full overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={onClose}
                  className="lg:hidden p-2 text-gray-400 hover:text-gray-600"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              {/* Destination Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <select
                  value={filters.destination}
                  onChange={(e) => handleFilterChange('destination', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">All Destinations</option>
                  {destinations.map((destination) => (
                    <option key={destination} value={destination}>
                      {destination}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  value={filters.duration}
                  onChange={(e) => handleFilterChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                >
                  <option value="">Any Duration</option>
                  {durations.map((duration) => (
                    <option key={duration} value={duration}>
                      {duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="w-full"
              >
                Clear All Filters
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FilterSidebar