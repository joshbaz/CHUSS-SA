import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import doctoralService from './doctoralService'

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
        const creationAttempt = await doctoralService.projectDCMemberCreate(
            values
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const assignDCMember = createAsyncThunk(
    'dcmember/project/assign',
    async (values, thunkAPI) => {
        const assignAttempt = await doctoralService.assignDCMember(values)
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedDCMember = createAsyncThunk(
    'dcmember/paginated',
    async (values, thunkAPI) => {
        const getAttempt = await doctoralService.paginatedDCMember(values)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allDCMembers = createAsyncThunk(
    'dcmember/all',
    async (values, thunkAPI) => {
        const allAttempt = await doctoralService.allDCMembers(values)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualDCMember = createAsyncThunk(
    'dcmember/individual',
    async (id, thunkAPI) => {
        const individualAttempt = await doctoralService.getIndividualDCMember(
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
export const dcmemberUpdate = createAsyncThunk(
    'dcmember/update',
    async (values, thunkAPI) => {
        const creationAttempt = await doctoralService.dcmemberUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const removeDCMember = createAsyncThunk(
    'dcmember/remove/c',
    async (values, thunkAPI) => {
        const removeAttempt = await doctoralService.removeDCMember(values)
        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
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
    },
})

export const { reset } = doctoralSlice.actions

export default doctoralSlice.reducer
