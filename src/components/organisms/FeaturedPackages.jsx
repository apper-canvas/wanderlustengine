import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import PackageCard from '@/components/molecules/PackageCard'
import InquiryModal from '@/components/molecules/InquiryModal'
import { packageService } from '@/services'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)

  useEffect(() => {
    loadFeaturedPackages()
  }, [])

  const loadFeaturedPackages = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await packageService.getFeatured()
      setPackages(data)
    } catch (err) {
      setError(err.message || 'Failed to load featured packages')
      toast.error('Failed to load featured packages')
    } finally {
      setLoading(false)
    }
  }

  const handleInquiry = (pkg) => {
    setSelectedPackage(pkg)
    setInquiryModalOpen(true)
  }

  if (loading) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorState
            message={error}
            onRetry={loadFeaturedPackages}
          />
        </div>
      </section>
    )
  }

  if (packages.length === 0) {
    return (
      <section className="py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            title="No Featured Packages"
            description="We're working on featuring some amazing travel packages for you"
            icon="Package"
          />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular travel packages, carefully selected for unforgettable experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.Id}
              initial={{ opacity: 0, y: 30 }}
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
      </div>

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        package={selectedPackage}
      />
    </section>
  )
}

export default FeaturedPackages