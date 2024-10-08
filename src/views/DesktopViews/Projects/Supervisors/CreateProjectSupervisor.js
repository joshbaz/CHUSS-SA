/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
//import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    projectSupervisorCreate,
} from '../../../../store/features/supervisors/supervisorSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import { reset as areset } from '../../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../../components/common/CustomToastFunctions/ToastFunctions'
import SupervisorADetailForm from '../../../../components/ProjectComponents/AssignSupervisors/SupervisorA_DetailForm'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const CreateProjectSupervisor = () => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [projectId, setProjectId] = React.useState('')
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let routeNavigate = useNavigate()
    let params = useParams()
    //let toast = useToast()
    let dispatch = useDispatch()
    const { isError, isSuccess, message } = useSelector(
        (state) => state.supervisor
    )
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (params.pid) {
            setProjectId(params.pid)

            toast.dismiss()
            toast.promise(
                dispatch(getIndividualProject(params.pid)).then((res) => {
                    //console.log('res', res)
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
        }
    }, [])

    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                dispatch(areset())
                dispatch(reset())
            }

            dispatch(areset())
            dispatch(reset())
        }

        if (isSuccess && message) {
            if (helperFunctions !== null) {
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                routeNavigate(`/phd/projects/projectreport/${params.pid}`, {
                    replace: true,
                })
                setHelperFunctions(null)
            }
            dispatch(reset())
            dispatch(areset())
        }
    }, [isError, isSuccess, message])

    useEffect(() => {
        if (IndividualProject.isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
            }

            dispatch(preset())
            dispatch(areset())
        }
        dispatch(preset())
        dispatch(areset())
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
    }

    const validationSchema = yup.object().shape({
        jobtitle: yup.string().required('required'),
        name: yup.string().required('required'),
        phoneNumber: yup.string().required('required'),
        postalAddress: yup.string().required('required'),
        countryOfResidence: yup.string().required('required'),
        placeOfWork: yup.string().required('required'),
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
                                    ? `Creating Supervisor for ${IndividualProject.individual.student.studentName}`
                                    : `Supervisor Selection`
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

                            toast.dismiss()
                            toast.promise(
                                dispatch(projectSupervisorCreate(values2)).then(
                                    (res) => {
                                        if (
                                            res.meta.requestStatus ===
                                            'rejected'
                                        ) {
                                            let responseCheck =
                                                errorHandler(res)
                                            throw new Error(responseCheck)
                                        } else {
                                            return res.payload.message
                                        }
                                    }
                                ),
                                {
                                    loading: 'creating and assigning new supervisor to student',
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
                                            setTimeout(
                                                () => handleLogout(dispatch),
                                                3000
                                            )
                                            return 'Not Authenticated'
                                        } else if (
                                            err
                                                .toString()
                                                .includes(
                                                    'Authentication expired'
                                                )
                                        ) {
                                            setTimeout(
                                                () => handleLogout(dispatch),
                                                3000
                                            )
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
                                            <Text>Add New Supervisor</Text>
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
                                                <SupervisorADetailForm
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

export default CreateProjectSupervisor

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
