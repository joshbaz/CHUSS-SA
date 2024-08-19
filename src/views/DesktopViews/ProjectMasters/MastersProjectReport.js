/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import CandidateProfile from '../../../components/ProjectComponents/ProjectReport/CandidateProfile'
import GradingProgress from '../../../components/ProjectComponents/ProjectReport/GradingProgress'
import AssignedExaminers from '../../../components/ProjectComponents/ProjectReport/AssignedExaminers'
import ExaminersReports from '../../../components/ProjectComponents/ProjectReport/ExaminersReports'
import CandidatesFiles from '../../../components/ProjectComponents/ProjectReport/CandidatesFiles'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualProject,
    reset,
} from '../../../store/features/project/projectSlice'
import {
    reset as treset,
    tagGetAll,
} from '../../../store/features/tags/tagSlice'
import {
    academicYearGetAll,
    reset as acreset,
} from '../../../store/features/preferences/preferenceSlice'
import FinalSubmission from '../../../components/ProjectComponents/ProjectReport/FinalSubmission'
import AdmissionStatus from '../../../components/ProjectComponents/ProjectReport/AdmissionStatus'
import RegistrationReports from '../../../components/ProjectComponents/ProjectReport/RegistrationReports'
import MastersProjectDetails from '../../../components/ProjectComponents/ProjectReport/MastersProjectDetails'
import MastersVivaReport from '../../../components/ProjectComponents/ProjectReport/MastersVivaReport'
import { initSocketConnection } from '../../../socketio.service.js'
import ProgressStatus2 from '../../../components/ProjectComponents/ProjectReport/ProgressStatus2'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
import { Logout, reset as areset } from '../../../store/features/auth/authSlice'
import toast from 'react-hot-toast'

