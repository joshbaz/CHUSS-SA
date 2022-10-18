import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import projectReducer from './features/project/projectSlice'
import examinerReducer from './features/Examiner/examinerSlice'
import opponentReducer from './features/opponents/opponentSlice'
import tagReducer from './features/tags/tagSlice'
import preferenceReducer from './features/preferences/preferenceSlice'
import reportReducer from './features/reports/reportSlice'
import paymentReducer from './features/payments/paymentSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
        project: projectReducer,
        examiner: examinerReducer,
        opponent: opponentReducer,
        tag: tagReducer,
        preference: preferenceReducer,
        report: reportReducer,
        payment: paymentReducer,
    },
})
