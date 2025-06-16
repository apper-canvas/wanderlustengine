import React, { useState } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Layout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const location = useLocation()

  const isAdminRoute = location.pathname.startsWith('/admin')

  const customerNavItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/packages', label: 'Packages', icon: 'MapPin' }
  ]

  const adminNavItems = [
    { path: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/admin/packages', label: 'Packages', icon: 'Package' },
    { path: '/admin/bookings', label: 'Bookings', icon: 'Calendar' },
    { path: '/admin/inquiries', label: 'Inquiries', icon: 'MessageSquare' }
  ]

  const currentNavItems = isAdminRoute ? adminNavItems : customerNavItems

  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode)
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center space-x-2">
              <ApperIcon name="Compass" className="h-8 w-8 text-primary" />
              <span className="text-xl font-display font-bold text-primary">Wanderlust Hub</span>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {currentNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-gray-600 hover:text-primary'
                    }`
                  }
                >
                  <ApperIcon name={item.icon} className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Admin Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleAdminMode}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isAdminRoute
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ApperIcon name={isAdminRoute ? 'User' : 'Settings'} className="h-4 w-4" />
                <span className="hidden sm:inline">{isAdminRoute ? 'Customer' : 'Admin'}</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary hover:bg-gray-100"
              >
                <ApperIcon name={mobileMenuOpen ? 'X' : 'Menu'} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-100 bg-white"
            >
              <div className="px-4 py-2 space-y-1">
                {currentNavItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                      }`
                    }
                  >
                    <ApperIcon name={item.icon} className="h-4 w-4" />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout