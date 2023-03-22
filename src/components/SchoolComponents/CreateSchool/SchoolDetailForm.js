import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const SchoolDetailForm = ({ values, handleChange, setFieldValue }) => {
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    onChange={handleChange}
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
                                    type='email'
                                    value={values.email}
                                    name='email'
                                    onChange={handleChange}
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
                                    type='email'
                                    value={values.otherEmail}
                                    name='otherEmail'
                                    onChange={handleChange}
                                    placeholder={'other email'}
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
                                <PhoneInput
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                    inputProps={{
                                        name: 'officeNumber',
                                    }}
                                    country={'ug'}
                                    value={values.officeNumber}
                                    name='officeNumber'
                                    onChange={(phone, e, formatedVal) =>
                                        setFieldValue(
                                            'officeNumber',
                                            formatedVal.target.value
                                        )
                                    }
                                    placeholder={'office number'}
                                />
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>Mobile Number</label>
                            <fieldset>
                                <PhoneInput
                                    inputStyle={{
                                        width: '100%',
                                    }}
                                    inputProps={{
                                        name: 'mobileNumber',

                                        autoFocus: true,
                                    }}
                                    country={'ug'}
                                    value={values.mobileNumber}
                                    name='mobileNumber'
                                    onChange={(number) => {
                                        //console.log('number', number)
                                        setFieldValue('mobileNumber', number)
                                    }}
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

export default SchoolDetailForm

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
            font-size: 18px;
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
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
