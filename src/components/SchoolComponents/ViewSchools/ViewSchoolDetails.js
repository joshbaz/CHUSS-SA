import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'

const ViewSchoolDetails = ({ values }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Details of School</h1>
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
                                School Name <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.schoolName}
                                    name='schoolName'
                                    readOnly
                                    placeholder={'school name'}
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
                                Dean Name <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.deanName}
                                    name='deanName'
                                    readOnly
                                    placeholder={'dean name'}
                                />
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Designation <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.deanDesignation}
                                    name='deanDesignation'
                                    readOnly
                                    placeholder={'Dean Designation'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>

                    {/** emails */}
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
                                    value={values.email}
                                    name='deanName'
                                    readOnly
                                    placeholder={'email'}
                                />
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>Other Email</label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.otherEmail}
                                    name='otherEmail'
                                    readOnly
                                    placeholder={'Other email'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>

                    {/** phoneNumbers */}
                    <Stack direction='row' className=''>
                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Office Number <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.officeNumber}
                                    name='officeNumber'
                                    readOnly
                                    placeholder={'office number'}
                                />
                            </fieldset>
                        </Stack>
                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Mobile Number <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.mobileNumber}
                                    name='mobileNumber'
                                    readOnly
                                    placeholder={'mobile number'}
                                />
                            </fieldset>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewSchoolDetails

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

        border: 1px solid gray.200;
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

    .formfields__Dfieldset {
        width: 100%;
    }
`
