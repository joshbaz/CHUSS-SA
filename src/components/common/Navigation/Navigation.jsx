import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Tooltip } from '@chakra-ui/react'
import Logo from '../../../logo.svg'
import { NavLink } from 'react-router-dom'
import { RiDashboardLine, RiFoldersFill } from 'react-icons/ri'
import {
    MdOutlineAccountBalanceWallet,
    MdManageSearch,
    MdOutlineBusinessCenter,
    MdOutlineSupervisedUserCircle,
} from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'

import { useSelector } from 'react-redux'
//import Cookies from 'js-cookie'
const Navigation = () => {
    //  const isAuthenticated = !!localStorage.getItem('_tk')
    // const [previledges, setPreviledges] = React.useState('Administrator')
    const { user, isSuccess } = useSelector((state) => state.auth)

    const [menuData, setMenuData] = React.useState([])
    // let location = useLocation()

    React.useEffect(() => {
        if (user !== null) {
            if (user.privileges === 'Super Administrator') {
                setMenuData(() => [
                    {
                        title: 'dashboard',
                        icon: <RiDashboardLine />,
                        link: '/',
                        name: 'Dashboard',
                    },
                    {
                        title: 'FAC',
                        icon: <MdOutlineSupervisedUserCircle />,
                        link: '/facilitators',
                        name: 'Facilitators',
                    },
                    {
                        title: 'mst',
                        icon: <RiFoldersFill />,
                        link: '/masters/projects',
                        name: 'Master Students',
                    },
                    {
                        title: 'phd',
                        icon: <RiFoldersFill />,
                        link: '/phd/projects',
                        name: 'Phd Students',
                    },
                    {
                        title: 'payments',
                        icon: <MdOutlineAccountBalanceWallet />,
                        link: '/payments',
                        name: 'Payments',
                    },
                    
                    {
                        title: 'examiners',
                        icon: <FaChalkboardTeacher />,
                        link: '/m-examiners',
                        name: 'Examiners',
                    },
                    {
                        title: 'Schools',
                        icon: <MdOutlineBusinessCenter />,
                        link: '/schools',
                        name: 'Schools',
                    },
                  {
                        title: 'reports',
                        icon: <MdManageSearch />,
                        link: '/m-reports',
                        name: 'reports',
                    },

                    {
                        title: 'settings',
                        icon: <AiOutlineSetting />,
                        link: '/setting',
                        name: 'Settings',
                    },
                ])
            } else {
                setMenuData(() => [
                    {
                        title: 'dashboard',
                        icon: <RiDashboardLine />,
                        link: '/',
                        name: 'Dashboard',
                    },

                    {
                        title: 'mst',
                        icon: <RiFoldersFill />,
                        link: '/masters/projects',
                        name: 'Master Students',
                    },
                    {
                        title: 'phd',
                        icon: <RiFoldersFill />,
                        link: '/phd/projects',
                        name: 'Phd Students',
                    },
                    {
                        title: 'payments',
                        icon: <MdOutlineAccountBalanceWallet />,
                        link: '/payments',
                        name: 'Payments',
                    },
                    {
                        title: 'examiners',
                        icon: <FaChalkboardTeacher />,
                        link: '/m-examiners',
                        name: 'Examiners',
                    },
                   
                    {
                        title: 'Schools',
                        icon: <MdOutlineBusinessCenter />,
                        link: '/schools',
                        name: 'Schools',
                    },
                   {
                        title: 'reports',
                        icon: <MdManageSearch />,
                        link: '/m-reports',
                        name: 'reports',
                    },

                    {
                        title: 'settings',
                        icon: <AiOutlineSetting />,
                        link: '/setting',
                        name: 'Settings',
                    },
                ])
            }
            //setPreviledges(() => user.previledges)
        }
    }, [user, isSuccess])
    return (
        <Container
            direction='column'
            w='72px'
            position='fixed'
            h='100vh'
            spacing='32px'>
            <Box className='logo'>
                <img src={Logo} alt='' />
            </Box>

            <Stack direction='column' spacing='15px'>
                {menuData.map((data, index) => (
                    <Tooltip
                        key={index}
                        color='#fbd2d4'
                        borderRadius={'8px'}
                        height='30px'
                        hasArrow
                        label={
                            <Box
                                style={{
                                    fontFamily: 'Inter',
                                    fontSize: '14px',
                                }}
                                w='100%'
                                h='100%'
                                display='flex'
                                alignItems={'center'}
                                p='10px 5px 10px 5px'>
                                {data.name}
                            </Box>
                        }>
                        <NavLink
                            to={data.link}
                            end={data.link === '/' ? true : false}
                            className={({ isActive }) =>
                                isActive ? 'menu_wrap activeItem' : 'menu_wrap'
                            }>
                            <Stack direction='column' spacing='0px'>
                                <Box className='menu_icon'>{data.icon}</Box>
                                {data.title === 'mst' ||
                                data.title === 'phd' ||
                                data.title === 'FAC' ? (
                                    <Box pt='2px' className='menu_title'>
                                        {data.title}
                                    </Box>
                                ) : null}
                            </Stack>
                        </NavLink>
                    </Tooltip>
                ))}
            </Stack>
        </Container>
    )
}

export default Navigation

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    background: #1a1a24;
    position: fixed;
    align-items: center;
    padding-top: 16px;
    .logo {
        img {
            width: 45px;
            height: 45px;
            object-fit: cover;
        }
    }

    .menu_wrap {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #3a3a43;
        border-radius: 6px;
        color: #d4d4d6;
    }

    .menu_icon {
        font-size: 20px;
    }

    .activeItem {
        background: #15151d !important;
        border: 1px solid #22222c;
        color: #ffffff;
    }

    .menu_title {
        font-weight: 600;
        font-size: 9px;
        line-height: 11px;
        color: #d4d4d6;
        text-transform: uppercase;
        font-family: 'Inter', sans-serif;
    }
`
