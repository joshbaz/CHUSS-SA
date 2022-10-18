import React, { useEffect } from 'react'
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
} from '@chakra-ui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import {
    IoIosArrowDropright,
    IoIosArrowDropdown,
    IoIosStats,
} from 'react-icons/io'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbDotsVertical } from 'react-icons/tb'
import { RiPencilFill } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PaymentTable = () => {
    const filterTabData = [
        {
            title: 'All',
            dataCount: 27,
        },
        {
            title: 'Sent',
            dataCount: 7,
        },
        {
            title: 'Pending',
            dataCount: 4,
        },
        {
            title: 'On Hold',
            dataCount: 4,
        },
    ]

    const TableHead = [
        {
            title: '#',
            filter: true,
        },
        {
            title: 'Request NO.',
        },
        {
            title: 'Examiner Name',
        },
        {
            title: 'Topic',
            filter: true,
        },
        {
            title: 'Student Name',
        },

        {
            title: 'Status',
        },
        {
            title: 'Tran. Request Date',
        },
    ]

    let { paginatedPayments } = useSelector((state) => state.payment)

    const [activityDrpdown, setActivityDropDown] = React.useState(false)
    let activeDrop = React.useRef(null)

    const handleDropDown = () => {
        setActivityDropDown(!activityDrpdown)
    }

    let PaginationFirstNumber =
        paginatedPayments.currentPage * paginatedPayments.perPage -
        paginatedPayments.perPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + paginatedPayments.current_total - 1

    const handlePrev = () => {}

    const handleNext = () => {}

    let routeNavigate = useNavigate()

    return (
        <Container>
            {/** tab data */}
            <Box>
                <Tabs variant='unstyled'>
                    <TabList>
                        {filterTabData.map((data, index) => {
                            return (
                                <Tab
                                    key={index}
                                    _selected={{
                                        color: '#F14C54',
                                        fontWeight: '700',
                                        borderBottom: '2px solid #DB5A5A',
                                    }}
                                    className='tab'>
                                    <Stack
                                        direction='row'
                                        alignItems={'center'}>
                                        <h2>{data.title}</h2>
                                        <Text>{data.dataCount}</Text>
                                    </Stack>
                                </Tab>
                            )
                        })}
                    </TabList>
                </Tabs>
            </Box>

            {/** table */}
            <Box minH='48vh'>
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
                            <Th></Th>
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
                                                    justifyContent={'center'}
                                                    spacing='2px'
                                                    padding='0'
                                                    m='0'>
                                                    <Box
                                                        h='30%'
                                                        color='#464F60'
                                                        style={{
                                                            fontSize: '12px',
                                                        }}>
                                                        <TiArrowSortedUp />
                                                    </Box>
                                                    <Box
                                                        color='#ABAAAF'
                                                        style={{
                                                            fontSize: '12px',
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
                        {paginatedPayments.items.length > 0 ? (
                            <>
                                {paginatedPayments.items.map((data, index) => {
                                    return (
                                        <>
                                            <Tr
                                                className='table_row'
                                                key={data._id}>
                                                <Td w='46px'>
                                                    <Checkbox colorScheme='pink' />
                                                </Td>
                                                <Td w='36px'>
                                                    <Box
                                                        onClick={handleDropDown}
                                                        ref={activeDrop}
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontSize: '16px',
                                                        }}>
                                                        {activityDrpdown ? (
                                                            <IoIosArrowDropdown />
                                                        ) : (
                                                            <IoIosArrowDropright />
                                                        )}
                                                    </Box>
                                                </Td>
                                                <Td>1</Td>
                                                <Td
                                                    style={{
                                                        color: '#5E5C60',
                                                        fontWeight: 500,
                                                    }}>
                                                    {data.payCode}
                                                </Td>
                                                <Td
                                                    style={{
                                                        color: '#5E5C60',
                                                        fontWeight: 500,
                                                    }}>
                                                    {data.examiner.jobtitle}
                                                    {data.examiner.name}
                                                </Td>
                                                <Td
                                                    maxW='250px'
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#15151D',
                                                    }}>
                                                    {data.project.topic}
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
                                                    {' '}
                                                    <StatusItem
                                                        width='90px'
                                                        className='reviews'
                                                        direction='row'
                                                        alignItems='center'>
                                                        <div />
                                                        <Text>
                                                            {' '}
                                                            {data.payStatus}
                                                        </Text>
                                                    </StatusItem>
                                                </Td>

                                                <Td>
                                                    <Box className='semester'>
                                                        {data.createdAt}{' '}
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
                                                                        `/payments/edit/${data._id}`
                                                                    )
                                                                }>
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    routeNavigate(
                                                                        `/payments/view/${data._id}`
                                                                    )
                                                                }>
                                                                View
                                                            </MenuItem>
                                                            <MenuItem>
                                                                Delete
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                            {activityDrpdown && (
                                                <Tr
                                                    position='relative'
                                                    h='250px'
                                                    borderBottom={
                                                        '1px solid #E1FCEF'
                                                    }
                                                    key={index}>
                                                    <Box h='100%'>
                                                        <TableDropDown
                                                            w='100vw'
                                                            bg='#ffffff'
                                                            h='100%'
                                                            position='absolute'>
                                                            <ListStack
                                                                spacing='36px'
                                                                h='100%'>
                                                                <Stack
                                                                    className='list-item'
                                                                    direction='row'
                                                                    w='100%'
                                                                    alignItems={
                                                                        'center'
                                                                    }>
                                                                    <Box className='icon_add'>
                                                                        <RiPencilFill />
                                                                    </Box>

                                                                    <Box className='activities'>
                                                                        <Text>
                                                                            <span className='activity_identity'>{`{name}`}</span>{' '}
                                                                            updated{' '}
                                                                            <span className='activity_type'>
                                                                                payment
                                                                                reciept
                                                                            </span>{' '}
                                                                            from{' '}
                                                                            <span className='activity_text'>
                                                                                150000
                                                                            </span>{' '}
                                                                            to{' '}
                                                                            <span className='activity_text'>
                                                                                520,000
                                                                                Ugx
                                                                            </span>{' '}
                                                                            on{' '}
                                                                            {`{Date}`}{' '}
                                                                            @{' '}
                                                                            {`{time}`}
                                                                        </Text>
                                                                    </Box>
                                                                </Stack>

                                                                <Stack
                                                                    direction='row'
                                                                    w='100%'
                                                                    className='list-item'
                                                                    alignItems={
                                                                        'flex-start'
                                                                    }>
                                                                    <Box className='icon_stat'>
                                                                        <IoIosStats />
                                                                    </Box>

                                                                    <Stack className='activities'>
                                                                        <Box>
                                                                            <Stack
                                                                                spacing='5px'
                                                                                direction='row'
                                                                                className='activities_texts'>
                                                                                <Text className='activity_identity'>{`{name}`}</Text>{' '}
                                                                                <Text>
                                                                                    updated
                                                                                </Text>
                                                                                <span className='activity_type'>
                                                                                    status
                                                                                </span>
                                                                                <Text>
                                                                                    from
                                                                                </Text>
                                                                                <StatusItem
                                                                                    className='reviews'
                                                                                    direction='row'
                                                                                    alignItems='center'>
                                                                                    <div />
                                                                                    <Text>
                                                                                        {' '}
                                                                                        In
                                                                                        Review
                                                                                    </Text>
                                                                                </StatusItem>
                                                                                <Text>
                                                                                    to
                                                                                </Text>
                                                                                <StatusItem
                                                                                    className='approved'
                                                                                    direction='row'
                                                                                    alignItems='center'>
                                                                                    <div />
                                                                                    <Text>
                                                                                        Approved
                                                                                        Viva
                                                                                    </Text>
                                                                                </StatusItem>
                                                                                <Text>
                                                                                    on{' '}
                                                                                    {`{Date}`}{' '}
                                                                                    @{' '}
                                                                                    {`{time}`}
                                                                                </Text>
                                                                            </Stack>
                                                                        </Box>

                                                                        <Stack
                                                                            className='status_update'
                                                                            direction='row'
                                                                            alignItems={
                                                                                'center'
                                                                            }>
                                                                            <Box>
                                                                                <CgNotes />
                                                                            </Box>

                                                                            <Box>
                                                                                <Text>
                                                                                    This
                                                                                    is
                                                                                    a
                                                                                    note,
                                                                                    user
                                                                                    fills
                                                                                    in
                                                                                    while
                                                                                    changing
                                                                                    the
                                                                                    status,
                                                                                    which
                                                                                    explains
                                                                                    the
                                                                                    current
                                                                                    project
                                                                                    status.
                                                                                </Text>
                                                                            </Box>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Stack>

                                                                <Stack
                                                                    direction='row'
                                                                    w='100%'
                                                                    alignItems={
                                                                        'center'
                                                                    }
                                                                    className='list-item'>
                                                                    <Box className='icon_create'>
                                                                        <AiOutlinePlus />
                                                                    </Box>

                                                                    <Box className='activities'>
                                                                        <Text>
                                                                            <span className='activity_identity'>{`{name}`}</span>{' '}
                                                                            created{' '}
                                                                            <span className='activity_type'>
                                                                                project
                                                                            </span>{' '}
                                                                            on{' '}
                                                                            {`{Date}`}{' '}
                                                                            @{' '}
                                                                            {`{time}`}
                                                                        </Text>
                                                                    </Box>
                                                                </Stack>
                                                            </ListStack>
                                                        </TableDropDown>
                                                    </Box>
                                                </Tr>
                                            )}
                                        </>
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

            {/** Pagination */}

            <PaginationStack
                direction='row'
                height='56px'
                alignItems='center'
                justifyContent={'space-between'}>
                <Box className='pages'>
                    <span>
                        {`${PaginationFirstNumber}`} -{' '}
                        {`${PaginationLastNumber}`} of{' '}
                        {`${paginatedPayments.overall_total}`}
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
                        <span>{paginatedPayments.perPage}</span>
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

export default PaymentTable

const Container = styled(Stack)`
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

    .studentName {
        text-transform: capitalize;
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

    .semester {
        min-width: 140px;
        width: 100%;
        color: #3a3a43;
        padding: 4px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eeeeef;
        border-radius: 4px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
    }

    .supervisor {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #3a3a43;
    }

    .table_row {
        :hover {
            background: #fef9ef;
        }
    }
`

const TableDropDown = styled(Stack)`
    padding: 10px 0 0 52px;
    .icon_add,
    .icon_stat,
    .icon_create {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        z-index: 10;
        border: 6px solid #ffffff;
    }

    .icon_add {
        background: #fbd2d4;
        color: #f14c54;
    }

    .icon_stat {
        background: #ccddff;
        color: #2264e6;
    }

    .icon_create {
        background: #d4d4d6;
        color: #5e5c60;
    }

    .activities {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #5e5c60;
    }

    .activity_identity {
        color: #171c26;
    }
    .activity_type {
        color: #f14c54;
    }
    .activity_text {
        color: #171c26;
    }
`

const ListStack = styled(Stack)`
    position: relative;
    height: 100%;
    list-style-type: none;
    z-index:1;
  .list-item {
        display: flex;
        padding: 0px 0px;
        flex-basis: 0;
        -webkit-box-flex: 0
        -ms-flex-positive: 0;
        flex-grow: 0;
        width: 100%;
        min-width: 170px;
        padding-bottom: 0px;

    }
    .list-item + .list-item:after {
        content: '';
        position: absolute;
        left: 19px;
        top: 0;
        background: #D5DBE5;
        width: 2px;
        height: 100%;
        transform: translateY(0%);
        z-index:-2;
       
    }

    .status_update {
        border-left: 1px solid  #D5DBE5;
        padding-left: 10px;
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

const PaginationStack = styled(Stack)`
    .pagination {
        color: #6b7280;
        align-items: center;
        justify-content: flex-end;

        background: #ffffff;
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
