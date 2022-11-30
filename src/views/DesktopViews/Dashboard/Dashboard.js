import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Text,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { BiSearch } from 'react-icons/bi'
import { MdManageSearch } from 'react-icons/md'
import { RiFoldersFill } from 'react-icons/ri'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import LineGraph from '../../../components/Dashboard/Graph/LineGraph'
import DashTable from '../../../components/Dashboard/Table/DashTable'
import Stats from '../../../components/Dashboard/Stats/Stats'
import { initSocketConnection } from '../../../socketio.service'
import { useSelector, useDispatch } from 'react-redux'
import {
    getPProjects,
    reset,
} from '../../../store/features/project/projectSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const tiledata = [
    {
        title: 'Manage Payments',
        icon: <MdOutlineAccountBalanceWallet />,
        link: '/payments',
        bg: '#DDF5DF',
        color: '#1BBD2B',
    },
    {
        title: 'Manage Students',
        icon: <RiFoldersFill />,
        link: '/projects',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Examiners',
        icon: <RiFoldersFill />,
        link: '/examiners',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

const Dashboard = () => {
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let Location = useLocation()
    let toast = useToast()
    let { isError, isSuccess, message } = useSelector((state) => state.project)

    //websocket trial
    React.useEffect(() => {
        const io = initSocketConnection()
       
    }, [])

    React.useEffect(() => {
        let page = Location.search.split('').slice(3).join('')
        let values = {
            page: page,
        }
        console.log(page)
        dispatch(getPProjects(values))
    }, [Location])

    useEffect(() => {
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

        // if (isSuccess) {
        //     toast({
        //         position: 'top',
        //         title:'collected data',
        //         status: 'success',
        //         duration: 10000,
        //         isClosable: true,
        //     })
        // }
    }, [isSuccess, isError, message])
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar topbarData={{ title: 'Dashboard', count: null }} />

                <Stack direction='column' padding={'0 20px'}>
                    <Stack
                        direction='column'
                        padding={'0 0px'}
                        pb='20px'
                        bg='#FBFBFB'
                        spacing='41px'>
                        {/** search */}
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            justifyContent='space-between'
                            padding={'0 20px'}
                            bg='#FEF9EF'
                            minH='70px'>
                            <Stack
                                direction='row'
                                spacing='40px'
                                alignItems={'center'}>
                                <Box className='s_title'>
                                    <Text>Find Student</Text>
                                </Box>

                                <InputStack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <InputGroup>
                                        <InputLeftElement
                                            h='35px'
                                            children={<BiSearch />}
                                        />
                                        <Input
                                            h='35px'
                                            bg={'#ffffff'}
                                            placeholder='Search name, student registration number...'
                                            minW={{ base: '40px', xl: '360px' }}
                                        />
                                    </InputGroup>
                                    <Button className='button'>Search</Button>
                                </InputStack>
                            </Stack>
                            <AdStack direction='row' alignItems={'center'}>
                                <Box className='ad_icon'>
                                    <MdManageSearch />
                                </Box>

                                <Box className='ad_text'>
                                    <Text>Advanced search</Text>
                                </Box>
                            </AdStack>
                        </Stack>

                        {/** shortLinks */}
                        <LinksStack direction='column' padding={'0 20px'}>
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
                            w='100%'
                            direction='row'
                            padding={'0 20px'}
                            spacing='20px'>
                            {/** graph */}
                            <Box w='60%'>
                                <LineGraph />
                            </Box>

                            {/** options */}
                            <Box w='40%'>
                                <Stats />
                            </Box>
                        </StatStack>

                        {/** table */}
                        <Box padding={'0 20px'}>
                            <DashTable />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Dashboard

const Container = styled(Stack)`
    .s_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #1a2240;
    }

    .sumbox {
        width: 296.44px;
        height: 93px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
        cursor: pointer;
    }
`

const InputStack = styled(Stack)`
    .button {
        min-width: 73px;
        height: 32px;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
        padding: 0px 12px;
    }
`

const AdStack = styled(Stack)`
    color: #838389;
    .ad_icon {
        font-size: 25px;
    }

    .ad_text {
        font-family: 'Inter';
        font-style: italic;
        font-weight: 600;
        font-size: 17px;
    }
`

const LinksStack = styled(Stack)`
    h1 {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
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
