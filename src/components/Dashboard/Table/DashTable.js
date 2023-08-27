import React from 'react'

import styled from 'styled-components'
import {
    Stack,
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tooltip,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { TbDotsVertical } from 'react-icons/tb'
// import { RiPencilFill } from 'react-icons/ri'
// import { CgNotes } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Moments from 'moment-timezone'

const DashTable = () => {
    const TableHead = [
        {
            title: 'Student_REG_NO.',
        },
        {
            title: 'Student Name',
        },
        {
            title: 'TOPIC',
            filter: true,
        },
        {
            title: 'STATUS',
            filter: true,
        },

        {
            title: 'EXAMINERS',
        },
        // {
        //     title: 'Registration',
        // },
        {
            title: 'Submission',
        },
        {
            title: 'Type',
        },
    ]

    const [projectTagData, setProjectTagData] = React.useState([])
    const [displayDataRecent, setDisplayRecentData] = React.useState([])

    let routeNavigate = useNavigate()

    let { allprojects } = useSelector((state) => state.project)
    const tagsData = useSelector((state) => state.tag)

    React.useEffect(() => {
        let allDetails = [...allprojects.items] || []

        allDetails.splice(6)
        setDisplayRecentData([...allDetails])
    }, [allprojects.items])

    const getLatestRegistration = (dataArray) => {
        // eslint-disable-next-line array-callback-return
        let filDatas = dataArray.filter((data) => {
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'provisional admission'
            ) {
                return data
            }
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'full admission'
            ) {
                return data
            }
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'de-registered'
            ) {
                return data
            }
        })

        if (filDatas.length > 1) {
            let latest = filDatas[0]

            filDatas.forEach((element) => {
                if (
                    Moments(element.registrationId.date).isAfter(
                        latest.registrationId.date
                    )
                ) {
                    latest = element
                }
            })

            return latest.registrationId.registrationtype
        } else if (filDatas.length > 0 && filDatas.length === 1) {
            return filDatas[0].registrationId.registrationtype
        } else {
            return '-'
        }
    }

    React.useEffect(() => {
        let allInfoData = tagsData.allTagItems.items.filter(
            (data, index) => data.table === 'project'
        )

        setProjectTagData(allInfoData)
    }, [tagsData.allTagItems.items])
    return (
        <Container spacing='25px' pb='20px'>
            {/** tab data */}
            <Stack
                className='formtitle'
                direction='row'
                w='100%'
                alignItems='center'
                justifyContent='space-between'>
                <Box>
                    <h1>Recently Added</h1>
                </Box>
            </Stack>

            <Stack direction='column' spacing='0' p='0 30px' minH='352px'>
                <Box></Box>

                {/** table */}
                <Box>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                {TableHead.map((data, index) => {
                                    return (
                                        <Th key={index} className='table_head'>
                                            <Stack
                                                direction='row'
                                                alignItems={'center'}>
                                                <Text>{data.title}</Text>

                                                {data.filter && (
                                                    <Stack
                                                        h='13px'
                                                        direction='column'
                                                        justifyContent={
                                                            'center'
                                                        }
                                                        spacing='2px'
                                                        padding='0'
                                                        m='0'>
                                                        <Box
                                                            h='30%'
                                                            color='#464F60'
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}>
                                                            <TiArrowSortedUp />
                                                        </Box>
                                                        <Box
                                                            color='#ABAAAF'
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}>
                                                            <TiArrowSortedDown />
                                                        </Box>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Th>
                                    )
                                })}
                                <Th></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {displayDataRecent.length > 0 ? (
                                <>
                                    {displayDataRecent.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet
                                        if (
                                            data.projectStatus &&
                                            data.projectStatus.length > 0 &&
                                            projectTagData.length > 0
                                        ) {
                                            activeStatus =
                                                data.projectStatus.find(
                                                    (element) =>
                                                        element.projectStatusId
                                                            .active
                                                )
                                            if (activeStatus) {
                                                activeElementSet =
                                                    projectTagData.find(
                                                        (element) =>
                                                            element.tagName ===
                                                            activeStatus
                                                                .projectStatusId
                                                                .status
                                                    )
                                            }
                                        } else {
                                        }

                                        let allRegistrations = [
                                            ...data.registration,
                                        ]

                                        /** function to return latest registration */
                                        // eslint-disable-next-line no-unused-vars
                                        let returnedData =
                                            getLatestRegistration(
                                                allRegistrations
                                            )

                                        let rpath =
                                            data.student.graduate_program_type.toLowerCase() ===
                                            'masters'
                                                ? 'masters'
                                                : 'phd'
                                        return (
                                            <Tr
                                                className={`table_row `}
                                                key={data._id}>
                                                <Td
                                                    style={{
                                                        color: '#5E5C60',
                                                        fontWeight: 500,
                                                    }}>
                                                    {
                                                        data.student
                                                            .registrationNumber
                                                    }
                                                </Td>

                                                <Td
                                                    minW='150px'
                                                    maxW='150px'
                                                    className='studentName'
                                                    style={{
                                                        color: '#15151D',
                                                        fontWeight: 500,
                                                        fontSize: '13px',
                                                    }}>
                                                    {data.student.studentName}
                                                </Td>
                                                <Td
                                                    maxW='250px'
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#15151D',
                                                    }}>
                                                    {data.topic}
                                                </Td>
                                                <Td>
                                                    {' '}
                                                    <StatusItem
                                                        tcolors={
                                                            activeElementSet &&
                                                            activeElementSet.hex
                                                                ? activeElementSet.hex
                                                                : ''
                                                        }
                                                        bcolors={
                                                            activeElementSet &&
                                                            activeElementSet.rgba
                                                                ? activeElementSet.rgba
                                                                : ''
                                                        }
                                                        minW='160px'
                                                        direction='row'
                                                        alignItems='center'>
                                                        <div />
                                                        <Text>
                                                            {' '}
                                                            {activeElementSet &&
                                                            activeElementSet.tagName !==
                                                                undefined
                                                                ? activeElementSet.tagName
                                                                : ''}
                                                        </Text>
                                                    </StatusItem>
                                                </Td>

                                                <Td>
                                                    <Box
                                                        m='auto'
                                                        w='100%'
                                                        display='flex'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        {data.examiners.length <
                                                        1 ? (
                                                            <Tooltip
                                                                color='#fbd2d4'
                                                                borderRadius={
                                                                    '8px'
                                                                }
                                                                height='30px'
                                                                hasArrow
                                                                label={
                                                                    <Box
                                                                        style={{
                                                                            fontFamily:
                                                                                'Inter',
                                                                            fontSize:
                                                                                '14px',
                                                                        }}
                                                                        w='100%'
                                                                        h='100%'
                                                                        display='flex'
                                                                        alignItems={
                                                                            'center'
                                                                        }
                                                                        p='10px 5px 10px 5px'>
                                                                        Assign
                                                                        Examiners
                                                                    </Box>
                                                                }>
                                                                <Box className='add_examiners'>
                                                                    <AiOutlinePlus />
                                                                </Box>
                                                            </Tooltip>
                                                        ) : (
                                                            <Tooltip
                                                                hasArrow
                                                                color='#fbd2d4'
                                                                borderRadius={
                                                                    '8px'
                                                                }
                                                                label={
                                                                    <Box
                                                                        style={{
                                                                            fontFamily:
                                                                                'Inter',
                                                                            fontSize:
                                                                                '14px',
                                                                        }}
                                                                        w='100%'
                                                                        h='100%'
                                                                        display='flex'
                                                                        flexDirection={
                                                                            'column'
                                                                        }
                                                                        alignItems={
                                                                            'center'
                                                                        }>
                                                                        <Box p='10px 5px 10px 5px'>
                                                                            Assign
                                                                            Examiners
                                                                        </Box>
                                                                        <Divider />
                                                                        <Box p='10px 5px 10px 5px'>
                                                                            View
                                                                            Examiners
                                                                        </Box>
                                                                    </Box>
                                                                }>
                                                                <Box className='examiner_item'>
                                                                    {
                                                                        data
                                                                            .examiners
                                                                            .length
                                                                    }
                                                                </Box>
                                                            </Tooltip>
                                                        )}
                                                    </Box>
                                                </Td>
                                                {/**<Td>
                                                <Box className='registration'>
                                                    {returnedData}{' '}
                                                </Box>
                                            </Td>**/}
                                                <Td>
                                                    <Box
                                                        m='auto'
                                                        w='100%'
                                                        display='flex'
                                                        className='subtype'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        {data.submissionStatus}
                                                    </Box>
                                                </Td>

                                                <Td>
                                                    <Box
                                                        m='auto'
                                                        w='100%'
                                                        display='flex'
                                                        className='subtype'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        {rpath}
                                                    </Box>
                                                </Td>
                                                <Td>
                                                    <Menu>
                                                        <MenuButton>
                                                            <Box fontSize='20px'>
                                                                <TbDotsVertical />
                                                            </Box>
                                                        </MenuButton>
                                                        <MenuList zIndex={'10'}>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    routeNavigate(
                                                                        `${rpath}/projects/projectreport/${data._id}`
                                                                    )
                                                                }>
                                                                View Student
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <Tr
                                    position='relative'
                                    h='48px'
                                    borderBottom={'1px solid #E1FCEF'}>
                                    <Box>
                                        <NoItems>No Records Found</NoItems>
                                    </Box>
                                </Tr>
                            )}
                        </Tbody>
                    </Table>
                </Box>
            </Stack>
        </Container>
    )
}

