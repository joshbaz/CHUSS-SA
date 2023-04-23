/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Stack, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'

import { RiFoldersFill } from 'react-icons/ri'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    getReportStats,
    reset,
} from '../../../store/features/reports/reportSlice'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme
const tiledata = [
    {
        title: 'Manage All Reports',
        icon: <RiFoldersFill />,
        link: '/m-reports/allreports',
        bg: '#DDF5DF',
        color: '#1BBD2B',
    },
    {
        title: 'Manage Reminders',
        icon: <RiFoldersFill />,
        link: '/m-reports/reminders',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Late Reports',
        icon: <RiFoldersFill />,
        link: '/m-reports/latereports',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

const ManageReports = () => {
    let routeNavigate = useNavigate()

    const [statsdata, setStatsData] = React.useState([
        {
            title: 'Total Reports',
            value: 0,
            subText: 'Cumulative of all reports in the system.',
            link: '/m-reports/allreports',
            bg: '#DDF5DF',
            color: '#1BBD2B',
        },
        {
            title: 'Total Reminders',
            value: 0,
            subText: 'Cumulative of reminders in the system.',
            link: '/m-reports/reminders',
            bg: '#FFE2D9',
            color: '#FF3D00',
        },
        {
            title: 'Total Late Reports',
            value: 0,
            subText: 'Cumulative of late reports in the system.',
            link: '/m-reports/latereports',
            bg: '#EDEEFF',
            color: '#293AD1',
        },
    ])
    let dispatch = useDispatch()
    let toast = useToast()

    React.useEffect(() => {
        dispatch(getReportStats())
    }, [])

    let { stats, isError, message } = useSelector((state) => state.report)

    React.useEffect(() => {
        setStatsData([
            {
                title: 'Total Reports',
                value: stats.allreports,
                subText: 'Cumulative of all reports in the system.',
                link: '/m-reports/allreports',
                bg: '#DDF5DF',
                color: '#1BBD2B',
            },
            {
                title: 'Total Reminders',
                value: stats.allreminders,
                subText: 'Cumulative of reminders in the system.',
                link: '/m-reports/reminders',
                bg: '#FFE2D9',
                color: '#FF3D00',
            },
            {
                title: 'Total Late Reports',
                value: stats.latereports,
                subText: 'Cumulative of late reports in the system.',
                link: '/m-reports/latereports',
                bg: '#EDEEFF',
                color: '#293AD1',
            },
        ])
    }, [stats.allreports, stats.allreminders, stats.latereports])

    React.useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }

        dispatch(reset())
    }, [isError, message])
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                w='100%'
                spacing='20px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{ title: 'Manage Reports ', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Stack
                        direction='column'
                        bg={backgroundMainColor}
                        minH='80vh'
                        borderRadius={backgroundRadius}
                        spacing={'32px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** shortLinks */}
                        <LinksStack
                            direction='column'
                            padding={'0 20px'}
                            spacing='20px'>
                            <h1>Shortlinks</h1>

                            <Stack direction='row' spacing='25px'>
                                {tiledata.map((data, index) => (
                                    <Stack
                                        onClick={() => routeNavigate(data.link)}
                                        direction='row'
                                        alignItems={'center'}
                                        justifyContent='center'
                                        spacing='20px'
                                        key={index}
                                        className='sumbox'
                                        w={{ base: '100%', xl: '200px' }}>
                                        <Box
                                            className='link_icon'
                                            bg={data.bg}
                                            color={data.color}>
                                            {data.icon}
                                        </Box>
                                        <h5 className='link_text'>
                                            {data.title}
                                        </h5>
                                    </Stack>
                                ))}
                            </Stack>
                        </LinksStack>

                        {/** stats */}
                        <StatStack
                            direction='row'
                            padding={'0 20px'}
                            spacing='20px'>
                            {/** options */}
                            <StatContainer w='100%'>
                                <StatStack direction='row' spacing='15px'>
                                    {statsdata.map((data, index) => (
                                        <Stack
                                            p='10px 18px'
                                            direction='column'
                                            justifyContent='space-between'
                                            spacing='0px'
                                            key={index}
                                            className='statbox'
                                            w={{
                                                base: '100%',
                                                md: '313.5px',
                                                xl: '313.5px',
                                            }}>
                                            <h5 className='link_text'>
                                                {data.title}
                                            </h5>
                                            <Box className='link_value'>
                                                {data.value}
                                            </Box>
                                            <p className='link_subtext'>
                                                {data.subText}
                                            </p>
                                        </Stack>
                                    ))}
                                </StatStack>
                            </StatContainer>
                        </StatStack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ManageReports

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
    .s_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #1a2240;
    }

    .sumbox {
        width: 303.5px;
        height: 93px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
        cursor: pointer;
    }
`

const LinksStack = styled(Stack)`
    h1 {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 21px;
        color: ${textLightColor};
    }

    .link_icon {
        width: 34.88px;
        height: 34.88px;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 6.975px;
    }

    .link_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17.4375px;
        line-height: 21px;
        color: #000000;
    }
`

const StatStack = styled(Stack)``

const StatContainer = styled(Box)`
    .statbox {
        height: 163px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
    }

    link_icon {
        width: 34.88px;
        height: 34.88px;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 6.975px;
    }

    .link_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17.4375px;
        line-height: 21px;
        color: #000000;
    }

    .link_value {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 48px;
        color: #1a2240;
    }

    .link_subtext {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 12px;
        color: #868fa0;
    }
`
