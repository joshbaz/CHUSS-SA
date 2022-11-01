import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text } from '@chakra-ui/react'
const AdmissionStatus = () => {
    return (
        <Container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            p='0px 27px'>
            <Box className='st_title'>Status</Box>
            <Box className='st_text'>Provisional Admission</Box>
        </Container>
    )
}

export default AdmissionStatus

const Container = styled(Stack)`
    width: 100%;
    height: 100px;

    background: #ffffff;
    border-radius: 9px;
    font-family: 'Inter', sans-serif;
    .st_title {
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        line-height: 21px;
        color: #1a2240;
    }

    .st_text {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #1a2240;
    }
`
