import React from 'react'

import { BrowserRouter,HashRouter, Routes, Route } from 'react-router-dom'
import { dashboardLightTheme } from '../theme/dashboard_theme'
import { ThemeProvider } from 'styled-components'

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
const AllRoutes = () => {
    return (
        <HashRouter>
            <ThemeProvider theme={dashboardLightTheme}>
                <Routes>
                    <Route exact path='/reset' component={Reset} />
                    <Route exact path='/auth/signin' element={<Login />} />
                    <Route
                        exact
                        path='/'
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path='/projects'
                        element={
                            <ProtectedRoute>
                                <AllProjects />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path='/projects/create'
                        element={
                            <ProtectedRoute>
                                <CreateProject />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/projects/edit/:id'
                        element={
                            <ProtectedRoute>
                                <EditProject />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path='/projects/projectreport/:id'
                        element={
                            <ProtectedRoute>
                                <ProjectReport />
                            </ProtectedRoute>
                        }
                    />

                    {/** route for assign opponents */}
                    <Route
                        exact
                        path='/projects/opponents/assign/:pid'
                        element={
                            <ProtectedRoute>
                                <AssignOpponent />
                            </ProtectedRoute>
                        }
                    />
                    {/** create opponents if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/opponents/p_create/:pid'
                        element={
                            <ProtectedRoute>
                                <CreateProjectOpponent />
                            </ProtectedRoute>
                        }
                    />

                    {/** route for assign examiners */}
                    <Route
                        exact
                        path='/projects/examiners/assign/:pid'
                        element={
                            <ProtectedRoute>
                                <AssignExaminer />
                            </ProtectedRoute>
                        }
                    />

                    {/** create examiner if not found in assign inside project*/}
                    <Route
                        exact
                        path='/projects/examiners/p_create/:pid'
                        element={
                            <ProtectedRoute>
                                <CreateProjectExaminer />
                            </ProtectedRoute>
                        }
                    />

                    {/** create examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/create/:id'
                        element={
                            <ProtectedRoute>
                                <AddExaminers />
                            </ProtectedRoute>
                        }
                    />

                    {/** view examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/view/:p_id/:e_id'
                        element={
                            <ProtectedRoute>
                                <ViewProjectExaminer />
                            </ProtectedRoute>
                        }
                    />

                    {/** update examiner from project tab/page */}
                    <Route
                        exact
                        path='/projects/examiners/update/:s_id/:e_id'
                        element={
                            <ProtectedRoute>
                                <UpdateExaminer />
                            </ProtectedRoute>
                        }
                    />

                    {/** route to be removed */}
                    <Route
                        exact
                        path='/projects/examiners/createreport/:s_id/:e_id'
                        element={
                            <ProtectedRoute>
                                <CreateExaminerReport />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/projects/examiners/viewreport/:p_id/:rp_id'
                        element={
                            <ProtectedRoute>
                                <ViewExaminerReport />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/projects/examiners/updatereport/:p_id/:rp_id'
                        element={
                            <ProtectedRoute>
                                <EditExaminerReport />
                            </ProtectedRoute>
                        }
                    />

                    {/** Examiner page routes */}
                    <Route
                        exact
                        path='/examiners'
                        element={
                            <ProtectedRoute>
                                <AllExaminers />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/examiners/create'
                        element={
                            <ProtectedRoute>
                                <CreateNewExaminer />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/examiners/view/:id'
                        element={
                            <ProtectedRoute>
                                <ViewExaminer />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/examiners/edit/:id'
                        element={
                            <ProtectedRoute>
                                <EditExaminer />
                            </ProtectedRoute>
                        }
                    />

                    {/** payment page routes */}

                    <Route
                        exact
                        path='/payments'
                        element={
                            <ProtectedRoute>
                                <AllPayments />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/payments/view/:id'
                        element={
                            <ProtectedRoute>
                                <ViewPayment />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        exact
                        path='/payments/edit/:id'
                        element={
                            <ProtectedRoute>
                                <UpdatePayment />
                            </ProtectedRoute>
                        }
                    />
                    {/** Advanced search */}
                    <Route
                        exact
                        path='/advsearch'
                        element={
                            <ProtectedRoute>
                                <AdvSearch />
                            </ProtectedRoute>
                        }
                    />

                    {/** settings */}
                    <Route
                        exact
                        path='/setting'
                        element={
                            <ProtectedRoute>
                                <Settings />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </ThemeProvider>
        </HashRouter>
    )
}

export default AllRoutes