const PageLinks = [
    {
        title: 'Registration',
        id: 'registration',
    },
    {
        title: 'Candidate Files',
        id: 'candidatefiles',
    },
    {
        title: 'Examiner reports',
        id: 'examinerreport',
    },
    {
        title: 'Viva Report',
        id: 'vivareport',
    },
    {
        title: 'Final Submission',
        id: 'finalsubmissionss',
    },
]
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const MastersProjectReport = () => {
    let routeNavigate = useNavigate()
    //let location = useLocation()
    let params = useParams()

    // let toast = useToast()
    let dispatch = useDispatch()
    let { individual, isSuccess, isError, message } = useSelector(
        (state) => state.project
    )
    const tagsData = useSelector((state) => state.tag)

    const preferenceData = useSelector((state) => state.preference)

    /** error handler for toast response */
    let errorHandler = (errorResponse) => {
        if (errorResponse.payload.includes('ECONNREFUSED')) {
            return 'Check your internet connection'
        } else if (errorResponse.payload.includes('jwt expired')) {
            return 'Authentication expired'
        } else if (
            errorResponse.payload.includes('jwt malformed') ||
            errorResponse.payload.includes('invalid token')
        ) {
            return 'Authentication expired'
        } else if (errorResponse.payload.includes('Not authenticated')) {
            return 'Authentication required'
        } else if (errorResponse.payload.includes('Not authorized')) {
            return 'Authentication required'
        } else {
            let errorMessage = errorResponse.payload
            return errorMessage
        }
    }

    //function to handle smooth Logout
    let handleLogout = () => {
        toast.dismiss()

        toast.loading('Logging out. please wait...')

        //inner logout toast function
        let handleLogoutToast = () => {
            toast.dismiss()
            toast.promise(
                dispatch(Logout()).then((res) => {
                    // routeNavigate('/auth/signin', { replace: true })
                }),
                {
                    loading: 'Logging out',
                    success: (data) => 'Logged out successfully',
                    error: (err) => {
                        return 'error while Logging out'
                    },
                }
            )
        }

        setTimeout(handleLogoutToast, 3000)
    }

    useEffect(() => {
        let id = params.id

        const io = initSocketConnection()

        toast.dismiss()
        toast.promise(
            dispatch(getIndividualProject(id))
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(tagGetAll())
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(academicYearGetAll())
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return 'data collected'
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
                        setTimeout(handleLogout, 3000)
                        return 'Not Authenticated'
                    } else if (
                        err.toString().includes('Authentication expired')
                    ) {
                        setTimeout(handleLogout, 3000)
                        return 'Authentication Expired'
                    } else {
                        return `${err}`
                    }
                },
            }
        )

        io.on(
            'updatestudent',
            (data) => {
                if (
                    data.actions === 'update-student' &&
                    data.data === params.id
                ) {
                    toast.dismiss()

                    toast.promise(
                        dispatch(getIndividualProject(id))
                            .then((res) => {
                                if (res.meta.requestStatus === 'rejected') {
                                    let responseCheck = errorHandler(res)
                                    throw new Error(responseCheck)
                                } else {
                                    return dispatch(tagGetAll())
                                }
                            })
                            .then((res) => {
                                if (res.meta.requestStatus === 'rejected') {
                                    let responseCheck = errorHandler(res)
                                    throw new Error(responseCheck)
                                } else {
                                    return dispatch(academicYearGetAll())
                                }
                            }),
                        {
                            loading: 'updating Information',
                            success: (data) => `Successfully updated`,
                            error: (err) => {
                                if (
                                    err
                                        .toString()
                                        .includes(
                                            'Check your internet connection'
                                        )
                                ) {
                                    return 'Check Internet Connection'
                                } else if (
                                    err
                                        .toString()
                                        .includes('Authentication required')
                                ) {
                                    setTimeout(handleLogout, 3000)
                                    return 'Not Authenticated'
                                } else if (
                                    err
                                        .toString()
                                        .includes('Authentication expired')
                                ) {
                                    setTimeout(handleLogout, 3000)
                                    return 'Authentication Expired'
                                } else {
                                    return `${err}`
                                }
                            },
                        }
                    )
                }
            },
            {
                position: 'bottom-right',
            }
        )

        io.on('updatetag', (data) => {
            if (data.actions === 'update-tag') {
                toast.dismiss()

                toast.promise(
                    dispatch(tagGetAll()).then((res) => {
                        if (res.meta.requestStatus === 'rejected') {
                            let responseCheck = errorHandler(res)
                            throw new Error(responseCheck)
                        } else {
                            return 'Data retrieved'
                        }
                    }),
                    {
                        loading: 'updating status information',
                        success: (data) => `successfully updated`,
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
                                setTimeout(handleLogout, 3000)
                                return 'Not Authenticated'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication expired')
                            ) {
                                setTimeout(handleLogout, 3000)
                                return 'Authentication Expired'
                            } else {
                                return `${err}`
                            }
                        },
                    },
                    {
                        position: 'bottom-right',
                    }
                )
            }
        })
    }, [params.id, dispatch])

    useEffect(() => {
        if (isError) {
            dispatch(reset())
            dispatch(areset())
        }

        dispatch(reset())
        dispatch(areset())
    }, [isSuccess, isError, message])

    useEffect(() => {
        if (tagsData.isError) {
            dispatch(treset())
            dispatch(areset())
        }
        dispatch(treset())
        dispatch(areset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagsData.isError, tagsData.isSuccess, tagsData.message, dispatch])

    useEffect(() => {
        if (preferenceData.isError) {
            dispatch(acreset())
        }
        dispatch(acreset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        preferenceData.isError,
        preferenceData.isSuccess,
        preferenceData.message,
        dispatch,
    ])

    /** scroll function */
    const handleScroll = (linkid) => {
        // document.getElementById(linkid).scrollIntoView({
        //     behavior: 'smooth',
        // })

        const element = document.getElementById(linkid)
        const offset = 15
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        })
    }
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
                                individual !== null &&
                                individual.student.studentName
                                    ? `Report for ${individual.student.studentName}`
                                    : `Report`
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
                        {/** title head */}
                        <Stack direction='column' spacing='35px'>
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
                                    <Text>Masters Student Report</Text>
                                </BackButtonStack>
                            </Stack>

                            <Stack direction='row' spacing='11px'>
                                {PageLinks.map((data, index) => {
                                    return (
                                        <Box>
                                            <LinksPage
                                                key={index}
                                                onClick={() =>
                                                    handleScroll(data.id)
                                                }>
                                                {data.title}
                                            </LinksPage>
                                        </Box>
                                    )
                                })}
                            </Stack>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%' spacing='30px'>
                            {/** first set */}
                            <Stack h='100%'>
                                <ProgressStatus2
                                    values={individual}
                                    allTagData={tagsData.allTagItems.items}
                                    type={'Masters'}
                                    sNames={
                                        individual !== null &&
                                        individual.student.studentName
                                            ? individual.student.studentName
                                            : ''
                                    }
                                />
                            </Stack>

                            {/** second set */}
                            <Stack direction='row' spacing='20px'>
                                {/** candidate details & Project details */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    {/** reusable component */}
                                    <CandidateProfile
                                        values={individual}
                                        rlink='/masters'
                                    />

                                    <MastersProjectDetails
                                        rlink={'/masters'}
                                        values={individual}
                                    />
                                </Stack>

                                {/** Grading Progress & Assigned Examiners */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <AdmissionStatus values={individual} />
                                    <GradingProgress values={individual} />

                                    <AssignedExaminers
                                        values={individual}
                                        rlink={'/masters'}
                                    />
                                </Stack>
                            </Stack>

                            {/** third set */}
                            <Stack spacing='24px'>
                                <Box id='registration'>
                                    <RegistrationReports
                                        values={individual}
                                        yearData={
                                            preferenceData.allYearItems.items
                                        }
                                    />
                                </Box>

                                <Box id='candidatefiles'>
                                    <CandidatesFiles
                                        values={individual}
                                        nameValues={
                                            individual !== null &&
                                            individual.student.studentName
                                                ? individual.student.studentName
                                                : ''
                                        }
                                    />
                                </Box>

                                {/** table */}
                                <Box id='examinerreport'>
                                    <ExaminersReports
                                        values={individual}
                                        rlink={'/masters'}
                                        sNames={
                                            individual !== null &&
                                            individual.student.studentName
                                                ? individual.student.studentName
                                                : ''
                                        }
                                    />
                                </Box>

                                <Box id='vivareport'>
                                    <MastersVivaReport
                                        values={individual}
                                        allTagData={tagsData.allTagItems.items}
                                        type={'Masters'}
                                        nameValues={
                                            individual !== null &&
                                            individual.student.studentName
                                                ? individual.student.studentName
                                                : ''
                                        }
                                    />
                                </Box>

                                <Box id='finalsubmissionss'>
                                    <FinalSubmission
                                        values={individual}
                                        nameValues={
                                            individual !== null &&
                                            individual.student.studentName
                                                ? individual.student.studentName
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default MastersProjectReport

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`

const LinksPage = styled(Box)`
    background: #ffffff;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
        0px 0px 0px 1px rgba(70, 79, 96, 0.16);
    border-radius: 6px;
    padding: 6px 12px;
    color: #464f60;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
`
