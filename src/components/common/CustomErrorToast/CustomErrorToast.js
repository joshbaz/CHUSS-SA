import React from 'react'
import { toast, Toaster, ToastBar } from 'react-hot-toast'
import styled from 'styled-components'
import { MdSignalWifiConnectedNoInternet3 } from 'react-icons/md'
import { Box, Stack } from '@chakra-ui/react'

const BaseToast = styled(Stack)`
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    padding-right: 10px;
    font-family: 'Inter', sans-serif;
    width: inherit;
    min-width: 260px !important;
`

const DismissButton = styled('button')`
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    display: flex;
    justify-items: center;
    align-items: center;
    background: transparent;
    width: 100%;
    border: none;
    color: white;

    &:hover {
        color: white;
    }
`

const Content = styled('div')`
    flex: 1;
    padding: 0px;
    text-align: left;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    text-transform: lowercase;
`

const CustomErrorToast = () => {
    React.useEffect(() => {
        return () => {
            toast.dismiss()
        }
    }, [])

    const reloadWindow = () => {
        toast.dismiss()
        window.location.reload()
    }
    return (
        <Toaster
            position='top-center'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: Infinity,
                style: {
                    background: '#363636',
                    color: '#fff',
                },
                // Default options for specific types
                success: {
                    duration: 7000,
                    theme: {
                        primary: 'green',
                        secondary: 'black',
                    },
                },
                loading: {
                    duration: Infinity,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                },
                error: {
                    duration: Infinity,
                    style: {
                        background: '#E53E3E',
                        color: '#ffffff',
                        padding: '0px',
                    },
                },
            }}>
            {(t) => (
                <>
                    {t.type === 'loading' && (
                        <ToastBar toast={t}>
                            {({ icon, message }) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== 'loading' && (
                                        <button
                                            onClick={() => toast.dismiss(t.id)}>
                                            X
                                        </button>
                                    )}
                                </>
                            )}
                        </ToastBar>
                    )}
                    {t.type === 'error' &&
                    t.message === 'Check Internet Connection' ? (
                        <ToastBar
                            toast={t}
                            style={{ padding: '0px', margin: '0' }}>
                            {({ icon, message }) => (
                                <BaseToast
                                    className={`${
                                        t.visible
                                            ? 'animate-enter'
                                            : 'animate-leave'
                                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                                    borderRadius='5px'
                                    minW={'250px'}>
                                    <Stack
                                        direction={'row'}
                                        alignItems={'center'}
                                        justifyContent={'space-between'}>
                                        <Box
                                            fontSize={'25px'}
                                            height='100%'
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <MdSignalWifiConnectedNoInternet3 />
                                        </Box>
                                        <Box
                                            height='100%'
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Content>{message}</Content>
                                        </Box>
                                        <Box
                                            borderLeft={'1px solid gray'}
                                            height='100%'
                                            pl='10px'
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <DismissButton
                                                onClick={() => reloadWindow()}>
                                                reload
                                            </DismissButton>
                                        </Box>
                                    </Stack>
                                </BaseToast>
                            )}
                        </ToastBar>
                    ) : null}

                    {t.type === 'error' &&
                    t.message !== 'Check Internet Connection' ? (
                        <ToastBar toast={t}>
                            {({ icon, message }) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== 'loading' && (
                                        <button
                                            onClick={() => toast.dismiss(t.id)}>
                                            X
                                        </button>
                                    )}
                                </>
                            )}
                        </ToastBar>
                    ) : null}

                    {t.type === 'success' && (
                        <ToastBar toast={t}>
                            {({ icon, message }) => (
                                <>
                                    {icon}
                                    {message}
                                    {t.type !== 'loading' && (
                                        <button
                                            onClick={() => toast.dismiss(t.id)}>
                                            X
                                        </button>
                                    )}
                                </>
                            )}
                        </ToastBar>
                    )}
                </>
            )}
        </Toaster>
    )
}

export default CustomErrorToast
