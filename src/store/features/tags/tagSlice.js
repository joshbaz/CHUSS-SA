import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tagService from './tagService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

/** initial State for examiners */
const initialState = {
    allTagItems: {
        items: [],
    },

    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const tagCreate = createAsyncThunk(
    'tag/create',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const createAttempt = await tagService.createTag(allValues)

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

export const tagGetAll = createAsyncThunk(
    'tag/getall',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await tagService.getTags(allValues)

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

export const tagUpdate = createAsyncThunk(
    'tag/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await tagService.updateTags(allValues)

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

export const tagSlice = createSlice({
    name: 'tags',
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
            .addCase(tagCreate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(tagCreate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(tagCreate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(tagGetAll.pending, (state) => {
                state.isLoading = true
            })
            .addCase(tagGetAll.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allTagItems = action.payload
            })
            .addCase(tagGetAll.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(tagUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(tagUpdate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(tagUpdate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = tagSlice.actions

export default tagSlice.reducer
