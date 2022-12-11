import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import Cookies from 'js-cookie'
// Get user from localStorage
//const user = JSON.parse(localStorage.getItem('user'))
const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// //Login User
// export const Login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//     try {
//         return await authService.Login(user)
//     } catch (error) {
//         // const message =
//         //     (error.response &&
//         //         error.response.data &&
//         //         error.response.data.message) ||
//         //     error.message ||
//         //     error.toString()

//         let errorArray = []
//         errorArray.push(error)

//         let message
//         if (errorArray.length !== 0 && errorArray[0].response) {
//             message = errorArray[0].response.data
//         } else if (errorArray.length !== 0 && !errorArray[0].response) {
//             message = errorArray[0].message
//         }

//         return thunkAPI.rejectWithValue(message)
//     }
// })

//Login User
export const Login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    const LoginAttempt = await authService.Login(user)

    if (LoginAttempt.type === 'success') {
        return LoginAttempt
    } else {
        return thunkAPI.rejectWithValue(LoginAttempt.message)
    }
})

export const Logout = createAsyncThunk('auth/logout', async () => {
    authService.logout()
})

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
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
