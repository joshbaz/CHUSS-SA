import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Text,
    useToast,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
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

const MaEditExaminerReport = () => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [initials, setInitials] = React.useState(null)
    const [newRDeat, setnewRDeat] = React.useState(null)

    const [errors, setErrors] = React.useState({})
    const [loadingComponen, setloadingComponent] = React.useState(false)

    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)
    let { individualReport, allreports, isSuccess, isError, message } =
        useSelector((state) => state.report)
    useEffect(() => {
        dispatch(getAllExaminerReports())
        dispatch(getExaminerReport(params.rp_id))

        const io = initSocketConnection()
        io.on('updatereport', (data) => {
            if (
                data.actions === 'update-report' &&
                data.data === params.rp_id
            ) {
                 dispatch(getAllExaminerReports())
                 dispatch(getExaminerReport(params.rp_id))
            }
        })
    }, [dispatch, params.rp_id])

    useEffect(() => {
        console.log(params.rp_id, 'id', allreports)

        if (allreports.items.length > 0) {
            let allDetails = allreports.items.find(
                (data) => data._id === params.rp_id
            )
            console.log('asl', allDetails.reportFiles.length)
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

    let toast = useToast()

    useEffect(() => {
        if (projectCase.isError && isSubmittingp) {
            toast({
                position: 'top',
                title: projectCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(aureset())
        }

        if (projectCase.isSuccess && isSubmittingp) {
            toast({
                position: 'top',
                title: projectCase.message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(aureset())
        }
        dispatch(aureset())
    }, [
        projectCase.isError,
        projectCase.isSuccess,
        projectCase.message,
        isSubmittingp,
    ])

    useEffect(() => {
        if (isError && isSubmittingp) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(reset())
        }

        if (isSuccess && isSubmittingp) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(reset())
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
        console.log('all details', InputFile)
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

    const diffhanldeSubmit = () => {}

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            console.log(Object.keys(errors).length, 'No errors', errors)
            let newInitals = {
                ...newRDeat,
                reportId: newRDeat._id,
            }
            dispatch(updateRRport(newInitals))
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
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar
                    topbarData={{
                        title: 'Masters report for update',
                        count: null,
                    }}
                />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            direction='column'
                            bg='#FBFBFB'
                            spacing={'20px'}
                            padding={'20px 20px 30px 20px'}>
                            {/** back & submit button*/}
                            <Stack
                                direction='row'
                                alignItems='center'
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

const Container = styled(Stack)``

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
