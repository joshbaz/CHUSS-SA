//handle api requests
import Cookies from 'js-cookie'
import Moments from 'moment-timezone'
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
    Cookies.remove('_tk')
    Cookies.remove('user')
    localStorage.removeItem('user')
    localStorage.removeItem('_tk')

    window.electronAPI.reloadApp()
}

const authService = {
    Login,
    logout,
}

export default authService
