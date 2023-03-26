/* eslint-disable array-callback-return */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input } from '@chakra-ui/react'


const UpdatePaymentInfo = ({ values, projectValues }) => {
    const [payInfo, setPayInfo] = React.useState(null)
    useEffect(() => {
        if (values !== null && values.paymentInfo.length > 0) {
            projectValues.examiners.find((element) => {
                if (element.examinerId._id === values._id) {
                    values.paymentInfo.find((element2) => {
                        if (
                            element2.preferredPayment ===
                            element.preferredPayment
                        ) {
                            setPayInfo(element2)
                        }
                    })
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values])
    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Payment Information</h1>
                    </Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Prefereed payment </Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={
                                    payInfo !== null && payInfo.preferredPayment
                                }
                            />
                        </Box>
                    </Stack>

                    {payInfo !== null &&
                    payInfo.preferredPayment === 'mobileMoney' ? (
                        <>
                            {' '}
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Network Operator</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileOperator
                                                ? payInfo.mobileOperator
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Subscriber's Name</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileSubscriberName
                                                ? payInfo.mobileSubscriberName
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Number</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileNumber
                                                ? payInfo.mobileNumber
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                        </>
                    ) : (
                        <>
                            {' '}
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null && payInfo.bank
                                                ? payInfo.bank
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>A/C Holder Name</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.AccountName
                                                ? payInfo.AccountName
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>A/C Number</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.AccountNumber
                                                ? payInfo.AccountNumber
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>SWIFT/BIC Code</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.swift_bicCode
                                                ? payInfo.swift_bicCode
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank Code</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null && payInfo.bankCode
                                                ? payInfo.bankCode
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Branch Code</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.branchCode
                                                ? payInfo.branchCode
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank Address</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.bankAddress
                                                ? payInfo.bankAddress
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank City</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null && payInfo.bankCity
                                                ? payInfo.bankCity
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                        </>
                    )}
                </Stack>
            </Box>
        </Container>
    )
}

export default UpdatePaymentInfo

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;
        min-height: 275px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .s_name {
        color: #20202a;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }

    label {
        width: 91px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
    }

    .form_subtitle {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    input {
        background: #fefaf2;
        border-radius: 6px;

        height: 32px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
`
