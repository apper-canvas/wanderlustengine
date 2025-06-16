import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Card from '@/components/atoms/Card'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { packageService, bookingService, inquiryService } from '@/services'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalBookings: 0,
    pendingInquiries: 0,
    confirmedBookings: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [recentInquiries, setRecentInquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const [packages, bookings, inquiries] = await Promise.all([
        packageService.getAll(),
        bookingService.getAll(),
        inquiryService.getAll()
      ])

      setStats({
        totalPackages: packages.length,
        totalBookings: bookings.length,
        pendingInquiries: inquiries.filter(i => i.status === 'pending').length,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length
      })

      setRecentBookings(bookings.slice(0, 5))
      setRecentInquiries(inquiries.slice(0, 5))
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Packages',
      value: stats.totalPackages,
      icon: 'Package',
      color: 'bg-primary',
      link: '/admin/packages'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: 'Calendar',
      color: 'bg-accent',
      link: '/admin/bookings'
    },
    {
      title: 'Pending Inquiries',
      value: stats.pendingInquiries,
      icon: 'MessageSquare',
      color: 'bg-warning',
      link: '/admin/inquiries'
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      icon: 'CheckCircle',
      color: 'bg-success',
      link: '/admin/bookings'
    }
  ]

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      confirmed: 'success',
      cancelled: 'error',
      responded: 'info'
    }
    return variants[status] || 'default'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg" />
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-64 bg-gray-200 rounded-lg" />
              <div className="h-64 bg-gray-200 rounded-lg" />
            </div>
          </div>
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
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your travel packages, bookings, and customer inquiries
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={stat.link}>
                <Card hover className="h-full">
                  <div className="flex items-center">
                    <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                      <ApperIcon name={stat.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
                <Link to="/admin/bookings">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentBookings.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recent bookings</p>
                ) : (
                  recentBookings.map((booking) => (
                    <div key={booking.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customerName}</p>
                        <p className="text-sm text-gray-600">{booking.customerEmail}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={getStatusBadge(booking.status)} size="sm">
                          {booking.status}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-1">${booking.totalPrice}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>

          {/* Recent Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Inquiries</h2>
                <Link to="/admin/inquiries">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
              <div className="space-y-3">
                {recentInquiries.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No recent inquiries</p>
                ) : (
                  recentInquiries.map((inquiry) => (
                    <div key={inquiry.Id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{inquiry.customerName}</p>
                        <p className="text-sm text-gray-600 truncate max-w-48">
                          {inquiry.message}
                        </p>
                      </div>
                      <Badge variant={getStatusBadge(inquiry.status)} size="sm">
                        {inquiry.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-4">
              <Link to="/admin/packages">
                <Button variant="primary" icon="Plus">
                  Add New Package
                </Button>
              </Link>
              <Link to="/admin/bookings">
                <Button variant="outline" icon="Calendar">
                  View Bookings
                </Button>
              </Link>
              <Link to="/admin/inquiries">
                <Button variant="outline" icon="MessageSquare">
                  Check Inquiries
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard