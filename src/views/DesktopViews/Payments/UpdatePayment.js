import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
// import ViewExaminerDetail from '../../../components/ProjectComponents/ViewExaminer/ViewExaminerDetail'
// import ViewInfoForm from '../../../components/ProjectComponents/ViewExaminer/ViewInfoForm'
// import ViewPaymentInfo from '../../../components/ProjectComponents/ViewExaminer/ViewPaymentInfo'
import { useNavigate } from 'react-router-dom'
//import { useSelector, useDispatch } from 'react-redux'
// import {
//     getIndividualExaminer,
//     reset as eReset,
// } from '../../../store/features/Examiner/examinerSlice'
import ViewPaymentDetails from '../../../components/PaymentComponents/ViewPayment/ViewPaymentDetails'
import ViewPayExaminerDetails from '../../../components/PaymentComponents/ViewPayment/ViewPayExaminerDetails'
import ViewPayFiles from '../../../components/PaymentComponents/ViewPayment/ViewPayFiles'
import ViewPayStudent from '../../../components/PaymentComponents/ViewPayment/ViewPayStudent'

const UpdatePayment = () => {
    let routeNavigate = useNavigate()
    return (
        <Container direction='row' w='100vw'>
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

                            <Stack direction='row' alignItems='center'>
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
                        </Stack>

                        {/** forms */}

                        <Stack direction='column' w='100%'>
                            {/** first set */}
                            <Stack direction='row'>
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <ViewPaymentDetails />

                                    <ViewPayFiles />
                                </Stack>

                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <ViewPayExaminerDetails />

                                    <ViewPayStudent />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default UpdatePayment

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
