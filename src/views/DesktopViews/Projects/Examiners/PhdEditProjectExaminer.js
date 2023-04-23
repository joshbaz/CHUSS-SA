/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'

import { useParams } from 'react-router-dom'

import UpdateExaminerDetail from '../../../../components/ProjectComponents/UpdateExaminer/UpdateExaminerDetail'
import UpdateExamineInfo from '../../../../components/ProjectComponents/UpdateExaminer/UpdateExamineInfo'
import UpdatePaymentInfo from '../../../../components/ProjectComponents/UpdateExaminer/UpdatePaymentInfo'

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
import UpdateExaminerProjectApp from '../../../../components/ProjectComponents/UpdateExaminer/UpdateExaminerProjectApp'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const PhdEditProjectExaminer = () => {
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)
    // let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)

    let examinerCase = useSelector((state) => state.examiner)
    useEffect(() => {
        /** dispatch to get project */
        dispatch(getIndividualProject(params.p_id))
        /** dispatch to get examiner */
        dispatch(getIndividualExaminer(params.e_id))
    }, [params.e_id, params.p_id, dispatch])

    useEffect(() => {
        dispatch(allExaminers(params.p_id))
    }, [])

    useEffect(() => {
        dispatch(getAllProjects(params.p_id))
    }, [])

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
        dispatch(eReset())
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
                                <Text>Edit Project Examiner</Text>
                            </BackButtonStack>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            <Stack direction='row'>
                                {/** Details & files */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <UpdateExaminerDetail
                                        values={examinerValues}
                                    />
                                </Stack>

                                {/** Details & files */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <UpdateExamineInfo
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />
                                    {examinerValues !== null &&
                                        examinerValues.typeOfExaminer ===
                                            'External' && (
                                            <UpdatePaymentInfo
                                                values={examinerValues}
                                                projectValues={projectValues}
                                            />
                                        )}

                                    <UpdateExaminerProjectApp
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

export default PhdEditProjectExaminer

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
