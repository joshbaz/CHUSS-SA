import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import tagService from './tagService'

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
        const createAttempt = await tagService.createTag(values)

        if (createAttempt.type === 'success') {
            return createAttempt
        } else {
            return thunkAPI.rejectWithValue(createAttempt.message)
        }
    }
)

export const tagGetAll = createAsyncThunk(
    'tag/getall',
    async (values, thunkAPI) => {
        const getAttempt = await tagService.getTags(values)

        if (getAttempt.type === 'success') {
            return getAttempt
        } else {
            return thunkAPI.rejectWithValue(getAttempt.message)
        }
    }
)

export const tagUpdate = createAsyncThunk(
    'tag/update',
    async (values, thunkAPI) => {
        const updateAttempt = await tagService.updateTags(values)

        if (updateAttempt.type === 'success') {
            return updateAttempt
        } else {
            return thunkAPI.rejectWithValue(updateAttempt.message)
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
