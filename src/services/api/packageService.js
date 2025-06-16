import packagesData from '../mockData/packages.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let packages = [...packagesData]

const packageService = {
  async getAll() {
    await delay(300)
    return [...packages]
  },

  async getById(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const pkg = packages.find(p => p.Id === parsedId)
    if (!pkg) {
      throw new Error('Package not found')
    }
    return { ...pkg }
  },

  async create(packageData) {
    await delay(300)
    const maxId = packages.length > 0 ? Math.max(...packages.map(p => p.Id)) : 0
    const newPackage = {
      ...packageData,
      Id: maxId + 1,
      createdAt: new Date().toISOString()
    }
    packages.push(newPackage)
    return { ...newPackage }
  },

  async update(id, packageData) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = packages.findIndex(p => p.Id === parsedId)
    if (index === -1) {
      throw new Error('Package not found')
    }
    
    const updatedPackage = {
      ...packages[index],
      ...packageData,
      Id: parsedId, // Ensure Id is not modified
      updatedAt: new Date().toISOString()
    }
    
    packages[index] = updatedPackage
    return { ...updatedPackage }
  },

  async delete(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = packages.findIndex(p => p.Id === parsedId)
    if (index === -1) {
      throw new Error('Package not found')
    }
    
    packages.splice(index, 1)
    return true
  },

  async getFeatured() {
    await delay(300)
    return packages.filter(pkg => pkg.featured).slice(0, 6).map(pkg => ({ ...pkg }))
  },

  async searchPackages(query, filters = {}) {
    await delay(300)
    let filteredPackages = [...packages]
    
    if (query) {
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.title.toLowerCase().includes(query.toLowerCase()) ||
        pkg.destination.toLowerCase().includes(query.toLowerCase()) ||
        pkg.description.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    if (filters.destination) {
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.destination.toLowerCase().includes(filters.destination.toLowerCase())
      )
    }
    
    if (filters.minPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price >= filters.minPrice)
    }
    
    if (filters.maxPrice) {
      filteredPackages = filteredPackages.filter(pkg => pkg.price <= filters.maxPrice)
    }
    
    if (filters.duration) {
      filteredPackages = filteredPackages.filter(pkg =>
        pkg.duration.toLowerCase().includes(filters.duration.toLowerCase())
      )
    }
    
    return filteredPackages
  }
}

export default packageService