import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast, Button } from '@chakra-ui/react'
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
    updateExaminerReport,
} from '../../../../store/features/reports/reportSlice'
import { useSelector, useDispatch } from 'react-redux'

const EditOpponentReport = (props) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [initials, setInitials] = React.useState(null)
    const [errors, setErrors] = React.useState({})
    const [loadingComponent, setloadingComponent] = React.useState(false)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

    useEffect(() => {
        console.log('params.rp_id', params.rp_id)
        dispatch(getExaminerReport(params.rp_id))
    }, [params.rp_id, dispatch])

    let { individualReport, isSuccess, isError, message } = useSelector(
        (state) => state.report
    )

    let toast = useToast()

    useEffect(() => {
        if (isError) {
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
    }, [isError, isSuccess, message, dispatch])

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
                    reportFile: null,
                })
            }
        }

        // setloadingComponent(false)
        // return () => {
        //     setInitials(null)
        // }
    }, [individualReport, params.rp_id, initials])

    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)
        if (e.target.name === 'ungraded') {
            setInitials((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.checked,
            }))
        } else {
            setInitials((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }))
        }
    }

    /** handlefile Input */
    const handleFileChange = (InputFile) => {
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)
        //console.log(InputFile.url, 'InputFile')
        setInitials({
            ...initials,
            reportFile: InputFile,
        })
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
        setErrors(validate(initials))
        setIsSubmittingp(true)
    }

    useEffect(() => {
        if (
            Object.keys(errors).length === 0 &&
            setIsSubmittingp &&
            changeMade
        ) {
            console.log(Object.keys(errors).length, 'No errors', errors)
            dispatch(updateExaminerReport(initials))
        } else if (
            Object.keys(errors).length > 0 &&
            setIsSubmittingp &&
            changeMade
        ) {
            setIsSubmittingp(false)
            setChnageMade(false)
        }
    }, [isSubmittingp])
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar topbarData={{ title: 'Projects', count: null }} />

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
                                        values={initials}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                    <ViewUpdatedFiles
                                        values={initials}
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
                                        values={initials}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />

                                    <UploadUpdateReport
                                        values={initials}
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

export default EditOpponentReport

const Container = styled(Stack)``

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
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter';
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

