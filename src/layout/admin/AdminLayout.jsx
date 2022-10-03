import React, { useContext } from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { LoginContext } from '../../context/LoginContext'


// ADMIN Components
import AdminNavbar from "./AdminNavbar"
import AdminFooter from './AdminFooter'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {

  const { user } = useContext(LoginContext)

  if(!user) {
    // Hvis der ikke er en bruger, vil jeg sende burgeren tilbage til login siden
    return <Navigate to="/login" replace />
  }

  return (
    <div>

      <AdminHeader />

      <AdminNavbar />

          {/* Outlet er de child-path som AdminLayout har med sig fra App.jsx */}

        <Outlet />


        <AdminFooter />
    </div>
  )
}

export default AdminLayout