import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('token'))

    return (
        authenticated ? 
        <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute