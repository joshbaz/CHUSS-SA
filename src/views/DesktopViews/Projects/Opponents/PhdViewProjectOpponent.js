/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualOpponent,
    allOpponents,
    reset as eReset,
} from '../../../../store/features/opponents/opponentSlice'
import {
    getIndividualProject,
    getAllProjects,
    reset as pReset,
} from '../../../../store/features/project/projectSlice'

import { reset as areset } from '../../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../../components/common/CustomToastFunctions/ToastFunctions'

import ViewOpponentDetailForm from '../../../../components/ProjectComponents/AssignOpponents/ViewOpponentDetailForm'
import ViewOpponentFiles from '../../../../components/ProjectComponents/AssignOpponents/ViewOpponentFiles'
import ViewOpponentPayInfo from '../../../../components/ProjectComponents/AssignOpponents/ViewOpponentPayInfo'
const PhdViewProjectOpponent = () => {
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)

    let examinerCase = useSelector((state) => state.opponent)
    useEffect(() => {
        /** dispatch to get project */

        /** dispatch to get examiner */

        toast.dismiss()
        toast.promise(
            dispatch(getAllProjects(params.p_id))
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allOpponents(params.p_id))
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getIndividualProject(params.p_id))
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getIndividualOpponent(params.o_id))
                    }
                })

                .then((res) => {
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
    }, [params.o_id, params.p_id, dispatch])

    useEffect(() => {
        let findExaminer = examinerCase.allOpponentItems.items.find(
            (element) => element._id === params.o_id
        )

        if (findExaminer) {
            setExaminerValues(findExaminer)
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

    useEffect(() => {
        if (projectCase.isError) {
            dispatch(pReset())
            dispatch(areset())
        }
        dispatch(pReset())
        dispatch(areset())
    }, [projectCase.isError, projectCase.isSuccess, projectCase.message])

    useEffect(() => {
        if (examinerCase.isError) {
            dispatch(eReset())
            dispatch(areset())
        }
        dispatch(eReset())
        dispatch(areset())
    }, [examinerCase.isError, examinerCase.isSuccess, examinerCase.message])
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
                spacing='20px'
                w='100%'
                bg='#ffffff'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{ title: 'PhD View Examiner', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 0 10px'}>
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
                                    onClick={() => routeNavigate(-1)}>
                                    <MdArrowBack />
                                </Box>
                                <Text>
                                    {' '}
                                    {examinerValues !== null &&
                                    examinerValues.typeOfExaminer
                                        ? examinerValues.typeOfExaminer
                                        : ''}{' '}
                                    Examiner
                                </Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/phd/projects/opponents/update/${params.p_id}/${params.o_id}`
                                    )
                                }>
                                Edit Details
                            </SubmitButton>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            {/** first set */}
                            <Stack direction='row'>
                                {/** candidate details & Project details */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <ViewOpponentDetailForm
                                        values={examinerValues}
                                    />
                                    <ViewOpponentFiles
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />
                                </Stack>

                                {/** Grading Progress & Assigned Examiners */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <ViewOpponentPayInfo
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default PhdViewProjectOpponent

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
    background: #f7f9fc;
    width: 126px;
    height: 32px;
    box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
    border-radius: 6px;

    color: #868fa0;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
