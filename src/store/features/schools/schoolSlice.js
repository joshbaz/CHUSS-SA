import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import schoolService from './schoolService'

const initialState = {
    paginatedSchools: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },

    allSchoolItems: {
        items: [],
        overall_total: 0,
    },
    individualSchool: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** school create */
export const schoolCreate = createAsyncThunk(
    'school/create',
    async (values, thunkAPI) => {
        const creationAttempt = await schoolService.schoolCreate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/** school create */
export const schoolUpdate = createAsyncThunk(
    'school/update',
    async (values, thunkAPI) => {
        const creationAttempt = await schoolService.schoolUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const paginatedSchool = createAsyncThunk(
    'school/paginated',
    async (values, thunkAPI) => {
        const getAttempt = await schoolService.paginatedSchools(values)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allSchools = createAsyncThunk(
    'school/all',
    async (values, thunkAPI) => {
        const allAttempt = await schoolService.allSchools(values)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualSchool = createAsyncThunk(
    'school/individual',
    async (id, thunkAPI) => {
        const individualAttempt = await schoolService.getIndividualSchool(id)
        if (individualAttempt.type === 'success') {
            return individualAttempt
        } else {
            return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** department create */
export const departmentCreate = createAsyncThunk(
    'school/department/create',
    async (values, thunkAPI) => {
        const creationAttempt = await schoolService.departmentCreate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/** department create */
export const departmentUpdate = createAsyncThunk(
    'school/department/update',
    async (values, thunkAPI) => {
        const creationAttempt = await schoolService.departmentUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const schoolSlice = createSlice({
    name: 'school',
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

            .addCase(paginatedSchool.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedSchool.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedSchools = action.payload
            })
            .addCase(paginatedSchool.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allSchools.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allSchools.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allSchoolItems = action.payload
            })
            .addCase(allSchools.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualSchool.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualSchool.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualSchool = action.payload
            })
            .addCase(getIndividualSchool.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(schoolCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(schoolCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(schoolCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //update Examiner
            .addCase(schoolUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(schoolUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(schoolUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** department create */
            .addCase(departmentCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(departmentCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(departmentCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //update department
            .addCase(departmentUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(departmentUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(departmentUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = schoolSlice.actions

export default schoolSlice.reducer
