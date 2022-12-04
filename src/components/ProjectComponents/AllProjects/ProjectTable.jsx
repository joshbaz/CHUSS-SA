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
import {
    MdOutlineUpdate,
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
} from 'react-icons/md'
import { TbDotsVertical } from 'react-icons/tb'
import { RiPencilFill } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Moments from 'moment-timezone'
const ProjectTable = ({ allTagData, studentType, rpath }) => {
    const [projectTagData, setProjectTagData] = React.useState([])
    const [perPage, setPerPage] = React.useState(10)

    const [allDisplayData, setAllDisplayData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allItems: [],
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })

    const [filterTabData, setfilterTabData] = React.useState([
        {
            title: 'All',
            dataCount: 0,
        },
    ])
    const [searchData, setSearchData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allSearchItems: [],
        totalItemsDisplayed: 0,
        totalSearchedItems: 0,
        totalPages: 0,
    })

    const TableHead = [
        {
            title: '#',
            filter: true,
        },
        {
            title: 'STUDENT(SRN)',
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
        {
            title: 'Registration',
        },
        {
            title: 'Submission',
        },
    ]

    let { pprojects, allprojects } = useSelector((state) => state.project)

    const [activityDrpdown, setActivityDropDown] = React.useState(false)
    let activeDrop = React.useRef(null)

    const handleDropDown = () => {
        setActivityDropDown(!activityDrpdown)
    }

    const handlePrev = () => {}

    const handleNext = () => {}

    let routeNavigate = useNavigate()

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'project'
        )

        setProjectTagData(allInfoData)
    }, [allTagData])

    useEffect(() => {
        let allQueriedItems = allprojects.items.filter((datas) => {
            if (studentType === 'phd') {
                if (datas.student.graduate_program_type === 'phd') {
                    return datas
                }
            } else if (studentType === 'masters') {
                if (datas.student.graduate_program_type === 'Masters') {
                    return datas
                }
            } else {
                return null
            }
        })
        /** initial items  */
        //items collected
        const allItemsCollected = allQueriedItems
        //total all items
        const totalItems = allQueriedItems.length
        let itemsPerPage = perPage
        const currentPage = 1
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        const currentItems = allItemsCollected.slice(
            indexOfFirstItem,
            indexOfLastItem
        )

        const pageLength = Math.ceil(totalItems / itemsPerPage)

        setAllDisplayData({
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            items: currentItems,
            allSearchItems: allQueriedItems,
            totalItemsDisplayed: currentItems.length,
            totalSearchedItems: totalItems,
            totalPages: pageLength,
        })
    }, [studentType, allprojects.items])

    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

    /** handle function to give registration */
    const getLatestRegistration = (dataArray) => {
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
                        {allDisplayData.items.length > 0 ? (
                            <>
                                {allDisplayData.items.map((data, index) => {
                                    let activeStatus
                                    let activeElementSet
                                    if (
                                        data.projectStatus &&
                                        data.projectStatus.length > 0 &&
                                        projectTagData.length > 0
                                    ) {
                                        activeStatus = data.projectStatus.find(
                                            (element) => element.active
                                        )
                                        if (activeStatus) {
                                            activeElementSet =
                                                projectTagData.find(
                                                    (element) =>
                                                        element.tagName ===
                                                        activeStatus.status
                                                )
                                            console.log(
                                                activeElementSet,
                                                'eeel'
                                            )
                                        }
                                    } else {
                                    }

                                    let allRegistrations = [
                                        ...data.registration,
                                    ]

                                    /** function to return latest registration */
                                    let returnedData =
                                        getLatestRegistration(allRegistrations)
                                    return (
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
                                                    justifyContent={'center'}>
                                                    {data.examiners.length <
                                                    1 ? (
                                                        <Tooltip
                                                            color='#fbd2d4'
                                                            borderRadius={'8px'}
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
                                                            borderRadius={'8px'}
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
                                            <Td>
                                                <Box className='registration'>
                                                    {returnedData}{' '}
                                                </Box>
                                            </Td>
                                            <Td>
                                                <Box
                                                    m='auto'
                                                    w='100%'
                                                    display='flex'
                                                    className='subtype'
                                                    justifyContent={'center'}>
                                                    {data.submissionStatus}
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
                                                                    `${rpath}/projectreport/${data._id}`
                                                                )
                                                            }>
                                                            View Student
                                                        </MenuItem>
                                                        <MenuItem>
                                                            Delete
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

            {/** Pagination */}

            {allDisplayData.items.length > 0 && (
                <PaginationStack
                    direction='row'
                    height='56px'
                    alignItems='center'
                    justifyContent={'space-between'}>
                    <Box className='pages'>
                        <span>
                            {`${PaginationFirstNumber}`} -{' '}
                            {`${PaginationLastNumber}`} of{' '}
                            {`${pprojects.overall_total}`}
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
                            <span>{pprojects.perPage}</span>
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
            )}
        </Container>
    )
}

export default ProjectTable

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
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
        font-size: 12px;
        text-transform: uppercase;
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
        font-family: 'Inter', sans-serif;
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

    font-family: 'Inter', sans-serif;
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
        font-family: 'Inter', sans-serif;
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
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
            font-family: 'Inter', sans-serif;
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
