import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import supervisorService from './supervisorService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

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
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await supervisorService.projectSupervisorCreate(
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

export const assignSupervisor = createAsyncThunk(
    'supervisor/project/assign',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const assignAttempt = await supervisorService.assignSupervisor(
            allValues
        )
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            if (
                assignAttempt.message === 'jwt expired' ||
                assignAttempt.message === 'Not authenticated' ||
                assignAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(assignAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(assignAttempt.message)
            }
            //return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedSupervisor = createAsyncThunk(
    'supervisor/paginated',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await supervisorService.paginatedSupervisor(
            allValues
        )
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

export const allSupervisors = createAsyncThunk(
    'supervisor/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const allAttempt = await supervisorService.allSupervisors(allValues)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            if (
                allAttempt.message === 'jwt expired' ||
                allAttempt.message === 'Not authenticated' ||
                allAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(allAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(allAttempt.message)
            }
            //return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualSupervisor = createAsyncThunk(
    'supervisor/individual',
    async (id, thunkAPI) => {
        let allValues = {
            id: id,
            getToken,
        }
        const individualAttempt =
            await supervisorService.getIndividualSupervisor(allValues)
        if (individualAttempt.type === 'success') {
            return individualAttempt
        } else {
            if (
                individualAttempt.message === 'jwt expired' ||
                individualAttempt.message === 'Not authenticated' ||
                individualAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(individualAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(individualAttempt.message)
            }
            //return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** supervisor update */
export const supervisorUpdate = createAsyncThunk(
    'supervisor/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await supervisorService.supervisorUpdate(
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

/** supervisor remove */
export const supervisorRemove = createAsyncThunk(
    'supervisor/remove',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await supervisorService.supervisorRemove(
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
            // return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)


/** supervisor main */
export const SupervisorCreate = createAsyncThunk(
    'supervisor/main/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await supervisorService.SupervisorCreate(
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

            //update Supervisor
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

            //remove Supervisor
            .addCase(supervisorRemove.pending, (state) => {
                state.isLoading = true
            })
            .addCase(supervisorRemove.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(supervisorRemove.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** main create supervisor */
            .addCase(SupervisorCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(SupervisorCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(SupervisorCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = supervisorSlice.actions

export default supervisorSlice.reducer
