import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, GridItem, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import UpdateExaminerDetail from '../../../../components/ProjectComponents/UpdateExaminer/UpdateExaminerDetail'
import UpdateExamineInfo from '../../../../components/ProjectComponents/UpdateExaminer/UpdateExamineInfo'
import UpdatePaymentInfo from '../../../../components/ProjectComponents/UpdateExaminer/UpdatePaymentInfo'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
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

import EditOpponentDetailForm from '../../../../components/ProjectComponents/AssignOpponents/EditOpponentDetailForm'
import EditOpponentPayInfo from '../../../../components/ProjectComponents/AssignOpponents/EditOpponentPayInfo'
import ViewUpdatedOpponentFiles from '../../../../components/ProjectComponents/AssignOpponents/ViewUpdatedOpponentFiles'
import { initSocketConnection } from '../../../../socketio.service'

const PhdEditProjectOpponent = () => {
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
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
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
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
                                <Text>Edit Project Opponent</Text>
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
                                    <EditOpponentDetailForm
                                        values={examinerValues}
                                    />
                                </Stack>

                                {/** Details & files */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <EditOpponentPayInfo
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />

                                    <ViewUpdatedOpponentFiles
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

export default PhdEditProjectOpponent

const Container = styled(Stack)``

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
