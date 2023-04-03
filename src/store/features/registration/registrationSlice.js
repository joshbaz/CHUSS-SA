import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrationService from './registrationService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

let initialState = {
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

/** create registration */
export const createPRegistration = createAsyncThunk(
    'registration/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const createAttempt = await registrationService.createRegistration(
            allValues
        )

        if (createAttempt.type === 'success') {
            return createAttempt
        } else {
            if (
                createAttempt.message === 'jwt expired' ||
                createAttempt.message === 'Not authenticated' ||
                createAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(createAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(createAttempt.message)
            }
            //return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)

/** update registration */
export const updateRegistration = createAsyncThunk(
    'registration/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await registrationService.updateRegistration(
            allValues
        )

        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            if (
                updateAttempt.message === 'jwt expired' ||
                updateAttempt.message === 'Not authenticated' ||
                updateAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(updateAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(updateAttempt.message)
            }
            // return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update registration */
export const removeRegistration = createAsyncThunk(
    'registration/remove',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const removeAttempt = await registrationService.removeRegistration(
            allValues
        )

        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            if (
                removeAttempt.message === 'jwt expired' ||
                removeAttempt.message === 'Not authenticated' ||
                removeAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(removeAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(removeAttempt.message)
            }
            //return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)

export const registrationSlice = createSlice({
    name: 'registration',
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
            .addCase(createPRegistration.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPRegistration.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(createPRegistration.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //update registration
            .addCase(updateRegistration.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRegistration.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateRegistration.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //remove registration
            .addCase(removeRegistration.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeRegistration.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeRegistration.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = registrationSlice.actions

export default registrationSlice.reducer
