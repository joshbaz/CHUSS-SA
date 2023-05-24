import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import projectService from './projectService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

//let routeNavigate =
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

/** delete project projectDeletion */
export const projectDeletion = createAsyncThunk(
    'projects/delete/student',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const deleteAttempt = await projectService.projectDeletion(allValues)
        if (deleteAttempt.type === 'success') {
            return deleteAttempt
        } else {
            if (
                deleteAttempt.message === 'jwt expired' ||
                deleteAttempt.message === 'Not authenticated' ||
                deleteAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(deleteAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(deleteAttempt.message)
            }
            //return thunkAPI.rejectWithValue(deleteAttempt.message)
        }
    }
)
/** create project */
export const projectCreate = createAsyncThunk(
    'projects/create',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const createAttempt = await projectService.projectCreate(allValues)
        if (createAttempt.type === 'success') {
            return createAttempt
        } else {
            if (
                createAttempt.message === 'jwt expired' ||
                createAttempt.message === 'Not authenticated' ||
                createAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(createAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(createAttempt.message)
            }
            //return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)

/** update project */
export const projectUpdate = createAsyncThunk(
    'projects/updates/d',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
        }
        const updateAttempt = await projectService.projectUpdate(allValues)
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

/** get paginated projects */
export const getPProjects = createAsyncThunk(
    'projects/getPProjects',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const getPProjectAttempt = await projectService.getPProjects(allValues)
        if (getPProjectAttempt.type === 'success') {
            return getPProjectAttempt
        } else {
            if (
                getPProjectAttempt.message === 'jwt expired' ||
                getPProjectAttempt.message === 'Not authenticated' ||
                getPProjectAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(getPProjectAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getPProjectAttempt.message)
            }
            //return thunkAPI.rejectWithValue(getPProjectAttempt.message)
        }
    }
)

/** get all projects */
export const getAllProjects = createAsyncThunk(
    'projects/allProjects',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const getAttempt = await projectService.getAllProjects(allValues)
        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            // if (getAttempt.message.toLowerCase() === 'not authenticated') {
            //     console.log('.. cretified to get here')
            // }
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

/** get individual */
export const getIndividualProject = createAsyncThunk(
    'projects/individual',
    async (Info, thunkAPI) => {
        let allValues = {
            id: Info,
            getToken,
        }
        const getIndividualAttempt = await projectService.getIndividualProject(
            allValues
        )

        if (getIndividualAttempt.type === 'success') {
            return getIndividualAttempt
        } else {
            /** not authenticated / jwt expired */
            if (
                getIndividualAttempt.message === 'jwt expired' ||
                getIndividualAttempt.message === 'Not authenticated' ||
                getIndividualAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(getIndividualAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(getIndividualAttempt.message)
            }
            //return thunkAPI.rejectWithValue(getIndividualAttempt.message)
        }
    }
)

/** update project statuses */
export const updateProjectStatus = createAsyncThunk(
    'projects/statues/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateProjectStatus(
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

/** update project candidate files */
export const updateCandidateFiles = createAsyncThunk(
    'projects/candidatefiles/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateCandidateFiles(
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

/** update project viva files */
export const updateVivaFiles = createAsyncThunk(
    'projects/vivafiles/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateVivaFiles(allValues)
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

/** update project viva defense */
export const updateVivaDefense = createAsyncThunk(
    'projects/vivadefense/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateVivaDefense(allValues)
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

/** update project final submission */
export const updateFinalSubmission = createAsyncThunk(
    'projects/finalsubmission/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateFinalSubmission(
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
            // return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project final submission date */
export const updateSubmissionDate = createAsyncThunk(
    'projects/submissiondate/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateSubmissionDate(
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
            // return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** update project graduation date */
export const updateGraduationDate = createAsyncThunk(
    'projects/graduation/update',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateGraduationDate(
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
            // return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** examiner project App letter delete */
export const deleteFileExaminer = createAsyncThunk(
    'projects/projectExaminerApp/delete',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const deleteAttempt = await projectService.deleteFileExaminer(allValues)
        if (deleteAttempt.type === 'success') {
            return deleteAttempt
        } else {
            if (
                deleteAttempt.message === 'jwt expired' ||
                deleteAttempt.message === 'Not authenticated' ||
                deleteAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(deleteAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(deleteAttempt.message)
            }
            //return thunkAPI.rejectWithValue(deleteAttempt.message)
        }
    }
)

/** examiner project App letter delete */
export const addFileExaminer = createAsyncThunk(
    'projects/projectExaminerApp/add',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const addAttempt = await projectService.addFileExaminer(allValues)
        if (addAttempt.type === 'success') {
            return addAttempt
        } else {
            if (
                addAttempt.message === 'jwt expired' ||
                addAttempt.message === 'Not authenticated' ||
                addAttempt.message === 'jwt malformed'
            ) {
                await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(addAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(addAttempt.message)
            }
            //return thunkAPI.rejectWithValue(addAttempt.message)
        }
    }
)

/** project remove examiner  */
export const removeProjectExaminer = createAsyncThunk(
    'projects/removeExaminer',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const removeAttempt = await projectService.removeProjectExaminer(
            allValues
        )
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

/** project remove examiner  */
export const updateResubmission = createAsyncThunk(
    'projects/updates/resubmissions',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateResubmission(allValues)
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

/** project remove examiner  */
export const updateRRport = createAsyncThunk(
    'projects/updates/doingbest',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const updateAttempt = await projectService.updateRrrport(allValues)
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
            // return thunkAPI.rejectWithValue(updateAttempt.message)
        }
    }
)

/** project remove candidate files */
export const removeCaFiles = createAsyncThunk(
    'projects/removedfiles/candfiles',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const removeAttempt = await projectService.removeCaFiles(allValues)
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
            // return thunkAPI.rejectWithValue(removeAttempt.message)
        }
    }
)

/** project remove examiner  */
export const removeViFiles = createAsyncThunk(
    'projects/removefiles/vivaFiles',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const removeAttempt = await projectService.removeViFiles(allValues)
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
        }
    }
)
/** project remove examiner  */
export const removeFinalSFiles = createAsyncThunk(
    'projects/removeefiles/finalS',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const removeAttempt = await projectService.removeFinalSFiles(allValues)
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

            //delete Project
            .addCase(projectDeletion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectDeletion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectDeletion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = projectSlice.actions

export default projectSlice.reducer
