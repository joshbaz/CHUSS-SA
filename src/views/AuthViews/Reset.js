import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import Logo from '../../logo.svg'
import { BsKeyFill } from 'react-icons/bs'
import { MdHail } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
const Reset = () => {
    let routeNavigate = useNavigate()
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

                    <Stack direction='column' spacing='31px'>
                        {/** reset password */}
                        <Box className='passkey_reset link_wrapper'>
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
                        {/** username */}
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
                    </Stack>
                </Stack>

                {/** button */}
                <Box w='100%'>
                    <Box className='button'>Send link</Box>
                </Box>
            </Stack>
        </Container>
    )
}

export default Reset

const Container = styled(Box)`
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
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 15px;
            line-height: 20px;
            color: #20202a;
        }
        p {
            color: #838389;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
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

    .section_sub2 {
        font-family: Inter;
        margin-top: 7px;
        font-size: 13px;
        line-height: 15px;
        color: #abaaaf;
        letter-spacing: 0.02em;
    }
`
