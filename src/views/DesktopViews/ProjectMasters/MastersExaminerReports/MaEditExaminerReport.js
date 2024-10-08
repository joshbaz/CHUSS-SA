/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import UpdateOverallScores from '../../../../components/ProjectComponents/ExaminerReportUpdate/UpdateOverallScores'
import ViewUpdatedFiles from '../../../../components/ProjectComponents/ExaminerReportUpdate/ViewUpdatedFiles'
import ViewUpdateExaminerDetail from '../../../../components/ProjectComponents/ExaminerReportUpdate/ViewUpdateExaminerDetail'
import UploadUpdateReport from '../../../../components/ProjectComponents/ExaminerReportUpdate/UploadUpdateReport'
import {
    reset,
    getExaminerReport,
    getAllExaminerReports,
} from '../../../../store/features/reports/reportSlice'
import {
    updateRRport,
    reset as aureset,
} from '../../../../store/features/project/projectSlice'
import { useSelector, useDispatch } from 'react-redux'
import { initSocketConnection } from '../../../../socketio.service.js'
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

const MaEditExaminerReport = () => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    // const [initials, setInitials] = React.useState(null)
    const [newRDeat, setnewRDeat] = React.useState(null)

    const [errors, setErrors] = React.useState({})
    // const [loadingComponen, setloadingComponent] = React.useState(false)

    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)
    let { allreports, isSuccess, isError, message } = useSelector(
        (state) => state.report
    )
    useEffect(() => {
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
                    },
                    {
                        position: 'bottom-right',
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

    // let toast = useToast()

    useEffect(() => {
        if (projectCase.isError && isSubmittingp) {
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(aureset())
            dispatch(areset())
        }

        if (projectCase.isSuccess && isSubmittingp) {
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(aureset())
            dispatch(areset())
        }
        dispatch(aureset())
        dispatch(areset())
    }, [
        projectCase.isError,
        projectCase.isSuccess,
        projectCase.message,
        isSubmittingp,
    ])

    useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(reset())
            dispatch(areset())
        }

        if (isSuccess && isSubmittingp) {
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(reset())
            dispatch(areset())
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch, isSubmittingp])

    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)
        if (e.target.name === 'ungraded') {
            setnewRDeat((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.checked ? 'true' : 'false',
            }))
        } else {
            setnewRDeat((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    }

    /** handlefile Input */
    const handleFileChange = (InputFile) => {
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(() => true)
        //console.log(InputFile.url, 'InputFile')

        let vv = {
            ...newRDeat,
            reportFile: InputFile,
        }
        setnewRDeat(() => vv)
    }

    let validate = (values) => {
        const errors = {}
        if (!values.score && !values.ungraded) {
            errors.score = 'either add score or check ungraded'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(newRDeat))
        setIsSubmittingp(true)
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            let newInitals = {
                ...newRDeat,
                reportId: newRDeat._id,
            }

            toast.dismiss()
            toast.promise(
                dispatch(updateRRport(newInitals)).then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'updating report',
                    success: (data) => `${data}`,
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
            setChnageMade(() => false)
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingp &&
            changeMade
        ) {
            setIsSubmittingp(false)
            setChnageMade(false)
        } else {
            setIsSubmittingp(false)
            setChnageMade(false)
        }
    }, [isSubmittingp, dispatch])

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
                            title: 'Masters report for update',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <form onSubmit={handleSubmit}>
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
                                    disabledb={
                                        isSubmittingp || !changeMade
                                            ? true
                                            : false
                                    }>
                                    <Button
                                        type='submit'
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        isLoading={isSubmittingp ? true : false}
                                        className='button'>
                                        Submit Update
                                    </Button>
                                </SubmitButton>
                            </Stack>
                            {/** forms */}
                            <Stack direction='row' w='100%'>
                                {/** student and contact forms */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <UpdateOverallScores
                                        values={newRDeat}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                    <ViewUpdatedFiles
                                        values={newRDeat}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                </Stack>
                                {/** supervisior && date of submission & scanned form */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <ViewUpdateExaminerDetail
                                        values={newRDeat}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />

                                    <UploadUpdateReport
                                        values={newRDeat}
                                        errors={errors}
                                        handleChange={handleChange}
                                        setFieldValue={handleFileChange}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>

                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default MaEditExaminerReport

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

const SubmitButton = styled(Box)`
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        &:hover {
            background: ${({ disabledb, ...props }) =>
                disabledb ? '#d0d0d0' : '#F4797F'};
        }
    }
`
