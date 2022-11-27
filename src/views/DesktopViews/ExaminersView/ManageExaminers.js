import React, { useEffect } from 'react'
import { Box, Stack } from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { RiFoldersFill } from 'react-icons/ri'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { CgFormatSlash } from 'react-icons/cg'
import { GrClose } from 'react-icons/gr'
import ProjectTable from '../../../components/ProjectComponents/AllProjects/ProjectTable'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import ExaminerTable from '../../../components/ExaminerComponents/AllExaminers/ExaminerTable'

import {
    reset,
    allExaminers,
    paginatedExaminer,
} from '../../../store/features/Examiner/examinerSlice'

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
]

const statsdata = [
    {
        title: 'Total Examiners',
        value: 12,
        subText: 'All Examiners both Internal and External ',
        link: '',
        bg: '#DDF5DF',
        color: '#1BBD2B',
    },
    {
        title: 'Total Supervisors',
        value: 103,
        subText: 'Cumulative of supervisors in the system.',
        link: '',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Total Opponents',
        value: 203,
        subText: 'Cumulative of opponents in the system.',
        link: '',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

const ManageExaminers = () => {
    let routeNavigate = useNavigate()
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar
                    topbarData={{ title: 'Manage Examiners ', count: null }}
                />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Stack
                        direction='column'
                        bg='#FBFBFB'
                        minH='85vh'
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

export default ManageExaminers

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;

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
        color: #1a2240;
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
