import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react'
import { BsEyeSlash, BsEye } from 'react-icons/bs'

const UpdateFacilitatorPassword = ({ values, handleReset }) => {
    const [textSecure, setTextSecure] = React.useState(true)

    const handleTextSecure = () => {
        setTextSecure(() => !textSecure)
    }

    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Reset Password</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <SubmitButton>
                        <Button
                            onClick={() => handleReset()}
                            className='button'>
                            Reset Password
                        </Button>
                    </SubmitButton>
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                               One time Password <span>*</span>
                            </label>
                            <fieldset>
                                <InputGroup h='32px'>
                                    <Input
                                        type={textSecure ? 'password' : 'text'}
                                        autoComplete='current-password'
                                        value={
                                            values !== null &&
                                            values.oneTimePassword
                                                ? values.oneTimePassword
                                                : ''
                                        }
                                        readOnly
                                        name='password'
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
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default UpdateFacilitatorPassword

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

const SubmitButton = styled(Box)`
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        &:hover {
            background: ${({ disabledb, ...props }) =>
                disabledb ? '#d0d0d0' : '#F4797F'};
        }
    }
`
