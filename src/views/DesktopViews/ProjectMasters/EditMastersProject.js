/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Stack, Text, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import EditStudentDetailForm from '../../../components/ProjectComponents/EditProject/EditStudentDetailForm'
import EditContactForm from '../../../components/ProjectComponents/EditProject/EditContactForm'
// import EditSupervisorForm from '../../../components/ProjectComponents/EditProject/EditSupervisorForm'
// import EditUploadFileForm from '../../../components/ProjectComponents/EditProject/EditUploadFileForm'
import { useNavigate, useParams } from 'react-router-dom'
import {
    reset,
    getIndividualProject,
    projectUpdate,
} from '../../../store/features/project/projectSlice'

import {
    reset as preset,
    programTypeGetAll,
    academicYearGetAll,
} from '../../../store/features/preferences/preferenceSlice'

import { allSchools, reset as sreset } from '../../../store/features/schools/schoolSlice'

import { useSelector, useDispatch } from 'react-redux'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'

import { Logout, reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'

// import EditUploadThesis from '../../../components/ProjectComponents/EditProject/EditUploadThesis'
// import EditRegistrationForm from '../../../components/ProjectComponents/EditProject/EditRegistrationForm'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const EditMastersProject = (props) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [initials, setInitials] = React.useState(null)
    const [errors, setErrors] = React.useState({})

    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

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

    React.useEffect(() => {
        let id = params.id

        toast.dismiss()

        toast.promise(
            dispatch(getIndividualProject(id))
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(programTypeGetAll())
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(academicYearGetAll())
                    }
                }).then((res)=>{
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
                        return 'retrieved'
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
    }, [params.id, dispatch])

    let { individual, isSuccess, isError, message } = useSelector(
        (state) => state.project
    )
    const preferencesData = useSelector((state) => state.preference)

    //  let toast = useToast()

    React.useEffect(() => {
        if (isError) {
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(reset())
            dispatch(areset())
            dispatch(sreset())
        }

        if (isSuccess && isSubmittingp && message) {
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(reset())
            dispatch(areset())
            dispatch(sreset())
        }
        dispatch(reset())
        dispatch(areset())
        dispatch(sreset())
    }, [isError, isSuccess, message, dispatch])

    React.useEffect(() => {
        if (preferencesData.isError) {
            dispatch(preset())
            dispatch(areset())
            dispatch(sreset())
        }

        dispatch(preset())
        dispatch(areset())
        dispatch(sreset())
    }, [
        preferencesData.isError,
        preferencesData.isSuccess,
        preferencesData.message,
        dispatch,
    ])

    React.useEffect(() => {
        if (initials === null && individual !== null) {
            if (individual._id === params.id) {
                setInitials({
                    id: params.id,
                    registrationNumber:
                        individual !== null &&
                        individual.student.registrationNumber
                            ? individual.student.registrationNumber
                            : '',
                    studentName:
                        individual !== null && individual.student.studentName
                            ? individual.student.studentName
                            : '',
                    programType:
                        individual !== null &&
                        individual.student.graduate_program_type
                            ? individual.student.graduate_program_type
                            : '',
                    degreeProgram:
                        individual !== null && individual.student.degree_program
                            ? individual.student.degree_program
                            : '',
                    schoolName:
                        individual !== null && individual.student.schoolName
                            ? individual.student.schoolName
                            : '',
                    departmentName:
                        individual !== null && individual.student.departmentName
                            ? individual.student.departmentName
                            : '',
                    Topic:
                        individual !== null && individual.topic
                            ? individual.topic
                            : '',
                    email:
                        individual !== null && individual.student.email
                            ? individual.student.email
                            : '',
                    phoneNumber:
                        individual !== null && individual.student.phoneNumber
                            ? individual.student.phoneNumber
                            : '',
                    alternativeEmail:
                        individual !== null &&
                        individual.student.alternative_email
                            ? individual.student.alternative_email
                            : '',

                    semesterRegistration:
                        individual !== null && individual.student.semester
                            ? individual.student.semester
                            : '',
                    academicYear:
                        individual !== null && individual.student.academicYear
                            ? individual.student.academicYear
                            : '',

                    studentId:
                        individual !== null && individual.student._id
                            ? individual.student._id
                            : '',

                    ...individual,
                })
            }
        }

        // setloadingComponent(false)
        // return () => {
        //     setInitials(null)
        // }
    }, [individual, params.id, initials])

    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setInitials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /**
     * Custom function
     * handles school and department change
     *
     */
    const setFieldValue2 = (sname, vdata) => {
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setInitials((prevState) => ({
            ...prevState,
            [sname]: vdata,
        }))
    }

    /** handlefile Input */
    // const handleFileChange = (type, InputFile) => {
    //     setIsSubmittingp(() => false)
    //     setErrors({})
    //     setChnageMade(true)
    //     //console.log(InputFile.url, 'InputFile')
    //     if (type === 'scannedForm') {
    //         setInitials({
    //             ...initials,
    //             scannedForm: InputFile,
    //         })
    //     }

    //     if (type === 'thesisfile') {
    //         setInitials({
    //             ...initials,
    //             thesisfile: InputFile,
    //         })
    //     }
    // }

    let validate = (values) => {
        const errors = {}
        if (!values.registrationNumber) {
            errors.registrationNumber = 'Registration Number required'
        }

        if (!values.studentName) {
            errors.studentName = 'Student Name required'
        }

        if (!values.schoolName) {
            errors.schoolName = 'School Name required'
        }

        if (!values.email) {
            errors.email = 'Email required'
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number required'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(initials))
        setIsSubmittingp(true)
    }

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            toast.dismiss()
            toast.promise(
                dispatch(projectUpdate(initials)).then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'updating student',
                    success: (data) => `${data}`,
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
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingp &&
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
                        topbarData={{ title: 'Update Student', count: null }}
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
                                    <Text>Update Masters Student</Text>
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
                                    <EditStudentDetailForm
                                        values={initials}
                                        errors={errors}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue2}
                                        programData={
                                            preferencesData.allProgramItems
                                                .items
                                        }
                                        degreetype={'Masters'}
                                    />

                                    <EditContactForm
                                        values={initials}
                                        errors={errors}
                                        handleChange={handleChange}
                                        setFieldValue={setFieldValue2}
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

export default EditMastersProject

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
