import React from 'react'
import styled from 'styled-components'
import { Box, Stack } from '@chakra-ui/react'

const PaymentInfoForm = () => {
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
                            <label>
                                Prefereed payment <span>*</span>
                            </label>
                            <fieldset>
                                <select>
                                    <option>
                                        Bank Transfer/Money Transfer/SWIFT
                                    </option>
                                    <option>Mobile Money</option>
                                    <option>Cash</option>
                                </select>
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Account Holder Details <span>*</span>
                            </label>
                            <fieldset>
                                <input
                                    type='text'
                                    className='input1'
                                    placeholder='Bank acc holder name/Registered mobile subscriber name'
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Payment Details <span>*</span>
                            </label>
                            <fieldset>
                                <input
                                    type='text'
                                    className='input1'
                                    placeholder='Bank acc number/Registered mobile number'
                                />
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default PaymentInfoForm

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
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #464f60;
    }

    .input1 {
        background: #fef9ef;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #464f60;
        padding: 0 10px;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
