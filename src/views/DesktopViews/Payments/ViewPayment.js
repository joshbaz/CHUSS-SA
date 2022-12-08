import React, { useEffect } from 'react'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react'
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
import ViewPayFiles from '../../../components/PaymentComponents/ViewPayment/ViewPayFiles'
import ViewPayStudent from '../../../components/PaymentComponents/ViewPayment/ViewPayStudent'

const ViewPayment = (props) => {
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let toast = useToast()

    useEffect(() => {
       

        /** dispatch to getSinglePayment */
        dispatch(getSinglePayment(params.id))
    }, [params.id, dispatch])
    let paymentCase = useSelector((state) => state.payment)

    useEffect(() => {
        if (paymentCase.isError) {
            toast({
                position: 'top',
                title: paymentCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(reset())
        }
    }, [paymentCase.isError, paymentCase.isSuccess, paymentCase.message])

    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar topbarData={{ title: 'Payments', count: null }} />

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

                                    {
                                        /**
                                         * <ViewPayFiles />
                                         * 
                                         */
                                    }
                                    
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

const SubmitButton = styled(Box)`
    background: #f7f9fc;
    width: 126px;
    height: 32px;
    box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
    border-radius: 6px;

    color: #868fa0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`

const PrintButton = styled(Box)`
    height: 32px;
    background: #f4797f !important;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
    border-radius: 6px;
    padding: 6px 12px;
    color: #ffffff;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
