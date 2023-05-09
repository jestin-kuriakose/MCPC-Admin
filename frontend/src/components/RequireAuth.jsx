import React, { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const RequireAuth = () => {
    const { auth } = useContext(AuthContext)
    const location = useLocation()
    console.log(auth)
  return (
    auth?.email 
        ? <Outlet/> 
        : <Navigate to={'/login'} state={{from: location}} replace/>
  )
}

export default RequireAuth