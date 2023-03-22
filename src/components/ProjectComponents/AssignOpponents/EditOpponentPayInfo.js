import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Select, Input } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const EditOpponentPayInfo = ({
    values,

    handleChange,
    handleEditPhoneChange,
}) => {
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
                                    onChange={handleChange}
                                    value={
                                        values !== null &&
                                        values.preferredPayment
                                            ? values.preferredPayment
                                            : 'mobileMoney'
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
                    {values !== null &&
                    values.preferredPayment === 'mobileMoney' ? (
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
                                            value={
                                                values !== null &&
                                                values.mobileOperator
                                                    ? values.mobileOperator
                                                    : ''
                                            }
                                            name='mobileOperator'
                                            onChange={handleChange}
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
                                            value={
                                                values !== null &&
                                                values.mobileSubscriberName
                                                    ? values.mobileSubscriberName
                                                    : ''
                                            }
                                            name='mobileSubscriberName'
                                            onChange={handleChange}
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
                                        <PhoneInput
                                            inputStyle={{
                                                width: '100%',
                                            }}
                                            inputProps={{
                                                name: 'mobileNumber',
                                            }}
                                            className='input1'
                                            country={'ug'}
                                            value={
                                                values !== null &&
                                                values.mobileNumber
                                                    ? values.mobileNumber
                                                    : ''
                                            }
                                            name='mobileNumber'
                                            onChange={(
                                                phone,
                                                e,
                                                formatedVal
                                            ) => {
                                                if (
                                                    formatedVal.target.value ===
                                                    '+'
                                                ) {
                                                    handleEditPhoneChange(
                                                        'mobileNumber',
                                                        ''
                                                    )
                                                } else {
                                                    handleEditPhoneChange(
                                                        'mobileNumber',
                                                        formatedVal.target.value
                                                    )
                                                }
                                            }}
                                            placeholder={
                                                'Registered mobile subscriber Number'
                                            }
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
                                            value={
                                                values !== null && values.bank
                                                    ? values.bank
                                                    : ''
                                            }
                                            onChange={handleChange}
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
                                            value={
                                                values !== null &&
                                                values.AccountName
                                                    ? values.AccountName
                                                    : ''
                                            }
                                            onChange={handleChange}
                                            name='AccountName'
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
                                            value={
                                                values !== null &&
                                                values.AccountNumber
                                                    ? values.AccountNumber
                                                    : ''
                                            }
                                            onChange={handleChange}
                                            name='AccountNumber'
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
                                            value={
                                                values !== null &&
                                                values.swift_bicCode
                                                    ? values.swift_bicCode
                                                    : ''
                                            }
                                            onChange={handleChange}
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
                                            value={
                                                values !== null &&
                                                values.bankCode
                                                    ? values.bankCode
                                                    : ''
                                            }
                                            name='bankCode'
                                            onChange={handleChange}
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
                                            value={
                                                values !== null &&
                                                values.branchCode
                                                    ? values.branchCode
                                                    : ''
                                            }
                                            name='branchCode'
                                            onChange={handleChange}
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
                                                values !== null &&
                                                values.bankAddress
                                                    ? values.bankAddress
                                                    : ''
                                            }
                                            name='bankAddress'
                                            onChange={handleChange}
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
                                            value={
                                                values !== null &&
                                                values.bankCity
                                                    ? values.bankCity
                                                    : ''
                                            }
                                            name='bankCity'
                                            placeholder={
                                                'Bank city i.e Nairobi'
                                            }
                                            onChange={handleChange}
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

export default EditOpponentPayInfo

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
