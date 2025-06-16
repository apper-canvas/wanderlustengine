import { toast } from 'react-toastify'

const bookingService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'customer_name', 'customer_email', 'customer_phone', 'travel_date', 'traveler_count', 'total_price', 'status', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.fetchRecords('booking', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching bookings:', error)
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
        fields: ['Name', 'customer_name', 'customer_email', 'customer_phone', 'travel_date', 'traveler_count', 'total_price', 'status', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.getRecordById('booking', parsedId, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching booking with ID ${id}:`, error)
      throw error
    }
  },

  async create(bookingData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Name: bookingData.customer_name || bookingData.customerName || bookingData.Name,
          customer_name: bookingData.customer_name || bookingData.customerName,
          customer_email: bookingData.customer_email || bookingData.customerEmail,
          customer_phone: bookingData.customer_phone || bookingData.customerPhone,
          travel_date: bookingData.travel_date || bookingData.travelDate,
          traveler_count: parseInt(bookingData.traveler_count || bookingData.travelerCount),
          total_price: parseFloat(bookingData.total_price || bookingData.totalPrice),
          status: bookingData.status || 'pending',
          package_id: parseInt(bookingData.package_id || bookingData.packageId),
          Tags: bookingData.Tags || ''
        }]
      }

      const response = await apperClient.createRecord('booking', params)
      
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
      console.error('Error creating booking:', error)
      throw error
    }
  },

  async update(id, bookingData) {
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

      if (bookingData.customer_name !== undefined || bookingData.customerName !== undefined) {
        const customerName = bookingData.customer_name || bookingData.customerName
        updateData.Name = customerName
        updateData.customer_name = customerName
      }
      if (bookingData.customer_email !== undefined || bookingData.customerEmail !== undefined) {
        updateData.customer_email = bookingData.customer_email || bookingData.customerEmail
      }
      if (bookingData.customer_phone !== undefined || bookingData.customerPhone !== undefined) {
        updateData.customer_phone = bookingData.customer_phone || bookingData.customerPhone
      }
      if (bookingData.travel_date !== undefined || bookingData.travelDate !== undefined) {
        updateData.travel_date = bookingData.travel_date || bookingData.travelDate
      }
      if (bookingData.traveler_count !== undefined || bookingData.travelerCount !== undefined) {
        updateData.traveler_count = parseInt(bookingData.traveler_count || bookingData.travelerCount)
      }
      if (bookingData.total_price !== undefined || bookingData.totalPrice !== undefined) {
        updateData.total_price = parseFloat(bookingData.total_price || bookingData.totalPrice)
      }
      if (bookingData.status !== undefined) updateData.status = bookingData.status
      if (bookingData.package_id !== undefined || bookingData.packageId !== undefined) {
        updateData.package_id = parseInt(bookingData.package_id || bookingData.packageId)
      }
      if (bookingData.Tags !== undefined) updateData.Tags = bookingData.Tags

      const params = {
        records: [updateData]
      }

      const response = await apperClient.updateRecord('booking', params)
      
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
      console.error('Error updating booking:', error)
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

      const response = await apperClient.deleteRecord('booking', params)
      
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
      console.error('Error deleting booking:', error)
      throw error
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'customer_name', 'customer_email', 'customer_phone', 'travel_date', 'traveler_count', 'total_price', 'status', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: [
          {
            FieldName: 'status',
            Operator: 'ExactMatch',
            Values: [status]
          }
        ]
      }

      const response = await apperClient.fetchRecords('booking', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching bookings by status:', error)
      throw error
    }
  },

  async getRecentBookings(limit = 5) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'customer_name', 'customer_email', 'customer_phone', 'travel_date', 'traveler_count', 'total_price', 'status', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        orderBy: [
          {
            FieldName: 'CreatedOn',
            SortType: 'DESC'
          }
        ],
        PagingInfo: {
          Limit: limit,
          Offset: 0
        }
      }

      const response = await apperClient.fetchRecords('booking', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching recent bookings:', error)
      throw error
    }
  }
}

export default bookingService