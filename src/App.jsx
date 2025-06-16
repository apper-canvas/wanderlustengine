import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from './Layout'
import Home from '@/components/pages/Home'
import Packages from '@/components/pages/Packages'
import PackageDetails from '@/components/pages/PackageDetails'
import AdminDashboard from '@/components/pages/AdminDashboard'
import AdminPackages from '@/components/pages/AdminPackages'
import AdminBookings from '@/components/pages/AdminBookings'
import AdminInquiries from '@/components/pages/AdminInquiries'
import BookingSuccess from '@/components/pages/BookingSuccess'
import NotFound from '@/components/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="packages" element={<Packages />} />
            <Route path="packages/:id" element={<PackageDetails />} />
            <Route path="booking-success" element={<BookingSuccess />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/packages" element={<AdminPackages />} />
            <Route path="admin/bookings" element={<AdminBookings />} />
            <Route path="admin/inquiries" element={<AdminInquiries />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="z-[9999]"
        />
      </div>
    </BrowserRouter>
  )
}

export default App