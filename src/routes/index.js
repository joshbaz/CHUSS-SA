import React from 'react'

import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'

import ProtectedRoute from './protectedRoutes'
import Reset from '../views/AuthViews/Reset'
import AllProjects from '../views/DesktopViews/Projects/AllProjects'
import CreateProject from '../views/DesktopViews/Projects/CreateProject'
import ProjectReport from '../views/DesktopViews/Projects/ProjectReport'
import EditProject from '../views/DesktopViews/Projects/EditProject'
import AddExaminers from '../views/DesktopViews/Projects/AddExaminers'

import UpdateExaminer from '../views/DesktopViews/Projects/UpdateExaminer'

import AssignExaminer from '../views/DesktopViews/Projects/Examiners/AssignExaminer'
import CreateProjectExaminer from '../views/DesktopViews/Projects/Examiners/CreateProjectExaminer'
import ViewProjectExaminer from '../views/DesktopViews/Projects/ViewProjectExaminer'
import CreateExaminerReport from '../views/DesktopViews/Projects/ExaminerReports/CreateExaminerReport'
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
const AllRoutes = () => {
    return (
        <HashRouter>
            <Routes>
                <Route exact path='/reset' component={Reset} />
                <Route exact path='/auth/signin' element={<Login />} />
                <Route element={<ProtectedRoute />}>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/projects' element={<AllProjects />} />
                    <Route
                        exact
                        path='/projects/create'
                        element={<CreateProject />}
                    />

                    <Route
                        exact
                        path='/projects/edit/:id'
                        element={<EditProject />}
                    />
                    <Route
                        exact
                        path='/projects/projectreport/:id'
                        element={<ProjectReport />}
                    />

                    {/** route for assign supervisor */}
                    <Route
                        exact
                        path='/projects/supervisors/assign/:pid'
                        element={<AssignSupervisor />}
                    />
                    {/** create supervisors if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/supervisors/p_create/:pid'
                        element={<CreateProjectSupervisor />}
                    />

                    {/** route for assign doctoral comm member */}
                    <Route
                        exact
                        path='/projects/doctoralmember/assign/:pid'
                        element={<AssignDoctoralMember />}
                    />
                    {/** create doctoral comm member if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/doctoralmember/p_create/:pid'
                        element={<CreateProjectDMember />}
                    />
                    {/** route for assign opponents */}
                    <Route
                        exact
                        path='/projects/opponents/assign/:pid'
                        element={<AssignOpponent />}
                    />
                    {/** create opponents if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/opponents/p_create/:pid'
                        element={<CreateProjectOpponent />}
                    />

                    {/** opponent reports */}
                    <Route
                        exact
                        path='/projects/opponents/viewreport/:p_id/:rp_id'
                        element={<ViewOpponentReport />}
                    />

                    <Route
                        exact
                        path='/projects/opponents/updatereport/:p_id/:rp_id'
                        element={<EditOpponentReport />}
                    />

                    {/** route for assign examiners */}
                    <Route
                        exact
                        path='/projects/examiners/assign/:pid'
                        element={<AssignExaminer />}
                    />

                    {/** create examiner if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/examiners/p_create/:pid'
                        element={<CreateProjectExaminer />}
                    />

                    {/** create examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/create/:id'
                        element={<AddExaminers />}
                    />

                    {/** view examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/view/:p_id/:e_id'
                        element={<ViewProjectExaminer />}
                    />

                    {/** update examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/update/:s_id/:e_id'
                        element={<UpdateExaminer />}
                    />

                    {/** route to be removed */}
                    <Route
                        exact
                        path='/projects/examiners/createreport/:s_id/:e_id'
                        element={<CreateExaminerReport />}
                    />

                    <Route
                        exact
                        path='/projects/examiners/viewreport/:p_id/:rp_id'
                        element={<ViewExaminerReport />}
                    />

                    <Route
                        exact
                        path='/projects/examiners/updatereport/:p_id/:rp_id'
                        element={<EditExaminerReport />}
                    />

                    {/** Examiner page routes */}
                    <Route exact path='/examiners' element={<AllExaminers />} />

                    <Route
                        exact
                        path='/examiners/create'
                        element={<CreateNewExaminer />}
                    />

                    <Route
                        exact
                        path='/examiners/view/:id'
                        element={<ViewExaminer />}
                    />

                    <Route
                        exact
                        path='/examiners/edit/:id'
                        element={<EditExaminer />}
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
                    {/** Advanced search */}
                    <Route exact path='/advsearch' element={<AdvSearch />} />

                    {/** settings */}
                    <Route exact path='/setting' element={<Settings />} />
                </Route>
            </Routes>
        </HashRouter>
    )
}

export default AllRoutes
