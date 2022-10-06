// REACT
import React, { useContext } from 'react'

// LOGIN-CONTEXT
import { LoginContext } from '../../context/LoginContext'

// SCSS
import "../../scss/admin/AdminHeader.scss"


const AdminHeader = () => {

    const { user, signOut } = useContext(LoginContext)

  return (

    <header className="adminHeader">
      <p> Du er logget ind som: { user } </p> 
      <button onClick={ signOut }>Logud</button>
    </header>

  )
}

export default AdminHeader