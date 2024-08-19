import { Logout } from '../../../store/features/auth/authSlice'
import toast from 'react-hot-toast'

/** error handler for toast response */
export let errorHandler = (errorResponse) => {
    if (errorResponse.payload.includes('ECONNREFUSED')) {
        return 'Check your internet connection'
    } else if (errorResponse.payload.includes('jwt expired')) {
        return 'Authentication expired'
    } else if (
        errorResponse.payload.includes('jwt malformed') ||
        errorResponse.payload.includes('invalid token')
    ) {
        return 'Authentication expired'
    } else if (errorResponse.payload.includes('Not authenticated')) {
        return 'Authentication required'
    } else if (errorResponse.payload.includes('Not authorized')) {
        return 'Authentication required'
    } else {
        let errorMessage = errorResponse.payload
        return errorMessage
    }
}

export let handleLogout = (dispatch) => {
    toast.dismiss()

    toast.loading('Logging out. please wait...')

    //inner logout toast function
    let handleLogoutToast = () => {
        toast.dismiss()
        toast.promise(
            dispatch(Logout()).then((res) => {
                // routeNavigate('/auth/signin', { replace: true })
            }),
            {
                loading: 'Logging out',
                success: (data) => 'Logged out successfully',
                error: (err) => {
                    return 'error while Logging out'
                },
            }
        )
    }

    setTimeout(handleLogoutToast, 3000)
}
