import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'

const OpponentADetailForm = ({ values, handleChange,errors }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Details of Opponent</h1>
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

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Name <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.name}
                                    name='name'
                                    onChange={handleChange}
                                    placeholder={'i.e Apollo Kimani'}
                                />

                                {errors && errors.name ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.name}
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
                                <Input
                                    type='text'
                                    value={values.phoneNumber}
                                    name='phoneNumber'
                                    onChange={handleChange}
                                    placeholder={'e.g 256787785114'}
                                />

                                {errors && errors.phoneNumber ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.phoneNumber}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Stack>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Postal address <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.postalAddress}
                                    name='postalAddress'
                                    onChange={handleChange}
                                    placeholder={'postalAddress'}
                                />

                                {errors && errors.postalAddress ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.postalAddress}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Country of Residence <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.countryOfResidence}
                                    name='countryOfResidence'
                                    onChange={handleChange}
                                    placeholder={'i.e Uganda'}
                                />

                                {errors && errors.countryOfResidence ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.countryOfResidence}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Higer Education Institution (or detailed
                                information of examinars place of work){' '}
                                <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.placeOfWork}
                                    name='placeOfWork'
                                    onChange={handleChange}
                                    placeholder={'i.e Makerere University'}
                                />

                                {errors && errors.placeOfWork ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.placeOfWork}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Other Academic and/or Professional Titles{' '}
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={values.otherTitles}
                                    name='otherTitles'
                                    onChange={handleChange}
                                    placeholder={'i.e Ph.D, Dr.'}
                                />
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default OpponentADetailForm

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
