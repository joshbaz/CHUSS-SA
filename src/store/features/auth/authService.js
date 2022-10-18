//handle api requests
import Cookies from 'js-cookie'
const Login = async (userData) => {
    const response = await window.electronAPI.loginValidation(userData)

    if (response.type === 'success') {
        Cookies.set('_tk', response.token, {
            expires: 1,
        })
        localStorage.setItem(
            'user',
            JSON.stringify({ ...response, type: null })
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
