/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Button, Text } from '@chakra-ui/react'
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

import { Logout, reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'

import ViewFacilitatorDetailForm from '../../../components/Facilitators/ViewFacilitator/ViewFacilitatorDetailForm'
import ViewFacilitatorPrivileges from '../../../components/Facilitators/ViewFacilitator/ViewFacilitatorPrivileges'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
const { backgroundMainColor, textLightColor } = dashboardLightTheme

const ViewFacilitator = () => {
    // let toast = useToast()
    let dispatch = useDispatch()
    let routeNavigate = useNavigate()
    let params = useParams()
    const [individual, setIndividual] = React.useState(null)

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

    useEffect(() => {
        toast.dismiss()

        toast.promise(
            dispatch(allFacilitators()).then((res) => {
                //console.log('res', res)
                if (res.meta.requestStatus === 'rejected') {
                    let responseCheck = errorHandler(res)
                    throw new Error(responseCheck)
                } else {
                    return res
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
            // toast({
            //     position: 'top',
            //     title: message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })

            dispatch(reset())
            dispatch(areset())
        }
        dispatch(reset())
        dispatch(areset())
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
