import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { bookingService } from '@/services'

const BookingModal = ({ isOpen, onClose, package: pkg }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    travelDate: '',
    travelerCount: 1
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required'
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Please enter a valid email'
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Phone number is required'
    }
    
    if (!formData.travelDate) {
      newErrors.travelDate = 'Travel date is required'
    }
    
    if (formData.travelerCount < 1 || formData.travelerCount > pkg?.maxTravelers) {
      newErrors.travelerCount = `Number of travelers must be between 1 and ${pkg?.maxTravelers}`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const bookingData = {
        packageId: pkg.Id,
        ...formData,
        totalPrice: pkg.price * formData.travelerCount
      }
      
      const booking = await bookingService.create(bookingData)
      
      toast.success('Booking confirmed! Check your email for details.')
      onClose()
      navigate('/booking-success', { state: { booking, package: pkg } })
    } catch (error) {
      toast.error('Failed to create booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const totalPrice = pkg ? pkg.price * formData.travelerCount : 0

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Book Package</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              {/* Package Info */}
              {pkg && (
                <div className="p-6 bg-surface border-b">
                  <h3 className="font-semibold text-gray-900 mb-2">{pkg.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{pkg.duration}</span>
                    <span className="font-semibold text-accent">${pkg.price} per person</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  label="Full Name"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  error={errors.customerName}
                  required
                  icon="User"
                />

                <Input
                  label="Email"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  error={errors.customerEmail}
                  required
                  icon="Mail"
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                  error={errors.customerPhone}
                  required
                  icon="Phone"
                />

                <Input
                  label="Travel Date"
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => handleInputChange('travelDate', e.target.value)}
                  error={errors.travelDate}
                  required
                  icon="Calendar"
                />

                <Input
                  label="Number of Travelers"
                  type="number"
                  min="1"
                  max={pkg?.maxTravelers}
                  value={formData.travelerCount}
                  onChange={(e) => handleInputChange('travelerCount', parseInt(e.target.value) || 1)}
                  error={errors.travelerCount}
                  required
                  icon="Users"
                />

                {/* Total Price */}
                <div className="bg-surface p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Price:</span>
                    <span className="text-xl font-bold text-accent">${totalPrice}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    loading={loading}
                    className="flex-1"
                  >
                    Confirm Booking
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default BookingModal