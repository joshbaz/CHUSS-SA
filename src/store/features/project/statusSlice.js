import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectService from './projectService'
const initialState = {
    pprojects: {
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

/** update project statuses */
export const updateProjectStatus = createAsyncThunk(
    'projects/statues/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateProjectStatus(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project viva files */
export const updateVivaFiles = createAsyncThunk(
    'projects/vivafiles/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateVivaFiles(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project viva defense */
export const updateVivaDefense = createAsyncThunk(
    'projects/vivadefense/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateVivaDefense(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project final submission */
export const updateFinalSubmission = createAsyncThunk(
    'projects/finalsubmission/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateVivaDefense(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project final submission date */
export const updateSubmissionDate = createAsyncThunk(
    'projects/submissiondate/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateSubmissionDate(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project graduation date */
export const updateGraduationDate = createAsyncThunk(
    'projects/graduation/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateGraduationDate(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

export const statusSlice = createSlice({
    name: 'projectstatus',
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

            //project status update
            .addCase(updateProjectStatus.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProjectStatus.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateProjectStatus.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //project viva files update
            .addCase(updateVivaFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateVivaFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateVivaFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project viva defense update
            .addCase(updateVivaDefense.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateVivaDefense.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateVivaDefense.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project final submission update
            .addCase(updateFinalSubmission.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateFinalSubmission.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateFinalSubmission.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project  submission date update
            .addCase(updateSubmissionDate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateSubmissionDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateSubmissionDate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project  graduation date update
            .addCase(updateGraduationDate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateGraduationDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateGraduationDate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = statusSlice.actions

export default statusSlice.reducer
