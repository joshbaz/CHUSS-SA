/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'

import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualOpponent,
    allOpponents,
    opponentUpdate,
    reset as eReset,
} from '../../../../store/features/opponents/opponentSlice'
import {
    getIndividualProject,
    getAllProjects,
    reset as pReset,
} from '../../../../store/features/project/projectSlice'

import EditOpponentDetailForm from '../../../../components/ProjectComponents/AssignOpponents/EditOpponentDetailForm'
import EditOpponentPayInfo from '../../../../components/ProjectComponents/AssignOpponents/EditOpponentPayInfo'
import ViewUpdatedOpponentFiles from '../../../../components/ProjectComponents/AssignOpponents/ViewUpdatedOpponentFiles'
import { initSocketConnection } from '../../../../socketio.service'

const PhdEditProjectOpponent = () => {
    let params = useParams()
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)

    let examinerCase = useSelector((state) => state.opponent)
    useEffect(() => {
        /** dispatch to get project */
        dispatch(getIndividualProject(params.p_id))
        /** dispatch to get examiner */
        dispatch(getIndividualOpponent(params.o_id))
    }, [params.o_id, params.p_id, dispatch])

    useEffect(() => {
        const io = initSocketConnection()
        dispatch(allOpponents(params.p_id))

        io.on('updateop-project', (data) => {
            if (
                data.actions === 'update-app-letter' &&
                data.data === params.o_id
            ) {
                dispatch(allOpponents(params.p_id))
                dispatch(getAllProjects(params.p_id))
            }
        })
    }, [])

    useEffect(() => {
        dispatch(getAllProjects(params.p_id))
    }, [])

    useEffect(() => {
        let findExaminer = examinerCase.allOpponentItems.items.find(
            (element) => element._id === params.o_id
        )

        if (findExaminer) {
            let allVal = {
                ...findExaminer,
                ...findExaminer.paymentInfo[0],
            }

            setExaminerValues(allVal)
        }
    }, [examinerCase.allOpponentItems, params.o_id])

    useEffect(() => {
        let findProject = projectCase.allprojects.items.find(
            (element) => element._id === params.p_id
        )

        if (findProject) {
            setProjectValues(findProject)
        }
    }, [projectCase.allprojects, params.p_id])

    let toast = useToast()
    useEffect(() => {
        if (projectCase.isError) {
            toast({
                position: 'top',
                title: projectCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(pReset())
        }
        dispatch(pReset())
    }, [projectCase.isError, projectCase.isSuccess, projectCase.message])

    useEffect(() => {
        if (examinerCase.isError) {
            toast({
                position: 'top',
                title: examinerCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(eReset())
        }

        if (examinerCase.isSuccess && examinerCase.message) {
            toast({
                position: 'top',
                title: examinerCase.message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(eReset())
        }
        dispatch(eReset())
    }, [examinerCase.isError, examinerCase.isSuccess, examinerCase.message])

    /** function to handle value changes */
    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setExaminerValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    /** function to handle phone change */
    const handleEditPhoneChange = (name, phoneValue) => {
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)
        setExaminerValues((prevState) => ({
            ...prevState,
            [name]: phoneValue,
        }))
    }

    let validate = (values) => {
        const errors = {}
        if (!values.jobtitle) {
            errors.jobtitle = 'jobtitle required'
        }

        if (!values.name) {
            errors.name = ' Name required'
        }

        if (!values.email) {
            errors.email = 'Email required'
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number required'
        }

        if (!values.countryOfResidence) {
            errors.countryOfResidence = 'countryOfResidence required'
        }

        if (!values.placeOfWork) {
            errors.placeOfWork = 'Place Of Work required'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(examinerValues))
        setIsSubmittingp(true)
    }

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(opponentUpdate(examinerValues))
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
        <Container direction='row' w='100vw'>
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
                                projectValues !== null &&
                                projectValues.student.studentName
                                    ? `Editing Examiner for ${projectValues.student.studentName}`
                                    : `Examiner Selection`
                            }`,
                            count: null,
                            backButton: true,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <form onSubmit={''}>
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
                                    <Text>Edit Project Opponent</Text>
                                </BackButtonStack>

                                <SubmitButton
                                    disabledb={
                                        isSubmittingp || !changeMade
                                            ? true
                                            : false
                                    }
                                    onClick={handleSubmit}>
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
                            <Stack direction='column' w='100%'>
                                <Stack direction='row'>
                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='70%'
                                        spacing='20px'>
                                        <EditOpponentDetailForm
                                            values={examinerValues}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </Stack>

                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='30%'
                                        spacing='20px'>
                                        <EditOpponentPayInfo
                                            values={examinerValues}
                                            handleChange={handleChange}
                                            errors={errors}
                                            handleEditPhoneChange={
                                                handleEditPhoneChange
                                            }
                                        />

                                        <ViewUpdatedOpponentFiles
                                            values={examinerValues}
                                            projectValues={projectValues}
                                            handleChange={handleChange}
                                            errors={errors}
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

export default PhdEditProjectOpponent

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
