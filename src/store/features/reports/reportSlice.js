import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from './reportService'

let initialState = {
    individualReport: null,
    allreports: {
        items: [],
        overall_total: 0,
    },
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

/** update report */
export const updateExaminerReport = createAsyncThunk(
    'reports/f/update',
    async (values, thunkAPI) => {
        console.log('are we even here et')
        const updateAttempt = await reportService.updateExaminerReport(values)
        console.log('are we even here yet')
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** individual report */
export const getExaminerReport = createAsyncThunk(
    'reports/view',
    async (values, thunkAPI) => {
        const getAttempt = await reportService.getExaminerReport(values)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

/** all reports */
export const getAllExaminerReports = createAsyncThunk(
    'reports/getall',
    async (values, thunkAPI) => {
        const getAttempt = await reportService.getAllExaminerReports(values)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

/** remove report file */
export const removeExRpfiles = createAsyncThunk(
    'reports/removeExfile',
    async (values, thunkAPI) => {
        const removeAttempt = await reportService.removeExRpfiles(values)

        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)

export const reportSlice = createSlice({
    name: 'report',
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
            .addCase(updateExaminerReport.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateExaminerReport.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateExaminerReport.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //individual examiner report
            .addCase(getExaminerReport.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getExaminerReport.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualReport = action.payload
            })
            .addCase(getExaminerReport.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //all examiner reports
            .addCase(getAllExaminerReports.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllExaminerReports.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allreports = action.payload
            })
            .addCase(getAllExaminerReports.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //remove a report file
            .addCase(removeExRpfiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeExRpfiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeExRpfiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = reportSlice.actions

export default reportSlice.reducer
