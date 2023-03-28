import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import projectReducer from './features/project/projectSlice'
import examinerReducer from './features/Examiner/examinerSlice'
import opponentReducer from './features/opponents/opponentSlice'
import tagReducer from './features/tags/tagSlice'
import preferenceReducer from './features/preferences/preferenceSlice'
import reportReducer from './features/reports/reportSlice'
import paymentReducer from './features/payments/paymentSlice'
import statusReducer from './features/project/statusSlice'
import opponentReportReducer from './features/opponentReports/opponentReportSlice'
import supervisorReducer from './features/supervisors/supervisorSlice'
import doctoralReducer from './features/doctoralmembers/doctoralSlice'
import schoolReducer from './features/schools/schoolSlice'
import registrationReducer from './features/registration/registrationSlice'
import facilitatorReducer from './features/facilitators/facilitatorSlice'
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
        projectstatus: statusReducer,
        supervisor: supervisorReducer,
        doctoralMembers: doctoralReducer,
        opponentReport: opponentReportReducer,
        school: schoolReducer,
        registration: registrationReducer,
        facilitator: facilitatorReducer,
    },
})
