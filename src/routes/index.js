import React, { useEffect } from 'react'

import { HashRouter, Routes, Route } from 'react-router-dom'

import ProtectedRoute from './protectedRoutes'
import Reset from '../views/AuthViews/Reset'
//to remove
// import AllProjects from '../views/DesktopViews/Projects/AllPhdProjects'
// import CreateProject from '../views/DesktopViews/Projects/CreatePhdProject'
// import ProjectReport from '../views/DesktopViews/Projects/PhDProjectReport'
// import EditProject from '../views/DesktopViews/Projects/EditPhdProject'

import AssignExaminer from '../views/DesktopViews/Projects/Examiners/AssignExaminer'
import CreateProjectExaminer from '../views/DesktopViews/Projects/Examiners/CreateProjectExaminer'

import ViewExaminerReport from '../views/DesktopViews/Projects/ExaminerReports/ViewExaminerReport'
import EditExaminerReport from '../views/DesktopViews/Projects/ExaminerReports/EditExaminerReport'
import AllExaminers from '../views/DesktopViews/ExaminersView/AllExaminers'
import AllPayments from '../views/DesktopViews/Payments/AllPayments'
import AdvSearch from '../views/DesktopViews/AdvSearch/AdvSearch'
import Settings from '../views/DesktopViews/Settings/Settings'
import CreateNewExaminer from '../views/DesktopViews/ExaminersView/CreateNewExaminer'
import ViewExaminer from '../views/DesktopViews/ExaminersView/ViewExaminer'
import EditExaminer from '../views/DesktopViews/ExaminersView/EditExaminer'
import ViewPayment from '../views/DesktopViews/Payments/ViewPayment'
import UpdatePayment from '../views/DesktopViews/Payments/UpdatePayment'
import AssignOpponent from '../views/DesktopViews/Projects/Opponents/AssignOpponent'
import CreateProjectOpponent from '../views/DesktopViews/Projects/Opponents/CreateProjectOpponent'
import Login from '../views/AuthViews/Login'
import Dashboard from '../views/DesktopViews/Dashboard/Dashboard'
import AssignSupervisor from '../views/DesktopViews/Projects/Supervisors/AssignSupervisor'
import CreateProjectSupervisor from '../views/DesktopViews/Projects/Supervisors/CreateProjectSupervisor'
import AssignDoctoralMember from '../views/DesktopViews/Projects/DoctoralMembers/AssignDoctoralMember'
import CreateProjectDMember from '../views/DesktopViews/Projects/DoctoralMembers/CreateProjectDMember'
import ViewOpponentReport from '../views/DesktopViews/Projects/OpponentReports/ViewOpponentReport'
import EditOpponentReport from '../views/DesktopViews/Projects/OpponentReports/EditOpponentReport'
import AllSchools from '../views/DesktopViews/Schools&Depts/AllSchools'
import CreateNewSchool from '../views/DesktopViews/Schools&Depts/CreateNewSchool'
import ViewSchool from '../views/DesktopViews/Schools&Depts/ViewSchool'
import ManageExaminers from '../views/DesktopViews/ExaminersView/ManageExaminers'
import AllMastersProjects from '../views/DesktopViews/ProjectMasters/AllMastersProjects'
import CreateMastersProject from '../views/DesktopViews/ProjectMasters/CreateMastersProject'
import EditMastersProject from '../views/DesktopViews/ProjectMasters/EditMastersProject'
import MastersProjectReport from '../views/DesktopViews/ProjectMasters/MastersProjectReport'
import MaAssignSupervisors from '../views/DesktopViews/ProjectMasters/MastersSupervisors/MaAssignSupervisors'
import MaCreateProjectSupervisor from '../views/DesktopViews/ProjectMasters/MastersSupervisors/MaCreateProjectSupervisor'
import MaViewProjectSupervisor from '../views/DesktopViews/ProjectMasters/MastersSupervisors/MaViewProjectSupervisor'
import MaEditProjectSupervisor from '../views/DesktopViews/ProjectMasters/MastersSupervisors/MaEditProjectSupervisor'
import MaAssignExaminer from '../views/DesktopViews/ProjectMasters/MastersExaminers/MaAssignExaminer'
import MaCreateProjectExaminer from '../views/DesktopViews/ProjectMasters/MastersExaminers/MaCreateProjectExaminer'
import MaViewProjectExaminer from '../views/DesktopViews/ProjectMasters/MastersExaminers/MaViewProjectExaminer'
import MaEditProjectExaminer from '../views/DesktopViews/ProjectMasters/MastersExaminers/MaEditProjectExaminer'
import MaViewExaminerReport from '../views/DesktopViews/ProjectMasters/MastersExaminerReports/MaViewExaminerReport'
import MaEditExaminerReport from '../views/DesktopViews/ProjectMasters/MastersExaminerReports/MaEditExaminerReport'
import AllPhdProjects from '../views/DesktopViews/Projects/AllPhdProjects'
import CreatePhdProject from '../views/DesktopViews/Projects/CreatePhdProject'
import EditPhdProject from '../views/DesktopViews/Projects/EditPhdProject'
import PhDProjectReport from '../views/DesktopViews/Projects/PhDProjectReport'
import ViewDoctoralMember from '../views/DesktopViews/Projects/DoctoralMembers/ViewDoctoralMember'
import EditDoctoralMember from '../views/DesktopViews/Projects/DoctoralMembers/EditDoctoralMember'
import ViewPhdSupervisor from '../views/DesktopViews/Projects/Supervisors/ViewPhdSupervisor'
import EditPhdSupervisor from '../views/DesktopViews/Projects/Supervisors/EditPhdSupervisor'
import PhdViewProjectExaminer from '../views/DesktopViews/Projects/Examiners/PhdViewProjectExaminer'
import PhdEditProjectExaminer from '../views/DesktopViews/Projects/Examiners/PhdEditProjectExaminer'
import PhdViewProjectOpponent from '../views/DesktopViews/Projects/Opponents/PhdViewProjectOpponent'
import PhdEditProjectOpponent from '../views/DesktopViews/Projects/Opponents/PhdEditProjectOpponent'
import AllOpponents from '../views/DesktopViews/OpponentsView/AllOpponents'
import CreateNewOpponent from '../views/DesktopViews/OpponentsView/CreateNewOpponent'
import ViewOpponent from '../views/DesktopViews/OpponentsView/ViewOpponent'
import EditOpponent from '../views/DesktopViews/OpponentsView/EditOpponent'
import AllSupervisors from '../views/DesktopViews/ESupervisorsView/AllSupervisors'
import CreateNewSupervisor from '../views/DesktopViews/ESupervisorsView/CreateNewSupervisor'
import ViewSupervisor from '../views/DesktopViews/ESupervisorsView/ViewSupervisor'
import EditSupervisor from '../views/DesktopViews/ESupervisorsView/EditSupervisor'
//import Cookies from 'js-cookie'
import { useSelector } from 'react-redux'
import AdminDashboard from '../views/DesktopViews/Dashboard/AdminDashboard'
import AllFacilitators from '../views/DesktopViews/Facilitators/AllFacilitators'
import CreateNewFacilitators from '../views/DesktopViews/Facilitators/CreateNewFacilitators'
import UpdateFacilitators from '../views/DesktopViews/Facilitators/UpdateFacilitators'
import ViewFacilitator from '../views/DesktopViews/Facilitators/ViewFacilitator'
import ManageReports from '../views/DesktopViews/AdvSearch/ManageReports'
import ViewAllReports from '../views/DesktopViews/AdvSearch/ViewAllReports'
import ViewLateReports from '../views/DesktopViews/AdvSearch/ViewLateReports'
import ViewReminders from '../views/DesktopViews/AdvSearch/ViewReminders'
import AllDcMembers from '../views/DesktopViews/EDcMembersView/AllDcMembers'
import ViewDcMember from '../views/DesktopViews/EDcMembersView/ViewDcMember'
import CreateNewDcMember from '../views/DesktopViews/EDcMembersView/CreateNewDcMember'
import EditDcMember from '../views/DesktopViews/EDcMembersView/EditDcMember'

const AllRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('_tk')
    //let user = isAuthenticated ? JSON.parse(Cookies.get('user')) : null
    //  const getToken = Cookies.get('_tk')
    const [previledges, setPreviledges] = React.useState('Administrator')

    const { user, isSuccess } = useSelector((state) => state.auth)
    // console.log('_tk', getToken)
    useEffect(() => {
        if (user !== null) {
            setPreviledges(() => user.privileges)
        } else {
            setPreviledges(() => 'Administrator')
        }
    }, [user, isAuthenticated, isSuccess])

    return (
        <HashRouter basename='/'>
            <Routes>
                <Route exact path='/auth/reset' element={<Reset />} />
                <Route exact path='/auth/signin' element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    {previledges === 'Super Administrator' ? (
                        <Route exact path='/' element={<AdminDashboard />} />
                    ) : (
                        <Route exact path='/' element={<Dashboard />} />
                    )}

                    {previledges === 'Super Administrator' && (
                        <Route
                            exact
                            path='/facilitators'
                            element={<AllFacilitators />}
                        />
                    )}

                    {previledges === 'Super Administrator' && (
                        <Route
                            exact
                            path='/facilitators/create'
                            element={<CreateNewFacilitators />}
                        />
                    )}

                    {previledges === 'Super Administrator' && (
                        <Route
                            exact
                            path='/facilitators/update/:id'
                            element={<UpdateFacilitators />}
                        />
                    )}

                    {previledges === 'Super Administrator' && (
                        <Route
                            exact
                            path='/facilitators/view/:id'
                            element={<ViewFacilitator />}
                        />
                    )}

                    {/** masters student projects */}
                    {/** All Master student projects */}
                    <Route
                        exact
                        path='/masters/projects'
                        element={<AllMastersProjects />}
                    />
                    {/** masters create projects */}
                    <Route
                        exact
                        path='/masters/projects/create'
                        element={<CreateMastersProject />}
                    />
                    {/** masters edit project */}

                    <Route
                        exact
                        path='/masters/projects/edit/:id'
                        element={<EditMastersProject />}
                    />

                    {/** masters  project report */}

                    <Route
                        exact
                        path='/masters/projects/projectreport/:id'
                        element={<MastersProjectReport />}
                    />

                    {/** route for assign supervisor for masters */}
                    <Route
                        exact
                        path='/masters/projects/supervisors/assign/:pid'
                        element={<MaAssignSupervisors />}
                    />
                    {/** create supervisors if not found in assign inside masters project */}
                    <Route
                        exact
                        path='/masters/projects/supervisors/p_create/:pid'
                        element={<MaCreateProjectSupervisor />}
                    />

                    {/** view supervisors from project tab/page */}
                    <Route
                        exact
                        path='/masters/projects/supervisors/view/:p_id/:s_id'
                        element={<MaViewProjectSupervisor />}
                    />

                    {/** Masters - update supervisors from project tab/page */}
                    <Route
                        exact
                        path='/masters/projects/supervisors/update/:p_id/:s_id'
                        element={<MaEditProjectSupervisor />}
                    />

                    {/** route for assign examiners for master students */}
                    <Route
                        exact
                        path='/masters/projects/examiners/assign/:pid'
                        element={<MaAssignExaminer />}
                    />

                    {/** Masters create examiner if not found in assign inside project*/}
                    <Route
                        exact
                        path='/masters/projects/examiners/p_create/:pid'
                        element={<MaCreateProjectExaminer />}
                    />

                    {/** create examiner from project tab/page */}
                    {/**
                     * // <Route
                //     exact
                //     path='/masters/projects/examiners/create/:id'
                //     element={<AddExaminers />}
                // />
                     * 
                     */}

                    {/** view examiner from project tab/page */}
                    <Route
                        exact
                        path='/masters/projects/examiners/view/:p_id/:e_id'
                        element={<MaViewProjectExaminer />}
                    />

                    {/** Masters - update examiner from project tab/page */}
                    <Route
                        exact
                        path='/masters/projects/examiners/update/:p_id/:e_id'
                        element={<MaEditProjectExaminer />}
                    />

                    {/** Masters- view examiner report on masters */}
                    <Route
                        exact
                        path='/masters/projects/examiners/viewreport/:p_id/:rp_id'
                        element={<MaViewExaminerReport />}
                    />
                    {/** Masters- edit examiner report on masters */}
                    <Route
                        exact
                        path='/masters/projects/examiners/updatereport/:p_id/:rp_id'
                        element={<MaEditExaminerReport />}
                    />

                    {/** phd student projects */}
                    {/** All PHD student projects */}
                    <Route
                        exact
                        path='/phd/projects'
                        element={<AllPhdProjects />}
                    />
                    <Route
                        exact
                        path='/phd/projects/create'
                        element={<CreatePhdProject />}
                    />

                    <Route
                        exact
                        path='/phd/projects/edit/:id'
                        element={<EditPhdProject />}
                    />
                    <Route
                        exact
                        path='/phd/projects/projectreport/:id'
                        element={<PhDProjectReport />}
                    />

                    {/** route for assign supervisor for phd */}
                    <Route
                        exact
                        path='/phd/projects/supervisors/assign/:pid'
                        element={<AssignSupervisor />}
                    />
                    {/** create supervisors if not found in assign inside phd project */}
                    <Route
                        exact
                        path='/phd/projects/supervisors/p_create/:pid'
                        element={<CreateProjectSupervisor />}
                    />

                    {/** view supervisors from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/supervisors/view/:p_id/:s_id'
                        element={<ViewPhdSupervisor />}
                    />

                    {/** Masters - update supervisors from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/supervisors/update/:p_id/:s_id'
                        element={<EditPhdSupervisor />}
                    />

                    {/** route for assign doctoral comm member phd */}
                    <Route
                        exact
                        path='/phd/projects/doctoralmember/assign/:pid'
                        element={<AssignDoctoralMember />}
                    />
                    {/** create doctoral comm member if not found in assign inside project*/}
                    <Route
                        exact
                        path='/phd/projects/doctoralmember/p_create/:pid'
                        element={<CreateProjectDMember />}
                    />

                    {/** view doctoral comm member from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/doctoralmember/view/:p_id/:d_id'
                        element={<ViewDoctoralMember />}
                    />

                    {/** view doctoral comm member from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/doctoralmember/update/:p_id/:d_id'
                        element={<EditDoctoralMember />}
                    />
                    {/** route for assign opponents */}
                    <Route
                        exact
                        path='/phd/projects/opponents/assign/:pid'
                        element={<AssignOpponent />}
                    />
                    {/** create opponents if not found in assign inside project*/}
                    <Route
                        exact
                        path='/phd/projects/opponents/p_create/:pid'
                        element={<CreateProjectOpponent />}
                    />

                    {/** create opponents if not found in assign inside project*/}
                    <Route
                        exact
                        path='/phd/projects/opponents/view/:p_id/:o_id'
                        element={<PhdViewProjectOpponent />}
                    />

                    <Route
                        exact
                        path='/phd/projects/opponents/update/:p_id/:o_id'
                        element={<PhdEditProjectOpponent />}
                    />

                    {/** opponent reports */}
                    <Route
                        exact
                        path='/phd/projects/opponents/viewreport/:p_id/:rp_id'
                        element={<ViewOpponentReport />}
                    />

                    <Route
                        exact
                        path='/phd/projects/opponents/updatereport/:p_id/:rp_id'
                        element={<EditOpponentReport />}
                    />

                    {/** route for assign examiners for phd students */}
                    <Route
                        exact
                        path='/phd/projects/examiners/assign/:pid'
                        element={<AssignExaminer />}
                    />

                    {/** create examiner if not found in assign inside project*/}
                    <Route
                        exact
                        path='/phd/projects/examiners/p_create/:pid'
                        element={<CreateProjectExaminer />}
                    />

                    {/** create examiner from project tab/page to remove */}
                    {/**
                         * 
                         *  <Route
                        exact
                        path='/phd/projects/examiners/create/:id'
                        element={<AddExaminers />}
                    />
                         * 
                         */}

                    {/** view examiner from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/examiners/view/:p_id/:e_id'
                        element={<PhdViewProjectExaminer />}
                    />

                    {/** update examiner from project tab/page */}
                    <Route
                        exact
                        path='/phd/projects/examiners/update/:p_id/:e_id'
                        element={<PhdEditProjectExaminer />}
                    />

                    {/** view examiner report */}
                    <Route
                        exact
                        path='/phd/projects/examiners/viewreport/:p_id/:rp_id'
                        element={<ViewExaminerReport />}
                    />

                    <Route
                        exact
                        path='/phd/projects/examiners/updatereport/:p_id/:rp_id'
                        element={<EditExaminerReport />}
                    />

                    {/** Examiner page routes */}
                    <Route
                        exact
                        path='/m-examiners'
                        element={<ManageExaminers />}
                    />

                    {/** all Examiner page routes */}
                    <Route
                        exact
                        path='/m-examiners/examiners'
                        element={<AllExaminers />}
                    />

                    <Route
                        exact
                        path='/m-examiners/examiners/create'
                        element={<CreateNewExaminer />}
                    />

                    <Route
                        exact
                        path='/m-examiners/examiners/view/:id'
                        element={<ViewExaminer />}
                    />

                    <Route
                        exact
                        path='/m-examiners/examiners/edit/:id'
                        element={<EditExaminer />}
                    />
                    {/** all Opponents page routes */}
                    <Route
                        exact
                        path='/m-examiners/opponents'
                        element={<AllOpponents />}
                    />

                    <Route
                        exact
                        path='/m-examiners/opponents/create'
                        element={<CreateNewOpponent />}
                    />

                    <Route
                        exact
                        path='/m-examiners/opponents/view/:id'
                        element={<ViewOpponent />}
                    />

                    <Route
                        exact
                        path='/m-examiners/opponents/edit/:id'
                        element={<EditOpponent />}
                    />

                    {/** all supervisors page routes */}
                    <Route
                        exact
                        path='/m-examiners/supervisors'
                        element={<AllSupervisors />}
                    />

                    <Route
                        exact
                        path='/m-examiners/supervisors/create'
                        element={<CreateNewSupervisor />}
                    />

                    <Route
                        exact
                        path='/m-examiners/supervisors/view/:id'
                        element={<ViewSupervisor />}
                    />

                    <Route
                        exact
                        path='/m-examiners/supervisors/edit/:id'
                        element={<EditSupervisor />}
                    />

                    {/** all Doctoral member page routes */}
                    <Route
                        exact
                        path='/m-examiners/dcmembers'
                        element={<AllDcMembers />}
                    />

                    <Route
                        exact
                        path='/m-examiners/dcmembers/create'
                        element={<CreateNewDcMember />}
                    />

                    <Route
                        exact
                        path='/m-examiners/dcmembers/view/:id'
                        element={<ViewDcMember />}
                    />

                    <Route
                        exact
                        path='/m-examiners/dcmembers/edit/:id'
                        element={<EditDcMember />}
                    />

                    {/** payment page routes */}

                    <Route exact path='/payments' element={<AllPayments />} />

                    <Route
                        exact
                        path='/payments/view/:id'
                        element={<ViewPayment />}
                    />

                    <Route
                        exact
                        path='/payments/edit/:id'
                        element={<UpdatePayment />}
                    />
                    {/** schools and depts */}
                    <Route exact path='/schools' element={<AllSchools />} />
                    <Route
                        exact
                        path='/schools/create'
                        element={<CreateNewSchool />}
                    />
                    <Route
                        exact
                        path='/schools/view/:id'
                        element={<ViewSchool />}
                    />
                    {/** Advanced search */}
                    <Route exact path='/advsearch' element={<AdvSearch />} />

                    {/** Report page routes */}
                    <Route
                        exact
                        path='/m-reports'
                        element={<ManageReports />}
                    />
                    <Route
                        exact
                        path='/m-reports/allreports'
                        element={<ViewAllReports />}
                    />
                    <Route
                        exact
                        path='/m-reports/latereports'
                        element={<ViewLateReports />}
                    />

                    <Route
                        exact
                        path='/m-reports/reminders'
                        element={<ViewReminders />}
                    />

                    {/** settings */}
                    <Route exact path='/setting' element={<Settings />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AllRoutes
