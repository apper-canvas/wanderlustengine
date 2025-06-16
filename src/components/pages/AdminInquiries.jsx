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
import { inquiryService, packageService } from '@/services'

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [respondingTo, setRespondingTo] = useState(null)
  const [responseText, setResponseText] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [inquiriesData, packagesData] = await Promise.all([
        inquiryService.getAll(),
        packageService.getAll()
      ])
      setInquiries(inquiriesData)
      setPackages(packagesData)
    } catch (err) {
      setError(err.message || 'Failed to load inquiries')
      toast.error('Failed to load inquiries')
    } finally {
      setLoading(false)
    }
  }

  const handleRespond = async (inquiryId) => {
    if (!responseText.trim()) {
      toast.error('Please enter a response')
      return
    }

    try {
      await inquiryService.respond(inquiryId, responseText)
      toast.success('Response sent successfully')
      setRespondingTo(null)
      setResponseText('')
      loadData()
    } catch (error) {
      toast.error('Failed to send response')
    }
  }

  const handleDelete = async (inquiryId) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await inquiryService.delete(inquiryId)
        toast.success('Inquiry deleted successfully')
        loadData()
      } catch (error) {
        toast.error('Failed to delete inquiry')
      }
    }
  }

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      responded: 'success'
    }
    return variants[status] || 'default'
  }

  const getPackageTitle = (packageId) => {
    const pkg = packages.find(p => p.Id === packageId)
    return pkg ? pkg.title : 'Unknown Package'
  }

  const filteredInquiries = inquiries.filter(inquiry => 
    statusFilter === 'all' || inquiry.status === statusFilter
  )

  const statusOptions = [
    { value: 'all', label: 'All Inquiries' },
    { value: 'pending', label: 'Pending' },
    { value: 'responded', label: 'Responded' }
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
              Manage Inquiries
            </h1>
            <p className="text-gray-600">
              View and respond to customer inquiries
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

        {/* Inquiries List */}
        {filteredInquiries.length === 0 ? (
          <EmptyState
            title="No inquiries found"
            description="No inquiries match your current filter criteria"
            icon="MessageSquare"
          />
        ) : (
          <div className="space-y-4">
            {filteredInquiries.map((inquiry, index) => (
              <motion.div
                key={inquiry.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {getPackageTitle(inquiry.packageId)}
                          </h3>
                          <Badge variant={getStatusBadge(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Inquiry ID: #{inquiry.Id}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center">
                            <ApperIcon name="User" className="h-4 w-4 mr-2" />
                            {inquiry.customerName}
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="Mail" className="h-4 w-4 mr-2" />
                            {inquiry.customerEmail}
                          </div>
                          <div className="flex items-center">
                            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                            {format(new Date(inquiry.createdAt), 'MMM dd, yyyy')}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Message</h4>
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>

                    {inquiry.adminResponse && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Your Response</h4>
                        <p className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
                          {inquiry.adminResponse}
                        </p>
                      </div>
                    )}

                    {/* Response Form */}
                    {respondingTo === inquiry.Id ? (
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Send Response</h4>
                        <textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          rows={3}
                          placeholder="Type your response here..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-none"
                        />
                        <div className="flex space-x-2 mt-3">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleRespond(inquiry.Id)}
                          >
                            Send Response
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setRespondingTo(null)
                              setResponseText('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between border-t pt-4">
                        <div className="flex space-x-2">
                          {inquiry.status === 'pending' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => setRespondingTo(inquiry.Id)}
                              icon="Reply"
                            >
                              Respond
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(inquiry.Id)}
                            icon="Trash"
                            className="text-error hover:text-error hover:border-error"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    )}
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

export default AdminInquiries