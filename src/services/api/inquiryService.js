import { toast } from 'react-toastify'

const inquiryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'customer_name', 'customer_email', 'message', 'status', 'admin_response', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.fetchRecords('inquiry', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching inquiries:', error)
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
        fields: ['Name', 'customer_name', 'customer_email', 'message', 'status', 'admin_response', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.getRecordById('inquiry', parsedId, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching inquiry with ID ${id}:`, error)
      throw error
    }
  },

  async create(inquiryData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Name: inquiryData.customer_name || inquiryData.customerName || inquiryData.Name,
          customer_name: inquiryData.customer_name || inquiryData.customerName,
          customer_email: inquiryData.customer_email || inquiryData.customerEmail,
          message: inquiryData.message,
          status: inquiryData.status || 'pending',
          admin_response: inquiryData.admin_response || inquiryData.adminResponse || '',
          package_id: parseInt(inquiryData.package_id || inquiryData.packageId),
          Tags: inquiryData.Tags || ''
        }]
      }

      const response = await apperClient.createRecord('inquiry', params)
      
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
      console.error('Error creating inquiry:', error)
      throw error
    }
  },

  async update(id, inquiryData) {
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

      if (inquiryData.customer_name !== undefined || inquiryData.customerName !== undefined) {
        const customerName = inquiryData.customer_name || inquiryData.customerName
        updateData.Name = customerName
        updateData.customer_name = customerName
      }
      if (inquiryData.customer_email !== undefined || inquiryData.customerEmail !== undefined) {
        updateData.customer_email = inquiryData.customer_email || inquiryData.customerEmail
      }
      if (inquiryData.message !== undefined) updateData.message = inquiryData.message
      if (inquiryData.status !== undefined) updateData.status = inquiryData.status
      if (inquiryData.admin_response !== undefined || inquiryData.adminResponse !== undefined) {
        updateData.admin_response = inquiryData.admin_response || inquiryData.adminResponse
      }
      if (inquiryData.package_id !== undefined || inquiryData.packageId !== undefined) {
        updateData.package_id = parseInt(inquiryData.package_id || inquiryData.packageId)
      }
      if (inquiryData.Tags !== undefined) updateData.Tags = inquiryData.Tags

      const params = {
        records: [updateData]
      }

      const response = await apperClient.updateRecord('inquiry', params)
      
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
      console.error('Error updating inquiry:', error)
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

      const response = await apperClient.deleteRecord('inquiry', params)
      
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
      console.error('Error deleting inquiry:', error)
      throw error
    }
  },

  async getByPackageId(packageId) {
    try {
      const parsedPackageId = parseInt(packageId, 10)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'customer_name', 'customer_email', 'message', 'status', 'admin_response', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: [
          {
            FieldName: 'package_id',
            Operator: 'ExactMatch',
            Values: [parsedPackageId]
          }
        ]
      }

      const response = await apperClient.fetchRecords('inquiry', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching inquiries by package ID:', error)
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
        Fields: ['Name', 'customer_name', 'customer_email', 'message', 'status', 'admin_response', 'package_id', 'Tags', 'Owner', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: [
          {
            FieldName: 'status',
            Operator: 'ExactMatch',
            Values: [status]
          }
        ]
      }

      const response = await apperClient.fetchRecords('inquiry', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching inquiries by status:', error)
      throw error
    }
  },

  async respond(id, response) {
    try {
      const parsedId = parseInt(id, 10)
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Id: parsedId,
          admin_response: response,
          status: 'responded'
        }]
      }

      const updateResponse = await apperClient.updateRecord('inquiry', params)
      
      if (!updateResponse.success) {
        console.error(updateResponse.message)
        toast.error(updateResponse.message)
        return null
      }

      if (updateResponse.results) {
        const successfulUpdates = updateResponse.results.filter(result => result.success)
        const failedUpdates = updateResponse.results.filter(result => !result.success)
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to respond to ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`)
          
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
      console.error('Error responding to inquiry:', error)
      throw error
    }
  }
}

export default inquiryService