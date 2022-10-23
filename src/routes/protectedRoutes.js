import { Fragment } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'

function ProtectedRoute({ children, redirectPath = '/auth/signin' }) {
    const isAuthenticated = !!JSON.parse(localStorage.getItem('user'))
    console.log('here', isAuthenticated)
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default ProtectedRoute
