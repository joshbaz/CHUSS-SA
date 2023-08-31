/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast, Button } from '@chakra-ui/react'
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
    reset as preset,
    programTypeGetAll,
    academicYearGetAll,
} from '../../../store/features/preferences/preferenceSlice'
import EntryType from '../../../components/ProjectComponents/CreateProject/CreateForms/EntryType'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const CreatePhdProject = () => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let routeNavigate = useNavigate()

    let dispatch = useDispatch()
    const { isError, isSuccess, message } = useSelector(
        (state) => state.project
    )
    const preferencesData = useSelector((state) => state.preference)
    useEffect(() => {
        dispatch(programTypeGetAll())
        dispatch(academicYearGetAll())
    }, [])
    useEffect(() => {
        if (preferencesData.isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }
            toast({
                position: 'top',
                title: preferencesData.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(preset())
        }
        dispatch(preset())

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
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(() => false)

            dispatch(reset())
        }

        if (isSuccess) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(() => false)

                setHelperFunctions(null)
            }
            dispatch(reset())
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
        // departmentName: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
    })

    const initialValues = {
        registrationNumber: '',
        studentName: '',
        gender: '',
        programType: 'PhD',
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
    let toast = useToast()
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
                        topbarData={{ title: 'New PHD Student', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values, helpers) => {
                            setHelperFunctions(helpers)
                            dispatch(projectCreate(values))
                            setIsSubmittingp(() => true)
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
                                                degreetype={'Phd'}
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

export default CreatePhdProject
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
