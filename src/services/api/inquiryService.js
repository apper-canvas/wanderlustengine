import inquiriesData from '../mockData/inquiries.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let inquiries = [...inquiriesData]

const inquiryService = {
  async getAll() {
    await delay(300)
    return [...inquiries]
  },

  async getById(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const inquiry = inquiries.find(i => i.Id === parsedId)
    if (!inquiry) {
      throw new Error('Inquiry not found')
    }
    return { ...inquiry }
  },

  async create(inquiryData) {
    await delay(300)
    const maxId = inquiries.length > 0 ? Math.max(...inquiries.map(i => i.Id)) : 0
    const newInquiry = {
      ...inquiryData,
      Id: maxId + 1,
      status: 'pending',
      adminResponse: '',
      createdAt: new Date().toISOString()
    }
    inquiries.push(newInquiry)
    return { ...newInquiry }
  },

  async update(id, inquiryData) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = inquiries.findIndex(i => i.Id === parsedId)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    
    const updatedInquiry = {
      ...inquiries[index],
      ...inquiryData,
      Id: parsedId, // Ensure Id is not modified
      updatedAt: new Date().toISOString()
    }
    
    inquiries[index] = updatedInquiry
    return { ...updatedInquiry }
  },

  async delete(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = inquiries.findIndex(i => i.Id === parsedId)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    
    inquiries.splice(index, 1)
    return true
  },

  async getByPackageId(packageId) {
    await delay(300)
    const parsedPackageId = parseInt(packageId, 10)
    return inquiries.filter(inquiry => inquiry.packageId === parsedPackageId).map(inquiry => ({ ...inquiry }))
  },

  async getByStatus(status) {
    await delay(300)
    return inquiries.filter(inquiry => inquiry.status === status).map(inquiry => ({ ...inquiry }))
  },

  async respond(id, response) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = inquiries.findIndex(i => i.Id === parsedId)
    if (index === -1) {
      throw new Error('Inquiry not found')
    }
    
    const updatedInquiry = {
      ...inquiries[index],
      adminResponse: response,
      status: 'responded',
      respondedAt: new Date().toISOString()
    }
    
    inquiries[index] = updatedInquiry
    return { ...updatedInquiry }
  }
}

export default inquiryService