import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import paymentService from './paymentService'
import authService from '../auth/authService'
const getToken = localStorage.getItem('_tk')

/** initial State */
const initialState = {
    allPaymentItems: {
        items: [],
    },
    paginatedPayments: {
        items: [],
        overall_total: 0,
        currentPage: 0,
        perPage: 8,
        current_total: 0,
    },
    individualPayment: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}
/** update payments */
export const updatePayment = createAsyncThunk(
    'payment/update',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const updateAttempt = await paymentService.updatePayment(allValues)

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
/** paginated payments */
export const getPaginatedPayments = createAsyncThunk(
    'payment/paginated',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await paymentService.getPaginatedPayments(allValues)

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
/** single payment */
export const getSinglePayment = createAsyncThunk(
    'payment/individual',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await paymentService.getSinglePayment(allValues)

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
/** all payments */
export const getAllPayments = createAsyncThunk(
    'payment/allPayments',
    async (values, thunkAPI) => {
        let allValues = {
            ...values,
            getToken,
        }
        const getAttempt = await paymentService.getAllPayments(allValues)

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
export const paymentSlice = createSlice({
    name: 'payment',
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
            /** update payments */
            .addCase(updatePayment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** paginated */
            .addCase(getPaginatedPayments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPaginatedPayments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.paginatedPayments = action.payload
            })
            .addCase(getPaginatedPayments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** single payment */
            .addCase(getSinglePayment.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getSinglePayment.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.individualPayment = action.payload
            })
            .addCase(getSinglePayment.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            /** all payments */
            .addCase(getAllPayments.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPayments.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allPaymentItems = action.payload
            })
            .addCase(getAllPayments.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const { reset } = paymentSlice.actions

export default paymentSlice.reducer
