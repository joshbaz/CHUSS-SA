/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import {
    reset,
    getOpponentReport,
    updateOpponentReport,
} from '../../../../store/features/opponentReports/opponentReportSlice'
import { useSelector, useDispatch } from 'react-redux'
import OpponentUpdatedFile from '../../../../components/ProjectComponents/OpponentReportUpdate/OpponentUpdatedFile'
import OpponentDetailsView from '../../../../components/ProjectComponents/OpponentReportUpdate/OpponentDetailsView'
import OpponentUpdateReport from '../../../../components/ProjectComponents/OpponentReportUpdate/OpponentUpdateReport'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const EditOpponentReport = (props) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [initials, setInitials] = React.useState(null)
    const [errors, setErrors] = React.useState({})
    // const [loadingComponent, setloadingComponent] = React.useState(false)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOpponentReport(params.rp_id))
    }, [params.rp_id, dispatch])

    let { individualReport, isSuccess, isError, message } = useSelector(
        (state) => state.opponentReport
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
        if (values.reportFile === null) {
            errors.reportFile = ' add a file'
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
            dispatch(updateOpponentReport(initials))
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
                            title: 'Edit Opponent Report',
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
                                    <Text>Opponent's Report</Text>
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
                                    <OpponentUpdatedFile
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
                                    <OpponentDetailsView
                                        values={initials}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />

                                    <OpponentUpdateReport
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
