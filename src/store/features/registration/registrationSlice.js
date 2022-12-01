import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import registrationService from './registrationService'

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
        const createAttempt = await registrationService.createRegistration(
            values
        )

        if (createAttempt.type === 'success') {
            return createAttempt
        } else {
            return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)

/** update registration */
export const updateRegistration = createAsyncThunk(
    'registration/update',
    async (values, thunkAPI) => {
        const updateAttempt = await registrationService.updateRegistration(
            values
        )

        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update registration */
export const removeRegistration = createAsyncThunk(
    'registration/remove',
    async (values, thunkAPI) => {
        const removeAttempt = await registrationService.removeRegistration(
            values
        )

        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
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
