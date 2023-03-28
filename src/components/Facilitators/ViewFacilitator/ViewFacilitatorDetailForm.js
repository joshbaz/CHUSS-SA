import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const ViewFacilitatorDetailForm = ({ values }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Details of Facilitator</h1>
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
                                Current Job Title (if retired details of last
                                Job title) <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        values !== null && values.jobtitle
                                            ? values.jobtitle
                                            : ''
                                    }
                                    readOnly
                                    name='jobtitle'
                                    placeholder={'i.e Prof. or Assoc.Prof.'}
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Stack direction='row' className=''>
                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Firstname <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        values !== null && values.firstname
                                            ? values.firstname
                                            : ''
                                    }
                                    readOnly
                                    name='firstname'
                                    placeholder={'i.e  Apollo'}
                                />
                            </fieldset>
                        </Stack>

                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Lastname <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        values !== null && values.lastname
                                            ? values.lastname
                                            : ''
                                    }
                                    readOnly
                                    name='lastname'
                                    placeholder={'i.e  Kimani'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>
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
                                    type='text'
                                    value={
                                        values !== null && values.email
                                            ? values.email
                                            : ''
                                    }
                                    readOnly
                                    name='email'
                                    placeholder={'email i.e apollo@yahoo.com'}
                                />
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Phone Number <span>*</span>
                            </label>
                            <fieldset>
                                <PhoneInput
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                    inputProps={{
                                        name: 'contact',
                                    }}
                                    country={'ug'}
                                    value={
                                        values !== null && values.contact
                                            ? values.contact
                                            : ''
                                    }
                                    readOnly
                                    name='contact'
                                    placeholder={'e.g 256787785114'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Role <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        values !== null && values.role
                                            ? values.role
                                            : ''
                                    }
                                    readOnly
                                    name='role'
                                    placeholder={'i.e Administrator'}
                                />
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewFacilitatorDetailForm

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

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
