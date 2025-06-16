import Home from '@/components/pages/Home'
import Packages from '@/components/pages/Packages'
import PackageDetails from '@/components/pages/PackageDetails'
import AdminDashboard from '@/components/pages/AdminDashboard'
import AdminPackages from '@/components/pages/AdminPackages'
import AdminBookings from '@/components/pages/AdminBookings'
import AdminInquiries from '@/components/pages/AdminInquiries'
import BookingSuccess from '@/components/pages/BookingSuccess'
import NotFound from '@/components/pages/NotFound'

export const routes = {
  home: {
    id: 'home',
    label: 'Home',
    path: '/',
    icon: 'Home',
    component: Home
  },
  packages: {
    id: 'packages',
    label: 'Packages',
    path: '/packages',
    icon: 'MapPin',
    component: Packages
  },
  packageDetails: {
    id: 'package-details',
    label: 'Package Details',
    path: '/packages/:id',
    icon: 'Eye',
    component: PackageDetails
  },
  adminDashboard: {
    id: 'admin-dashboard',
    label: 'Dashboard',
    path: '/admin',
    icon: 'LayoutDashboard',
    component: AdminDashboard
  },
  adminPackages: {
    id: 'admin-packages',
    label: 'Manage Packages',
    path: '/admin/packages',
    icon: 'Package',
    component: AdminPackages
  },
  adminBookings: {
    id: 'admin-bookings',
    label: 'Bookings',
    path: '/admin/bookings',
    icon: 'Calendar',
    component: AdminBookings
  },
  adminInquiries: {
    id: 'admin-inquiries',
    label: 'Inquiries',
    path: '/admin/inquiries',
    icon: 'MessageSquare',
    component: AdminInquiries
  },
  bookingSuccess: {
    id: 'booking-success',
    label: 'Booking Success',
    path: '/booking-success',
    icon: 'CheckCircle',
    component: BookingSuccess
  },
  notFound: {
    id: 'not-found',
    label: 'Not Found',
    path: '*',
    icon: 'AlertCircle',
    component: NotFound
  }
}

export const routeArray = Object.values(routes)
export default routes