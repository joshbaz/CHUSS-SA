import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Checkbox,
    Button,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
const LoginForm = ({
    values,
    handleChange,
    errors,
    isValid,
    dirty,
    touched,
    passError,
    usernameError,
    isSubmittingp,
    setFieldValue,
}) => {
    const [textSecure, setTextSecure] = React.useState(true)

    const handleTextSecure = () => {
        setTextSecure(() => !textSecure)
    }
    return (
        <Container disabledB={!(isValid && dirty)}>
            <Stack direction='column' spacing='60px'>
                {/** title */}
                <TextHeadStack spacing='20px'>
                    <Box className='section_title'>Login</Box>

                    <Box className='section_inst'>
                        <Text className='section_sub1'>Welcome!</Text>
                        <Text className='section_sub2'>
                            Please enter your details to Log into your admin
                            account
                        </Text>
                    </Box>
                </TextHeadStack>

                {/** form */}
                <Stack direction={'column'} spacing='24px'>
                    <Stack direction='column' spacing='15px'>
                        <FieldStack spacing='8px'>
                            <label>
                                Username <span>*</span>
                            </label>
                            <Box>
                                <input
                                    type='email'
                                    placeholder='Enter your email address...'
                                    value={values.email}
                                    onChange={handleChange}
                                    name='email'
                                />
                            </Box>
                        </FieldStack>

                        <FieldStack spacing='8px'>
                            <label>
                                Password <span>*</span>
                            </label>
                            <Box>
                                <InputGroup h='32px'>
                                    <input
                                        type={textSecure ? 'password' : 'text'}
                                        placeholder='Enter your secret passkey'
                                        value={values.password}
                                        onChange={handleChange}
                                        name='password'
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
                            </Box>
                        </FieldStack>

                        {/** errors */}
                        {passError || usernameError ? (
                            <Box className='errors_section'>
                                {passError && (
                                    <Text>
                                        Sorry, that password isn't right.
                                        <br /> We can help you{' '}
                                        <Link to='/auth/reset'>
                                            <span>recover your password</span>
                                        </Link>
                                    </Text>
                                )}

                                {usernameError && (
                                    <Text>
                                        Sorry, couldn't find an account with.
                                        <br /> that username
                                        <br />
                                        We can help you{' '}
                                        <span>
                                            <Link to='/auth/reset'>
                                                recover your username
                                            </Link>
                                        </span>
                                    </Text>
                                )}
                            </Box>
                        ) : null}
                    </Stack>

                    <Stack direction='column' spacing={'40px'}>
                        {/** remember passkey */}
                        <Box className='checkbox'>
                            <Checkbox
                                colorScheme='gray'
                                onChange={(e) => {
                                    setFieldValue(
                                        'staySigned',
                                        e.target.checked
                                    )
                                }}
                                isChecked={values.staySigned}>
                                Remember password
                            </Checkbox>
                        </Box>

                        {/** Submit Button */}
                        <Box w='100%'>
                            <Button
                                type='submit'
                                disabled={!(isValid && dirty)}
                                isLoading={isSubmittingp ? true : false}
                                className='button'>
                                Login
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default LoginForm

const Container = styled(Box)`
    font-family: 'Inter';

    .checkbox {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #838389;
    }

    .button {
        width: 100%;
        height: 40px;
        background: ${({ disabledB, ...props }) =>
            disabledB ? '#d0d0d0' : props.theme.backgroundMainColor};

        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2),
            0px 15px 35px -5px rgba(17, 24, 38, 0.15),
            0px 5px 15px -3px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fbfbfb;
        color: ${({ disabledB, ...props }) =>
            disabledB ? props.theme.backgroundMainColor : '#fbfbfb'};
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;

        &:hover {
            background: ${({ disabledB, ...props }) =>
                disabledB ? '#d0d0d0' : props.theme.backgroundMainColor};
        }
    }

    .errors_section {
        width: 100%;
        font-weight: 600;
        font-size: 12px;
        line-height: 20px;
        color: #a1080b;
        background: #fceded;
        border-radius: 6px;
        padding: 15px 24px;
        span {
            text-decoration-line: underline;
            font-weight: 700;
            color: #3a3a43;
            cursor: pointer;
        }
    }
`

const TextHeadStack = styled(Stack)`
    .section_title {
        font-family: Josefin Slab;
        font-weight: 600;
        font-size: 33px;
        line-height: 20px;
        letter-spacing: 0.04em;
    }

    .section_sub1 {
        font-family: Inter;
        font-style: italic;
        font-weight: 600;
        font-size: 15px;
        line-height: 15px;
    }
    .section_sub2 {
        font-family: Inter;
        margin-top: 7px;
        font-size: 13px;
        line-height: 15px;
        color: #abaaaf;
        letter-spacing: 0.02em;
    }
`

const FieldStack = styled(Stack)`
    span {
        color: #ed1f29;
    }

    label {
        font-family: 'Inter';
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    input {
        width: 100%;
        height: 32px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        text-indent: 10px;
    }
`
