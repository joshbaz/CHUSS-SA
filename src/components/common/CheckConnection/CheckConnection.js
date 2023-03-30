import React from 'react'
import { Detector } from 'react-detect-offline'
import { Stack, Text, Box } from '@chakra-ui/react'
import InternetIcon from '../../../assets/icon/Nointerneticon.svg'
import styled from 'styled-components'
const CheckConnection = (props) => {
    return (
        <div>
            <Detector
                render={({ online }) =>
                    online ? (
                        props.children
                    ) : (
                        <Container spacing='27px'>
                            <Stack alignItems={'center'} spacing='16px'>
                                <Box>
                                    <img
                                        src={InternetIcon}
                                        alt='no internet icon'
                                    />
                                </Box>
                                <Text className='Int_head'>
                                    No Internet Connection
                                </Text>
                            </Stack>

                            <Text className='Int_subhead'>
                                Please connect your device to the WiFi or
                                network.
                            </Text>
                        </Container>
                    )
                }
            />
        </div>
    )
}

export default CheckConnection

const Container = styled(Stack)`
    width: 100%;
    height: 100vh;
    justify-content: center;
    align-items: center;

    .Int_subhead {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #abaaaf;
    }

    .Int_head {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        color: #838389;
    }
`
