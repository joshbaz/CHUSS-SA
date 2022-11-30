import React from 'react'
import styled from 'styled-components'
import { Box, Stack } from '@chakra-ui/react'
import Logo from '../../../logo.svg'
import { NavLink, useLocation } from 'react-router-dom'
import { RiDashboardLine, RiFoldersFill } from 'react-icons/ri'
import {
    MdOutlineAccountBalanceWallet,
    MdManageSearch,
    MdOutlineBusinessCenter,
} from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'
const Navigation = () => {
    let location = useLocation()
    const menuData = [
        {
            title: 'dashboard',
            icon: <RiDashboardLine />,
            link: '/',
        },
        {
            title: 'mst',
            icon: <RiFoldersFill />,
            link: '/masters/projects',
        },
        {
            title: 'phd',
            icon: <RiFoldersFill />,
            link: '/phd/projects',
        },
        {
            title: 'payments',
            icon: <MdOutlineAccountBalanceWallet />,
            link: '/payments',
        },
        {
            title: 'examiners',
            icon: <FaChalkboardTeacher />,
            link: '/m-examiners',
        },
        {
            title: 'Schools',
            icon: <MdOutlineBusinessCenter />,
            link: '/schools',
        },
        {
            title: 'advanced search',
            icon: <MdManageSearch />,
            link: '/advsearch',
        },
        {
            title: 'settings',
            icon: <AiOutlineSetting />,
            link: '/setting',
        },
    ]
    return (
        <Container direction='column' w='72px' h='100vh' spacing='32px'>
            <Box className='logo'>
                <img src={Logo} alt='' />
            </Box>

            <Stack direction='column' spacing='15px'>
                {menuData.map((data, index) => (
                    <NavLink
                        key={index}
                        to={data.link}
                        end={data.link === '/' ? true : false}
                        className={({ isActive }) =>
                            isActive ? 'menu_wrap activeItem' : 'menu_wrap'
                        }>
                        <Stack direction='column' spacing='0px'>
                            <Box className='menu_icon'>{data.icon}</Box>
                            {data.title === 'mst' || data.title === 'phd' ? (
                                <Box className='menu_title'>{data.title}</Box>
                            ) : null}
                        </Stack>
                    </NavLink>
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
    }
`
