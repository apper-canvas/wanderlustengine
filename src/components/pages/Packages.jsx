import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import PackageCard from '@/components/molecules/PackageCard'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import SearchBar from '@/components/molecules/SearchBar'
import InquiryModal from '@/components/molecules/InquiryModal'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { packageService } from '@/services'

const Packages = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [filters, setFilters] = useState({
    destination: '',
    minPrice: '',
    maxPrice: '',
    duration: ''
  })

  useEffect(() => {
    loadPackages()
  }, [searchTerm, filters])

const loadPackages = async () => {
    setLoading(true)
    setError(null)
    try {
      let data
      // Check if we have any search criteria (search term or filters)
      const hasSearchCriteria = searchTerm || Object.values(filters).some(filter => filter)
      
      if (hasSearchCriteria) {
        // Use search method when filters or search term are applied
        console.log('Loading packages with search criteria:', { searchTerm, filters })
        data = await packageService.searchPackages(searchTerm, filters)
      } else {
        // Use getAll method when no search criteria to load all packages
        console.log('Loading all packages from database')
        data = await packageService.getAll()
      }
      
      // Handle database response - ensure we have valid data array
      if (Array.isArray(data)) {
        setPackages(data)
        console.log(`Successfully loaded ${data.length} packages from database`)
      } else {
        // Handle case where database returns null/undefined
        console.warn('Database returned non-array data:', data)
        setPackages([])
      }
    } catch (err) {
      console.error('Error loading packages from database:', err)
      setError(err.message || 'Failed to load packages from database')
      toast.error('Failed to load travel packages. Please try again.')
      // Set empty array on error to prevent undefined issues
      setPackages([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (query) => {
    setSearchTerm(query)
    if (query) {
      setSearchParams({ search: query })
    } else {
      setSearchParams({})
    }
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleInquiry = (pkg) => {
    setSelectedPackage(pkg)
    setInquiryModalOpen(true)
  }

  const handleClearAll = () => {
    setSearchTerm('')
    setFilters({
      destination: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
    })
    setSearchParams({})
  }

  const hasActiveFilters = searchTerm || Object.values(filters).some(filter => filter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Explore Travel Packages
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover amazing destinations and create unforgettable memories
            </p>
          </motion.div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setFiltersOpen(true)}
                icon="Filter"
                className="w-full"
              >
                Filters
              </Button>
            </div>
            <div className="hidden lg:block">
              <FilterSidebar
                onFiltersChange={handleFiltersChange}
                isOpen={true}
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {loading ? 'Loading...' : `${packages.length} packages found`}
                </h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearAll}
                    icon="X"
                  >
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <SkeletonLoader count={6} />
              </div>
            )}

            {/* Error State */}
            {error && (
              <ErrorState
                message={error}
                onRetry={loadPackages}
              />
            )}

            {/* Empty State */}
            {!loading && !error && packages.length === 0 && (
              <EmptyState
                title="No packages found"
                description="Try adjusting your search criteria or browse all packages"
                actionLabel="Clear Filters"
                onAction={handleClearAll}
                icon="Search"
              />
            )}

            {/* Packages Grid */}
            {!loading && !error && packages.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                  <motion.div
                    key={pkg.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <PackageCard
                      package={pkg}
                      onInquiry={handleInquiry}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        onFiltersChange={handleFiltersChange}
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        package={selectedPackage}
      />
    </div>
  )
}

export default Packages