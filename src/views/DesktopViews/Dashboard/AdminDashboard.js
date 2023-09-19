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
    Avatar,
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
import Moments from 'moment-timezone'

import {
    reset as freset,
    allFacilitators,
    allLoginActivities,
} from '../../../store/features/facilitators/facilitatorSlice'
import { Logout, reset as areset } from '../../../store/features/auth/authSlice'
import { allOpponents } from '../../../store/features/opponents/opponentSlice'
import { allExaminers } from '../../../store/features/Examiner/examinerSlice'
import { allSupervisors } from '../../../store/features/supervisors/supervisorSlice'
import { tagGetAll } from '../../../store/features/tags/tagSlice'
import { useNavigate } from 'react-router-dom'
import AdminLineGraph from '../../../components/Dashboard/Graph/AdminLineGraph'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
//import { ThreeDots } from 'react-loader-spinner'
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

const tiledata2 = [
    {
        title: 'Manage Facilitators',
        icon: <RiFoldersFill />,
        link: '/facilitators',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Educators',
        icon: <RiFoldersFill />,
        link: '',
        bg: '#FFE2D9',
        color: '#FF3D00',
    },
    {
        title: 'Manage Payments',
        icon: <RiFoldersFill />,
        link: '/payments',
        bg: '#EDEEFF',
        color: '#293AD1',
    },
]

const { backgroundMainColor, textLightColor } = dashboardLightTheme

