import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'

const PackageCard = ({ package: pkg, onInquiry }) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate(`/packages/${pkg.Id}`)
  }

  const handleInquiry = (e) => {
    e.stopPropagation()
    onInquiry?.(pkg)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.images[0]}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge variant="accent" className="bg-accent/90 backdrop-blur-sm">
            ${pkg.price}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <Badge variant="default" className="bg-white/90 backdrop-blur-sm text-gray-800">
            {pkg.duration}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 font-heading line-clamp-2">
            {pkg.title}
          </h3>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
          <span>{pkg.destination}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ApperIcon name="Star" className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 ml-1">{pkg.rating}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ApperIcon name="Users" className="h-4 w-4 mr-1" />
            <span>Max {pkg.maxTravelers}</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon="MessageCircle"
            onClick={handleInquiry}
            className="flex-shrink-0"
          >
            Inquire
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default PackageCard