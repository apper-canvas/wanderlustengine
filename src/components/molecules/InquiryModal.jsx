import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { inquiryService } from '@/services'

const InquiryModal = ({ isOpen, onClose, package: pkg }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    message: ''
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
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const inquiryData = {
        packageId: pkg.Id,
        ...formData
      }
      
      await inquiryService.create(inquiryData)
      
      toast.success('Inquiry sent successfully! We\'ll get back to you soon.')
      setFormData({ customerName: '', customerEmail: '', message: '' })
      onClose()
    } catch (error) {
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
                <h2 className="text-xl font-semibold text-gray-900">Send Inquiry</h2>
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
                  <div className="flex items-center text-sm text-gray-600">
                    <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                    <span>{pkg.destination}</span>
                    <span className="mx-2">•</span>
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <Input
                  label="Your Name"
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

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Your Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    placeholder="Tell us about your questions or special requirements..."
                    className={`
                      w-full px-4 py-3 border-2 rounded-lg transition-all duration-200
                      ${errors.message 
                        ? 'border-error focus:border-error focus:ring-error' 
                        : 'border-gray-200 focus:border-accent focus:ring-accent'
                      }
                      focus:outline-none focus:ring-2 focus:ring-opacity-20
                      resize-none
                    `}
                  />
                  {errors.message && (
                    <p className="text-sm text-error flex items-center">
                      <ApperIcon name="AlertCircle" className="h-4 w-4 mr-1" />
                      {errors.message}
                    </p>
                  )}
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
                    Send Inquiry
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

export default InquiryModal