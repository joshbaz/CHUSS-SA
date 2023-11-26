/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import ViewOverallScores from '../../../../components/ProjectComponents/ExaminerReportView/ViewOverallScores'
import ViewFiles from '../../../../components/ProjectComponents/ExaminerReportView/ViewFiles'
import ViewExaminerReportDetail from '../../../../components/ProjectComponents/ExaminerReportView/ViewExaminerReportDetail'
import {
    reset,
    getAllExaminerReports,
    getExaminerReport,
} from '../../../../store/features/reports/reportSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import { useSelector, useDispatch } from 'react-redux'
import { initSocketConnection } from '../../../../socketio.service'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

import { reset as areset } from '../../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../../components/common/CustomToastFunctions/ToastFunctions'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme
const MaViewExaminerReport = (props) => {
    const [initials, setInitials] = React.useState(null)
    const [newRDeat, setnewRDeat] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let { individualReport, allreports, isSuccess, isError, message } =
        useSelector((state) => state.report)
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (params.p_id) {
            //  dispatch(getIndividualProject(params.p_id))
        }
    }, [])
    useEffect(() => {
        // dispatch(getAllExaminerReports())
        // dispatch(getExaminerReport(params.rp_id))

        toast.dismiss()
        toast.promise(
            dispatch(getAllExaminerReports())
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getExaminerReport(params.rp_id))
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getIndividualProject(params.p_id))
                    }
                })

                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
            {
                loading: 'Retrieving Information',
                success: (data) => `Successfully retrieved`,
                error: (err) => {
                    if (
                        err
                            .toString()
                            .includes('Check your internet connection')
                    ) {
                        return 'Check Internet Connection'
                    } else if (
                        err.toString().includes('Authentication required')
                    ) {
                        setTimeout(() => handleLogout(dispatch), 3000)
                        return 'Not Authenticated'
                    } else if (
                        err.toString().includes('Authentication expired')
                    ) {
                        setTimeout(() => handleLogout(dispatch), 3000)
                        return 'Authentication Expired'
                    } else {
                        return `${err}`
                    }
                },
            }
        )
        const io = initSocketConnection()
        io.on('updatereport', (data) => {
            if (
                data.actions === 'update-report' &&
                data.data === params.rp_id
            ) {
                // dispatch(getAllExaminerReports())
                // dispatch(getExaminerReport(params.rp_id))

                toast.dismiss()
                toast.promise(
                    dispatch(getAllExaminerReports())
                        .then((res) => {
                            //console.log('res', res)
                            if (res.meta.requestStatus === 'rejected') {
                                let responseCheck = errorHandler(res)
                                throw new Error(responseCheck)
                            } else {
                                return dispatch(getExaminerReport(params.rp_id))
                            }
                        })

                        .then((res) => {
                            //console.log('res', res)
                            if (res.meta.requestStatus === 'rejected') {
                                let responseCheck = errorHandler(res)
                                throw new Error(responseCheck)
                            } else {
                                return res.payload.message
                            }
                        }),
                    {
                        loading: 'updating Information',
                        success: (data) => `Successfully updated`,
                        error: (err) => {
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication required')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Not Authenticated'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication expired')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Authentication Expired'
                            } else {
                                return `${err}`
                            }
                        },
                    }
                )
            }
        })
    }, [dispatch, params.rp_id])

    useEffect(() => {
        if (allreports.items.length > 0) {
            let allDetails = allreports.items.find(
                (data) => data._id === params.rp_id
            )
            if (allDetails) {
                let saveDeta = {
                    ...allDetails,
                    reportFile: null,
                    reportFiles:
                        allDetails.reportFiles &&
                        allDetails.reportFiles.length > 0
                            ? allDetails.reportFiles
                            : [],
                }
                setnewRDeat(() => saveDeta)
            }
        } else {
        }
    }, [params.rp_id, allreports])

    useEffect(() => {
        if (isError) {
            dispatch(areset())
            dispatch(reset())
        }
        dispatch(reset())
        dispatch(areset())
    }, [isError, isSuccess, message])

    useEffect(() => {
        if (IndividualProject.isError) {
            dispatch(areset())
            dispatch(preset())
        }
        dispatch(areset())
        dispatch(preset())
    }, [
        IndividualProject.isError,
        IndividualProject.isSuccess,
        IndividualProject.message,
        dispatch,
    ])

    useEffect(() => {
        if (initials === null && individualReport !== null) {
            if (individualReport._id === params.rp_id) {
                setInitials({
                    score: '',
                    remarks: '',
                    ungraded: false,
                    reportFiles:
                        individualReport !== null &&
                        individualReport.reportFiles > 0
                            ? [...individualReport.reportFiles]
                            : [],
                    ...individualReport,
                })
            }
        }

        // setloadingComponent(false)
        // return () => {
        //     setInitials(null)
        // }
    }, [individualReport, params.rp_id, initials])
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                spacing='20px'
                w='100%'
                bg='#ffffff'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{
                            title: `${
                                IndividualProject.individual !== null &&
                                IndividualProject.individual.student.studentName
                                    ? `Examiner Report for ${IndividualProject.individual.student.studentName}`
                                    : `Examiner Report`
                            }`,
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Stack
                        direction='column'
                        bg={backgroundMainColor}
                        minH='80vh'
                        borderRadius={backgroundRadius}
                        spacing={'20px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** back & submit button*/}
                        <Stack
                            direction='row'
                            alignItems='center'
                            color={textLightColor}
                            justifyContent='space-between'>
                            <BackButtonStack
                                className='back_button'
                                direction='row'
                                alignItems='center'>
                                <Box
                                    fontSize='25px'
                                    onClick={() => routeNavigate(-1)}>
                                    <MdArrowBack />
                                </Box>
                                <Text>Examiner's Report</Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/masters/projects/examiners/updatereport/${params.p_id}/${params.rp_id}`
                                    )
                                }>
                                Update report
                            </SubmitButton>
                        </Stack>
                        {/** forms */}
                        <Stack direction='row' w='100%'>
                            {/** student and contact forms */}
                            <Stack direction='column' w='70%' spacing='20px'>
                                <ViewOverallScores values={newRDeat} />
                                <ViewFiles
                                    values={newRDeat}
                                    nameValues={
                                        IndividualProject.individual !== null &&
                                        IndividualProject.individual.student
                                            .studentName
                                            ? IndividualProject.individual
                                                  .student.studentName
                                            : null
                                    }
                                />
                            </Stack>
                            {/** supervisior && date of submission & scanned form */}
                            <Stack direction='column' w='30%' spacing='20px'>
                                <ViewExaminerReportDetail values={newRDeat} />
                            </Stack>
                        </Stack>
                    </Stack>
                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default MaViewExaminerReport

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`

const SubmitButton = styled(Box)`
    background: #f4797f;
    width: 126px;
    height: 32px;
    box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
    border-radius: 6px;

    color: #ffffff;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
