import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import opponentService from './opponentService'

/** initial State for examiners */
const initialState = {
    paginatedOpponents: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    allOpponentItems: {
        items: [],
    },
    individualExaminer: null,
    studentData: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** project create opponent */
export const projectOpponentCreate = createAsyncThunk(
    'opponent/project/create',
    async (values, thunkAPI) => {
        const creationAttempt = await opponentService.projectOpponentCreate(
            values
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const assignOpponent = createAsyncThunk(
    'opponent/project/assign',
    async (values, thunkAPI) => {
        const assignAttempt = await opponentService.assignOpponent(values)
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedOpponent = createAsyncThunk(
    'opponent/paginated',
    async (values, thunkAPI) => {
        const getAttempt = await opponentService.paginatedOpponent(values)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allOpponents = createAsyncThunk(
    'opponent/all',
    async (values, thunkAPI) => {
        const allAttempt = await opponentService.allOpponent(values)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualOpponent = createAsyncThunk(
    'opponent/individual',
    async (id, thunkAPI) => {
        const individualAttempt = await opponentService.getIndividualOpponent(
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
export const opponentUpdate = createAsyncThunk(
    'opponent/update',
    async (values, thunkAPI) => {
        const creationAttempt = await opponentService.opponentUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)
export const opponentSlice = createSlice({
    name: 'opponent',
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
            .addCase(projectOpponentCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectOpponentCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectOpponentCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(assignOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assignOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(assignOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(paginatedOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedOpponents = action.payload
            })
            .addCase(paginatedOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allOpponents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allOpponents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allOpponentItems = action.payload
            })
            .addCase(allOpponents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualExaminer = action.payload
            })
            .addCase(getIndividualOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            
            //update Examiner
            .addCase(opponentUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(opponentUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(opponentUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = opponentSlice.actions

export default opponentSlice.reducer
