import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import examinerService from './examinerService'

/** initial State for examiners */
const initialState = {
    paginatedExaminers: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    allExaminerItems: {
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
/** examiner create */
export const examinerCreate = createAsyncThunk(
    'examiner/create',
    async (values, thunkAPI) => {
        const creationAttempt = await examinerService.examinerCreate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)
/** project create examiner */
export const projectExaminerCreate = createAsyncThunk(
    'examiner/project/create',
    async (values, thunkAPI) => {
        const creationAttempt = await examinerService.projectExaminerCreate(
            values
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const assignExaminer = createAsyncThunk(
    'examiner/project/assign',
    async (values, thunkAPI) => {
        const assignAttempt = await examinerService.assignExaminer(values)
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedExaminer = createAsyncThunk(
    'examiner/paginated',
    async (values, thunkAPI) => {
        const getAttempt = await examinerService.paginatedExaminer(values)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allExaminers = createAsyncThunk(
    'examiner/all',
    async (values, thunkAPI) => {
        const allAttempt = await examinerService.allExaminer(values)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualExaminer = createAsyncThunk(
    'examiner/individual',
    async (id, thunkAPI) => {
        const individualAttempt = await examinerService.getIndividualExaminer(
            id
        )
        if (individualAttempt.type === 'success') {
            return individualAttempt
        } else {
            return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** get student data by examiner */
export const getStudentsByExaminer = createAsyncThunk(
    'examiner/getstudents',
    async (id, thunkAPI) => {
        const getAttempt = await examinerService.getStudentsByExaminer(id)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

/** examiner create */
export const examinerUpdate = createAsyncThunk(
    'examiner/update',
    async (values, thunkAPI) => {
        const creationAttempt = await examinerService.examinerUpdate(values)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)
export const examinerSlice = createSlice({
    name: 'examiner',
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
            .addCase(projectExaminerCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectExaminerCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectExaminerCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(assignExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assignExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(assignExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(paginatedExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedExaminers = action.payload
            })
            .addCase(paginatedExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allExaminers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allExaminers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allExaminerItems = action.payload
            })
            .addCase(allExaminers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualExaminer = action.payload
            })
            .addCase(getIndividualExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(examinerCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(examinerCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(examinerCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //getStudentsByExaminer
            .addCase(getStudentsByExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getStudentsByExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.studentData = action.payload
            })
            .addCase(getStudentsByExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //update Examiner
            .addCase(examinerUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(examinerUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(examinerUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = examinerSlice.actions

export default examinerSlice.reducer
