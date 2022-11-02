import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import opponentReportService from './opponentReportService'

let initialState = {
    individualReport: null,
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: '',
}

/** update report */
export const updateOpponentReport = createAsyncThunk(
    'opponentreports/update',
    async (values, thunkAPI) => {
        const updateAttempt = await opponentReportService.updateOpponentReport(
            values
        )

        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** individual report */
export const getOpponentReport = createAsyncThunk(
    'opponentreports/view',
    async (values, thunkAPI) => {
        const getAttempt = await opponentReportService.getOpponentReport(values)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)
export const opponentReportSlice = createSlice({
    name: 'opponentreport',
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
            .addCase(updateOpponentReport.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateOpponentReport.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateOpponentReport.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //individual examiner report
            .addCase(getOpponentReport.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOpponentReport.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualReport = action.payload
            })
            .addCase(getOpponentReport.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = opponentReportSlice.actions

export default opponentReportSlice.reducer
