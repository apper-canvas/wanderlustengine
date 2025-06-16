import bookingsData from '../mockData/bookings.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let bookings = [...bookingsData]

const bookingService = {
  async getAll() {
    await delay(300)
    return [...bookings]
  },

  async getById(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const booking = bookings.find(b => b.Id === parsedId)
    if (!booking) {
      throw new Error('Booking not found')
    }
    return { ...booking }
  },

  async create(bookingData) {
    await delay(300)
    const maxId = bookings.length > 0 ? Math.max(...bookings.map(b => b.Id)) : 0
    const newBooking = {
      ...bookingData,
      Id: maxId + 1,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
    bookings.push(newBooking)
    return { ...newBooking }
  },

  async update(id, bookingData) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = bookings.findIndex(b => b.Id === parsedId)
    if (index === -1) {
      throw new Error('Booking not found')
    }
    
    const updatedBooking = {
      ...bookings[index],
      ...bookingData,
      Id: parsedId, // Ensure Id is not modified
      updatedAt: new Date().toISOString()
    }
    
    bookings[index] = updatedBooking
    return { ...updatedBooking }
  },

  async delete(id) {
    await delay(300)
    const parsedId = parseInt(id, 10)
    const index = bookings.findIndex(b => b.Id === parsedId)
    if (index === -1) {
      throw new Error('Booking not found')
    }
    
    bookings.splice(index, 1)
    return true
  },

  async getByStatus(status) {
    await delay(300)
    return bookings.filter(booking => booking.status === status).map(booking => ({ ...booking }))
  },

  async getRecentBookings(limit = 5) {
    await delay(300)
    return bookings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
      .map(booking => ({ ...booking }))
  }
}

export default bookingService