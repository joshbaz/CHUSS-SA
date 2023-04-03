import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import opponentService from './opponentService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

/** initial State for examiners */
const initialState = {
    paginatedOpponents: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    allOpponentItems: {
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

/** project create opponent */
export const projectOpponentCreate = createAsyncThunk(
    'opponent/project/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await opponentService.projectOpponentCreate(
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

export const assignOpponent = createAsyncThunk(
    'opponent/project/assign',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const assignAttempt = await opponentService.assignOpponent(allValues)
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
            //return thunkAPI.rejectWithValue(assignAttempt.message)
        }
    }
)

export const paginatedOpponent = createAsyncThunk(
    'opponent/paginated',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await opponentService.paginatedOpponent(allValues)
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
            // return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const allOpponents = createAsyncThunk(
    'opponent/all',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const allAttempt = await opponentService.allOpponent(allValues)
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
            // return thunkAPI.rejectWithValue(allAttempt.message)
        }
    }
)

export const getIndividualOpponent = createAsyncThunk(
    'opponent/individual',
    async (id, thunkAPI) => {
        let allValues = {
            id: id,
            getToken,
        }
        const individualAttempt = await opponentService.getIndividualOpponent(
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

/** examiner create */
export const opponentUpdate = createAsyncThunk(
    'opponent/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await opponentService.opponentUpdate(allValues)
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

/** examiner project App letter delete */
export const deleteFileOpponent = createAsyncThunk(
    'opponent/projectOpponentApp/delete',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const deleteAttempt = await opponentService.deleteFileOpponent(
            allValues
        )
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
export const addFileOpponent = createAsyncThunk(
    'opponents/projectOpponentApp/add',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const addAttempt = await opponentService.addFileOpponent(allValues)
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
export const removeProjectOpponent = createAsyncThunk(
    'opponents/removeOpponent',
    async (Info, thunkAPI) => {
        let allValues = {
            ...Info,
            getToken,
        }
        const removeAttempt = await opponentService.removeProjectOpponent(
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

/** project create opponent */
export const OpponentMainCreate = createAsyncThunk(
    'opponent/main/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const creationAttempt = await opponentService.OpponentMainCreate(
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
export const opponentSlice = createSlice({
    name: 'opponent',
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
            .addCase(projectOpponentCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(projectOpponentCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(projectOpponentCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(assignOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(assignOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(assignOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(paginatedOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(paginatedOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedOpponents = action.payload
            })
            .addCase(paginatedOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(allOpponents.pending, (state) => {
                state.isLoading = true
            })
            .addCase(allOpponents.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allOpponentItems = action.payload
            })
            .addCase(allOpponents.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getIndividualOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getIndividualOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualExaminer = action.payload
            })
            .addCase(getIndividualOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //update Examiner
            .addCase(opponentUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(opponentUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(opponentUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project  delete project app letter
            .addCase(deleteFileOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteFileOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(deleteFileOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //project add project app letter
            .addCase(addFileOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addFileOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(addFileOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //remove projectExaminer
            .addCase(removeProjectOpponent.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeProjectOpponent.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(removeProjectOpponent.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            /** main opponent create */
            .addCase(OpponentMainCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(OpponentMainCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(OpponentMainCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = opponentSlice.actions

export default opponentSlice.reducer