const AdminDashboard = () => {
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    //  let Location = useLocation()

    const [searchWord, setSearchWord] = React.useState('')
    let { allprojects, isError, isSuccess, message } = useSelector(
        (state) => state.project
    )
    let facilitatorState = useSelector((state) => state.facilitator)
    const [isEditing, setIsEditing] = useBoolean()
    const [allSearchedData, setAllSearchedData] = React.useState({
        items: [],
    })
    const [displayFacilitatorRecent, setDisplayRecentFacilitator] =
        React.useState([])

    // eslint-disable-next-line no-unused-vars
    const [displayEducatorRecent, setDisplayRecentEducator] = React.useState([])
    //const [windowloading, setwindowloading] = React.useState(false)

    // useEffect(() => {
    //     if (document.readyState === 'loading') {
    //         setwindowloading(true)
    //     } else if (document.readyState === 'complete') {
    //         setwindowloading(false)
    //     }
    // }, [])

    /** load the page  */

    //websocket trial
    React.useEffect(() => {
        toast.promise(
            dispatch(getAllProjects())
                .then((res) => {
                    console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        if (res.payload.includes('ECONNREFUSED')) {
                            throw new Error('Check your internet connection')
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
                            throw new Error('Check your internet connection')
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
                            throw new Error('Check your internet connection')
                        } else {
                            let errorMessage = res.payload
                            throw new Error(errorMessage)
                        }
                    } else {
                        return dispatch(allSupervisors())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        if (res.payload.includes('ECONNREFUSED')) {
                            throw new Error('Check your internet connection')
                        } else {
                            let errorMessage = res.payload
                            throw new Error(errorMessage)
                        }
                    } else {
                        return dispatch(tagGetAll())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        if (res.payload.includes('ECONNREFUSED')) {
                            throw new Error('Check your internet connection')
                        } else {
                            let errorMessage = res.payload
                            throw new Error(errorMessage)
                        }
                    } else {
                        return dispatch(allFacilitators())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        if (res.payload.includes('ECONNREFUSED')) {
                            throw new Error('Check your internet connection')
                        } else {
                            let errorMessage = res.payload
                            throw new Error(errorMessage)
                        }
                    } else {
                        return dispatch(allLoginActivities())
                    }
                }),
            {
                loading: 'Retrieving Information',
                success: (data) => `Successfully retrieved`,
                error: (err) => {
                    console.log(err)
                    if (
                        err
                            .toString()
                            .includes('Check your internet connection')
                    ) {
                        return 'Check Internet Connection'
                    } else {
                        return `${err}`
                    }
                },
            }
        )

        // dispatch(allOpponents())
        // dispatch(allExaminers())
        // dispatch(allSupervisors())
        //  dispatch(tagGetAll())
        // dispatch(allFacilitators())
        // dispatch(allLoginActivities())
        //checkout finally
        const io = initSocketConnection()
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
                            console.log(err)
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else {
                                return `${err}`
                            }
                        },
                    }
                )
            }
        })

        io.on('updatedAdmin', (data) => {
            if (data.actions === 'update-admin') {
                //dispatch(tagGetAll())
                toast.promise(
                    dispatch(allFacilitators()).then((res) => {
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
                            return dispatch(allLoginActivities())
                        }
                    }),
                    {
                        loading: 'updating Information',
                        success: (data) => `Successfully updated`,
                        error: (err) => {
                            console.log(err)
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else {
                                return `${err}`
                            }
                        },
                    }
                )
            }
        })

        return () => {
            io.disconnect()
            toast.dismiss()
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
            // Toasts({
            //     position: 'top',
            //     title: message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })

            if (message === 'Not authenticated') {
                dispatch(Logout())
                dispatch(areset())
                routeNavigate('/auth/signin', { replace: true })
            } else {
            }

            dispatch(reset())
        }

        // if (isSuccess) {
        //     Toasts({
        //         position: 'top',
        //         title:'collected data',
        //         status: 'success',
        //         duration: 10000,
        //         isClosable: true,
        //     })
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isError, message])

    useEffect(() => {
        if (facilitatorState.isError) {
            // Toasts({
            //     position: 'top',
            //     title: facilitatorState.message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })

            dispatch(freset())
        }
    }, [
        facilitatorState.isSuccess,
        facilitatorState.isError,
        facilitatorState.message,
    ])

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

    React.useEffect(() => {
        let allDetails = [...facilitatorState.allLoginActivityItems.items] || []

        allDetails.splice(3)
        setDisplayRecentFacilitator([...allDetails])
    }, [allprojects.items, facilitatorState.allLoginActivityItems.items])

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
                        topbarData={{ title: 'Admin Dashboard', count: null }}
                    />
                </Box>

                {/** loading effect {windowloading && <h1>Loading...</h1>} */}

                {
                    //   <LoaderContainer spacing='27px'>
                    //     <Stack alignItems={'center'} spacing='16px'>
                    //         <Box>
                    //             <ThreeDots
                    //                 height='80'
                    //                 width='80'
                    //                 radius='9'
                    //                 color='#2D2D2D'
                    //                 ariaLabel='line-wave'
                    //                 wrapperStyle={{}}
                    //                 wrapperClassName=''
                    //                 visible={true}
                    //             />
                    //         </Box>
                    //         <Text className='Int_head'>Connecting...</Text>
                    //     </Stack>
                    //     <Text className='Int_subhead'>
                    //         Wait on the screen until the process is complete.
                    //     </Text>
                    // </LoaderContainer>
                }

                <Stack direction='column' padding={'0 20px'}>
                    <Stack
                        direction='column'
                        padding={'0 0px'}
                        pb='20px'
                        pt='0px'
                        bg={backgroundMainColor}
                        spacing='41px'>
                        {/** search */}
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            justifyContent='space-between'
                            padding={'0 20px'}
                            borderRadius={'0px'}
                            m={'0 0px'}
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

                        {/** shorts */}
                        {/** shortLinks */}
                        <LinksStack direction='column' padding={'0 20px'}>
                            <h1>Shortlinks</h1>

                            <Stack direction='column' spacing='25px'>
                                <Stack direction='row' spacing='25px'>
                                    {tiledata2.map((data, index) => (
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
                                            w={{
                                                base: '100%',
                                                xl: '200px',
                                            }}>
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

                                <Stack direction='row' spacing='25px'>
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
                                            w={{
                                                base: '100%',
                                                xl: '200px',
                                            }}>
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
                            </Stack>
                        </LinksStack>

                        {/** totals & logins */}
                        <LinksStack direction='column' padding={'0 20px'}>
                            <Stack direction='column' spacing='25px'>
                                <Stack direction='row' spacing='25px'>
                                    <Stack
                                        p='10px 18px'
                                        direction='column'
                                        justifyContent='space-between'
                                        spacing='20px'
                                        className='statbox2'
                                        w={{ base: '100%', xl: '220px' }}>
                                        <h5 className='link_text'>
                                            Total Facilitators
                                        </h5>
                                        <Box className='link_value'>
                                            {
                                                facilitatorState
                                                    .allfacilitatorItems.items
                                                    .length
                                            }
                                        </Box>
                                        <p className='link_subtext'>
                                            Cumulative of Facilitators in the
                                            system
                                        </p>
                                    </Stack>
                                    {/** logged in facilitators */}
                                    <Stack
                                        p='18px 20px'
                                        className='recentLogs'
                                        spacing='15px'
                                        justifyContent='space-between'
                                        alignItems='space-between'>
                                        <h5 className='link_text'>
                                            Recently Logged-in Facilitator
                                        </h5>

                                        {/** lists */}
                                        <Stack direction='row'>
                                            {displayFacilitatorRecent.length >
                                            0 ? (
                                                <>
                                                    {displayFacilitatorRecent.map(
                                                        (data) => {
                                                            return (
                                                                <Stack
                                                                    direction='row'
                                                                    alignItems={
                                                                        'center'
                                                                    }>
                                                                    <Avatar
                                                                        size='lg'
                                                                        name={`${data.adminId.firstname} ${data.adminId.lastname}'`}
                                                                        src=''
                                                                        bg='gray.400'
                                                                    />

                                                                    <Stack>
                                                                        <Text className='av_title'>
                                                                            {
                                                                                data
                                                                                    .adminId
                                                                                    .lastname
                                                                            }{' '}
                                                                            {
                                                                                data
                                                                                    .adminId
                                                                                    .firstname
                                                                            }
                                                                        </Text>

                                                                        <Stack spacing='0'>
                                                                            <Stack direction='row'>
                                                                                <Text className='av_texthead'>
                                                                                    Facilitator
                                                                                    ID:{' '}
                                                                                </Text>
                                                                                <Text className='av_text'>
                                                                                    {
                                                                                        '-'
                                                                                    }
                                                                                </Text>
                                                                            </Stack>

                                                                            <Stack direction='row'>
                                                                                <Text className='av_texthead'>
                                                                                    Last
                                                                                    login:{' '}
                                                                                </Text>
                                                                                <Text className='av_text'>
                                                                                    {data.loginDate
                                                                                        ? Moments(
                                                                                              data.loginDate
                                                                                          )
                                                                                              .tz(
                                                                                                  'Africa/Kampala'
                                                                                              )
                                                                                              .format(
                                                                                                  'DD MMM YYYY h:mm a'
                                                                                              )
                                                                                        : ''}
                                                                                </Text>
                                                                            </Stack>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Stack>
                                                            )
                                                        }
                                                    )}
                                                </>
                                            ) : (
                                                <NoItems>
                                                    No recent login data
                                                </NoItems>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Stack>

                                <Stack direction='row' spacing='25px'>
                                    <Stack
                                        p='10px 18px'
                                        direction='column'
                                        justifyContent='space-between'
                                        spacing='20px'
                                        className='statbox2'
                                        w={{ base: '100%', xl: '220px' }}>
                                        <h5 className='link_text'>
                                            Total Educators
                                        </h5>
                                        <Box className='link_value'>0</Box>
                                        <p className='link_subtext'>
                                            Cumulative of school & department
                                            Heads in the system
                                        </p>
                                    </Stack>

                                    {/** loggedIn Educators */}
                                    <Stack
                                        p='18px 20px'
                                        className='recentLogs'
                                        spacing='15px'
                                        justifyContent='space-between'
                                        alignItems='space-between'>
                                        <h5 className='link_text'>
                                            Recently Logged-in Educators
                                        </h5>

                                        {/** lists */}
                                        <Stack direction='row'>
                                            {displayEducatorRecent.length >
                                            0 ? (
                                                <>
                                                    {displayEducatorRecent.map(
                                                        (data) => {
                                                            return (
                                                                <Stack
                                                                    direction='row'
                                                                    alignItems={
                                                                        'center'
                                                                    }>
                                                                    <Avatar
                                                                        size='lg'
                                                                        name={`${data.adminId.firstname} ${data.adminId.lastname}'`}
                                                                        src=''
                                                                        bg='gray.400'
                                                                    />

                                                                    <Stack>
                                                                        <Text className='av_title'>
                                                                            {
                                                                                data
                                                                                    .adminId
                                                                                    .lastname
                                                                            }{' '}
                                                                            {
                                                                                data
                                                                                    .adminId
                                                                                    .firstname
                                                                            }
                                                                        </Text>

                                                                        <Stack spacing='0'>
                                                                            <Stack direction='row'>
                                                                                <Text className='av_texthead'>
                                                                                    Facilitator
                                                                                    ID:{' '}
                                                                                </Text>
                                                                                <Text className='av_text'>
                                                                                    {
                                                                                        '-'
                                                                                    }
                                                                                </Text>
                                                                            </Stack>

                                                                            <Stack direction='row'>
                                                                                <Text className='av_texthead'>
                                                                                    Last
                                                                                    login:{' '}
                                                                                </Text>
                                                                                <Text className='av_text'>
                                                                                    {data.loginDate
                                                                                        ? Moments(
                                                                                              data.loginDate
                                                                                          )
                                                                                              .tz(
                                                                                                  'Africa/Kampala'
                                                                                              )
                                                                                              .format(
                                                                                                  'DD MMM YYYY h:mm a'
                                                                                              )
                                                                                        : ''}
                                                                                </Text>
                                                                            </Stack>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Stack>
                                                            )
                                                        }
                                                    )}
                                                </>
                                            ) : (
                                                <NoItems>
                                                    No recent login data
                                                </NoItems>
                                            )}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </LinksStack>

                        {/** login lign graph */}

                        <StatStack w='100%' padding={'0 20px'} spacing='20px'>
                            <Box>
                                <AdminLineGraph />
                            </Box>
                        </StatStack>

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

export default AdminDashboard

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

    .statbox2 {
        height: 163px;
        width: 25%;
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
        font-size: 11px;
        line-height: 12px;
        color: #868fa0;
    }

    .recentLogs {
        width: 75%;
        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
    }

    .av_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14.886px;
        line-height: 20px;
        color: #201f1e;
    }

    .av_texthead {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: rgba(31, 39, 58, 0.8);
    }

    .av_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 13px;
        line-height: 20px;
        color: #1f273a;
    }
`

const LoaderContainer = styled(Stack)`
    width: 100%;
    min-height: 70vh;
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

const NoItems = styled(Box)`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
`
