import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supervisorService from './supervisorService'

/** initial State for examiners */
const initialState = {
    paginatedSupervisors: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    allSupervisorItems: {
        items: [],
    },
    individualSupervisor: null,
  
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** project create opponent */
export const projectSupervisorCreate = createAsyncThunk(
    'supervisor/project/create',
    async (values, thunkAPI) => {
        const creationAttempt = await supervisorService.projectSupervisorCreate(
            values
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const assignSupervisor = createAsyncThunk(
    'supervisor/project/assign',
    async (values, thunkAPI) => {
        const assignAttempt = await supervisorService.assignSupervisor(values)
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedSupervisor = createAsyncThunk(
    'supervisor/paginated',
    async (values, thunkAPI) => {
        const getAttempt = await supervisorService.paginatedSupervisor(values)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allSupervisors = createAsyncThunk(
    'supervisor/all',
    async (values, thunkAPI) => {
        const allAttempt = await supervisorService.allSupervisors(values)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualSupervisor = createAsyncThunk(
    'supervisor/individual',
    async (id, thunkAPI) => {
        const individualAttempt = await supervisorService.getIndividualSupervisor(
            id
        )
        if (individualAttempt.type === 'success') {
            return individualAttempt
        } else {
            return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** examiner create */
export const supervisorUpdate = createAsyncThunk(
    'supervisor/update',
    async (values, thunkAPI) => {
        const creationAttempt = await supervisorService.supervisorUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)
export const supervisorSlice = createSlice({
    name: 'supervisor',
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
            .addCase(projectSupervisorCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectSupervisorCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectSupervisorCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(assignSupervisor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assignSupervisor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(assignSupervisor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(paginatedSupervisor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedSupervisor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedSupervisors = action.payload
            })
            .addCase(paginatedSupervisor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allSupervisors.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allSupervisors.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allSupervisorItems = action.payload
            })
            .addCase(allSupervisors.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualSupervisor.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualSupervisor.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualSupervisor = action.payload
            })
            .addCase(getIndividualSupervisor.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //update Examiner
            .addCase(supervisorUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(supervisorUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(supervisorUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = supervisorSlice.actions

export default supervisorSlice.reducer
