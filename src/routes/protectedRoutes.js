// import { Fragment } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
//import Cookies from 'js-cookie'
// import Moments from 'moment-timezone'
// import authService from '../store/features/auth/authService'
function ProtectedRoute({ children, redirectPath = '/auth/signin' }) {
    //const isAuthenticated = !!JSON.parse(localStorage.getItem('user'))
     const isAuthenticated = !!localStorage.getItem('_tk')
    // console.log('here', isAuthenticated)
    // const getAllItems = JSON.parse(localStorage.getItem('user'))
    // console.log('getAllItems.currentDate')
    // const recentDate = Moments(new Date())
    // const oldDate =
    //     getAllItems.currentDate === null
    //         ? ''
    //         : new Moments(getAllItems.currentDate)
    // let diff = getAllItems.currentDate ? recentDate.diff(oldDate, 'days') : 0
    // if (diff >= 1) {
    //     authService.logout()
    //     return <Navigate to={redirectPath} replace />
    // } else {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} replace />
}

export default ProtectedRoute
