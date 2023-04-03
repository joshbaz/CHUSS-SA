import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import examinerService from './examinerService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

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
        overall_total: 0,
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
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await examinerService.examinerCreate(allValues)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)
/** project create examiner */
export const projectExaminerCreate = createAsyncThunk(
    'examiner/project/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await examinerService.projectExaminerCreate(
            allValues
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

export const assignExaminer = createAsyncThunk(
    'examiner/project/assign',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const assignAttempt = await examinerService.assignExaminer(allValues)
        if (assignAttempt.type === 'success') {
            return assignAttempt
        } else {
            if (
                assignAttempt.message === 'jwt expired' ||
                assignAttempt.message === 'Not authenticated' ||
                assignAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(assignAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(assignAttempt.message)
            }
            // return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedExaminer = createAsyncThunk(
    'examiner/paginated',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await examinerService.paginatedExaminer(allValues)
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

export const allExaminers = createAsyncThunk(
    'examiner/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const allAttempt = await examinerService.allExaminer(allValues)
        if (allAttempt.type === 'success') {
            return allAttempt
        } else {
            if (
                allAttempt.message === 'jwt expired' ||
                allAttempt.message === 'Not authenticated' ||
                allAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(allAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(allAttempt.message)
            }
            //return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualExaminer = createAsyncThunk(
    'examiner/individual',
    async (id, thunkAPI) => {
        let allValues = {
            id: id,
            getToken,
        }
        const individualAttempt = await examinerService.getIndividualExaminer(
            allValues
        )
        if (individualAttempt.type === 'success') {
            return individualAttempt
        } else {
            if (
                individualAttempt.message === 'jwt expired' ||
                individualAttempt.message === 'Not authenticated' ||
                individualAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(individualAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(individualAttempt.message)
            }
            //return thunkAPI.rejectWithValue(individualAttempt.message)
        }
    }
)

/** get student data by examiner */
export const getStudentsByExaminer = createAsyncThunk(
    'examiner/getstudents',
    async (id, thunkAPI) => {
        let allValues = {
            id: id,
            getToken,
        }
        const getAttempt = await examinerService.getStudentsByExaminer(
            allValues
        )
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

/** examiner create */
export const examinerUpdate = createAsyncThunk(
    'examiner/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await examinerService.examinerUpdate(allValues)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/** examiner delete */
export const examinerDeletes = createAsyncThunk(
    'examiner/delete',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await examinerService.examinerDeletes(allValues)
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            // return thunkAPI.rejectWithValue(creationAttempt.message)
        }
    }
)

/** examiner delete */
export const examinerDeletesFiles = createAsyncThunk(
    'examiner/deletesfiles',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await examinerService.examinerDeletesFiles(
            allValues
        )
        if (creationAttempt.type === 'success') {
            return creationAttempt
        } else {
            if (
                creationAttempt.message === 'jwt expired' ||
                creationAttempt.message === 'Not authenticated' ||
                creationAttempt.message === 'jwt malformed'
            ) {
                 await authService.logout()
                window.location.reload()
                return thunkAPI.rejectWithValue(creationAttempt.message)
            } else {
                return thunkAPI.rejectWithValue(creationAttempt.message)
            }
            //return thunkAPI.rejectWithValue(creationAttempt.message)
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

            //delete Examiner
            .addCase(examinerDeletes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(examinerDeletes.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(examinerDeletes.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //delete Individual file
            .addCase(examinerDeletesFiles.pending, (state) => {
                state.isLoading = true
            })
            .addCase(examinerDeletesFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(examinerDeletesFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = examinerSlice.actions

export default examinerSlice.reducer
