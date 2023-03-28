import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const FacilitatorPasskey = ({
    values,
    handleChange,
    errors,
    setFieldValue,
}) => {
    const [textSecure, setTextSecure] = React.useState(true)
    const [textSecure2, setTextSecure2] = React.useState(true)

    const handleTextSecure = () => {
        setTextSecure(() => !textSecure)
    }

    const handleTextSecure2 = () => {
        setTextSecure2(() => !textSecure2)
    }
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Create Password</h1>
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
                                Password <span>*</span>
                            </label>
                            <fieldset>
                                <InputGroup h='32px'>
                                    <Input
                                        className={
                                            errors && errors.password
                                                ? 'input_error'
                                                : ''
                                        }
                                        type={textSecure ? 'password' : 'text'}
                                        autoComplete='current-password'
                                        value={values.password}
                                        name='password'
                                        onChange={handleChange}
                                        placeholder={'password'}
                                    />

                                    <InputRightElement
                                        h='32px'
                                        children={
                                            textSecure ? (
                                                <Box
                                                    onClick={handleTextSecure}
                                                    h='100%'
                                                    m='0'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}>
                                                    <BsEye color='green.500' />
                                                </Box>
                                            ) : (
                                                <Box
                                                    h='100%'
                                                    m='0'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                    onClick={handleTextSecure}>
                                                    <BsEyeSlash color='green.500' />
                                                </Box>
                                            )
                                        }
                                    />
                                </InputGroup>

                                {errors && errors.password ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.password}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Confirm Password <span>*</span>
                            </label>
                            <fieldset>
                                <InputGroup h='32px'>
                                    <Input
                                        className={
                                            errors &&
                                            errors.passwordConfirmation
                                                ? 'input_error'
                                                : ''
                                        }
                                        autoComplete='current-password'
                                        type={textSecure2 ? 'password' : 'text'}
                                        value={values.passwordConfirmation}
                                        name='passwordConfirmation'
                                        onChange={handleChange}
                                        placeholder={'confirm password'}
                                    />

                                    <InputRightElement
                                        h='32px'
                                        children={
                                            textSecure2 ? (
                                                <Box
                                                    onClick={handleTextSecure2}
                                                    h='100%'
                                                    m='0'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}>
                                                    <BsEye color='green.500' />
                                                </Box>
                                            ) : (
                                                <Box
                                                    h='100%'
                                                    m='0'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                    }}
                                                    onClick={handleTextSecure2}>
                                                    <BsEyeSlash color='green.500' />
                                                </Box>
                                            )
                                        }
                                    />
                                </InputGroup>

                                {errors && errors.passwordConfirmation ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.passwordConfirmation}
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

export default FacilitatorPasskey

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;

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
