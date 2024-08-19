import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    reset,
    getSinglePayment,
} from '../../../store/features/payments/paymentSlice'
import ViewPaymentDetails from '../../../components/PaymentComponents/ViewPayment/ViewPaymentDetails'
import ViewPayExaminerDetails from '../../../components/PaymentComponents/ViewPayment/ViewPayExaminerDetails'
//import ViewPayFiles from '../../../components/PaymentComponents/ViewPayment/ViewPayFiles'
import ViewPayStudent from '../../../components/PaymentComponents/ViewPayment/ViewPayStudent'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'

import { reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../components/common/CustomToastFunctions/ToastFunctions'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const ViewPayment = (props) => {
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()

    useEffect(() => {
        /** dispatch to getSinglePayment */
        let idValues = {
            id: params.id,
        }

        toast.dismiss()
        toast.promise(
            dispatch(getSinglePayment(idValues)).then((res) => {
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
    }, [params.id, dispatch])
    let paymentCase = useSelector((state) => state.payment)

    useEffect(() => {
        if (paymentCase.isError) {
            dispatch(reset())
            dispatch(areset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paymentCase.isError, paymentCase.isSuccess, paymentCase.message])

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
                    <TopBar topbarData={{ title: 'Payments', count: null }} />
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
                                <Text>Payment Request</Text>
                            </BackButtonStack>

                            {/**
                                 *   <Stack direction='row' alignItems='center'>
                                <SubmitButton
                                    as='button'
                                    onClick={() =>
                                        routeNavigate(
                                            '/projects/examiners/update/:s_id/:e_id'
                                        )
                                    }>
                                    Edit Details
                                </SubmitButton>

                                <PrintButton as='button'>
                                    Print Request Form
                                </PrintButton>
                            </Stack>
                                 * 
                                 * 
                                 */}
                        </Stack>

                        {/** forms */}

                        <Stack direction='column' w='100%'>
                            {/** first set */}
                            <Stack direction='row'>
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <ViewPaymentDetails
                                        values={paymentCase.individualPayment}
                                    />

                                    {/**
                                     * <ViewPayFiles />
                                     *
                                     */}
                                </Stack>

                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <ViewPayExaminerDetails
                                        values={paymentCase.individualPayment}
                                    />

                                    <ViewPayStudent
                                        values={paymentCase.individualPayment}
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

export default ViewPayment

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`
