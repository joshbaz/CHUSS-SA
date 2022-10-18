import { Fragment } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookie from 'js-cookie'

function ProtectedRoute({ children }) {
    const isAuthenticated = !!Cookie.get('_tk')

    return isAuthenticated ? children : <Navigate to='/auth/signin' />
}

export default ProtectedRoute
