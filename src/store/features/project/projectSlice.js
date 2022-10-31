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
    individual: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

/** create project */
export const projectCreate = createAsyncThunk(
    'projects/create',
    async (Info, thunkAPI) => {
        const createAttempt = await projectService.projectCreate(Info)
        if (createAttempt.type === 'success') {
            return createAttempt
        } else {
            return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)

/** update project */
export const projectUpdate = createAsyncThunk(
    'projects/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.projectUpdate(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** get projects */
export const getPProjects = createAsyncThunk(
    'projects/getPProjects',
    async (Info, thunkAPI) => {
        const getPProjectAttempt = await projectService.getPProjects(Info)
        if (getPProjectAttempt.type === 'success') {
            return getPProjectAttempt
        } else {
            return thunkAPI.rejectWithValue(getPProjectAttempt.message)
        }
    }
)

/** get individual */
export const getIndividualProject = createAsyncThunk(
    'projects/individual',
    async (Info, thunkAPI) => {
        const getIndividualAttempt = await projectService.getIndividualProject(
            Info
        )

        if (getIndividualAttempt.type === 'success') {
            return getIndividualAttempt
        } else {
            return thunkAPI.rejectWithValue(getIndividualAttempt.message)
        }
    }
)

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

/** update project candidate files */
export const updateCandidateFiles = createAsyncThunk(
    'projects/candidatefiles/update',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateCandidateFiles(Info)
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
        const updateAttempt = await projectService.updateFinalSubmission(Info)
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

export const projectSlice = createSlice({
    name: 'project',
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
            .addCase(projectCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //project update
            .addCase(projectUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //paginated Project
            .addCase(getPProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.pprojects = action.payload
            })
            .addCase(getPProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualProject.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualProject.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individual = action.payload
            })
            .addCase(getIndividualProject.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
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

            //project candidate files update
            .addCase(updateCandidateFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCandidateFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateCandidateFiles.rejected, (state, action) => {
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

export const { reset } = projectSlice.actions

export default projectSlice.reducer
