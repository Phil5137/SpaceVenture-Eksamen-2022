import React, { useContext } from 'react'

import { LoginContext } from '../../context/LoginContext'


const AdminHeader = () => {

    const { user, signOut } = useContext(LoginContext)

  return (
    <header>
      Du er logget ind som: { user }
      <button onClick={ signOut }>Logud</button>
    </header>
  )
}

export default AdminHeader