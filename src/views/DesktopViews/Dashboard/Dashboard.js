/* eslint-disable react-hooks/exhaustive-deps */
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
    useBoolean,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverAnchor,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { BiSearch } from 'react-icons/bi'
import { MdManageSearch } from 'react-icons/md'
import { RiFoldersFill } from 'react-icons/ri'

import LineGraph from '../../../components/Dashboard/Graph/LineGraph'
import DashTable from '../../../components/Dashboard/Table/DashTable'
import Stats from '../../../components/Dashboard/Stats/Stats'
import { initSocketConnection } from '../../../socketio.service'
import { useSelector, useDispatch } from 'react-redux'
import {
    getPProjects,
    getAllProjects,
    reset,
} from '../../../store/features/project/projectSlice'
import { Logout, reset as areset } from '../../../store/features/auth/authSlice'
import { allOpponents } from '../../../store/features/opponents/opponentSlice'
import { allExaminers } from '../../../store/features/Examiner/examinerSlice'
import { allSupervisors } from '../../../store/features/supervisors/supervisorSlice'
import { tagGetAll } from '../../../store/features/tags/tagSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
import toast from 'react-hot-toast'

const tiledata = [
    {
        title: 'Manage PHD Students',
        icon: <RiFoldersFill />,
        link: '/phd/projects',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Masters Students',
        icon: <RiFoldersFill />,
        link: '/masters/projects',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Examiners',
        icon: <RiFoldersFill />,
        link: '/m-examiners',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

const { backgroundMainColor, textLightColor } = dashboardLightTheme
const Dashboard = () => {
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
  //  let Location = useLocation()

    const [searchWord, setSearchWord] = React.useState('')
    let { allprojects, isError, isSuccess, message } = useSelector(
        (state) => state.project
    )
    const [isEditing, setIsEditing] = useBoolean()
    const [allSearchedData, setAllSearchedData] = React.useState({
        items: [],
    })
 


    //websocket trial
    React.useEffect(() => {
        const io = initSocketConnection()
        /** error handler for toast response */
        let errorHandler = (errorResponse) => {
            if (errorResponse.payload.includes('ECONNREFUSED')) {
                return 'Check your internet connection'
            } else if (errorResponse.payload.includes('jwt expired')) {
                return 'Authentication expired'
            } else if (
                errorResponse.payload.includes('jwt malformed') ||
                errorResponse.payload.includes('invalid token')
            ) {
                return 'Authentication expired'
            } else if (errorResponse.payload.includes('Not authenticated')) {
                return 'Authentication required'
            } else if (errorResponse.payload.includes('Not authorized')) {
                return 'Authentication required'
            } else {
                let errorMessage = errorResponse.payload
                return errorMessage
            }
        }

        //function to handle smooth Logout
        let handleLogout = () => {
            toast.dismiss()

            toast.loading('Logging out. please wait...')

            //inner logout toast function
            let handleLogoutToast = () => {
                toast.dismiss()
                toast.promise(
                    dispatch(Logout()).then((res) => {
                        // routeNavigate('/auth/signin', { replace: true })
                    }),
                    {
                        loading: 'Logging out',
                        success: (data) => 'Logged out successfully',
                        error: (err) => {
                            return 'error while Logging out'
                        },
                    }
                )
            }

            setTimeout(handleLogoutToast, 3000)
        }

        toast.promise(
            dispatch(getAllProjects())
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allOpponents())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allExaminers())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allSupervisors())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(tagGetAll())
                    }
                }),
            {
                loading: 'Retrieving Information',
                success: (data) => `Successfully retrieved`,
                error: (err) => {
                    if (
                        err
                            .toString()
                            .includes('Check your internet connection')
                    ) {
                        return 'Check Internet Connection'
                    } else if (
                        err.toString().includes('Authentication required')
                    ) {
                        setTimeout(handleLogout, 3000)
                        return 'Not Authenticated'
                    } else if (
                        err.toString().includes('Authentication expired')
                    ) {
                        setTimeout(handleLogout, 3000)
                        return 'Authentication Expired'
                    } else {
                        return `${err}`
                    }
                },
            }
        )

        io.on('updatestudent', (data) => {
            if (data.actions === 'update-all-student') {
                toast.promise(
                    dispatch(getAllProjects())
                        .then((res) => {
                            if (res.meta.requestStatus === 'rejected') {
                                if (res.payload.includes('ECONNREFUSED')) {
                                    throw new Error(
                                        'Check your internet connection'
                                    )
                                } else {
                                    let errorMessage = res.payload
                                    throw new Error(errorMessage)
                                }
                            } else {
                                return dispatch(allOpponents())
                            }
                        })
                        .then((res) => {
                            if (res.meta.requestStatus === 'rejected') {
                                if (res.payload.includes('ECONNREFUSED')) {
                                    throw new Error(
                                        'Check your internet connection'
                                    )
                                } else {
                                    let errorMessage = res.payload
                                    throw new Error(errorMessage)
                                }
                            } else {
                                return dispatch(allExaminers())
                            }
                        })
                        .then((res) => {
                            if (res.meta.requestStatus === 'rejected') {
                                if (res.payload.includes('ECONNREFUSED')) {
                                    throw new Error(
                                        'Check your internet connection'
                                    )
                                } else {
                                    let errorMessage = res.payload
                                    throw new Error(errorMessage)
                                }
                            } else {
                                return dispatch(allSupervisors())
                            }
                        }),
                    {
                        loading: 'updating Information',
                        success: (data) => `Successfully updated`,
                        error: (err) => {
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication required')
                            ) {
                                setTimeout(handleLogout, 3000)
                                return 'Not Authenticated'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication expired')
                            ) {
                                setTimeout(handleLogout, 3000)
                                return 'Authentication Expired'
                            } else {
                                return `${err}`
                            }
                        },
                    },
                    {
                        position: 'bottom-right',
                    }
                )
            }
        })

        return () => {
            io.disconnect()
            //toast.dismiss()
        }
    }, [])

    // React.useEffect(() => {
    //     let page = Location.search.split('').slice(3).join('')
    //     let values = {
    //         page: page,
    //     }

    //     dispatch(getPProjects(values))
    //     dispatch(getAllProjects())
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [Location])

    useEffect(() => {
        if (isError) {
            // toast({
            //     position: 'top',
            //     title: message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })

            if (message === 'Not authenticated') {
               // dispatch(Logout())
              //  dispatch(areset())
               // routeNavigate('/auth/signin', { replace: true })
            } else {
            }

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError, message])

    const handleSearchInput = (e) => {
        e.preventDefault()
        let value = e.target.value || ''
        setSearchWord(value.toLowerCase())
    }

    useEffect(() => {
        if (isEditing) {
            let allQueriedItems = allprojects.items.filter((datas) => {
                let name = datas.student.studentName.toLowerCase()
                let registrationNo =
                    datas.student.registrationNumber.toLowerCase()

                if (name.includes(searchWord)) {
                    return datas
                }

                if (registrationNo.includes(searchWord)) {
                    return datas
                }

                return null
            })

            setAllSearchedData({
                items: allQueriedItems,
            })
        }
    }, [isEditing, searchWord, allprojects.items])
    return (
        <Container direction='row' w='100vw'>
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
                    <TopBar topbarData={{ title: 'Dashboard', count: null }} />
                </Box>

                {/** loading effect {windowloading && <h1>Loading...</h1>} */}

                <Stack direction='column' padding={'0 20px'}>
                    <Stack
                        direction='column'
                        padding={'0 0px'}
                        pb='20px'
                        bg={backgroundMainColor}
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
                                <Popover
                                    isOpen={isEditing}
                                    onOpen={setIsEditing.on}
                                    onClose={setIsEditing.off}
                                    closeOnBlur={false}
                                    isLazy
                                    lazyBehavior='keepMounted'>
                                    <InputStack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <PopoverAnchor>
                                            <InputGroup>
                                                <InputLeftElement
                                                    h='35px'
                                                    children={<BiSearch />}
                                                />
                                                <Input
                                                    h='35px'
                                                    type='text'
                                                    value={searchWord}
                                                    bg={'#ffffff'}
                                                    placeholder='Search name, student registration number...'
                                                    minW={{
                                                        base: '40px',
                                                        xl: '360px',
                                                    }}
                                                    onChange={handleSearchInput}
                                                />
                                            </InputGroup>
                                        </PopoverAnchor>

                                        <PopoverTrigger>
                                            {isEditing ? (
                                                <Button className='button'>
                                                    Close
                                                </Button>
                                            ) : (
                                                <Button className='button'>
                                                    Search
                                                </Button>
                                            )}
                                        </PopoverTrigger>
                                    </InputStack>

                                    <PopoverContent>
                                        <PopoverBody w='100%'>
                                            <InputStack
                                                direction='column'
                                                alignItems='center'
                                                spacing='15px'>
                                                {allSearchedData.items.length >
                                                0 ? (
                                                    <>
                                                        {allSearchedData.items.map(
                                                            (data, index) => {
                                                                let linksto =
                                                                    data.student.graduate_program_type.toLowerCase() ===
                                                                    'masters'
                                                                        ? 'masters'
                                                                        : 'phd'
                                                                return (
                                                                    <Stack
                                                                        w='100%'
                                                                        borderBottom={
                                                                            '1px solid gray'
                                                                        }
                                                                        direction='row'
                                                                        alignItems='center'
                                                                        justifyContent='space-between'>
                                                                        <Stack
                                                                            direction='column'
                                                                            pb='10px'>
                                                                            <Box className='stname'>
                                                                                {
                                                                                    data
                                                                                        .student
                                                                                        .studentName
                                                                                }
                                                                            </Box>
                                                                            <Box
                                                                                className='streg'
                                                                                style={{
                                                                                    fontSize:
                                                                                        '13px',
                                                                                    fontWeight:
                                                                                        'bold',
                                                                                }}>
                                                                                {
                                                                                    data
                                                                                        .student
                                                                                        .registrationNumber
                                                                                }
                                                                            </Box>
                                                                        </Stack>

                                                                        <Button
                                                                            h='30px'
                                                                            style={{
                                                                                fontSize:
                                                                                    '14px',
                                                                            }}
                                                                            onClick={() =>
                                                                                routeNavigate(
                                                                                    `/${linksto}/projects/projectreport/${data._id}`
                                                                                )
                                                                            }>
                                                                            {
                                                                                data
                                                                                    .student
                                                                                    .graduate_program_type
                                                                            }
                                                                        </Button>
                                                                    </Stack>
                                                                )
                                                            }
                                                        )}
                                                    </>
                                                ) : (
                                                    <Box>No Student Found</Box>
                                                )}
                                            </InputStack>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </Stack>
                            <AdStack
                                direction='row'
                                alignItems={'center'}
                                style={{ cursor: 'pointer' }}
                                onClick={() => routeNavigate('/m-reports')}>
                                <Box className='ad_icon'>
                                    <MdManageSearch />
                                </Box>

                                <Box className='ad_text'>
                                    <Text>manage reports</Text>
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
        font-family: 'Inter', sans-serif;
        font-size: 25px;
    }

    .ad_text {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: 600;
        font-size: 16px;
    }
`

const LinksStack = styled(Stack)`
    h1 {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
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
