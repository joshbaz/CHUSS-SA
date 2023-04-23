import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
} from '@chakra-ui/react'
import { MdArrowBack } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { Logout, reset } from '../../../store/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
const TopBar = ({ topbarData }) => {
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(Logout())
        dispatch(reset())
        routeNavigate('/auth/signin', { replace: true })
    }

    useEffect(() => {
        // routeNavigate('/auth/signin', { replace: true })
    }, [])

    return (
        <Container
           
            direction='row'
            h='56px'
            alignItems='center'
            padding={'0 20px'}
            justifyContent='space-between'>
            <Box>
                <Stack direction='row' alignItems={'center'}>
                    {topbarData.backButton && (
                        <Box fontSize='20px' onClick={() => routeNavigate(-1)}>
                            <MdArrowBack />
                        </Box>
                    )}

                    <h1>{topbarData.title}</h1>
                    {topbarData.count && (
                        <Box className='total_num'>
                            <Text>{topbarData.count}</Text>
                        </Box>
                    )}
                </Stack>
            </Box>

            <Box>
                <Menu>
                    <MenuButton>
                        <Avatar
                            size='sm'
                            name={`${user !== null && user.firstname} ${
                                user !== null && user.lastname
                            }'`}
                            src=''
                            bg='gray.400'
                        />
                    </MenuButton>
                    <MenuList>
                        {/**<MenuItem>Account</MenuItem>  */}

                        <MenuItem onClick={onLogout}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Container>
    )
}

export default TopBar

const Container = styled(Stack)`
    background: #fbfbfb;
    border-bottom: 1px solid #d1d5db;

    overflow-x: hidden;
    h1 {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 32px;
        color: #222834;
    }

    .total_num {
        width: 27px;
        height: 22px;
        background: #fceded;
        border-radius: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
            color: #f14c54;
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
        }
    }
`
