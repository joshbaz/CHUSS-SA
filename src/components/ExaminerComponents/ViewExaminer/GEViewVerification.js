import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input } from '@chakra-ui/react'

import { MdVerified } from 'react-icons/md'

const GEViewVerification = ({ values }) => {
    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Verification </h1>
                    </Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack
                        w='100px'
                        direction='row'
                        alignItems='center'
                        spacing='2px'>
                        <Box
                            style={{
                                width: '100%',
                                color: '#838389',
                                letterSpacing: '0.02em',
                                fontSize: '9px',
                            }}>
                            {' '}
                            <Text>Verified Examiner</Text>
                        </Box>

                        <Box
                            style={{
                                color:
                                    values !== null &&
                                    values.generalAppointmentLetters.length > 0
                                        ? '#293AD1'
                                        : '#D4D4D6',
                                fontSize: '15px',

                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                            <MdVerified />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default GEViewVerification

const Container = styled(Box)`
    font-family: 'Inter';

    .form_container {
        width: 100%;
        min-height: 126px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 20px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .s_name {
        color: #20202a;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
            line-height: 20px;
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
    }

    .form_subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    input {
        background: #fefaf2;
        border-radius: 6px;

        height: 32px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
`
