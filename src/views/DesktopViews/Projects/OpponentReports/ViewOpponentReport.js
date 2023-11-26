/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import {
    reset,
    getOpponentReport,
} from '../../../../store/features/opponentReports/opponentReportSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import { useSelector, useDispatch } from 'react-redux'
import OpponentViewFile from '../../../../components/ProjectComponents/OpponentReportView/OpponentViewFile'
import OpponentReportDetails from '../../../../components/ProjectComponents/OpponentReportView/OpponentReportDetails'
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

const ViewOpponentReport = (props) => {
    const [initials, setInitials] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let { individualReport, isSuccess, isError, message } = useSelector(
        (state) => state.opponentReport
    )
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (params.p_id) {
        }
    }, [])
    useEffect(() => {
        if (
            individualReport !== null &&
            individualReport._id !== params.rp_id
        ) {
            toast.dismiss()
            toast.promise(
                dispatch(getIndividualProject(params.p_id))
                    .then((res) => {
                        //console.log('res', res)
                        if (res.meta.requestStatus === 'rejected') {
                            let responseCheck = errorHandler(res)
                            throw new Error(responseCheck)
                        } else {
                            return dispatch(getOpponentReport(params.rp_id))
                        }
                    })

                    .then((res) => {
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
        }
        if (individualReport === null) {
            toast.dismiss()
            toast.promise(
                dispatch(getIndividualProject(params.p_id))
                    .then((res) => {
                        //console.log('res', res)
                        if (res.meta.requestStatus === 'rejected') {
                            let responseCheck = errorHandler(res)
                            throw new Error(responseCheck)
                        } else {
                            return dispatch(getOpponentReport(params.rp_id))
                        }
                    })

                    .then((res) => {
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
        }
    }, [props, dispatch, individualReport])

    useEffect(() => {
        if (isError) {
            dispatch(reset())
            dispatch(areset())
        }
        dispatch(reset())
        dispatch(areset())
    }, [isError, isSuccess, message])

    useEffect(() => {
        if (IndividualProject.isError) {
            dispatch(preset())
            dispatch(areset())
        }
        dispatch(preset())
        dispatch(areset())
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
                                    ? `Opponent Report for ${IndividualProject.individual.student.studentName}`
                                    : `Opponent Report`
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
                                <Text>Opponent's Report</Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/phd/projects/opponents/updatereport/${params.p_id}/${params.rp_id}`
                                    )
                                }>
                                Update report
                            </SubmitButton>
                        </Stack>
                        {/** forms */}
                        <Stack direction='row' w='100%'>
                            {/** student and contact forms */}
                            <Stack direction='column' w='70%' spacing='20px'>
                                <OpponentViewFile
                                    values={initials}
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
                                <OpponentReportDetails values={initials} />
                            </Stack>
                        </Stack>
                    </Stack>
                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewOpponentReport

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
