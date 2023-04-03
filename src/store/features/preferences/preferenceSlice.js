import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import preferenceService from './preferenceService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

/** initial State for examiners */
const initialState = {
    allProgramItems: {
        items: [],
    },
    allYearItems: {
        items: [],
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** Program types */
/** create program type */
export const programTypeCreate = createAsyncThunk(
    'preference/program/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const createAttempt = await preferenceService.createProgramType(
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
            // return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)
/** edit program type */
export const programTypeUpdate = createAsyncThunk(
    'preference/program/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await preferenceService.updateProgramType(
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
/** get all program type */
export const programTypeGetAll = createAsyncThunk(
    'preference/program/getall',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await preferenceService.getProgramType(allValues)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
            //return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

/** Academic Year */
/** create academic year */
export const academicYearCreate = createAsyncThunk(
    'preference/academicYear/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const createAttempt = await preferenceService.createAcademicYear(
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
/** edit academic year */
export const academicYearUpdate = createAsyncThunk(
    'preference/academicYear/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await preferenceService.updateAcademicYear(
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
            //return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** get all academic year */
export const academicYearGetAll = createAsyncThunk(
    'preference/academicYear/getall',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await preferenceService.getAcademicYear(allValues)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            if (
                getAttempt.message === 'jwt expired' ||
                getAttempt.message === 'Not authenticated' ||
                getAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(getAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getAttempt.message)
            }
            //return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const preferenceSlice = createSlice({
    name: 'preferences',
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
            .addCase(programTypeCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(programTypeCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(programTypeCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(programTypeGetAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(programTypeGetAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allProgramItems = action.payload
            })
            .addCase(programTypeGetAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(programTypeUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(programTypeUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(programTypeUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(academicYearCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(academicYearCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(academicYearCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(academicYearGetAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(academicYearGetAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allYearItems = action.payload
            })
            .addCase(academicYearGetAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(academicYearUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(academicYearUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(academicYearUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = preferenceSlice.actions

export default preferenceSlice.reducer
