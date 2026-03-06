import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOTP from './pages/VerifyOTP'
import ChangePassword from './pages/ChangePassword'
import AdminDashboard from './pages/AdminDashboard'
import ManageLocations from './pages/ManageLocations'
import ManageBuses from './pages/ManageBuses'
import SearchResults from './pages/SearchResults'
import Profile from './pages/Profile'
import AdminOverview from './pages/AdminOverview'


const router = createBrowserRouter([
  {
    path: '/',
    element: <><Navbar /><Home /></>
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/verify-otp/:email',
    element: <VerifyOTP />
  },
  {
    path: '/change-password/:email',
    element: <ChangePassword />
  },
  {
    path: '/results',
    element: <SearchResults />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
    children: [
      { path: '', element: <AdminOverview /> },
      { path: 'locations', element: <ManageLocations /> },
      { path: 'buses', element: <ManageBuses /> },
    ]
  },
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
