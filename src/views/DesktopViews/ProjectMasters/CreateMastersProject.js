/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import StudentDetailForm from '../../../components/ProjectComponents/CreateProject/CreateForms/StudentDetailForm'
import ContactForm from '../../../components/ProjectComponents/CreateProject/CreateForms/ContactForm'
// import SupervisorForm from '../../../components/ProjectComponents/CreateProject/CreateForms/SupervisorForm'
// import SubmissionDateForm from '../../../components/ProjectComponents/CreateProject/CreateForms/SubmissionDateForm'
// import UploadFileForm from '../../../components/ProjectComponents/CreateProject/CreateForms/UploadFileForm'
// import UploadThesisFile from '../../../components/ProjectComponents/CreateProject/CreateForms/UploadThesisFile'
// import RegistrationForm from '../../../components/ProjectComponents/CreateProject/CreateForms/RegistrationForm'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    projectCreate,
} from '../../../store/features/project/projectSlice'

import {
    allSchools,
    reset as sreset,
} from '../../../store/features/schools/schoolSlice'
import {
    reset as preset,
    programTypeGetAll,
    academicYearGetAll,
} from '../../../store/features/preferences/preferenceSlice'
import EntryType from '../../../components/ProjectComponents/CreateProject/CreateForms/EntryType'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'

import { Logout, reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const CreateMastersProject = () => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let routeNavigate = useNavigate()

    let dispatch = useDispatch()
    const { isError, isSuccess, message } = useSelector(
        (state) => state.project
    )
    const preferencesData = useSelector((state) => state.preference)

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
        toast.dismiss()

        toast.promise(
            dispatch(programTypeGetAll())
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
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allSchools())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return 'data retrieved'
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
    }, [])
    useEffect(() => {
        if (preferencesData.isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }

            dispatch(preset())
            dispatch(areset())
            dispatch(sreset())
        }
        dispatch(preset())
        dispatch(areset())
        dispatch(sreset())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        preferencesData.isError,
        preferencesData.isSuccess,
        preferencesData.message,
        dispatch,
    ])

    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(() => false)
            }

            setIsSubmittingp(() => false)

            dispatch(reset())
            dispatch(areset())
            dispatch(sreset())
        }

        if (isSuccess) {
            if (helperFunctions !== null) {
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(() => false)

                setHelperFunctions(null)
            }
            dispatch(reset())
            dispatch(areset())
            dispatch(sreset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('required'),
        registrationNumber: yup.string().required('required'),
        studentName: yup.string().required('required'),
        programType: yup.string().required('required'),
        // degreeProgram: yup.string().required('required'),
        schoolName: yup.string().required('required'),
        //  departmentName: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
    })

    const initialValues = {
        registrationNumber: '',
        studentName: '',
        gender: '',
        programType: 'Masters',
        degreeProgram: '',
        schoolName: '',
        departmentName: '',
        Topic: '',
        email: '',
        phoneNumber: '',
        alternativeEmail: '',
        semesterRegistration: '',
        academicYear: '',
        entryType: '',
        createdDate: '',
        fundingType: '',
    }
    // let toast = useToast()
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
                            title: 'New Masters Student',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, helpers) => {
                            setHelperFunctions(helpers)

                            setIsSubmittingp(() => true)

                            toast.dismiss()

                            toast.promise(
                                dispatch(projectCreate(values)).then((res) => {
                                    //console.log('res', res)
                                    if (res.meta.requestStatus === 'rejected') {
                                        let responseCheck = errorHandler(res)
                                        throw new Error(responseCheck)
                                    } else {
                                        return res.payload.message
                                    }
                                }),
                                {
                                    loading: 'creating student',
                                    success: (data) => `${data}`,
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
                                                .includes(
                                                    'Authentication required'
                                                )
                                        ) {
                                            setTimeout(handleLogout, 3000)
                                            return 'Not Authenticated'
                                        } else if (
                                            err
                                                .toString()
                                                .includes(
                                                    'Authentication expired'
                                                )
                                        ) {
                                            setTimeout(handleLogout, 3000)
                                            return 'Authentication Expired'
                                        } else {
                                            return `${err}`
                                        }
                                    },
                                }
                            )
                        }}>
                        {({
                            values,
                            handleChange,
                            errors,
                            isValid,
                            dirty,
                            touched,
                            isSubmitting,
                            setFieldValue,
                        }) => (
                            <Form>
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
                                                onClick={() =>
                                                    routeNavigate(-1)
                                                }>
                                                <MdArrowBack />
                                            </Box>
                                            <Text>Add New Student</Text>
                                        </BackButtonStack>
                                        <SubmitButton
                                            disabledb={!(isValid && dirty)}>
                                            <Button
                                                type='submit'
                                                disabled={
                                                    !(isValid && dirty) ||
                                                    isSubmittingp
                                                }
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='button'>
                                                Submit Student
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
                                            <StudentDetailForm
                                                values={values}
                                                errors={errors}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                                programData={
                                                    preferencesData
                                                        .allProgramItems.items
                                                }
                                                degreetype={'Masters'}
                                            />

                                            <ContactForm
                                                values={values}
                                                errors={errors}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                            />
                                        </Stack>
                                        {/** supervisior && date of submission & scanned form */}
                                        <Stack
                                            direction='column'
                                            w='30%'
                                            spacing='20px'>
                                            <EntryType
                                                values={values}
                                                errors={errors}
                                                handleChange={handleChange}
                                                setFieldValue={setFieldValue}
                                            />
                                            {/** 
                                        
                                        <SubmissionDateForm
                                                values={values}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        */}

                                            {/**
                                     <UploadFileForm
                                                values={values}
                                                errors={errors}
                                                setFieldValue={setFieldValue}
                                            />
                                    */}

                                            {/** 
                                         * 
                                         *  <UploadThesisFile
                                                values={values}
                                                errors={errors}
                                                setFieldValue={setFieldValue}
                                            />
                                         */}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>

                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default CreateMastersProject

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    font-family: 'Inter', sans-serif;
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
