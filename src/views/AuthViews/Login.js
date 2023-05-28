import React, { useEffect } from 'react'
import { Box, Stack, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import backgroundImage from '../../assets/image/bg_right.png'
import logo from '../../logo.svg'
import LoginForm from '../../components/Forms/LoginForm'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    Login as LoginAction,
    reset,
} from '../../store/features/auth/authSlice'

const Login = () => {
    const [passError, setPassError] = React.useState(false)
    const [usernameError, setUserError] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const validationSchema = yup.object().shape({
        email: yup.string().email('Invalid email').required('required'),
        password: yup.string().required('password is required'),
    })

    let toast = useToast()
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()

    const { user, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
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

            if (message === 'Email does not exist') {
                setUserError(true)
            }

            if (message === 'Wrong Password') {
                setPassError(true)
            }

            dispatch(reset())
        }

        if (isSuccess && user) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: 'successfully loggedIn',
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setHelperFunctions(null)
                routeNavigate('/', { replace: true })
            }
            dispatch(reset())
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isError, isSuccess, message, dispatch])
    return (
        <Container>
            <Stack direction='row' w='100vw' h='100vh'>
                <Box w='50%' height='100vh' className='form'>
                    <Box className='Logo'>
                        <img src={logo} alt='Makerere Logo' />
                    </Box>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            staySigned: false,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, helpers) => {
                            setPassError(false)
                            setUserError(false)
                            setIsSubmittingp(true)

                            setHelperFunctions(helpers)
                            dispatch(LoginAction(values))
                        }}>
                        {({
                            values,
                            handleChange,
                            errors,
                            isValid,
                            dirty,
                            touched,
                            setFieldValue,
                        }) => (
                            <Form>
                                <LoginForm
                                    values={values}
                                    errors={errors}
                                    handleChange={handleChange}
                                    isValid={isValid}
                                    dirty={dirty}
                                    touched={touched}
                                    passError={passError}
                                    usernameError={usernameError}
                                    isSubmittingp={isSubmittingp}
                                    setFieldValue={setFieldValue}
                                />
                            </Form>
                        )}
                    </Formik>
                </Box>

                <Box w='50%' h='100vh' className='background'>
                    <img src={backgroundImage} alt='' />
                </Box>
            </Stack>
        </Container>
    )
}

export default Login

const Container = styled(Box)`
    width: 100vw;
    height: 100vh;
    .form {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

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
    .background {
        height: 100vh;

        background-fit: cover;
        background-repeat: no-repeat;
        background-position: left top;

        img {
            width: 100%;
            height: 100vh;
            object-fit: cover;
        }
    }
`
