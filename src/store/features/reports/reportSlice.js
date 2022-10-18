import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from './reportService'

let initialState = {
    individualReport: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

/** update report */
export const updateExaminerReport = createAsyncThunk(
    'reports/update',
    async (values, thunkAPI) => {
        const updateAttempt = await reportService.updateExaminerReport(values)

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
    },
})

export const { reset } = reportSlice.actions

export default reportSlice.reducer