export default DashTable

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    .form_container {
        width: 100%;
        min-height: 360px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 17px;
            line-height: 137.5%;
            color: #111827;
        }
    }
    background: #ffffff;
    border-radius: 9px;
    .tab {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        h2 {
            font-size: 14px;
            line-height: 20px;
        }

        p {
            font-size: 10px;
            line-height: 16px;
        }
    }

    .reviews {
        color: #aa5b00 !important;
        background: #fcf2e6 !important;

        div {
            background: #c97a20;
        }
    }

    .approved {
        color: #293ad1;
        background: #edeeff;

        div {
            background: #6054ef;
        }
    }

    .completed {
        color: #14804a;
        background: #e1fcef;
        div {
            background: #38a06c;
        }
    }

    .graduated {
        color: #5a6376;
        background: #e9edf5;
        div {
            background: #687182;
        }
    }

    .onhold {
        color: #d1293d;
        background: #ffedef;
        div {
            background: #ef5466;
        }
    }
    thead {
        background: rgba(247, 249, 252, 0.8);
        backdrop-filter: blur(8px);
    }

    .table_head {
        color: #5e5c60 !important;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        height: 34px;
    }

    td {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #3a3a43;
    }

    .add_examiners {
        width: 24px;
        height: 24px;
        border: 1px dashed #f4797f;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #464f60;
        font-size: 15px;
        background: #ffffff;
    }

    .examiner_item {
        width: 24px;
        height: 24px;
        background: #eeeeef;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .registration {
        min-width: 140px;
        width: 100%;
        color: #3a3a43;
        padding: 4px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eeeeef;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-transform: uppercase;
    }

    .Sub_date {
        font-weight: 500;
    }

    .supervisor {
        color: #3a3a43;
    }

    .table_row {
        :hover {
            background: #fef9ef;
        }
    }

    .subtype {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        text-transform: uppercase;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eeeeef;
        border-radius: 4px;
    }
`



const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};
    div {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }

    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        color: ${({ tcolors }) => tcolors};
    }
`

const NoItems = styled(Box)`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`
