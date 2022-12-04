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
    allprojects: {
        items: [],
        overall_total: 0,
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

/** get paginated projects */
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

/** get all projects */
export const getAllProjects = createAsyncThunk(
    'projects/allProjects',
    async (Info, thunkAPI) => {
        const getAttempt = await projectService.getAllProjects(Info)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
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

/** examiner project App letter delete */
export const deleteFileExaminer = createAsyncThunk(
    'projects/projectExaminerApp/delete',
    async (Info, thunkAPI) => {
        const deleteAttempt = await projectService.deleteFileExaminer(Info)
        if (deleteAttempt.type === 'success') {
            return deleteAttempt
        } else {
            return thunkAPI.rejectWithValue(deleteAttempt.message)
        }
    }
)

/** examiner project App letter delete */
export const addFileExaminer = createAsyncThunk(
    'projects/projectExaminerApp/add',
    async (Info, thunkAPI) => {
        const addAttempt = await projectService.addFileExaminer(Info)
        if (addAttempt.type === 'success') {
            return addAttempt
        } else {
            return thunkAPI.rejectWithValue(addAttempt.message)
        }
    }
)

/** project remove examiner  */
export const removeProjectExaminer = createAsyncThunk(
    'projects/removeExaminer',
    async (Info, thunkAPI) => {
        const removeAttempt = await projectService.removeProjectExaminer(Info)
        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)

/** project remove examiner  */
export const updateResubmission = createAsyncThunk(
    'projects/updates/resubmissions',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateResubmission(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** project remove examiner  */
export const updateRRport = createAsyncThunk(
    'projects/updates/doingbest',
    async (Info, thunkAPI) => {
        const updateAttempt = await projectService.updateRrrport(Info)
        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** project remove candidate files */
export const removeCaFiles = createAsyncThunk(
    'projects/removedfiles/candfiles',
    async (Info, thunkAPI) => {
        const removeAttempt = await projectService.removeCaFiles(Info)
        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)

/** project remove examiner  */
export const removeViFiles = createAsyncThunk(
    'projects/removefiles/vivaFiles',
    async (Info, thunkAPI) => {
        const removeAttempt = await projectService.removeViFiles(Info)
        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)
/** project remove examiner  */
export const removeFinalSFiles = createAsyncThunk(
    'projects/removeefiles/finalS',
    async (Info, thunkAPI) => {
        const removeAttempt = await projectService.removeFinalSFiles(Info)
        if (removeAttempt.type === 'success') {
            return removeAttempt
        } else {
            return thunkAPI.rejectWithValue(removeAttempt.message)
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
            //all Project
            .addCase(getAllProjects.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProjects.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allprojects = action.payload
            })
            .addCase(getAllProjects.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //individual project
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
            //project  delete project app letter
            .addCase(deleteFileExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteFileExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deleteFileExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project add project app letter
            .addCase(addFileExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addFileExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(addFileExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //remove projectExaminer
            .addCase(removeProjectExaminer.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeProjectExaminer.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeProjectExaminer.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //update resubmission
            .addCase(updateResubmission.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateResubmission.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateResubmission.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //project  submission date update
            .addCase(updateRRport.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateRRport.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updateRRport.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //remove vandidates files
            .addCase(removeCaFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeCaFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeCaFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //remove viva files
            .addCase(removeViFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeViFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeViFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            //remove final submission files
            .addCase(removeFinalSFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeFinalSFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeFinalSFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = projectSlice.actions

export default projectSlice.reducer
