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

const AllSchools = () => {
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar topbarData={{ title: 'Schools', count: null }} />
            </Stack>
        </Container>
    )
}

export default AllSchools

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
        font-family: 'Inter';
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
        font-family: 'Inter';
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 17.4375px;
        line-height: 21px;
        color: #000000;
    }
`

const StatStack = styled(Stack)``
