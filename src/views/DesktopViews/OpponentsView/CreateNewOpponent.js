import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import ExaminerADetailForm from '../../../components/ProjectComponents/AssignExaminer/ExaminerA_DetailForm'
import ExaminerAPayInfo from '../../../components/ProjectComponents/AssignExaminer/ExaminerA_PayInfo'
import ExaminerAAppointmentUpload from '../../../components/ProjectComponents/AssignExaminer/ExaminerA_AppointmentUpload'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    examinerCreate,
} from '../../../store/features/Examiner/examinerSlice'
import ExaminerATypeForm2 from '../../../components/ExaminerComponents/CreateExaminer/ExaminerATypeForm2'

const CreateNewOpponent = () => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let routeNavigate = useNavigate()
    let toast = useToast()
    let dispatch = useDispatch()
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.examiner
    )

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
    }, [isError, isSuccess, message])

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
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar topbarData={{ title: 'Examiners', count: null }} />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, helpers) => {
                            setHelperFunctions(helpers)
                            setIsSubmittingp(true)
                            let values2 = {
                                ...values,
                            }
                            dispatch(examinerCreate(values2))
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
                                    bg='#FBFBFB'
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
                                            alignItems='center'>
                                            <Box
                                                fontSize='25px'
                                                onClick={() =>
                                                    routeNavigate(-1)
                                                }>
                                                <MdArrowBack />
                                            </Box>
                                            <Text>Add New Examiners</Text>
                                        </BackButtonStack>

                                        <SubmitButton
                                            disabledb={!(isValid && dirty)}>
                                            <Button
                                                type='submit'
                                                disabled={
                                                    isSubmittingp
                                                        ? true
                                                        : !(isValid && dirty)
                                                }
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
                                                <ExaminerATypeForm2
                                                    values={values}
                                                    errors={errors}
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

export default CreateNewOpponent

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
