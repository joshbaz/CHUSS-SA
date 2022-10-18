import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import CandidateProfile from '../../../components/ProjectComponents/ProjectReport/CandidateProfile'
import ProjectDetails from '../../../components/ProjectComponents/ProjectReport/ProjectDetails'
import GradingProgress from '../../../components/ProjectComponents/ProjectReport/GradingProgress'
import AssignedExaminers from '../../../components/ProjectComponents/ProjectReport/AssignedExaminers'
import ExaminersReports from '../../../components/ProjectComponents/ProjectReport/ExaminersReports'
import CandidatesFiles from '../../../components/ProjectComponents/ProjectReport/CandidatesFiles'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualProject,
    reset,
} from '../../../store/features/project/projectSlice'
import {
    reset as treset,
    tagGetAll,
} from '../../../store/features/tags/tagSlice'
import ProgressStatus from '../../../components/ProjectComponents/ProjectReport/ProgressStatus'
import VivaReport from '../../../components/ProjectComponents/ProjectReport/VivaReport'
import FinalSubmission from '../../../components/ProjectComponents/ProjectReport/FinalSubmission'

const ProjectReport = ({ ...props }) => {
    let routeNavigate = useNavigate()
    let location = useLocation()
    let toast = useToast()
    let dispatch = useDispatch()
    let { individual, isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.project
    )
    const tagsData = useSelector((state) => state.tag)

    useEffect(() => {
        let id = props.match.params.id
        console.log(id)
        dispatch(getIndividualProject(id))
        dispatch(tagGetAll())
    }, [props.match.params.id, dispatch])

    useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }
        console.log(individual)
        dispatch(reset())
    }, [isSuccess, isError, message])

    useEffect(() => {
        if (tagsData.isError) {
            toast({
                position: 'top',
                title: tagsData.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(treset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagsData.isError, tagsData.isSuccess, tagsData.message, dispatch])

    if (isLoading) {
        return <h1>Loading</h1>
    }
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar topbarData={{ title: 'Projects', count: null }} />

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
                                <Text>Project Report</Text>
                            </BackButtonStack>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            {/** first set */}
                            <Stack h='100%'>
                                <ProgressStatus
                                    values={individual}
                                    allTagData={tagsData.allTagItems.items}
                                />
                            </Stack>

                            {/** second set */}
                            <Stack direction='row'>
                                {/** candidate details & Project details */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <CandidateProfile values={individual} />

                                    <ProjectDetails values={individual} />
                                </Stack>

                                {/** Grading Progress & Assigned Examiners */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <GradingProgress values={individual} />

                                    <AssignedExaminers values={individual} />
                                </Stack>
                            </Stack>

                            {/** third set */}
                            <Stack>
                                <CandidatesFiles values={individual} />
                                {/** table */}
                                <ExaminersReports values={individual} />

                                <VivaReport
                                    values={individual}
                                    allTagData={tagsData.allTagItems.items}
                                />

                                <FinalSubmission values={individual} />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ProjectReport
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
