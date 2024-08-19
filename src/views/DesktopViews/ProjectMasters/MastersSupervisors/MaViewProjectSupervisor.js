/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    allSupervisors,
    reset,
} from '../../../../store/features/supervisors/supervisorSlice'
import ViewSupervisorADetailForm from '../../../../components/ProjectComponents/AssignSupervisors/ViewSupervisorADetailForm'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'
import toast from 'react-hot-toast'
import {
    Logout,
    reset as areset,
} from '../../../../store/features/auth/authSlice'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const MaViewProjectSupervisor = () => {
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    // let toast = useToast()
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
        } else if (errorResponse.payload.includes('Not authorized')) {
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
              dispatch(allSupervisors()).then((res) => {
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
    }, [])

    let { allSupervisorItems, isSuccess, isError, message } = useSelector(
        (state) => state.supervisor
    )

    useEffect(() => {
        if (isError) {
            dispatch(areset())
        }

        if (isSuccess && message) {
            dispatch(reset())
            dispatch(areset())
        }

        dispatch(reset())
        dispatch(areset())
    }, [isSuccess, isError, message])

    useEffect(() => {
        let findSupervisor = allSupervisorItems.items.find(
            (element) => element._id === params.s_id
        )

        if (findSupervisor) {
            setIndividual(findSupervisor)
        }
    }, [allSupervisorItems, params.s_id])
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
                            title: 'View Master Supervisor',
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
                                <Text>Supervisor</Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/masters/projects/supervisors/update/${params.p_id}/${params.s_id}`
                                    )
                                }>
                                Edit Details
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
                                    <ViewSupervisorADetailForm
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

export default MaViewProjectSupervisor

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
