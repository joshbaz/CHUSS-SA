import React from 'react'
import styled from 'styled-components'
import { Box, Stack } from '@chakra-ui/react'
import Logo from '../../../logo.svg'
import { NavLink } from 'react-router-dom'
import { RiDashboardLine, RiFoldersFill } from 'react-icons/ri'
import { MdOutlineAccountBalanceWallet, MdManageSearch } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import { FaChalkboardTeacher } from 'react-icons/fa'
const Navigation = () => {
    const menuData = [
        {
            title: 'dashboard',
            icon: <RiDashboardLine />,
            link: '/',
        },
        {
            title: 'projects',
            icon: <RiFoldersFill />,
            link: '/projects',
        },
        {
            title: 'payments',
            icon: <MdOutlineAccountBalanceWallet />,
            link: '/payments',
        },
        {
            title: 'examiners',
            icon: <FaChalkboardTeacher />,
            link: '/examiners',
        },
        // {
        //     title: 'advanced search',
        //     icon: <MdManageSearch />,
        //     link: '/advsearch',
        // },
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
                        exact={data.link === '/' ? true : false}
                        className='menu_wrap'
                        activeClassName='activeItem'>
                        <Box className='menu_icon'>{data.icon}</Box>
                    </NavLink>
                ))}
            </Stack>
        </Container>
    )
}

export default Navigation

const Container = styled(Stack)`
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
        background: #15151d;
        border: 1px solid #22222c;
        color: #ffffff;
    }
`
