//handle api requests
import Cookies from 'js-cookie'
import Moments from 'moment-timezone'
const Login = async (userData) => {
    const response = await window.electronAPI.loginValidation(userData)

    if (response.type === 'success') {
        Cookies.set('_tk', response.token, {
            expires: 1,
        })
        let newDate = Moments(new Date())
       
        localStorage.setItem(
            'user',
            JSON.stringify({ ...response, currentDate: newDate, type: null })
        )
    }

    return response
}

const logout = async () => {
    Cookies.remove('_tk')
    localStorage.removeItem('user')
}

const authService = {
    Login,
    logout,
}

export default authService
