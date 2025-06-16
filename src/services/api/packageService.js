import { toast } from 'react-toastify'

const packageService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'title', 'description', 'price', 'duration', 'images', 'itinerary', 'inclusions', 'exclusions', 'rating', 'destination', 'max_travelers', 'featured', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.fetchRecords('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching packages:', error)
      throw error
    }
  },

  async getById(id) {
    try {
      const parsedId = parseInt(id, 10)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        fields: ['Name', 'title', 'description', 'price', 'duration', 'images', 'itinerary', 'inclusions', 'exclusions', 'rating', 'destination', 'max_travelers', 'featured', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.getRecordById('package', parsedId, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching package with ID ${id}:`, error)
      throw error
    }
  },

  async create(packageData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Name: packageData.title || packageData.Name,
          title: packageData.title,
          description: packageData.description,
          price: parseFloat(packageData.price),
          duration: packageData.duration,
          images: Array.isArray(packageData.images) ? packageData.images.join('\n') : packageData.images,
          itinerary: packageData.itinerary,
          inclusions: Array.isArray(packageData.inclusions) ? packageData.inclusions.join('\n') : packageData.inclusions,
          exclusions: Array.isArray(packageData.exclusions) ? packageData.exclusions.join('\n') : packageData.exclusions,
          rating: parseInt(packageData.rating),
          destination: packageData.destination,
          max_travelers: parseInt(packageData.max_travelers || packageData.maxTravelers),
          featured: !!packageData.featured,
          Tags: packageData.Tags || ''
        }]
      }

      const response = await apperClient.createRecord('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulRecords.length > 0 ? successfulRecords[0].data : null
      }
    } catch (error) {
      console.error('Error creating package:', error)
      throw error
    }
  },

  async update(id, packageData) {
    try {
      const parsedId = parseInt(id, 10)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const updateData = {
        Id: parsedId
      }

      if (packageData.title !== undefined) {
        updateData.Name = packageData.title
        updateData.title = packageData.title
      }
      if (packageData.description !== undefined) updateData.description = packageData.description
      if (packageData.price !== undefined) updateData.price = parseFloat(packageData.price)
      if (packageData.duration !== undefined) updateData.duration = packageData.duration
      if (packageData.images !== undefined) {
        updateData.images = Array.isArray(packageData.images) ? packageData.images.join('\n') : packageData.images
      }
      if (packageData.itinerary !== undefined) updateData.itinerary = packageData.itinerary
      if (packageData.inclusions !== undefined) {
        updateData.inclusions = Array.isArray(packageData.inclusions) ? packageData.inclusions.join('\n') : packageData.inclusions
      }
      if (packageData.exclusions !== undefined) {
        updateData.exclusions = Array.isArray(packageData.exclusions) ? packageData.exclusions.join('\n') : packageData.exclusions
      }
      if (packageData.rating !== undefined) updateData.rating = parseInt(packageData.rating)
      if (packageData.destination !== undefined) updateData.destination = packageData.destination
      if (packageData.max_travelers !== undefined || packageData.maxTravelers !== undefined) {
        updateData.max_travelers = parseInt(packageData.max_travelers || packageData.maxTravelers)
      }
      if (packageData.featured !== undefined) updateData.featured = !!packageData.featured
      if (packageData.Tags !== undefined) updateData.Tags = packageData.Tags

      const params = {
        records: [updateData]
      }

      const response = await apperClient.updateRecord('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulUpdates.length > 0 ? successfulUpdates[0].data : null
      }
    } catch (error) {
      console.error('Error updating package:', error)
      throw error
    }
  },

  async delete(id) {
    try {
      const parsedId = parseInt(id, 10)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        RecordIds: [parsedId]
      }

      const response = await apperClient.deleteRecord('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }
        
        return successfulDeletions.length > 0
      }
    } catch (error) {
      console.error('Error deleting package:', error)
      throw error
    }
  },

  async getFeatured() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'title', 'description', 'price', 'duration', 'images', 'itinerary', 'inclusions', 'exclusions', 'rating', 'destination', 'max_travelers', 'featured', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: [
          {
            FieldName: 'featured',
            Operator: 'ExactMatch',
            Values: [true]
          }
        ],
        PagingInfo: {
          Limit: 6,
          Offset: 0
        }
      }

      const response = await apperClient.fetchRecords('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching featured packages:', error)
      throw error
    }
  },

  async searchPackages(query, filters = {}) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'title', 'description', 'price', 'duration', 'images', 'itinerary', 'inclusions', 'exclusions', 'rating', 'destination', 'max_travelers', 'featured', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: []
      }

      if (query) {
        params.whereGroups = [{
          operator: 'OR',
          SubGroups: [
            {
              conditions: [
                {
                  FieldName: 'title',
                  Operator: 'Contains',
                  Values: [query]
                }
              ],
              operator: ''
            },
            {
              conditions: [
                {
                  FieldName: 'destination',
                  Operator: 'Contains',
                  Values: [query]
                }
              ],
              operator: ''
            },
            {
              conditions: [
                {
                  FieldName: 'description',
                  Operator: 'Contains',
                  Values: [query]
                }
              ],
              operator: ''
            }
          ]
        }]
      }

      if (filters.destination) {
        params.where.push({
          FieldName: 'destination',
          Operator: 'Contains',
          Values: [filters.destination]
        })
      }

      if (filters.minPrice) {
        params.where.push({
          FieldName: 'price',
          Operator: 'GreaterThanOrEqualTo',
          Values: [parseFloat(filters.minPrice)]
        })
      }

      if (filters.maxPrice) {
        params.where.push({
          FieldName: 'price',
          Operator: 'LessThanOrEqualTo',
          Values: [parseFloat(filters.maxPrice)]
        })
      }

      if (filters.duration) {
        params.where.push({
          FieldName: 'duration',
          Operator: 'Contains',
          Values: [filters.duration]
        })
      }

      const response = await apperClient.fetchRecords('package', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error searching packages:', error)
      throw error
    }
  }
}

export default packageService