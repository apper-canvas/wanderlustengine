import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const StatsSection = () => {
  const stats = [
    {
      icon: 'MapPin',
      value: '50+',
      label: 'Destinations',
      description: 'Carefully curated locations across the globe'
    },
    {
      icon: 'Users',
      value: '1000+',
      label: 'Happy Travelers',
      description: 'Satisfied customers who chose us for their adventures'
    },
    {
      icon: 'Star',
      value: '4.8',
      label: 'Average Rating',
      description: 'Exceptional service quality rated by our customers'
    },
    {
      icon: 'Calendar',
      value: '5+',
      label: 'Years Experience',
      description: 'Proven track record in the travel industry'
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Why Choose Wanderlust Hub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're passionate about creating extraordinary travel experiences that exceed expectations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ApperIcon name={stat.icon} className="h-8 w-8 text-accent" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsSection