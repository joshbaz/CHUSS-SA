/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import ViewExaminerDetail from '../../../../components/ProjectComponents/ViewExaminer/ViewExaminerDetail'
import ViewInfoForm from '../../../../components/ProjectComponents/ViewExaminer/ViewInfoForm'
import ViewPaymentInfo from '../../../../components/ProjectComponents/ViewExaminer/ViewPaymentInfo'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualExaminer,
    allExaminers,
    reset as eReset,
} from '../../../../store/features/Examiner/examinerSlice'
import {
    getIndividualProject,
    getAllProjects,
    reset as pReset,
} from '../../../../store/features/project/projectSlice'
import ViewExaminerFiles from '../../../../components/ProjectComponents/ViewExaminer/ViewExaminerFiles'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'
import { reset as areset } from '../../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../../components/common/CustomToastFunctions/ToastFunctions'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const MaViewProjectExaminer = () => {
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)

    let examinerCase = useSelector((state) => state.examiner)
    useEffect(() => {
        /** dispatch to get project */
        //dispatch(getIndividualProject(params.p_id))
        /** dispatch to get examiner */
        //dispatch(getIndividualExaminer(params.e_id))
        // dispatch(allExaminers(params.p_id))
        //dispatch(getAllProjects(params.p_id))

        toast.dismiss()
        toast.promise(
            dispatch(allExaminers(params.p_id))
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getAllProjects(params.p_id))
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getIndividualProject(params.p_id))
                    }
                })
                .then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(getIndividualExaminer(params.e_id))
                    }
                })
                .then((res) => {
                    //console.log('res', res)
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
    }, [params.e_id, params.p_id, dispatch])

    useEffect(() => {
        let findExaminer = examinerCase.allExaminerItems.items.find(
            (element) => element._id === params.e_id
        )

        if (findExaminer) {
            setExaminerValues(findExaminer)
        }
    }, [examinerCase.allExaminerItems, params.e_id])

    useEffect(() => {
        let findProject = projectCase.allprojects.items.find(
            (element) => element._id === params.p_id
        )

        if (findProject) {
            setProjectValues(findProject)
        }
    }, [projectCase.allprojects, params.p_id])

    //let toast = useToast()
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
                            title: 'Masters View Examiner',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
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
                                        `/masters/projects/examiners/update/${params.p_id}/${params.e_id}`
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
                                    <ViewExaminerDetail
                                        values={examinerValues}
                                    />
                                    <ViewExaminerFiles
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />
                                </Stack>

                                {/** Grading Progress & Assigned Examiners */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <ViewInfoForm
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />

                                    {examinerValues !== null &&
                                    examinerValues.typeOfExaminer ===
                                        'External' ? (
                                        <ViewPaymentInfo
                                            values={examinerValues}
                                            projectValues={projectValues}
                                        />
                                    ) : null}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default MaViewProjectExaminer

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
