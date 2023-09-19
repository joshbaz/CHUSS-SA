import React from 'react'
import AllRoutes from './routes'
import { dashboardLightTheme } from './theme/dashboard_theme'
import styled, { ThemeProvider } from 'styled-components'
import CheckConnection from './components/common/CheckConnection/CheckConnection'
import { Box, Stack, Text } from '@chakra-ui/react'
import { ThreeDots } from 'react-loader-spinner'
import { Toaster } from 'react-hot-toast'
import CustomErrorToast from './components/common/CustomErrorToast/CustomErrorToast'
function App() {
    const [windowloading, setwindowloading] = React.useState(false)

    // React.useEffect(() => {
    //     if (document.readyState === 'loading') {
    //         setwindowloading(() => true)
    //     } else if (document.readyState === 'interactive') {
    //         setwindowloading(() => true)
    //     } else if (document.readyState === 'complete') {
    //         setwindowloading(() => false)
    //     }
    // }, [])
    // const loadedHandler = () => {
    //     if (document.readyState === 'loading') {
    //         setwindowloading(() => true)
    //     } else if (document.readyState === 'interactive') {
    //         setwindowloading(() => true)
    //     } else if (document.readyState === 'complete') {
    //         setwindowloading(() => false)
    //     }
    // }

    // document.addEventListener('readystatechange', loadedHandler)

    const loadedHandler = (event) => {
        console.log(event.target.readyState)
        if (event.target.readyState === 'loading') {
            setwindowloading(() => true)
        } else if (event.target.readyState === 'interactive') {
            setwindowloading(() => true)
        } else if (event.target.readyState === 'complete') {
            console.log('complete')
            setwindowloading(() => false)
        }
    }

    document.addEventListener('readystatechange', loadedHandler)
    // React.useEffect(() => {
    //     window.addEventListener('load', (event) => {
    //        console.log('lodaing')
    //     })
    //     document.addEventListener('readystatechange', loadedHandler)

    //     return () => {
    //         document.removeEventListener('readystatechange', loadedHandler)
    //     }
    // }, [])
    return (
        <>
            <CustomErrorToast />

            {
                // {<Toaster
                //     position='top-center'
                //     reverseOrder={false}
                //     gutter={8}
                //     containerClassName=''
                //     containerStyle={{}}
                //     toastOptions={{
                //         // Define default options
                //         className: '',
                //         duration: 5000,
                //         style: {
                //             background: '#363636',
                //             color: '#fff',
                //         },
                //         // Default options for specific types
                //         success: {
                //             duration: 7000,
                //             theme: {
                //                 primary: 'green',
                //                 secondary: 'black',
                //             },
                //         },
                //         loading: {
                //             duration: Infinity,
                //             style: {
                //                 background: '#363636',
                //                 color: '#fff',
                //             },
                //         },
                //     }}
                // />}
            }
            {windowloading === true ? (
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
