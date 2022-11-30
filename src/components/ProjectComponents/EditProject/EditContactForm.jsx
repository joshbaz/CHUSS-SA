import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'

const EditContactForm = ({ values, handleChange, errors }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Candidate Contact Details</h1>
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
                                Phone Number <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    className={
                                        errors && errors.phoneNumber
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='text'
                                    name='phoneNumber'
                                    value={
                                        values !== null && values.phoneNumber
                                            ? values.phoneNumber
                                            : ''
                                    }
                                    onChange={handleChange}
                                    placeholder='i.e 0787785114'
                                />

                                {errors && errors.phoneNumber ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.phoneNumber}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Stack direction='row' className=''>
                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Email <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    className={
                                        errors && errors.email
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='email'
                                    name='email'
                                    value={
                                        values !== null && values.email
                                            ? values.email
                                            : ''
                                    }
                                    onChange={handleChange}
                                    placeholder={'i.e apollo@gmail.com'}
                                />

                                {errors && errors.email ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.email}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>Alternative Email</label>
                            <fieldset>
                                <Input
                                    type='email'
                                    name='alternativeEmail'
                                    value={
                                        values !== null &&
                                        values.alternativeEmail
                                            ? values.alternativeEmail
                                            : ''
                                    }
                                    onChange={handleChange}
                                    placeholder={'i.e apollo2@gmail.com'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default EditContactForm

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;
        min-height: 243px;
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
            font-size: 17px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    label {
        font-family: 'Inter', sans-serif;
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
        border-color: transparent;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;

        height: 32px;
        width: 100%;
        color: #20202a;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }

    .input_error {
        border-color: red !important;
        box-shadow: none;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`

const ErrorMsg = styled(Box)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;
    font-family: 'Inter', sans-serif;

    .filesError {
        padding: 0;
    }
`
