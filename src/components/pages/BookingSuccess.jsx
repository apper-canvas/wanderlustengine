import React from 'react'
import { motion } from 'framer-motion'
import { useLocation, Link } from 'react-router-dom'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'

const BookingSuccess = () => {
  const location = useLocation()
  const { booking, package: pkg } = location.state || {}

  if (!booking || !pkg) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <ApperIcon name="AlertCircle" className="h-12 w-12 text-error mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Booking Information Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't find your booking details. Please check your email for confirmation.
          </p>
          <Link to="/">
            <Button variant="primary">
              Return Home
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-success/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="CheckCircle" className="h-10 w-10 text-success" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for choosing Wanderlust Hub! Your booking has been confirmed and you'll receive a confirmation email shortly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
              <div className="text-sm text-gray-500">
                Booking ID: #{booking.Id}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Package Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Package Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ApperIcon name="MapPin" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{pkg.title}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Globe" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{pkg.destination}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Clock" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Star" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">Rating: {pkg.rating}</span>
                  </div>
                </div>
              </div>

              {/* Customer & Travel Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Travel Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <ApperIcon name="User" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{booking.customerName}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Mail" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{booking.customerEmail}</span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Calendar" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">
                      {format(new Date(booking.travelDate), 'MMMM dd, yyyy')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <ApperIcon name="Users" className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-gray-600">{booking.travelerCount} travelers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center justify-between text-lg">
                <span className="font-medium text-gray-900">Total Paid</span>
                <span className="text-2xl font-bold text-success">${booking.totalPrice}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-accent/10 rounded-full p-2 mr-4 mt-1">
                  <ApperIcon name="Mail" className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Check Your Email</h3>
                  <p className="text-gray-600 text-sm">
                    We've sent a detailed confirmation email with your booking details and important information.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 rounded-full p-2 mr-4 mt-1">
                  <ApperIcon name="Phone" className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">We'll Contact You</h3>
                  <p className="text-gray-600 text-sm">
                    Our travel experts will contact you within 24 hours to discuss your itinerary and preparations.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-accent/10 rounded-full p-2 mr-4 mt-1">
                  <ApperIcon name="FileText" className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Prepare for Adventure</h3>
                  <p className="text-gray-600 text-sm">
                    Start preparing for your amazing journey! We'll send you a preparation guide soon.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/packages">
              <Button variant="outline" size="lg">
                Browse More Packages
              </Button>
            </Link>
            <Link to="/">
              <Button variant="primary" size="lg">
                Return Home
              </Button>
            </Link>
          </div>
          
          <p className="text-sm text-gray-500">
            Need help? Contact us at support@wanderlusthub.com or call (555) 123-4567
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default BookingSuccess