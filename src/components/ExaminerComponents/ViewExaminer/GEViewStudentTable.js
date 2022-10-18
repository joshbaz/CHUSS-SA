import React from 'react'

import styled from 'styled-components'
import {
    Stack,
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Tooltip,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import {
    IoIosArrowDropright,
    IoIosArrowDropdown,
    IoIosStats,
} from 'react-icons/io'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import {
    MdOutlineUpdate,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md'
import { TbDotsVertical } from 'react-icons/tb'
import { BiLinkExternal } from 'react-icons/bi'
import { RiPencilFill } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GEViewStudentTable = () => {
    const filterTabData = [
        {
            title: 'All',
            dataCount: 27,
        },
        {
            title: 'In Review',
            dataCount: 7,
        },
        {
            title: 'Approved Viva',
            dataCount: 4,
        },
        {
            title: 'Completed',
            dataCount: 4,
        },
        {
            title: 'On Hold',
            dataCount: 2,
        },
        {
            title: 'Graduated',
            dataCount: 2,
        },
    ]

    const TableHead = [
        {
            title: '#',
            filter: true,
        },
        {
            title: 'Student_REG_NO.',
        },
        {
            title: 'Student Name',
        },
        {
            title: 'Report/Grading',
            filter: true,
        },
        {
            title: 'STATUS',
            filter: true,
        },

        {
            title: 'Semester',
        },
    ]

    const [addbutton, setaddbutton] = React.useState(true)
    const [activityDrpdown, setActivityDropDown] = React.useState(false)
    let activeDrop = React.useRef(null)

    const handleDropDown = () => {
        setActivityDropDown(!activityDrpdown)
    }

    const handlePrev = () => {}

    const handleNext = () => {}

    let routeNavigate = useNavigate()

    let { studentData, individualExaminer } = useSelector(
        (state) => state.examiner
    )

    let PaginationFirstNumber =
        studentData.currentPage * studentData.perPage - studentData.perPage + 1

    let PaginationLastNumber =
        PaginationFirstNumber + studentData.current_total - 1
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
                    <h1>Students</h1>
                </Box>
            </Stack>

            <Stack direction='column' spacing='0' p='0 30px' minH='352px'>
                {/** table */}
                <Box>
                    <Table size='sm'>
                        <Thead>
                            <Tr>
                                <Th w='46px'>
                                    <Checkbox
                                        bg='#ffffff'
                                        icon={<AiOutlineMinus />}
                                        colorScheme='pink'
                                    />
                                </Th>

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
                            {studentData.items.length > 0 ? (
                                <>
                                    {studentData.items.map((data, index) => {
                                        console.log('graded', data)
                                        let markedStatus = false

                                        data.examinerReports.filter(
                                            (dataReport) => {
                                                if (
                                                    dataReport.reportId
                                                        .examiner ===
                                                    individualExaminer._id
                                                ) {
                                                    return (markedStatus =
                                                        dataReport.reportId
                                                            .marked)
                                                }
                                            }
                                        )
                                        return (
                                            <Tr
                                                className='table_row'
                                                key={data._id}>
                                                <Td w='46px'>
                                                    <Checkbox colorScheme='pink' />
                                                </Td>

                                                <Td>1</Td>
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
                                                    className='studentName'
                                                    style={{
                                                        color: '#15151D',
                                                        fontWeight: 500,
                                                        fontSize: '13px',
                                                    }}>
                                                    {data.student.studentName}
                                                </Td>
                                                <Td>
                                                    {markedStatus ? (
                                                        <StatusItem
                                                            width='70%'
                                                            className='graded'
                                                            direction='row'
                                                            alignItems='center'>
                                                            <div />
                                                            <Text>
                                                                {' '}
                                                                Report Graded
                                                            </Text>
                                                        </StatusItem>
                                                    ) : (
                                                        <StatusItem
                                                            width='70%'
                                                            className='pending'
                                                            direction='row'
                                                            alignItems='center'>
                                                            <div />
                                                            <Text>
                                                                {' '}
                                                                Report Pending
                                                            </Text>
                                                        </StatusItem>
                                                    )}
                                                </Td>
                                                <Td>
                                                    {' '}
                                                    <StatusItem
                                                        width='90px'
                                                        className='reviews'
                                                        direction='row'
                                                        alignItems='center'>
                                                        <div />
                                                        <Text> In Review</Text>
                                                    </StatusItem>
                                                </Td>

                                                <Td>
                                                    <Box className='semester'>
                                                        {data.student.semester}{' '}
                                                        {
                                                            data.student
                                                                .academicYear
                                                        }
                                                    </Box>
                                                </Td>

                                                <Td>
                                                    <Stack
                                                        className='openLink'
                                                        spacing='5px'
                                                        alignItems='center'
                                                        direction='row'
                                                        onClick={() =>
                                                            routeNavigate(
                                                                `/projects/projectreport/${data._id}`
                                                            )
                                                        }>
                                                        <Box fontSize='16px'>
                                                            {' '}
                                                            <BiLinkExternal />
                                                        </Box>
                                                        <Box>Open</Box>
                                                    </Stack>
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

            {/** Pagination */}

            <PaginationStack
                p='0 20px'
                direction='row'
                height='56px'
                alignItems='center'
                justifyContent={'space-between'}>
                <Box className='pages'>
                    <span>
                        {`${PaginationFirstNumber}`} -{' '}
                        {`${PaginationLastNumber}`} of{' '}
                        {`${studentData.overall_total}`}
                    </span>
                </Box>
                <Stack
                    h='90%'
                    direction='row'
                    spacing='20px'
                    alignItems='center'
                    className='pagination'>
                    <Box className='rows'>
                        <h1>Rows per page:</h1>
                        <span>{studentData.perPage}</span>
                    </Box>

                    {/** pagination arrows */}
                    <Stack
                        direction='row'
                        alignItems='center'
                        className='arrows'>
                        <Box className='left' onClick={handlePrev}>
                            <MdKeyboardArrowLeft />
                        </Box>
                        <Box>1</Box>
                        <Box className='right' onClick={handleNext}>
                            <MdKeyboardArrowRight />
                        </Box>
                    </Stack>
                </Stack>
            </PaginationStack>
        </Container>
    )
}

export default GEViewStudentTable

const Container = styled(Stack)`
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
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }
    background: #ffffff;
    border-radius: 9px;
    .tab {
        font-family: 'Inter';
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
    .graded {
        color: #14804a !important;
        background: #e1fcef !important;

        div {
            background: #38a06c;
        }
    }
    .pending {
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        height: 34px;
    }

    td {
        font-family: 'Inter';
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
    .openLink {
        color: #abaaaf;
        text-transform: uppercase;
        cursor: pointer;
    }
`

const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;

    div {
        border-radius: 2px;
        width: 6px;
        height: 6px;
    }
`

const PaginationStack = styled(Stack)`
    .pagination {
        color: #6b7280;
        align-items: center;
        justify-content: flex-end;
        padding-right: 42px;
        background: #ffffff;
        border-radius: 0px 0px 10px 10px;
    }
    .pages {
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 166%;
        color: #111827;
    }

    .rows {
        display: flex;
        align-items: center;
        h1 {
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 19px;

            letter-spacing: 0.3px;
            color: #111827;
        }
    }

    .arrows {
        width: 88px;
        display: flex;
        justify-content: space-between;

        .left,
        .right {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
            border-radius: 6px;
        }
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
