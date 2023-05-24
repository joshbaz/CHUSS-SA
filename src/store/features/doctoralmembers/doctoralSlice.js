import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import doctoralService from './doctoralService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

/** initial State for examiners */
const initialState = {
    paginatedDCMembers: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    allDCMemberItems: {
        items: [],
    },
    individualDCMember: null,

    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** project create opponent */
export const projectDCMemberCreate = createAsyncThunk(
    'dcmember/project/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await doctoralService.projectDCMemberCreate(
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

export const assignDCMember = createAsyncThunk(
    'dcmember/project/assign',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const assignAttempt = await doctoralService.assignDCMember(allValues)
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
            // return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedDCMember = createAsyncThunk(
    'dcmember/paginated',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await doctoralService.paginatedDCMember(allValues)
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
            // return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allDCMembers = createAsyncThunk(
    'dcmember/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const allAttempt = await doctoralService.allDCMembers(allValues)
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
            // return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualDCMember = createAsyncThunk(
    'dcmember/individual',
    async (id, thunkAPI) => {
        let allValues = {
            id: id,
            getToken,
        }
        const individualAttempt = await doctoralService.getIndividualDCMember(
            allValues
        )
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
            // return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** examiner create */
export const dcmemberUpdate = createAsyncThunk(
    'dcmember/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await doctoralService.dcmemberUpdate(allValues)
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

export const removeDCMember = createAsyncThunk(
    'dcmember/remove/c',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const removeAttempt = await doctoralService.removeDCMember(allValues)
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

//migrate supervisor to dc member
export const migrateSupervisortoDCMember = createAsyncThunk(
    'dcmember/migratesupervisor',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const migrateAttempt =
            await doctoralService.migrateSupervisortoDCMember(allValues)
        if (migrateAttempt.type === 'success') {
            return migrateAttempt
        } else {
            if (
                migrateAttempt.message === 'jwt expired' ||
                migrateAttempt.message === 'Not authenticated' ||
                migrateAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(migrateAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(migrateAttempt.message)
            }
            //return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)


/** DCMember main */
export const DCMemberCreate = createAsyncThunk(
    'doctoralmember/main/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await doctoralService.dCMemberCreate(allValues)
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

export const doctoralSlice = createSlice({
    name: 'dcmember',
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
            .addCase(projectDCMemberCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectDCMemberCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectDCMemberCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(assignDCMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assignDCMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(assignDCMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(paginatedDCMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedDCMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedDCMembers = action.payload
            })
            .addCase(paginatedDCMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allDCMembers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allDCMembers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allDCMemberItems = action.payload
            })
            .addCase(allDCMembers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualDCMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualDCMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualDCMember = action.payload
            })
            .addCase(getIndividualDCMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //update Examiner
            .addCase(dcmemberUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(dcmemberUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(dcmemberUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //remove
            //update Examiner
            .addCase(removeDCMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeDCMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeDCMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //migrate supervisor to dcmember
            .addCase(migrateSupervisortoDCMember.pending, (state) => {
                state.isLoading = true
            })
            .addCase(migrateSupervisortoDCMember.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(migrateSupervisortoDCMember.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //main doctoral member
            .addCase(DCMemberCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(DCMemberCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(DCMemberCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = doctoralSlice.actions

export default doctoralSlice.reducer
