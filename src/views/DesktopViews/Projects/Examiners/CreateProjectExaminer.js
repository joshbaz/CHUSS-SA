/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'

import { useParams } from 'react-router-dom'

import ExaminerADetailForm from '../../../../components/ProjectComponents/AssignExaminer/ExaminerA_DetailForm'
import ExaminerATypeForm from '../../../../components/ProjectComponents/AssignExaminer/ExaminerA_TypeForm'
import ExaminerAPayInfo from '../../../../components/ProjectComponents/AssignExaminer/ExaminerA_PayInfo'
import ExaminerAAppointmentUpload from '../../../../components/ProjectComponents/AssignExaminer/ExaminerA_AppointmentUpload'
import ProjectAAppointUpload from '../../../../components/ProjectComponents/AssignExaminer/ProjectA_AppointUpload'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    projectExaminerCreate,
} from '../../../../store/features/Examiner/examinerSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const CreateProjectExaminer = ({ ...props }) => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [projectId, setProjectId] = React.useState('')
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    let params = useParams()
    let toast = useToast()
    let dispatch = useDispatch()
    const { isError, isSuccess, message } = useSelector(
        (state) => state.examiner
    )
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (params.pid) {
            setProjectId(params.pid)
            dispatch(getIndividualProject(params.pid))
        }
    }, [])

    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
            }
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

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
                setIsSubmittingp(false)
                setHelperFunctions(null)
            }
            dispatch(reset())
        }
        dispatch(reset())
    }, [isError, isSuccess, message])

    /** reset for individual project call */
    useEffect(() => {
        if (IndividualProject.isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
            }
            toast({
                position: 'top',
                title: IndividualProject.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(preset())
        }
        dispatch(preset())
    }, [
        IndividualProject.isError,
        IndividualProject.isSuccess,
        IndividualProject.message,
    ])

    const initialValues = {
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
        AccName: '',
        AccNumber: '',
        swift_bicCode: '',
        bankCode: '',
        branchCode: '',
        bankAddress: '',
        bankCity: '',
        examinerAppLetter: null,
        projectAppLetter: null,
    }

    const validationSchema = yup.object().shape({
        jobtitle: yup.string().required('required'),
        name: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
        postalAddress: yup.string().required('required'),
        countryOfResidence: yup.string().required('required'),
        placeOfWork: yup.string().required('required'),
        typeOfExaminer: yup.string().required('required'),
        email: yup.string().email('Invalid email').required('required'),
    })

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
                w='100%'
                spacing='20px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{
                            title: `${
                                IndividualProject.individual !== null &&
                                IndividualProject.individual.student.studentName
                                    ? `Creating Examiner for ${IndividualProject.individual.student.studentName}`
                                    : `Examiner Selection`
                            }`,
                            count: null,
                            backButton: true,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, helpers) => {
                            setHelperFunctions(helpers)
                            setIsSubmittingp(true)
                            let values2 = {
                                ...values,
                                projectId,
                            }
                            dispatch(projectExaminerCreate(values2))
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
                                    {/** title head */}
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        color={textLightColor}
                                        justifyContent='space-between'>
                                        <BackButtonStack
                                            className='back_button'
                                            direction='row'
                                            alignItems='center'>
                                            <Text>Add New Examiners</Text>
                                        </BackButtonStack>

                                        <SubmitButton
                                            disabledb={!(isValid && dirty)}>
                                            <Button
                                                type='submit'
                                                disabled={!(isValid && dirty)}
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
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
                                                <ExaminerADetailForm
                                                    values={values}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                />
                                            </Stack>

                                            {/** Details & files */}
                                            <Stack
                                                direction='column'
                                                w='30%'
                                                spacing='20px'>
                                                <ExaminerATypeForm
                                                    values={values}
                                                    errors={errors}
                                                    individualProject={
                                                        IndividualProject.individual
                                                    }
                                                    handleChange={handleChange}
                                                />
                                                {values.typeOfExaminer ===
                                                    'External' && (
                                                    <ExaminerAPayInfo
                                                        values={values}
                                                        errors={errors}
                                                        handleChange={
                                                            handleChange
                                                        }
                                                    />
                                                )}

                                                <ExaminerAAppointmentUpload
                                                    values={values}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                                <ProjectAAppointUpload
                                                    values={values}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Stack>
            </Stack>
        </Container>
    )
}

export default CreateProjectExaminer

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
