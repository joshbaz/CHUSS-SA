import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import reportService from './reportService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

let initialState = {
    individualReport: null,
    allreports: {
        items: [],
        overall_total: 0,
    },
    stats: {
        allreports: 0,
        allreminders: 0,
        latereports: 0,
    },
    allreminders: {
        items: [],
    },
    alllatereports: {
        items: [],
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
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await reportService.updateExaminerReport(
            allValues
        )

        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            if (
                updateAttempt.message === 'jwt expired' ||
                updateAttempt.message === 'Not authenticated' ||
                updateAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(updateAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(updateAttempt.message)
            }
            //return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** individual report */
export const getExaminerReport = createAsyncThunk(
    'reports/view',
    async (values, thunkAPI) => {
        let allValues = {
            id: values,
            getToken,
        }
        const getAttempt = await reportService.getExaminerReport(allValues)

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

/** all reports */
export const getAllExaminerReports = createAsyncThunk(
    'reports/getall',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await reportService.getAllExaminerReports(allValues)

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

/** remove report file */
export const removeExRpfiles = createAsyncThunk(
    'reports/removeExfile',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const removeAttempt = await reportService.removeExRpfiles(allValues)

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

/**  report stats */
export const getReportStats = createAsyncThunk(
    'reports/stats',
    async (values, thunkAPI) => {
        let allValues = {
            id: values,
            getToken,
        }
        const getAttempt = await reportService.getReportStats(allValues)

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

/**  report stats */
export const getReportReminders = createAsyncThunk(
    'reports/reminders',
    async (values, thunkAPI) => {
        let allValues = {
            id: values,
            getToken,
        }
        const getAttempt = await reportService.getReportReminders(allValues)

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

/**  report stats */
export const getLateReports = createAsyncThunk(
    'reports/latereports',
    async (values, thunkAPI) => {
        let allValues = {
            id: values,
            getToken,
        }
        const getAttempt = await reportService.getLateReports(allValues)

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

            //report stats
            .addCase(getReportStats.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReportStats.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.stats = action.payload
            })
            .addCase(getReportStats.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //report reminders
            .addCase(getReportReminders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getReportReminders.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allreminders = action.payload
            })
            .addCase(getReportReminders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //report late reports
            .addCase(getLateReports.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getLateReports.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.alllatereports = action.payload
            })
            .addCase(getLateReports.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = reportSlice.actions

export default reportSlice.reducer
