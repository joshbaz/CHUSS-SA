import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
//import Cookies from 'js-cookie'
// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))
//const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Login User
export const Login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    const LoginAttempt = await authService.Login(user)

    if (LoginAttempt.type === 'success') {
        return LoginAttempt
    } else {
        //console.log('login failed')
        return thunkAPI.rejectWithValue(LoginAttempt.message)
    }
})

export const Logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
    window.location.reload()
})

/** supervisor update */
export const facilitatorNewPasskey = createAsyncThunk(
    'auth/newpassword/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const creationAttempt = await authService.facilitatorNewPasskey(
            allValues
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/**
 * Note: the reducers are not asynchronous functions
 * The async goes in extraReducers
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(Login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(Login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(Login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(Logout.fulfilled, (state) => {
                state.user = null
                state.isSuccess = false
                state.message = 'logout success'
            })

            /**  facilitator new password */
            .addCase(facilitatorNewPasskey.pending, (state) => {
                state.isLoading = true
            })
            .addCase(facilitatorNewPasskey.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(facilitatorNewPasskey.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
