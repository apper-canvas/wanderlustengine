import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import { bookingService, packageService } from '@/services'

const AdminBookings = () => {
  const [bookings, setBookings] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [bookingsData, packagesData] = await Promise.all([
        bookingService.getAll(),
        packageService.getAll()
      ])
      setBookings(bookingsData)
      setPackages(packagesData)
    } catch (err) {
      setError(err.message || 'Failed to load bookings')
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await bookingService.update(bookingId, { status: newStatus })
      toast.success('Booking status updated successfully')
      loadData()
    } catch (error) {
      toast.error('Failed to update booking status')
    }
  }

  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingService.delete(bookingId)
        toast.success('Booking deleted successfully')
        loadData()
      } catch (error) {
        toast.error('Failed to delete booking')
      }
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'error'
    }
    return variants[status] || 'default'
  }

  const getPackageTitle = (packageId) => {
    const pkg = packages.find(p => p.Id === packageId)
    return pkg ? pkg.title : 'Unknown Package'
  }

  const filteredBookings = bookings.filter(booking => 
    statusFilter === 'all' || booking.status === statusFilter
  )

  const statusOptions = [
    { value: 'all', label: 'All Bookings' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg" />
              ))}
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
          <ErrorState message={error} onRetry={loadData} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Manage Bookings
            </h1>
            <p className="text-gray-600">
              View and manage customer bookings
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <EmptyState
            title="No bookings found"
            description="No bookings match your current filter criteria"
            icon="Calendar"
          />
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {getPackageTitle(booking.packageId)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Booking ID: #{booking.Id}
                          </p>
                        </div>
                        <Badge variant={getStatusBadge(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <ApperIcon name="User" className="h-4 w-4 mr-2" />
                              {booking.customerName}
                            </div>
                            <div className="flex items-center">
                              <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
                              {booking.customerEmail}
                            </div>
                            <div className="flex items-center">
                              <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
                              {booking.customerPhone}
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Booking Details</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                              {format(new Date(booking.travelDate), 'MMM dd, yyyy')}
                            </div>
                            <div className="flex items-center">
                              <ApperIcon name="Users" className="h-4 w-4 mr-2" />
                              {booking.travelerCount} travelers
                            </div>
                            <div className="flex items-center">
                              <ApperIcon name="DollarSign" className="h-4 w-4 mr-2" />
                              ${booking.totalPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col space-y-2 md:w-48">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.Id, e.target.value)}
                        className="px-3 py-2 border border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(booking.Id)}
                        icon="Trash"
                        className="text-error hover:text-error hover:border-error"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminBookings