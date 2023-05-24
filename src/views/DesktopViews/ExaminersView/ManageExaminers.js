/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Box, Stack, useToast, Grid, SimpleGrid } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'

import { RiFoldersFill } from 'react-icons/ri'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    reset,
    allExaminers,
} from '../../../store/features/Examiner/examinerSlice'
import {
    allSupervisors,
    reset as sreset,
} from '../../../store/features/supervisors/supervisorSlice'

import {
    allOpponents,
    reset as oreset,
} from '../../../store/features/opponents/opponentSlice'

import {
    allDCMembers,
    reset as dreset,
} from '../../../store/features/doctoralmembers/doctoralSlice'

import { dashboardLightTheme } from '../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const tiledata = [
    {
        title: 'Manage Examiners',
        icon: <RiFoldersFill />,
        link: '/m-examiners/examiners',
        bg: '#DDF5DF',
        color: '#1BBD2B',
    },
    {
        title: 'Manage Supervisors',
        icon: <RiFoldersFill />,
        link: '/m-examiners/supervisors',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Opponents',
        icon: <RiFoldersFill />,
        link: '/m-examiners/opponents',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
    {
        title: 'Manage Doctoral Members',
        icon: <RiFoldersFill />,
        link: '/m-examiners/dcmembers',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

// const tiledata2 = [
//     {
//         title: 'Manage Doctoral Members',
//         icon: <RiFoldersFill />,
//         link: '/m-examiners/examiners',
//         bg: '#DDF5DF',
//         color: '#1BBD2B',
//     },
// ]

const ManageExaminers = () => {
    let routeNavigate = useNavigate()

    const [statsdata, setStatsData] = React.useState([
        {
            title: 'Total Examiners',
            value: 0,
            subText: 'All Examiners both Internal and External ',
            link: '/m-examiners/examiners',
            bg: '#DDF5DF',
            color: '#1BBD2B',
        },
        {
            title: 'Total Supervisors',
            value: 0,
            subText: 'Cumulative of supervisors in the system.',
            link: '/m-examiners/supervisors',
            bg: '#FFE2D9',
            color: '#FF3D00',
        },
        {
            title: 'Total Opponents',
            value: 0,
            subText: 'Cumulative of opponents in the system.',
            link: '/m-examiners/opponents',
            bg: '#EDEEFF',
            color: '#293AD1',
        },
        {
            title: 'Total Doctoral Members',
            value: 0,
            subText: 'Cumulative of opponents in the system.',
            link: '/m-examiners/opponents',
            bg: '#EDEEFF',
            color: '#293AD1',
        },
    ])
    let dispatch = useDispatch()
    let toast = useToast()

    React.useEffect(() => {
        dispatch(allExaminers())
        dispatch(allSupervisors())
        dispatch(allOpponents())
        dispatch(allDCMembers())
    }, [])

    let examinerCase = useSelector((state) => state.examiner)
    let opponentCase = useSelector((state) => state.opponent)
    let supervisorCase = useSelector((state) => state.supervisor)
    let dcmemberCase = useSelector((state) => state.doctoralMembers)

    React.useEffect(() => {
        setStatsData([
            {
                title: 'Total Examiners',
                value: examinerCase.allExaminerItems.items.length,
                subText: 'All Examiners both Internal and External ',
                link: '/m-examiners/examiners',
                bg: '#DDF5DF',
                color: '#1BBD2B',
            },
            {
                title: 'Total Supervisors',
                value: supervisorCase.allSupervisorItems.items.length,
                subText: 'Cumulative of supervisors in the system.',
                link: '/m-examiners/supervisors',
                bg: '#FFE2D9',
                color: '#FF3D00',
            },
            {
                title: 'Total Opponents',
                value: opponentCase.allOpponentItems.items.length,
                subText: 'Cumulative of opponents in the system.',
                link: '/m-examiners/opponents',
                bg: '#EDEEFF',
                color: '#293AD1',
            },
            {
                title: 'Total Doctoral Members',
                value: dcmemberCase.allDCMemberItems.items.length,
                subText: 'Cumulative of opponents in the system.',
                link: '/m-examiners/opponents',
                bg: '#EDEEFF',
                color: '#293AD1',
            },
        ])
    }, [
        examinerCase.allExaminerItems.items,
        opponentCase.allOpponentItems.items,
        supervisorCase.allSupervisorItems,
        dcmemberCase.allDCMemberItems,
    ])

    React.useEffect(() => {
        if (examinerCase.isError) {
            toast({
                position: 'top',
                title: examinerCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }

        if (opponentCase.isError) {
            toast({
                position: 'top',
                title: opponentCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }

        if (supervisorCase.isError) {
            toast({
                position: 'top',
                title: supervisorCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(sreset())
        }

        if (dcmemberCase.isError) {
            toast({
                position: 'top',
                title: dcmemberCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(dreset())
        }

        dispatch(reset())
        dispatch(sreset())
        dispatch(oreset())
        dispatch(dreset())
    }, [examinerCase, opponentCase, supervisorCase, dcmemberCase])

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
                        topbarData={{ title: 'Manage Examiners ', count: null }}
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

                            <Stack
                                direction='row'
                                spacing='25px'
                                w='100%'
                                position='relative'>
                                <SimpleGrid
                                    columns={3}
                                    autoFlow
                                    grow='1'
                                    gap={'20px'}
                                    w='100%'>
                                    {tiledata.map((data, index) => (
                                        <Stack
                                            onClick={() =>
                                                routeNavigate(data.link)
                                            }
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
                                </SimpleGrid>
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
                                    <SimpleGrid
                                        columns={3}
                                        autoFlow
                                        grow='1'
                                        gap={'20px'}
                                        w='100%'>
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
                                    </SimpleGrid>
                                </StatStack>
                            </StatContainer>
                        </StatStack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ManageExaminers

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
