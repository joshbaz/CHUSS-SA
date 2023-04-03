//handle api requests
//import React from 'react'
import Cookies from 'js-cookie'
import Moments from 'moment-timezone'
//import { useNavigate } from 'react-router-dom'
const Login = async (userData) => {
    const response = await window.electronAPI.loginValidation(userData)

    if (response.type === 'success') {
        Cookies.set('_tk', response.token)
        Cookies.set('user', JSON.stringify({ ...response }))

        let newDate = Moments(new Date())
        //token
        localStorage.setItem('_tk', response.token)
        //user
        localStorage.setItem(
            'user',
            JSON.stringify({ ...response, currentDate: newDate, type: null })
        )
    }

    return response
}

const logout = async () => {
    // let useRoute = useNavigate()
    Cookies.remove('_tk')
    Cookies.remove('user')
    localStorage.removeItem('user')
    localStorage.removeItem('_tk')
    //Logouts()
    // window.location.reload()
    //window.electronAPI.reloadApp()
}

// const Logouts = () => {
//     let routeNavigate = useNavigate()

//     routeNavigate('/auth/signin', { replace: true })
//     // window.location.reload()
//     // window.electronAPI.reloadApp()
// }

/** service to create examiner from project */
const facilitatorNewPasskey = async (values) => {
    let allValues = {
        ...values,
    }
    const response = await window.electronAPI.newfacilitatorPasskey(allValues)

    return response
}

const authService = {
    Login,
    logout,
    facilitatorNewPasskey,
}

export default authService
