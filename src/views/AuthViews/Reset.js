import React from 'react'
import {
    Box,
    Stack,
    Text,
    useToast,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Logo from '../../logo.svg'
// import { BsKeyFill } from 'react-icons/bs'
// import { MdHail } from 'react-icons/md'

import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    facilitatorNewPasskey,
    reset,
} from '../../store/features/auth/authSlice'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
const Reset = () => {
    let routeNavigate = useNavigate()
    let toast = useToast()
    let dispatch = useDispatch()
    const [helperFunctions, setHelperFunctions] = React.useState(null)

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const { isError, isSuccess, message } = useSelector((state) => state.auth)

    const [textSecure, setTextSecure] = React.useState(true)

    const handleTextSecure = () => {
        setTextSecure(() => !textSecure)
    }

    const initialValues = {
        email: '',
        onetimepassword: '',
        password: '',
        passwordConfirmation: '',
    }
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('required'),
        onetimepassword: yup.string().required('password is required'),
        password: yup.string().required('password is required'),
        passwordConfirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    React.useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)

                setIsSubmittingp(false)
            }
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }

        if (isSuccess && message) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: 'successfully Updated',
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setHelperFunctions(null)
                routeNavigate('/auth/signin', { replace: true })
            }
            dispatch(reset())
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    return (
        <Container w='100vw' h='100vh'>
            <Box className='Logo'>
                <img src={Logo} alt='' />
            </Box>

            <Box
                className='Login_button'
                onClick={() => routeNavigate('/auth/signin')}>
                <Text>Login</Text>
            </Box>

            <Stack direction='column' spacing='61px'>
                <Stack direction='column' spacing='33px'>
                    <TextHeadStack spacing='20px'>
                        <Box className='section_title'>Reset Password</Box>

                        <Box className='section_inst'>
                            <Text className='section_sub2'>
                                Please select option to reset your pasword or
                                retrive your username.
                            </Text>
                        </Box>
                    </TextHeadStack>

                    {/** reset password */}
                    {/**
                             *  <Box className='passkey_reset link_wrapper'>
                            <Stack direction='row' spacing={'12px'}>
                                <Box
                                    className='icon'
                                    bg='#FBD2D4'
                                    color='#F14C54'>
                                    <BsKeyFill />
                                </Box>
                                <Stack>
                                    <h1>Reset Password via email</h1>

                                    <Text>
                                        Link reset will be sent to your email.
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                       
                        <Box className='user_reset link_wrapper'>
                            <Stack direction='row' spacing={'12px'}>
                                <Box
                                    className='icon'
                                    bg='#FEECD0'
                                    color='#FAA723'>
                                    <MdHail />
                                </Box>
                                <Stack>
                                    <h1>Retrieve Username via email</h1>

                                    <Text>
                                        Username will be sent to your email.
                                    </Text>
                                </Stack>
                            </Stack>
                        </Box>
                             * 
                             * 
                             * 
                             * 

                             */}
                </Stack>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, helpers) => {
                        setHelperFunctions(helpers)
                        setIsSubmittingp(true)
                        let values2 = {
                            ...values,
                        }
                        dispatch(facilitatorNewPasskey(values2))
                    }}>
                    {({
                        values,
                        handleChange,
                        errors,
                        isValid,
                        dirty,
                        touched,
                        isSubmitting,
                        setFieldValue,
                    }) => (
                        <Form>
                            <Stack direction='column' spacing='20px'>
                                <Stack direction='column' spacing='15px'>
                                    <FieldStack spacing='8px'>
                                        <label>
                                            Username <span>*</span>
                                        </label>
                                        <Box>
                                            <input
                                                type='email'
                                                className={
                                                    errors && errors.email
                                                        ? 'input_error'
                                                        : ''
                                                }
                                                placeholder='Enter your email address...'
                                                value={values.email}
                                                onChange={handleChange}
                                                name='email'
                                            />
                                            {errors && errors.email ? (
                                                <ErrorMsg className='filesError'>
                                                    {errors.email}
                                                </ErrorMsg>
                                            ) : null}
                                        </Box>
                                    </FieldStack>

                                    <FieldStack spacing='8px'>
                                        <label>
                                            One time Password <span>*</span>
                                        </label>
                                        <Box>
                                            <InputGroup h='32px'>
                                                <input
                                                    type={
                                                        textSecure
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    autoComplete='current-password'
                                                    className={
                                                        errors &&
                                                        errors.onetimepassword
                                                            ? 'input_error'
                                                            : ''
                                                    }
                                                    placeholder='Enter your one time passkey'
                                                    value={
                                                        values.onetimepassword
                                                    }
                                                    onChange={handleChange}
                                                    name='onetimepassword'
                                                />
                                                <InputRightElement
                                                    h='32px'
                                                    children={
                                                        textSecure ? (
                                                            <Box
                                                                onClick={
                                                                    handleTextSecure
                                                                }
                                                                h='100%'
                                                                m='0'
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
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
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                }}
                                                                onClick={
                                                                    handleTextSecure
                                                                }>
                                                                <BsEyeSlash color='green.500' />
                                                            </Box>
                                                        )
                                                    }
                                                />
                                            </InputGroup>

                                            {errors &&
                                            errors.onetimepassword ? (
                                                <ErrorMsg className='filesError'>
                                                    {errors.onetimepassword}
                                                </ErrorMsg>
                                            ) : null}
                                        </Box>
                                    </FieldStack>

                                    <FieldStack spacing='8px'>
                                        <label>
                                            Password <span>*</span>
                                        </label>
                                        <Box>
                                            <InputGroup h='32px'>
                                                <input
                                                    type={
                                                        textSecure
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    autoComplete='current-password'
                                                    className={
                                                        errors &&
                                                        errors.password
                                                            ? 'input_error'
                                                            : ''
                                                    }
                                                    placeholder='Enter your new secret passkey'
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    name='password'
                                                />
                                                <InputRightElement
                                                    h='32px'
                                                    children={
                                                        textSecure ? (
                                                            <Box
                                                                onClick={
                                                                    handleTextSecure
                                                                }
                                                                h='100%'
                                                                m='0'
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
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
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                }}
                                                                onClick={
                                                                    handleTextSecure
                                                                }>
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
                                        </Box>
                                    </FieldStack>

                                    <FieldStack spacing='8px'>
                                        <label>
                                            Confirm Password <span>*</span>
                                        </label>
                                        <Box>
                                            <InputGroup h='32px'>
                                                <input
                                                    className={
                                                        errors &&
                                                        errors.passwordConfirmation
                                                            ? 'input_error'
                                                            : ''
                                                    }
                                                    autoComplete='current-password'
                                                    type={
                                                        textSecure
                                                            ? 'password'
                                                            : 'text'
                                                    }
                                                    placeholder='Confirm your secret passkey'
                                                    value={
                                                        values.passwordConfirmation
                                                    }
                                                    onChange={handleChange}
                                                    name='passwordConfirmation'
                                                />
                                                <InputRightElement
                                                    h='32px'
                                                    children={
                                                        textSecure ? (
                                                            <Box
                                                                onClick={
                                                                    handleTextSecure
                                                                }
                                                                h='100%'
                                                                m='0'
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
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
                                                                    display:
                                                                        'flex',
                                                                    alignItems:
                                                                        'center',
                                                                    justifyContent:
                                                                        'center',
                                                                }}
                                                                onClick={
                                                                    handleTextSecure
                                                                }>
                                                                <BsEyeSlash color='green.500' />
                                                            </Box>
                                                        )
                                                    }
                                                />
                                            </InputGroup>

                                            {errors &&
                                            errors.passwordConfirmation ? (
                                                <ErrorMsg className='filesError'>
                                                    {
                                                        errors.passwordConfirmation
                                                    }
                                                </ErrorMsg>
                                            ) : null}
                                        </Box>
                                    </FieldStack>
                                </Stack>
                                {/** button */}
                                <Box w='100%'>
                                    <Button
                                        type='submit'
                                        disabled={!(isValid && dirty)}
                                        isLoading={isSubmittingp ? true : false}
                                        className='button'>
                                        Submit
                                    </Button>
                                </Box>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Stack>
        </Container>
    )
}

