/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualExaminer,
    examinerUpdate,
    reset,
} from '../../../store/features/Examiner/examinerSlice'

import GEAppointmentUpload from '../../../components/ExaminerComponents/EditExaminer/GEAppointmentUpload'
import GEEditPayInfo from '../../../components/ExaminerComponents/EditExaminer/GEEditPayInfo'
import GEEditTypeForm from '../../../components/ExaminerComponents/EditExaminer/GEEditTypeForm'
import GEEditExaminerDetail from '../../../components/ExaminerComponents/EditExaminer/GEEditExaminerDetail'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const EditExaminer = (props) => {
    // const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [initials, setInitials] = React.useState(null)
    const [errors, setErrors] = React.useState({})
    // const [loadingComponent, setloadingComponent] = React.useState(false)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

    const { individualExaminer, isError, isSuccess, message } = useSelector(
        (state) => state.examiner
    )
    useEffect(() => {
        /** dispatch to get project */
        // dispatch(getIndividualProject(params.p_id))
        /** dispatch to get examiner */
        dispatch(getIndividualExaminer(params.id))
    }, [params.id, dispatch])

    let toast = useToast()
    useEffect(() => {
        if (isError) {
            // if (helperFunctions !== null) {
            //     helperFunctions.setSubmitting(false)
            //     setIsSubmittingp(false)
            // }
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
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
    }, [isError, isSuccess, message])

    useEffect(() => {
        if (initials === null) {
            if (individualExaminer == null) {
                //setloadingComponent(true)
            } else {
                let paymentDetails
                if (
                    individualExaminer !== null &&
                    individualExaminer.paymentInfo.length > 0
                ) {
                    // eslint-disable-next-line array-callback-return
                    individualExaminer.paymentInfo.find((element2) => {
                        paymentDetails = {
                            ...element2,
                        }
                    })
                } else {
                }
                setInitials({
                    jobtitle: '',
                    name: '',
                    email: '',
                    phoneNumber: '',
                    postalAddress: '',
                    countryOfResidence: '',
                    placeOfWork: '',
                    otherTitles: '',
                    typeOfExaminer: '',
                    preferredPayment: 'mobileMoney',
                    mobileOperator: '',
                    mobileSubscriberName: '',
                    mobileNumber: '',
                    bank: '',
                    AccountName: '',
                    AccountNumber: '',
                    swift_bicCode: '',
                    bankCode: '',
                    branchCode: '',
                    bankAddress: '',
                    bankCity: '',
                    ...individualExaminer,
                    ...paymentDetails,
                    examinerAppLetter: null,
                    examinerId: params.id,
                })
                //  setloadingComponent(false)
            }
        } else {
            //setloadingComponent(false)
        }
    }, [individualExaminer, initials])

    const handleChange = (e) => {
        e.preventDefault()
        setChnageMade(true)
        setInitials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /** handlefile Input */
    const handleFileChange = (InputFile) => {
        setChnageMade(true)
        setInitials({
            ...initials,
            examinerAppLetter: InputFile,
        })
    }

    let validate = (values) => {
        const errors = {}
        if (!values.jobtitle) {
            errors.jobtitle = 'Required'
        }
        if (!values.name) {
            errors.name = 'Required'
        }
        if (!values.phoneNumber) {
            errors.phoneNumber = 'Required'
        }
        if (!values.postalAddress) {
            errors.postalAddress = 'Required'
        }
        if (!values.countryOfResidence) {
            errors.countryOfResidence = 'Required'
        }
        if (!values.placeOfWork) {
            errors.placeOfWork = 'Required'
        }
        if (!values.typeOfExaminer) {
            errors.typeOfExaminer = 'Required'
        }
        if (!values.email) {
            errors.email = 'Required'
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors.email = 'Invalid email address'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(initials))
        // setHelperFunctions(helpers)
        setIsSubmittingp(true)

        // let values2 = {
        //     ...values,
        // }
        // dispatch(examinerCreate(values2))
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(examinerUpdate(initials))
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingp &&
            changeMade
        ) {
            setIsSubmittingp(false)
            setChnageMade(false)
        }
    }, [errors, isSubmittingp])

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
                    <TopBar topbarData={{ title: 'Examiners', count: null }} />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <form onSubmit={handleSubmit}>
                        {' '}
                        <Stack
                            direction='column'
                            bg={backgroundMainColor}
                            minH='80vh'
                            borderRadius={backgroundRadius}
                            spacing={'20px'}
                            padding={'20px 20px 30px 20px'}>
                            {/** title head */}
                            <Stack
                                direction='row'
                                alignItems='center'
                                justifyContent='space-between'>
                                <BackButtonStack
                                    className='back_button'
                                    direction='row'
                                    color={textLightColor}
                                    alignItems='center'>
                                    <Box
                                        fontSize='25px'
                                        onClick={() => routeNavigate(-1)}>
                                        <MdArrowBack />
                                    </Box>
                                    <Text>Update Examiner</Text>
                                </BackButtonStack>

                                <SubmitButton disabledb={false}>
                                    <Button
                                        type='submit'
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        isLoading={isSubmittingp ? true : false}
                                        className='button'>
                                        Submit form
                                    </Button>
                                </SubmitButton>
                            </Stack>

                            {/** forms */}
                            <Stack direction='column' w='100%'>
                                <Stack direction='row'>
                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='70%'
                                        spacing='20px'>
                                        <GEEditExaminerDetail
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                        />
                                    </Stack>

                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='30%'
                                        spacing='20px'>
                                        <GEEditTypeForm
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                        />
                                        {initials !== null &&
                                        initials.typeOfExaminer ===
                                            'External' ? (
                                            <GEEditPayInfo
                                                values={initials}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        ) : null}

                                        <GEAppointmentUpload
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                            setFieldValue={handleFileChange}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </Container>
    )
}

export default EditExaminer

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
