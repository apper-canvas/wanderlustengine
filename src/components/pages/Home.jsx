import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '@/components/organisms/HeroSection'
import FeaturedPackages from '@/components/organisms/FeaturedPackages'
import StatsSection from '@/components/organisms/StatsSection'

const Home = () => {
  const navigate = useNavigate()

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/packages?search=${encodeURIComponent(searchTerm)}`)
    } else {
      navigate('/packages')
    }
  }

  return (
    <div className="min-h-screen">
      <HeroSection onSearch={handleSearch} />
      <FeaturedPackages />
      <StatsSection />
    </div>
  )
}

export default Home