import React from 'react'
import AllRoutes from './routes'
import { dashboardLightTheme } from './theme/dashboard_theme'
import styled, { ThemeProvider } from 'styled-components'
import CheckConnection from './components/common/CheckConnection/CheckConnection'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ThreeDots } from 'react-loader-spinner'
function App() {
    const [windowloading, setwindowloading] = React.useState(true)

    React.useEffect(() => {
        if (document.readyState === 'loading') {
            setwindowloading(() => true)
        } else if (document.readyState === 'interactive') {
            setwindowloading(() => true)
        } else if (document.readyState === 'complete') {
            setwindowloading(() => false)
        }
    }, [])
    const loadedHandler = () => {
        if (document.readyState === 'loading') {
            setwindowloading(() => true)
        } else if (document.readyState === 'interactive') {
            setwindowloading(() => true)
        } else if (document.readyState === 'complete') {
            setwindowloading(() => false)
        }
    }

    document.addEventListener('readystatechange', loadedHandler)
    return (
        <>
            {windowloading ? (
                <Container spacing='27px'>
                    <Stack alignItems={'center'} spacing='16px'>
                        <Box>
                            <ThreeDots
                                height='80'
                                width='80'
                                radius='9'
                                color='#2D2D2D'
                                ariaLabel='line-wave'
                                wrapperStyle={{}}
                                wrapperClassName=''
                                visible={true}
                            />
                        </Box>
                        <Text className='Int_head'>Connecting...</Text>
                    </Stack>

                    <Text className='Int_subhead'>
                        Wait on the screen until the process is complete.
                    </Text>
                </Container>
            ) : (
                <ThemeProvider theme={dashboardLightTheme}>
                    <AllRoutes />
                </ThemeProvider>
            )}
        </>
    )
}

export default App

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

/**
                     *  <CheckConnection>
                    <ThemeProvider theme={dashboardLightTheme}>
                        <AllRoutes />
                    </ThemeProvider>
                </CheckConnection>
                     * 
                     * 
                     */