export default Reset

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .Logo {
        position: absolute;
        top: 30px;
        left: 30px;

        img {
            width: 58.5px;
            height: 48.49px;
            object-fit: cover;
        }
    }

    .Login_button {
        position: absolute;
        top: 30px;
        right: 30px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        height: 40px;
        width: 70px;
        display: flex;
        justify-content: Center;
        align-items: center;
        border-radius: 15px;
        background: ${(props) => props.theme.backgroundMainColor};
        color: #fbfbfb;

        cursor: pointer;
    }

    .button {
        width: 100%;
        height: 40px;
        background: ${(props) => props.theme.backgroundMainColor};
        box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.2),
            0px 15px 35px -5px rgba(17, 24, 38, 0.15),
            0px 5px 15px -3px rgba(0, 0, 0, 0.08);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fbfbfb;

        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
    }

    .passkey_reset {
        border: 1px solid #f14c54;
        border-radius: 6px;
    }
    .user_reset {
        border: 1px solid #faa723;
        border-radius: 6px;
    }
    .link_wrapper {
        display: flex;
        height: 95px;
        align-items: center;
        justify-content: center;
        background: #fbfbfb;
        .icon {
            border-radius: 25px;
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
        }

        h1 {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 20px;
            color: #20202a;
        }
        p {
            color: #838389;
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
        }
    }
`

const TextHeadStack = styled(Stack)`
    .section_title {
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        font-size: 33px;
        line-height: 20px;
        letter-spacing: 0.04em;
    }

    .section_sub2 {
        font-family: 'Inter', sans-serif;
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
    font-family: 'Inter', sans-serif;

    label {
        font-family: 'Inter', sans-serif;
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
