import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'

const HeroSection = ({ onSearch }) => {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=1080&fit=crop"
          alt="Travel Adventure"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-secondary/60 to-accent/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
        >
          Discover Your Next
          <span className="text-accent block">Adventure</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto"
        >
          Explore breathtaking destinations and create unforgettable memories with our carefully curated travel packages
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <SearchBar onSearch={onSearch} />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20"
        >
          <div>
            <div className="text-2xl md:text-3xl font-bold text-accent">50+</div>
            <div className="text-sm text-white/80">Destinations</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-accent">1000+</div>
            <div className="text-sm text-white/80">Happy Travelers</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-accent">4.8★</div>
            <div className="text-sm text-white/80">Average Rating</div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-10 w-4 h-4 bg-accent rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-6 h-6 bg-white rounded-full opacity-40"
      />
    </section>
  )
}

export default HeroSection