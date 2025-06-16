import { toast } from 'react-toastify'

const adminService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'Tags', 'Owner', 'email', 'password', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.fetchRecords('Admin', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching admins:', error)
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
        fields: ['Name', 'Tags', 'Owner', 'email', 'password', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy']
      }

      const response = await apperClient.getRecordById('Admin', parsedId, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      return response.data
    } catch (error) {
      console.error(`Error fetching admin with ID ${id}:`, error)
      throw error
    }
  },

  async create(adminData) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        records: [{
          Name: adminData.Name || adminData.name,
          Tags: adminData.Tags || adminData.tags || '',
          Owner: parseInt(adminData.Owner || adminData.owner) || null,
          email: adminData.email,
          password: adminData.password
        }]
      }

      const response = await apperClient.createRecord('Admin', params)
      
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
      console.error('Error creating admin:', error)
      throw error
    }
  },

  async update(id, adminData) {
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

      if (adminData.Name !== undefined || adminData.name !== undefined) {
        updateData.Name = adminData.Name || adminData.name
      }
      if (adminData.Tags !== undefined || adminData.tags !== undefined) {
        updateData.Tags = adminData.Tags || adminData.tags
      }
      if (adminData.Owner !== undefined || adminData.owner !== undefined) {
        updateData.Owner = parseInt(adminData.Owner || adminData.owner) || null
      }
      if (adminData.email !== undefined) updateData.email = adminData.email
      if (adminData.password !== undefined) updateData.password = adminData.password

      const params = {
        records: [updateData]
      }

      const response = await apperClient.updateRecord('Admin', params)
      
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
      console.error('Error updating admin:', error)
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

      const response = await apperClient.deleteRecord('Admin', params)
      
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
      console.error('Error deleting admin:', error)
      throw error
    }
  },

  async getByEmail(email) {
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const params = {
        Fields: ['Name', 'Tags', 'Owner', 'email', 'password', 'CreatedOn', 'CreatedBy', 'ModifiedOn', 'ModifiedBy'],
        where: [
          {
            FieldName: 'email',
            Operator: 'ExactMatch',
            Values: [email]
          }
        ]
      }

      const response = await apperClient.fetchRecords('Admin', params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      return response.data || []
    } catch (error) {
      console.error('Error fetching admin by email:', error)
      throw error
    }
  }
}

export default adminService