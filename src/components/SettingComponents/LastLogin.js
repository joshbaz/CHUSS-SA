import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text } from '@chakra-ui/react'

const LastLogin = () => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Last Login</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box className='formfields__Sfieldset'>
                        <StatusItem
                            width='100%'
                            minH='51px'
                            spacing='10px'
                            direction='row'
                            alignItems='center'>
                            <div />
                            <Text>{'15 May 2021, 12:47 PM'}</Text>
                        </StatusItem>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default LastLogin

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 243px;
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
        font-family: Inter;
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

const StatusItem = styled(Stack)`
    border-radius: 4px;
    background: #fbfbfb;
    padding: 3px 8px 3px 20px;

    div {
        border-radius: 2px;
        width: 10px;
        height: 10px;
        background: #abaaaf;
    }
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        color: #464f60;
    }
`
