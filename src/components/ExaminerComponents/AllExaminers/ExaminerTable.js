import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Checkbox,
    Flex,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useToast,
    Button,
} from '@chakra-ui/react'
import { BiDownload } from 'react-icons/bi'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import {
    IoIosArrowDropright,
    IoIosArrowDropdown,
    IoIosStats,
} from 'react-icons/io'
import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { RiPencilFill } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg'
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdVerified,
} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
const TableHead = [
    {
        title: '#',
        filter: true,
    },
    {
        title: 'Type',
        filter: true,
    },
    {
        title: 'Examiner Name',
    },
    {
        title: 'Email',
    },
    {
        title: 'Phone Number',
    },
    {
        title: 'Verified',
        maxW: '100px',
    },
    {
        title: 'Students',
        maxW: '100px',
    },
]

const ExaminerTable = ({
    paginatedExaminers,
    setSelectedExaminers,
    selectedExaminers,
    searchActive,
    filterInfo,
    exportData,
    setExportData,
}) => {
    const [filterTabData, setfilterTabData] = React.useState([
        {
            title: 'All',
            dataCount: 0,
        },
    ])
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

    const [searchData, setSearchData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allSearchItems: [],
        totalItemsDisplayed: 0,
        totalSearchedItems: 0,
        totalPages: 0,
    })

    const [pexaminers, setPExaminers] = React.useState({
        currentPage: 0,
        perPage: 8,
        current_total: 0,
        overall_total: 0,
        items: [],
        allItems: [],
    })
    const [examinerLists, setExaminerLists] = React.useState([])

    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { allExaminerItems, message, isSuccess, isError } = useSelector(
        (state) => state.examiner
    )

    /** changes all document tabs */
    useEffect(() => {
        if (searchActive) {
            setfilterTabData([
                {
                    title: 'All',
                    dataCount: searchData.totalSearchedItems,
                },
            ])
        } else {
            setfilterTabData([
                {
                    title: 'All',
                    dataCount: allDisplayData.totalAllItems,
                },
            ])
        }
    }, [
        searchActive,
        allDisplayData.totalAllItems,
        searchData.totalSearchedItems,
    ])

    useEffect(() => {
        let allQueriedItems = allExaminerItems.items.filter((datas) => {
            return datas
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
            allItems: allQueriedItems,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: totalItems,
            totalPages: pageLength,
        })
    }, [allExaminerItems])

    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

    /** searched Pagination */
    let PaginationSFirstNumber =
        searchData.currentPage * searchData.itemsPerPage -
        searchData.itemsPerPage +
        1
    let PaginationSLastNumber =
        PaginationSFirstNumber + searchData.totalItemsDisplayed - 1

    /** function to handle general checkbox */
    const handleGeneralCheckbox = (e) => {
        if (e.target.checked) {
            if (searchActive) {
                if (searchData.allSearchItems.length > 0) {
                    let newDataToSave = searchData.allSearchItems.map(
                        (data) => {
                            return data
                        }
                    )

                    console.log('generalss', newDataToSave)

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allItems.length > 0) {
                    let newDataToSave = allDisplayData.allItems.map((data) => {
                        console.log('allDisplayData', data.activeStatus)
                        return data
                    })

                    console.log('generalstts', newDataToSave)
                    setExportData(newDataToSave)
                }
            }
        } else {
            setExportData([])
        }
    }

    /** function to handle checkbox on each item */
    const handleIndivCheckbox = (e, data) => {
        console.log('checking0', e.target.checked, data)
        if (exportData.length > 0) {
            let checkData = exportData.some(
                (datacheck, index) => data._id === datacheck._id
            )

            if (checkData) {
                let newChecksData = [...exportData]
                for (
                    let iteration = 0;
                    iteration < newChecksData.length;
                    iteration++
                ) {
                    if (newChecksData[iteration]._id === data._id) {
                        newChecksData.splice(iteration, 1)
                        setExportData([...newChecksData])

                        return
                    }
                }
            } else {
                setExportData([...exportData, data])
            }
        } else {
            setExportData([data])
        }
    }

    const handlePrev = () => {
        if (searchActive) {
            if (searchData.currentPage - 1 >= 1) {
                let page = searchData.currentPage - 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allSearchItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData(() => ({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                }))
            }
        } else {
            if (allDisplayData.currentPage - 1 >= 1) {
                let page = allDisplayData.currentPage - 1
                const indexOfLastItem = page * allDisplayData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allDisplayData.itemsPerPage

                const currentItems = allDisplayData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setAllDisplayData({
                    ...allDisplayData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        }
    }

    const handleNext = () => {
        if (searchActive) {
            if (searchData.currentPage + 1 <= searchData.totalPages) {
                let page = searchData.currentPage + 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allSearchItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        } else {
            if (allDisplayData.currentPage + 1 <= allDisplayData.totalPages) {
                let page = allDisplayData.currentPage + 1
                const indexOfLastItem = page * allDisplayData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allDisplayData.itemsPerPage

                const currentItems = allDisplayData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setAllDisplayData(() => ({
                    ...allDisplayData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                }))
            }
        }
    }

    /** function to handle data exportation */
    const handleExportation = async () => {
        if (exportData.length > 0) {
            let values = {
                tableName: 'Examiners',
                data: exportData,
            }
            await window.electronAPI.exportStudentCSV(values)
        }
    }

    return (
        <Container>
            <Box className='form_container'>
                {/** tab data */}
                <Stack
                    direction='row'
                    alignItems={'flex-end'}
                    justifyContent={'space-between'}>
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

                    <SearchActivity direction='row' alignItems='center'>
                        <Box
                            className='sactivity_indicator'
                            bg={searchActive ? 'green' : 'red'}
                        />
                        <Box className='sactivity_text'>Search</Box>
                        <TableButton>
                            <Button
                                onClick={handleExportation}
                                leftIcon={<BiDownload />}
                                disabled={exportData.length > 0 ? false : true}
                                className='btn__print'>
                                Export
                            </Button>
                        </TableButton>
                    </SearchActivity>
                </Stack>
                {/** details */}
                <Stack
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='20px'
                    h='100%'>
                    {/** table */}
                    <Box minH='48vh'>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th w='46px'>
                                        <Checkbox
                                            isChecked={
                                                exportData.length > 0
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleGeneralCheckbox}
                                            bg='#ffffff'
                                            icon={<AiOutlineMinus />}
                                            colorScheme='pink'
                                        />
                                    </Th>
                                    {TableHead.map((data, index) => {
                                        return (
                                            <Th
                                                width={data.maxW ? '100px' : ''}
                                                key={index}
                                                className='table_head'>
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
                                {allExaminerItems.items.length > 0 ? (
                                    <>
                                        {allExaminerItems.items.map(
                                            (data, index) => {
                                                 let includedInExport
                                                 if (exportData.length > 0) {
                                                     let checkData =
                                                         exportData.some(
                                                             (
                                                                 datacheck,
                                                                 index
                                                             ) =>
                                                                 data._id ===
                                                                 datacheck._id
                                                         )

                                                     includedInExport =
                                                         checkData
                                                 } else {
                                                     includedInExport = false
                                                 }
                                                let selectionColor =
                                                    includedInExport
                                                        ? '#fef9ef'
                                                        : ''
                                                let checkedStatus =
                                                    includedInExport
                                                        ? true
                                                        : false

                                                return (
                                                    <Tr
                                                        className={`table_row ${
                                                            includedInExport
                                                                ? 'row_selected'
                                                                : ''
                                                        }`}
                                                       
                                                        bg={selectionColor}
                                                        key={index}>
                                                        <Td w='46px'>
                                                            <Checkbox
                                                                isChecked={
                                                                    includedInExport
                                                                }
                                                                onChange={(e) =>
                                                                    handleIndivCheckbox(
                                                                        e,
                                                                        data
                                                                    )
                                                                }
                                                                colorScheme='pink'
                                                            />
                                                        </Td>
                                                        <Td>1</Td>
                                                        <Td>
                                                            <Box className='type_examiner'>
                                                                {
                                                                    data.typeOfExaminer
                                                                }
                                                            </Box>
                                                        </Td>
                                                        <Td>
                                                            {data.jobtitle}{' '}
                                                            {data.name}
                                                        </Td>
                                                        <Td>{data.email}</Td>
                                                        <Td>
                                                            {data.phoneNumber}
                                                        </Td>
                                                        <Td width='100px'>
                                                            <Box
                                                                style={{
                                                                    color:
                                                                        data
                                                                            .generalAppointmentLetters
                                                                            .length >
                                                                        0
                                                                            ? '#293AD1'
                                                                            : '#D4D4D6',
                                                                    fontSize:
                                                                        '15px',
                                                                    width: '100%',
                                                                    display:
                                                                        'flex',
                                                                    justifyContent:
                                                                        'center',
                                                                }}>
                                                                <MdVerified />
                                                            </Box>
                                                        </Td>

                                                        <Td m='auto'>
                                                            <Box
                                                                w='100%'
                                                                display='flex'
                                                                justifyContent={
                                                                    'center'
                                                                }>
                                                                <Box className='examiner_item'>
                                                                    {
                                                                        data.studentsNo
                                                                    }
                                                                </Box>
                                                            </Box>
                                                        </Td>

                                                        <Td>
                                                            <Menu>
                                                                <MenuButton>
                                                                    <Box fontSize='20px'>
                                                                        <TbDotsVertical />
                                                                    </Box>
                                                                </MenuButton>
                                                                <MenuList
                                                                    zIndex={
                                                                        '10'
                                                                    }>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            routeNavigate(
                                                                                `/examiners/edit/${data._id}`
                                                                            )
                                                                        }>
                                                                        Edit
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            routeNavigate(
                                                                                `/examiners/view/${data._id}`
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
                                                )
                                            }
                                        )}
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
                    {allExaminerItems.items.length > 0 && (
                        <PaginationStack
                            direction='row'
                            height='56px'
                            alignItems='center'
                            justifyContent={'space-between'}>
                            <Box className='pages'>
                                <span>
                                    {`${PaginationFirstNumber}`} -{' '}
                                    {`${PaginationLastNumber}`} of{' '}
                                    {`${pexaminers.overall_total}`}
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
                                    <span>{pexaminers.perPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box className='left' onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>{pexaminers.currentPage}</Box>
                                    <Box className='right' onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Stack>
            </Box>
        </Container>
    )
}

export default ExaminerTable

const Container = styled(Box)`
    font-family: 'Inter';

    .form_container {
        width: 100%;
        min-height: 288px;
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

    .add_examiners {
        width: 24px;
        height: 24px;
        border: 1px dashed #f4797f;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #5e5c60;
        font-size: 15px;
        background: #eeeeef;
    }

    .table_head {
        color: #5e5c60 !important;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        height: 34px;
    }
    thead {
        background: rgba(247, 249, 252, 0.8);
        backdrop-filter: blur(8px);
    }
    .table_row {
        :hover {
            background: #fef9ef;
        }
    }

    td {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #15151d;
        letter-spacing: 0.02em;
    }
    .type_examiner {
        color: #15151d;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }

    .examiner_item {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #3a3a43;
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

const SearchActivity = styled(Stack)`
    .sactivity_indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .sactivity_text {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: normal;
        font-size: 12px;

        letter-spacing: 0.3px;
        color: #838389;
    }
`

const TableButton = styled(Box)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;

    font-size: 14px;
    line-height: 20px;
    .btn_table {
        height: 32px;
        color: #464f60;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
        font-size: 14px;
        line-height: 20px;
    }

    .btn__print {
        height: 28px;
        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        letter-spacing: 0.02em;
        color: #868fa0;
        font-size: 14px;
        line-height: 20px;
    }

    .btn__rule {
        height: 32px;
        background: #20202a;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #33333c;
        border-radius: 6px;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
    }
`

