/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    allOpponents,
    reset as eReset,
} from '../../../store/features/opponents/opponentSlice'

import ViewOpponentDetailForm from '../../../components/ProjectComponents/AssignOpponents/ViewOpponentDetailForm'
import ViewOpponentFiles from '../../../components/ProjectComponents/AssignOpponents/ViewOpponentFiles'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
//import ViewOpponentPayInfo from '../../../components/ProjectComponents/AssignOpponents/ViewOpponentPayInfo'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const ViewOpponent = () => {
    // eslint-disable-next-line no-unused-vars
    const [projectValues, setProjectValues] = React.useState(null)
    const [examinerValues, setExaminerValues] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

    let examinerCase = useSelector((state) => state.opponent)

    useEffect(() => {
        dispatch(allOpponents(params.id))
    }, [])

    useEffect(() => {
        let findExaminer = examinerCase.allOpponentItems.items.find(
            (element) => element._id === params.id
        )

        if (findExaminer) {
            setExaminerValues(findExaminer)
        }
    }, [examinerCase.allOpponentItems, params.id])

    let toast = useToast()

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
                spacing='20px'
                w='100%'
                bg='#ffffff'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{
                            title: 'Main View Opponent',
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
                                <Text> Opponent</Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/m-examiners/opponents/edit/${params.id}`
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
                                    {/**
                                         * <ViewOpponentPayInfo
                                        values={examinerValues}
                                        projectValues={projectValues}
                                    />
                                         * 
                                         */}
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewOpponent

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
