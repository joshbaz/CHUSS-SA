/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Button, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    allFacilitators,
} from '../../../store/features/facilitators/facilitatorSlice'

import ViewFacilitatorDetailForm from '../../../components/Facilitators/ViewFacilitator/ViewFacilitatorDetailForm'
import ViewFacilitatorPrivileges from '../../../components/Facilitators/ViewFacilitator/ViewFacilitatorPrivileges'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
const { backgroundMainColor, textLightColor } = dashboardLightTheme

const ViewFacilitator = () => {
    let toast = useToast()
    let dispatch = useDispatch()
    let routeNavigate = useNavigate()
    let params = useParams()
    const [individual, setIndividual] = React.useState(null)

    useEffect(() => {
        dispatch(allFacilitators())
        // dispatch(allLoginActivities())
    }, [])
    const { allfacilitatorItems, isError, isSuccess, message } = useSelector(
        (state) => state.facilitator
    )

    useEffect(() => {
        let findfacilitator = allfacilitatorItems.items.find(
            (element) => element._id === params.id
        )

        if (findfacilitator) {
            setIndividual(() => findfacilitator)
        }
    }, [allfacilitatorItems, params.id])

    useEffect(() => {
        if (isError && message) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }
    }, [isError, isSuccess, message])
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
                            title: 'View Facilitator',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Stack
                        direction='column'
                        bg={backgroundMainColor}
                        minH='80vh'
                        spacing={'20px'}
                        padding={'30px 20px 30px 20px'}>
                        {/** title head */}
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                            color={textLightColor}>
                            <BackButtonStack
                                className='back_button'
                                direction='row'
                                alignItems='center'>
                                <Box
                                    fontSize='25px'
                                    onClick={() => routeNavigate(-1)}>
                                    <MdArrowBack />
                                </Box>
                                <Text>View Facilitator</Text>
                            </BackButtonStack>

                            <SubmitButton>
                                <Button
                                    onClick={() =>
                                        routeNavigate(
                                            `/facilitators/update/${params.id}`
                                        )
                                    }
                                    className='button'>
                                    Update facilitator
                                </Button>
                            </SubmitButton>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            <Stack direction='row'>
                                {/** Details & files */}
                                <Stack
                                    direction='column'
                                    w='65%'
                                    spacing='20px'>
                                    <ViewFacilitatorDetailForm
                                        values={individual}
                                    />
                                </Stack>

                                {/** priviledges & password */}

                                <Stack
                                    direction='column'
                                    w='35%'
                                    spacing='20px'>
                                    <ViewFacilitatorPrivileges
                                        values={individual}
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

export default ViewFacilitator

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
