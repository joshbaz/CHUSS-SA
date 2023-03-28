import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const FacilitatorDetailForm = ({
    values,
    handleChange,
    errors,
    setFieldValue,
}) => {
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
                                    className={
                                        errors && errors.jobtitle
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='text'
                                    value={values.jobtitle}
                                    name='jobtitle'
                                    onChange={handleChange}
                                    placeholder={'i.e Prof. or Assoc.Prof.'}
                                />
                                {errors && errors.jobtitle ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.jobtitle}
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
                                Firstname <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    className={
                                        errors && errors.firstname
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='text'
                                    value={values.firstname}
                                    name='firstname'
                                    onChange={handleChange}
                                    placeholder={'i.e  Apollo'}
                                />
                                {errors && errors.firstname ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.firstname}
                                    </ErrorMsg>
                                ) : null}
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
                                    className={
                                        errors && errors.lastname
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='text'
                                    value={values.lastname}
                                    name='lastname'
                                    onChange={handleChange}
                                    placeholder={'i.e  Kimani'}
                                />
                                {errors && errors.lastname ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.lastname}
                                    </ErrorMsg>
                                ) : null}
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
                                    className={
                                        errors && errors.email
                                            ? 'input_error'
                                            : ''
                                    }
                                    type='text'
                                    value={values.email}
                                    name='email'
                                    onChange={handleChange}
                                    placeholder={'email i.e apollo@yahoo.com'}
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
                                    value={values.contact}
                                    name='contact'
                                    onChange={(phone, e, formatedVal) =>
                                        setFieldValue(
                                            'contact',
                                            formatedVal.target.value
                                        )
                                    }
                                    placeholder={'e.g 256787785114'}
                                />

                                {errors && errors.contact ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.contact}
                                    </ErrorMsg>
                                ) : null}
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
                                    value={values.role}
                                    name='role'
                                    onChange={handleChange}
                                    placeholder={'i.e Administrator'}
                                />

                                {errors && errors.role ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.role}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default FacilitatorDetailForm

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
