import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import BookingModal from '@/components/molecules/BookingModal'
import InquiryModal from '@/components/molecules/InquiryModal'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import { packageService } from '@/services'

const PackageDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [pkg, setPkg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('itinerary')

  useEffect(() => {
    loadPackage()
  }, [id])

  const loadPackage = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await packageService.getById(id)
      setPkg(data)
    } catch (err) {
      setError(err.message || 'Failed to load package details')
      toast.error('Failed to load package details')
    } finally {
      setLoading(false)
    }
  }

  const handleNextImage = () => {
    if (pkg?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % pkg.images.length)
    }
  }

  const handlePrevImage = () => {
    if (pkg?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + pkg.images.length) % pkg.images.length)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="h-32 bg-gray-200 rounded" />
              </div>
              <div className="h-64 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorState
            message={error}
            onRetry={loadPackage}
          />
        </div>
      </div>
    )
  }

  if (!pkg) {
    return null
  }

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: 'Calendar' },
    { id: 'inclusions', label: 'Inclusions', icon: 'Check' },
    { id: 'exclusions', label: 'Exclusions', icon: 'X' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Packages
        </motion.button>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-96 rounded-lg overflow-hidden mb-8"
        >
          <img
            src={pkg.images[currentImageIndex]}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation Arrows */}
          {pkg.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
              >
                <ApperIcon name="ChevronLeft" className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 transition-all"
              >
                <ApperIcon name="ChevronRight" className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {pkg.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {pkg.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Header */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                  {pkg.title}
                </h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" className="h-5 w-5 mr-1" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Clock" className="h-5 w-5 mr-1" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Star" className="h-5 w-5 mr-1 text-yellow-400" />
                    <span>{pkg.rating}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <Card className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Package</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.description}</p>
              </Card>

              {/* Tabs */}
              <Card>
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? 'border-accent text-accent'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <ApperIcon name={tab.icon} className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="min-h-48">
                  {activeTab === 'itinerary' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Itinerary</h3>
                      <p className="text-gray-600 whitespace-pre-line">{pkg.itinerary}</p>
                    </div>
                  )}

                  {activeTab === 'inclusions' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Included</h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <ApperIcon name="Check" className="h-4 w-4 text-success mr-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeTab === 'exclusions' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">What's Not Included</h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <ApperIcon name="X" className="h-4 w-4 text-error mr-3" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky top-8"
            >
              <Card>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-accent mb-2">
                    ${pkg.price}
                  </div>
                  <div className="text-gray-600">per person</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Max Travelers</span>
                    <span className="font-medium">{pkg.maxTravelers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Rating</span>
                    <div className="flex items-center">
                      <ApperIcon name="Star" className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{pkg.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setBookingModalOpen(true)}
                    className="w-full"
                  >
                    Book Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setInquiryModalOpen(true)}
                    icon="MessageCircle"
                    className="w-full"
                  >
                    Send Inquiry
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        package={pkg}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        package={pkg}
      />
    </div>
  )
}

export default PackageDetails