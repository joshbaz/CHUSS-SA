import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import facilitatorService from './facilitatorService'
import authService from '../auth/authService'

const initialState = {
    allfacilitatorItems: {
        items: [],
    },

    allLoginActivityItems: {
        items: [],
    },

    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** project create opponent */
export const facilitatorCreate = createAsyncThunk(
    'facilitator/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const creationAttempt = await facilitatorService.facilitatorCreate(
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
                window.location.replace('/')
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const allFacilitators = createAsyncThunk(
    'facilitator/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const allAttempt = await facilitatorService.allFacilitators(allValues)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            if (
                allAttempt.message === 'jwt expired' ||
                allAttempt.message === 'Not authenticated' ||
                allAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.replace('/')
                return thunkAPI.rejectWithValue(allAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(allAttempt.message)
            }
            //return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

/** supervisor update */
export const facilitatorUpdate = createAsyncThunk(
    'facilitator/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const creationAttempt = await facilitatorService.facilitatorUpdate(
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
                 window.location.replace('/')
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const allLoginActivities = createAsyncThunk(
    'facilitator/loginActivities/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const allAttempt = await facilitatorService.allLoginActivities(
            allValues
        )
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            if (
                allAttempt.message === 'jwt expired' ||
                allAttempt.message === 'Not authenticated' ||
                allAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.replace('/')
                return thunkAPI.rejectWithValue(allAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(allAttempt.message)
            }
            //return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

/** supervisor update */
export const facilitatorResetPassword = createAsyncThunk(
    'facilitator/resetpassword/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const creationAttempt =
            await facilitatorService.facilitatorResetPassword(allValues)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.replace('/')
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/** deactivateFacilitator */
export const deactivateFacilitator = createAsyncThunk(
    'facilitator/deactivate',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
        }
        const creationAttempt = await facilitatorService.deactivateFacilitator(
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
                window.location.replace('/')
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const facilitatorSlice = createSlice({
    name: 'facilitator',
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
            .addCase(facilitatorCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(facilitatorCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(facilitatorCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** update facilitator */
            .addCase(facilitatorUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(facilitatorUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(facilitatorUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /**  facilitator reset password */
            .addCase(facilitatorResetPassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(facilitatorResetPassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(facilitatorResetPassword.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** all facilitator */
            .addCase(allFacilitators.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allFacilitators.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allfacilitatorItems = action.payload
            })
            .addCase(allFacilitators.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** all login activities */
            .addCase(allLoginActivities.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allLoginActivities.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allLoginActivityItems = action.payload
            })
            .addCase(allLoginActivities.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** deactivate facilitator */
            .addCase(deactivateFacilitator.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deactivateFacilitator.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deactivateFacilitator.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = facilitatorSlice.actions

export default facilitatorSlice.reducer
