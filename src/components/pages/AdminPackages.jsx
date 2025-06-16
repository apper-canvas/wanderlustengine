import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Badge from '@/components/atoms/Badge'
import Input from '@/components/atoms/Input'
import SkeletonLoader from '@/components/atoms/SkeletonLoader'
import ErrorState from '@/components/atoms/ErrorState'
import EmptyState from '@/components/atoms/EmptyState'
import { packageService } from '@/services'

const AdminPackages = () => {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingPackage, setEditingPackage] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    destination: '',
    maxTravelers: '',
    images: [''],
    itinerary: '',
    inclusions: [''],
    exclusions: [''],
    rating: 4.5,
    featured: false
  })

  useEffect(() => {
    loadPackages()
  }, [])

  const loadPackages = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await packageService.getAll()
      setPackages(data)
    } catch (err) {
      setError(err.message || 'Failed to load packages')
      toast.error('Failed to load packages')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      duration: '',
      destination: '',
      maxTravelers: '',
      images: [''],
      itinerary: '',
      inclusions: [''],
      exclusions: [''],
      rating: 4.5,
      featured: false
    })
    setEditingPackage(null)
    setShowForm(false)
  }

  const handleEdit = (pkg) => {
    setEditingPackage(pkg)
    setFormData({
      title: pkg.title,
description: pkg.description,
      price: pkg.price.toString(),
      duration: pkg.duration,
      destination: pkg.destination,
      maxTravelers: pkg.max_travelers.toString(),
      images: typeof pkg.images === 'string' ? pkg.images.split('\n') : pkg.images,
      itinerary: pkg.itinerary,
      inclusions: typeof pkg.inclusions === 'string' ? pkg.inclusions.split('\n') : pkg.inclusions,
      exclusions: typeof pkg.exclusions === 'string' ? pkg.exclusions.split('\n') : pkg.exclusions,
      rating: pkg.rating,
      featured: pkg.featured || false
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await packageService.delete(id)
        toast.success('Package deleted successfully')
        loadPackages()
      } catch (error) {
        toast.error('Failed to delete package')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      maxTravelers: parseInt(formData.maxTravelers),
      images: formData.images.filter(img => img.trim()),
      inclusions: formData.inclusions.filter(inc => inc.trim()),
      exclusions: formData.exclusions.filter(exc => exc.trim())
    }

    try {
      if (editingPackage) {
        await packageService.update(editingPackage.Id, packageData)
        toast.success('Package updated successfully')
      } else {
        await packageService.create(packageData)
        toast.success('Package created successfully')
      }
      resetForm()
      loadPackages()
    } catch (error) {
      toast.error('Failed to save package')
    }
  }

  const handleArrayFieldChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayField = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkeletonLoader count={6} />
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
          <ErrorState message={error} onRetry={loadPackages} />
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
              Manage Packages
            </h1>
            <p className="text-gray-600">
              Create, edit, and manage your travel packages
            </p>
          </div>
          <Button
            variant="primary"
            icon="Plus"
            onClick={() => setShowForm(true)}
          >
            Add Package
          </Button>
        </motion.div>

        {/* Package Form Modal */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                  <Input
                    label="Destination"
                    value={formData.destination}
                    onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                  <Input
                    label="Duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    required
                  />
                  <Input
                    label="Max Travelers"
                    type="number"
                    value={formData.maxTravelers}
                    onChange={(e) => setFormData(prev => ({ ...prev, maxTravelers: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Itinerary
                  </label>
                  <textarea
                    value={formData.itinerary}
                    onChange={(e) => setFormData(prev => ({ ...prev, itinerary: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    required
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images (URLs)
                  </label>
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        value={image}
                        onChange={(e) => handleArrayFieldChange('images', index, e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('images', index)}
                        icon="X"
                        disabled={formData.images.length === 1}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addArrayField('images')}
                    icon="Plus"
                  >
                    Add Image
                  </Button>
                </div>

                {/* Inclusions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inclusions
                  </label>
                  {formData.inclusions.map((inclusion, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        value={inclusion}
                        onChange={(e) => handleArrayFieldChange('inclusions', index, e.target.value)}
                        placeholder="Enter inclusion"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('inclusions', index)}
                        icon="X"
                        disabled={formData.inclusions.length === 1}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addArrayField('inclusions')}
                    icon="Plus"
                  >
                    Add Inclusion
                  </Button>
                </div>

                {/* Exclusions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exclusions
                  </label>
                  {formData.exclusions.map((exclusion, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                      <Input
                        value={exclusion}
                        onChange={(e) => handleArrayFieldChange('exclusions', index, e.target.value)}
                        placeholder="Enter exclusion"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayField('exclusions', index)}
                        icon="X"
                        disabled={formData.exclusions.length === 1}
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addArrayField('exclusions')}
                    icon="Plus"
                  >
                    Add Exclusion
                  </Button>
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="mr-2"
                    />
                    Featured Package
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1"
                  >
                    {editingPackage ? 'Update Package' : 'Create Package'}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {/* Packages List */}
        {packages.length === 0 ? (
          <EmptyState
            title="No packages found"
            description="Create your first travel package to get started"
            actionLabel="Add Package"
            onAction={() => setShowForm(true)}
            icon="Package"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full">
<div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={typeof pkg.images === 'string' ? pkg.images.split('\n')[0] : pkg.images[0]}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    {pkg.featured && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="accent">Featured</Badge>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {pkg.title}
                    </h3>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                      <span>{pkg.destination}</span>
                      <span className="mx-2">•</span>
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">
                        ${pkg.price}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Star" className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{pkg.rating}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(pkg)}
                        icon="Edit"
                        className="flex-1"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(pkg.Id)}
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

export default AdminPackages