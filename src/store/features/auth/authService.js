//handle api requests
import Cookies from 'js-cookie'
import Moments from 'moment-timezone'
const Login = async (userData) => {
    const response = await window.electronAPI.loginValidation(userData)

    if (response.type === 'success') {
        Cookies.set('_tk', response.token, {
            expires: 30,
        })
        Cookies.set('user', JSON.stringify({ ...response }), {
            expires: 30,
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
    Cookies.remove('user')
    localStorage.removeItem('user')
}

const authService = {
    Login,
    logout,
}

export default authService
