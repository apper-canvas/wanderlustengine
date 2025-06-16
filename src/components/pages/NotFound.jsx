import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4 max-w-lg mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-accent/10 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="MapPin" className="h-12 w-12 text-accent" />
          </div>
          
          <h1 className="text-6xl font-display font-bold text-gray-900 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Destination Not Found
          </h2>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            Looks like you've wandered off the beaten path! The page you're looking for doesn't exist, but don't worry - there are plenty of amazing destinations waiting for you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" icon="Home">
                Go Home
              </Button>
            </Link>
            <Link to="/packages">
              <Button variant="outline" size="lg" icon="MapPin">
                Explore Packages
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound