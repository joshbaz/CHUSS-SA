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
    Button,
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
import { CSVLink } from 'react-csv'
import AdvPagination from './AdvPagination'
import AdvPagination2 from './AdvPagination2'

const headers = [
    {
        label: 'Student Name',
        key: 'studentName',
    },
    {
        label: 'Student Contacts',
        key: 'studentContacts',
    },
    {
        label: 'topic',
        key: 'topic',
    },
    {
        label: 'status',
        key: 'status',
    },
]

const AdvStudentTable = ({
    tableLists,
    tableData = [],
    allItems,
    searchActive,
    allTagData,
    filterInfo,
}) => {
    const [allDisplayItems, setAllDisplayItems] = React.useState([])
    const [projectTagData, setProjectTagData] = React.useState([])
    const [perPage, setPerPage] = React.useState(10)
    const [searchData, setSearchData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allSearchItems: [],
        totalItemsDisplayed: 0,
        totalSearchedItems: 0,
        totalPages: 0,
    })

    const [exportData, setExportData] = React.useState([])
    React.useEffect(() => {
        setAllDisplayItems(allItems.items)
        /** export trial */
        const newExports = allItems.items.map((data, index) => {
            return {
                studentName: data.student.studentName,
                studentContacts: data.student.phoneNumber,
                topic: data.topic,
                status: data.activeStatus,
            }
        })
        console.log('newExports', newExports)
        setExportData(newExports)
    }, [allItems])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'project'
        )

        setProjectTagData(allInfoData)
    }, [allTagData])

    /** function to handle search filters */
    const handleFilters = () => {
        const searchResults = allDisplayItems.filter((data1, index) => {
            /** student name */
            if (filterInfo[0].title === 'Student Name') {
                if (filterInfo[0].queryfunction === 'is') {
                    let name = data1.student.studentName.toLowerCase()
                    console.log('name', name)
                    let check = filterInfo[0].searchfor.some((details) =>
                        name.includes(details)
                    )

                    // let check = filterInfo[0].searchfor.some(({ details }) => {
                    //     console.log('details', details)
                    //     if (name.includes(details)) {
                    //         return true
                    //     }
                    // })
                    console.log('check', check)

                    return check
                }
            }
            /** contacts */
            if (filterInfo[0].title === 'Student Contacts') {
                if (filterInfo[0].queryfunction === 'is') {
                    let phone = data1.student.phoneNumber.toLowerCase()
                    let email = data1.student.email.toLowerCase()
                    let checkphone = filterInfo[0].searchfor.some((details) =>
                        phone.includes(details)
                    )

                    let checkemail = filterInfo[0].searchfor.some((details) =>
                        email.includes(details)
                    )

                    if (checkphone || checkemail) {
                        return true
                    }
                }
            }
            /** topic */
            if (filterInfo[0].title === 'topic') {
                if (filterInfo[0].queryfunction === 'is') {
                    let topic = data1.topic.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        topic.includes(details)
                    )

                    return check
                }
            }
            /** status */
            if (filterInfo[0].title === 'status') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status = data1.activeStatus.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        status.includes(details)
                    )

                    return check
                }
            }
            /** registration */
            if (filterInfo[0].title === 'Registration') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status = data1.activeStatus.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        status.includes(details)
                    )

                    return check
                }
            }
            /** resubmission */
            if (filterInfo[0].title === 'Resubmission') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status = data1.activeStatus.toLowerCase()

                    let check = filterInfo[0].searchfor.some(({ details }) =>
                        status.includes(details)
                    )

                    return check
                }
            }

            return null
        })

        /** set the records */
        //items collected
        const allItemsCollected = searchResults
        //total all items
        const totalItems = searchResults.length
        let itemsPerPage = perPage
        const currentPage = 1
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        const currentItems = allItemsCollected.slice(
            indexOfFirstItem,
            indexOfLastItem
        )

        const pageLength = Math.ceil(totalItems / itemsPerPage)

        setSearchData({
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            items: currentItems,
            allSearchItems: searchResults,
            totalItemsDisplayed: currentItems.length,
            totalSearchedItems: totalItems,
            totalPages: pageLength,
        })
    }

    useEffect(() => {
        if (filterInfo.length > 0) {
            handleFilters()
        }
    }, [filterInfo])

    console.log(allDisplayItems, 'allDisplayItems')

    /** function to handle next on pagination */
    const handleNext = () => {}
    /** function to handle prev on pagination */
    const handlePrev = () => {}

    let PaginationFirstNumber =
        searchData.currentPage * searchData.itemsPerPage -
        searchData.itemsPerPage +
        1
    let PaginationLastNumber =
        PaginationFirstNumber + searchData.totalItemsDisplayed - 1

    return (
        <Container>
            {/** table */}
            <CSVLink data={exportData} headers={headers}>
                <Button>Export</Button>
            </CSVLink>

            <Box minH='48vh'>
                <Table size='sm'>
                    <Thead>
                        {tableLists.length > 0 && (
                            <Tr>
                                {tableLists.map((data, index) => {
                                    return <Th key={index}>{data.mtitle}</Th>
                                })}
                            </Tr>
                        )}
                    </Thead>
                    {searchActive ? (
                        <Tbody>
                            {searchData.items.length > 0 ? (
                                <>
                                    {searchData.items.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet

                                        if (
                                            data.projectStatus &&
                                            data.projectStatus.length > 0 &&
                                            projectTagData.length > 0
                                        ) {
                                            activeStatus =
                                                data.projectStatus.find(
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
                                        return (
                                            <Tr
                                                key={data._id}
                                                className='table_row'>
                                                <Td
                                                    maxW='250px'
                                                    className='studentName'>
                                                    {data.student.studentName}{' '}
                                                </Td>
                                                <Td maxW='250px'>
                                                    <ContactLists direction='column'>
                                                        <Stack direction='row'>
                                                            <Box>phone:</Box>
                                                            <Box>
                                                                {
                                                                    data.student
                                                                        .phoneNumber
                                                                }
                                                            </Box>
                                                        </Stack>
                                                        <Stack direction='row'>
                                                            <Box>email:</Box>
                                                            <Box>
                                                                {
                                                                    data.student
                                                                        .email
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </ContactLists>
                                                </Td>
                                                <Td
                                                    maxW='250px'
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#15151D',
                                                    }}>
                                                    {' '}
                                                    {data.topic}
                                                </Td>
                                                <Td>
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
                                                        minW='90px'
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
                                                <Td maxW='250px'> </Td>
                                                <Td maxW='250px'></Td>
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
                                        <NoItems>
                                            No Search Records Found
                                        </NoItems>
                                    </Box>
                                </Tr>
                            )}
                        </Tbody>
                    ) : (
                        <Tbody>
                            {allDisplayItems.length > 0 ? (
                                <>
                                    {allDisplayItems.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet

                                        if (
                                            data.projectStatus &&
                                            data.projectStatus.length > 0 &&
                                            projectTagData.length > 0
                                        ) {
                                            activeStatus =
                                                data.projectStatus.find(
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
                                        return (
                                            <Tr
                                                key={data._id}
                                                className='table_row'>
                                                <Td
                                                    maxW='250px'
                                                    className='studentName'>
                                                    {data.student.studentName}{' '}
                                                </Td>
                                                <Td maxW='250px'>
                                                    <ContactLists direction='column'>
                                                        <Stack direction='row'>
                                                            <Box>phone:</Box>
                                                            <Box>
                                                                {
                                                                    data.student
                                                                        .phoneNumber
                                                                }
                                                            </Box>
                                                        </Stack>
                                                        <Stack direction='row'>
                                                            <Box>email:</Box>
                                                            <Box>
                                                                {
                                                                    data.student
                                                                        .email
                                                                }
                                                            </Box>
                                                        </Stack>
                                                    </ContactLists>
                                                </Td>
                                                <Td
                                                    maxW='250px'
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#15151D',
                                                    }}>
                                                    {' '}
                                                    {data.topic}
                                                </Td>
                                                <Td>
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
                                                        minW='90px'
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
                                                <Td maxW='250px'> </Td>
                                                <Td maxW='250px'></Td>
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
                    )}
                </Table>
            </Box>
            {/** pagination */}
            {searchActive ? (
                <AdvPagination2
                    paginationFirstNumber={PaginationFirstNumber}
                    paginationLastNumber={PaginationLastNumber}
                    overalltotal={searchData.totalSearchedItems}
                    perPages={perPage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            ) : (
                <AdvPagination
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            )}
        </Container>
    )
}

export default AdvStudentTable

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
        color: #15151d;
        letter-spacing: 0.02em;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
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
        font-family: 'Inter', sans-serif;
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

const ContactLists = styled(Stack)``
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
        font-family: 'Inter';
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
