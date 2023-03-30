/* eslint-disable array-callback-return */
import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Select, Input } from '@chakra-ui/react'

const ViewOpponentPayInfo = ({ values, projectValues }) => {
    const [payInfo, setPayInfo] = React.useState(null)
    React.useEffect(() => {
        if (values !== null && values.paymentInfo.length > 0) {
            projectValues.opponents.find((element) => {
                if (element.opponentId._id === values._id) {
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
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Payment Information</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>Preferred payment</label>
                            <fieldset>
                                <Select
                                    name='preferredPayment'
                                    value={
                                        payInfo !== null &&
                                        payInfo.preferredPayment
                                    }>
                                    <option value='mobileMoney'>
                                        Mobile Money
                                    </option>
                                    <option value='Bank Transfer/Money Transfer /SWIFT'>
                                        Bank Transfer/Money Transfer /SWIFT
                                    </option>
                                </Select>
                            </fieldset>
                        </Stack>
                    </Box>

                    {/** 
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Period of Appointment <span>*</span>
                            </label>
                            <fieldset>
                                <input type='text' className='input1' />
                            </fieldset>
                        </Stack>
                    </Box>
                  */}
                    {payInfo !== null &&
                    payInfo.preferredPayment === 'mobileMoney' ? (
                        <>
                            {' '}
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>
                                        Mobile Network Operator <span>*</span>
                                    </label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.mobileOperator
                                                    ? payInfo.mobileOperator
                                                    : ''
                                            }
                                            name='mobileOperator'
                                            placeholder={
                                                'i.e MTN, Airtel Uganda, Safricom, Airtel Kenya'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>
                                        Mobile Subscriber's Name <span>*</span>
                                    </label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.mobileSubscriberName
                                                    ? payInfo.mobileSubscriberName
                                                    : ''
                                            }
                                            name='mobileSubscriberName'
                                            placeholder={
                                                'Registered mobile subscriber name'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>
                                        Mobile Number <span>*</span>
                                    </label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.mobileNumber
                                                    ? payInfo.mobileNumber
                                                    : ''
                                            }
                                            name='mobileNumber'
                                            placeholder={
                                                'Registered mobile subscriber Number'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                        </>
                    ) : (
                        <>
                            {' '}
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>Bank</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null && payInfo.bank
                                                    ? payInfo.bank
                                                    : ''
                                            }
                                            name='bank'
                                            placeholder={
                                                'Name of Commercial Banks'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>A/C Holder Name</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.AccountName
                                                    ? payInfo.AccountName
                                                    : ''
                                            }
                                            name='AccName'
                                            placeholder={
                                                'Name of the bank account holder'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>A/C Number</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.AccountNumber
                                                    ? payInfo.AccountNumber
                                                    : ''
                                            }
                                            name='AccNumber'
                                            placeholder={'Bank Account Number'}
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>SWIFT/BIC Code</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.swift_bicCode
                                                    ? payInfo.swift_bicCode
                                                    : ''
                                            }
                                            name='swift_bicCode'
                                            placeholder={
                                                'Find SWIFT/BIC code on bank Website'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>Bank Code</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.bankCode
                                                    ? payInfo.bankCode
                                                    : ''
                                            }
                                            name='bankCode'
                                            placeholder={'bank code'}
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>Branch Code</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.branchCode
                                                    ? payInfo.branchCode
                                                    : ''
                                            }
                                            name='branchCode'
                                            placeholder={
                                                'Find Branch Code on Bank Website'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>Bank Address</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            value={
                                                payInfo !== null &&
                                                payInfo.bankAddress
                                                    ? payInfo.bankAddress
                                                    : ''
                                            }
                                            name='bankAddress'
                                            placeholder={'bank address'}
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                            <Box className='formfields__Sfieldset'>
                                <Stack spacing='8px' className='form_wrap'>
                                    <label>Bank City</label>
                                    <fieldset>
                                        <Input
                                            type='text'
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.bankCity
                                                    ? payInfo.bankCity
                                                    : ''
                                            }
                                            name='bankCity'
                                            placeholder={
                                                'Bank city i.e Nairobi'
                                            }
                                            className='input1'
                                        />
                                    </fieldset>
                                </Stack>
                            </Box>
                        </>
                    )}
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewOpponentPayInfo

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 325px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .formtitle {
        height: 54px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #d1d5db;
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

    label {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;

        span {
            color: #ed1f29;
        }
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
    }

    select {
        background: #fef9ef;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;

        padding: 0 10px;
    }

    .input1 {
        background: #fef9ef;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
