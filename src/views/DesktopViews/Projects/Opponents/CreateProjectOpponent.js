import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, GridItem, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    projectOpponentCreate,
} from '../../../../store/features/opponents/opponentSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'

import ProjectAOAppointmentUpload from '../../../../components/ProjectComponents/AssignOpponents/ProjectAO_AppointmentUpload'
import OpponentAAppointmentUpload from '../../../../components/ProjectComponents/AssignOpponents/OpponentA_AppointmentUpload'
import OpponentAPayInfo from '../../../../components/ProjectComponents/AssignOpponents/OpponentA_PayInfo'
import OpponentADetailForm from '../../../../components/ProjectComponents/AssignOpponents/OpponentA_DetailForm'

const CreateProjectOpponent = ({ ...props }) => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [projectId, setProjectId] = React.useState('')
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let routeNavigate = useNavigate()
    let toast = useToast()
    let dispatch = useDispatch()
    const { isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.examiner
    )
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (props.match.params.pid) {
            setProjectId(props.match.params.pid)
            dispatch(getIndividualProject(props.match.params.pid))
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
        typeOfExaminer: 'Opponent',
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
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar
                    topbarData={{
                        title: `${
                            IndividualProject.individual !== null &&
                            IndividualProject.individual.student.studentName
                                ? `Creating Opponent for ${IndividualProject.individual.student.studentName}`
                                : `Opponent Selection`
                        }`,
                        count: null,
                    }}
                />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
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
                            dispatch(projectOpponentCreate(values2))
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
                                            <Text>Add New Opponent</Text>
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
                                                <OpponentADetailForm
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
                                                <OpponentAPayInfo
                                                    values={values}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                />

                                                <OpponentAAppointmentUpload
                                                    values={values}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                />
                                                <ProjectAOAppointmentUpload
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

export default CreateProjectOpponent

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
