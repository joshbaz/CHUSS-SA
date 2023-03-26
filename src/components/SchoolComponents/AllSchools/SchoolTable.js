/* eslint-disable react-hooks/exhaustive-deps */
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
    Tabs,
    TabList,
    Tab,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useToast,
} from '@chakra-ui/react'
import { BiDownload } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import {
    deleteSchool,
    reset,
} from '../../../store/features/schools/schoolSlice'
import { useDispatch, useSelector } from 'react-redux'
const TableHead = [
    // {
    //     title: '#',
    //     filter: true,
    // },
    {
        title: 'School Name',
        filter: true,
    },
    {
        title: 'Dean',
    },
    {
        title: 'Designation',
    },
    {
        title: 'Office Number',
    },
    {
        title: 'Mobile Number',
    },
    {
        title: 'Email',
    },
    {
        title: 'Departments',
    },
]

const SchoolTable = ({
    paginatedItems,
    selectedItems,
    setSelectedItems,
    setExportData,
    exportData,
    allItems,
    searchActive,
    filterInfo,
}) => {
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = React.useState(10)

    let { message, isSuccess, isError } = useSelector((state) => state.school)
    let dispatch = useDispatch()
    let toast = useToast()

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

    let routeNavigate = useNavigate()

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
        /** initial items  */
        //items collected
        const allItemsCollected = allItems.items
        //total all items
        const totalItems = allItems.items.length
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
            allItems: allItems.items,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: totalItems,
            totalPages: pageLength,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allItems.items])
    /** pagination */
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

    const handleFilters = () => {
        const searchResults = allDisplayData.allItems.filter((data1, index) => {
            /** school name */
            if (filterInfo[0].title === 'School Name') {
                let name = data1.schoolName.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                // let check = filterInfo[0].searchfor.some(({ details }) => {
                //     console.log('details', details)
                //     if (name.includes(details)) {
                //         return true
                //     }
                // })
                // console.log('check', check)

                return check
            }

            /** school name */
            if (filterInfo[0].title === 'Email') {
                let name = data1.email.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                // let check = filterInfo[0].searchfor.some(({ details }) => {
                //     console.log('details', details)
                //     if (name.includes(details)) {
                //         return true
                //     }
                // })
                // console.log('check', check)

                return check
            }

            /** school name */
            if (filterInfo[0].title === 'Dean') {
                let name = data1.deanName.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                // let check = filterInfo[0].searchfor.some(({ details }) => {
                //     console.log('details', details)
                //     if (name.includes(details)) {
                //         return true
                //     }
                // })
                // console.log('check', check)

                return check
            }

            return null
        })

        /** filters to add to the first */
        if (searchResults.length > 0 && filterInfo.length > 1) {
            let newFilterArray = [...filterInfo]
            newFilterArray.splice(0, 1)
            //console.log('new arrayS', newFilterArray)
            //stopped here

            //make a new copy of the searched Data
            let newSearchedData = [...searchResults]

            //iterate through the queries
            for (
                let iteration = 0;
                iteration < newFilterArray.length;
                iteration++
            ) {
                if (newSearchedData.length > 0) {
                    /** filter the data */
                    const newResults = newSearchedData.filter(
                        (data1, index) => {
                            /** school name */
                            if (
                                newFilterArray[iteration].title ===
                                'School Name'
                            ) {
                                let name = data1.schoolName.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )

                                return check
                            }

                            /** student SRN */
                            if (newFilterArray[iteration].title === 'Dean') {
                                let name = data1.deanName.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )

                                return check
                            }
                            /** topic */
                            if (newFilterArray[iteration].title === 'Email') {
                                let topic = data1.email.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    topic.includes(details)
                                )

                                return check
                            }

                            return null
                        }
                    )

                    /** assign the new results */

                    newSearchedData = [...newResults]
                } else {
                    return
                }
            }
            // perform state update of the results

            //items collected
            const allItemsCollected = newSearchedData
            //total all items
            const totalItems = newSearchedData.length
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
                allSearchItems: newSearchedData,
                totalItemsDisplayed: currentItems.length,
                totalSearchedItems: totalItems,
                totalPages: pageLength,
            })
        } else {
            /** filter info less than 2 and no searched data */
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
    }

    useEffect(() => {
        if (filterInfo.length > 0) {
            handleFilters()
        }
    }, [filterInfo])

    /** function to handle checkbox on each item */
    const handleIndivCheckbox = (e, data) => {
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

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allItems.length > 0) {
                    let newDataToSave = allDisplayData.allItems.map((data) => {
                        return data
                    })

                    setExportData(newDataToSave)
                }
            }
        } else {
            setExportData([])
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
                tableName: 'Schools',
                data: exportData,
            }
            await window.electronAPI.exportSchoolCSV(values)
        }
    }

    /** HANDLE PROJECT DELETION */
    const handleRemove = (ppId, name) => {
        if (ppId && name) {
            let rvalues = {
                name: name,
                schoolId: ppId,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.schoolId) {
            dispatch(deleteSchool(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
            dispatch(reset())
        }
        if (isSuccess && message && isSubmittingp) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setRemoveActive(false)
            setRemoveDetails(null)

            dispatch(reset())
        }

        dispatch(reset())
    }, [isSuccess, message, isSubmittingp, isError])

    return (
        <Container>
            {' '}
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
            <Box className='form_container'>
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

                            {searchActive ? (
                                <Tbody>
                                    {searchData.items.length > 0 ? (
                                        <>
                                            {searchData.items.map(
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
                                                            className='table_row'
                                                            bg={selectionColor}
                                                            key={data._id}>
                                                            <Td w='46px'>
                                                                <Checkbox
                                                                    isChecked={
                                                                        includedInExport
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleIndivCheckbox(
                                                                            e,
                                                                            data
                                                                        )
                                                                    }
                                                                    colorScheme='pink'
                                                                />
                                                            </Td>
                                                            {/** <Td>1</Td> */}

                                                            <Td>
                                                                {
                                                                    data.schoolName
                                                                }{' '}
                                                            </Td>
                                                            <Td>
                                                                {data.deanName}
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    data.deanDesignation
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    data.officeNumber
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {data.mobileNumber
                                                                    ? data.mobileNumber
                                                                    : '-'}
                                                            </Td>
                                                            <Td>
                                                                {data.email}{' '}
                                                                <br />{' '}
                                                                {
                                                                    data.otherEmail
                                                                }
                                                            </Td>
                                                            <Td>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    <Box className='examiner_item'>
                                                                        {
                                                                            data
                                                                                .departments
                                                                                .length
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
                                                                                    `/schools/view/${data._id}`
                                                                                )
                                                                            }>
                                                                            View
                                                                            School
                                                                        </MenuItem>

                                                                        <MenuItem
                                                                            onClick={() =>
                                                                                handleRemove(
                                                                                    data._id,
                                                                                    data.schoolName
                                                                                )
                                                                            }>
                                                                            Delete
                                                                            School
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
                                                <NoItems>
                                                    No Records Found
                                                </NoItems>
                                            </Box>
                                        </Tr>
                                    )}
                                </Tbody>
                            ) : (
                                <Tbody>
                                    {allDisplayData.items.length > 0 ? (
                                        <>
                                            {allDisplayData.items.map(
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
                                                            className='table_row'
                                                            bg={selectionColor}
                                                            key={data._id}>
                                                            <Td w='46px'>
                                                                <Checkbox
                                                                    isChecked={
                                                                        checkedStatus
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleIndivCheckbox(
                                                                            e,
                                                                            data
                                                                        )
                                                                    }
                                                                    colorScheme='pink'
                                                                />
                                                            </Td>
                                                            {/** <Td>1</Td> */}

                                                            <Td>
                                                                {
                                                                    data.schoolName
                                                                }{' '}
                                                            </Td>
                                                            <Td>
                                                                {data.deanName}
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    data.deanDesignation
                                                                }
                                                            </Td>
                                                            <Td>
                                                                {
                                                                    data.officeNumber
                                                                }
                                                            </Td>

                                                            <Td>
                                                                {data.mobileNumber
                                                                    ? data.mobileNumber
                                                                    : '-'}
                                                            </Td>
                                                            <Td>
                                                                {data.email}{' '}
                                                                <br />{' '}
                                                                {
                                                                    data.otherEmail
                                                                }
                                                            </Td>
                                                            <Td>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    <Box className='examiner_item'>
                                                                        {
                                                                            data
                                                                                .departments
                                                                                .length
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
                                                                                    `/schools/view/${data._id}`
                                                                                )
                                                                            }>
                                                                            View
                                                                            School
                                                                        </MenuItem>
                                                                        <MenuItem
                                                                            onClick={() =>
                                                                                handleRemove(
                                                                                    data._id,
                                                                                    data.schoolName
                                                                                )
                                                                            }>
                                                                            Delete
                                                                            School
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
                                                <NoItems>
                                                    No Records Found
                                                </NoItems>
                                            </Box>
                                        </Tr>
                                    )}
                                </Tbody>
                            )}
                        </Table>
                    </Box>

                    {/** Pagination */}

                    {searchActive ? (
                        <Box>
                            {' '}
                            {searchData.items.length > 0 && (
                                <PaginationStack
                                    direction='row'
                                    height='56px'
                                    alignItems='center'
                                    justifyContent={'space-between'}>
                                    <Box className='pages'>
                                        <span>
                                            {`${PaginationSFirstNumber}`} -{' '}
                                            {`${PaginationSLastNumber}`} of{' '}
                                            {`${searchData.totalSearchedItems}`}
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
                                            <span>
                                                {searchData.itemsPerPage}
                                            </span>
                                        </Box>

                                        {/** pagination arrows */}
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            className='arrows'>
                                            <Box
                                                className='left'
                                                onClick={handlePrev}>
                                                <MdKeyboardArrowLeft />
                                            </Box>
                                            <Box>
                                                {' '}
                                                {searchData.currentPage}/
                                                {searchData.totalPages}
                                            </Box>
                                            <Box
                                                className='right'
                                                onClick={handleNext}>
                                                <MdKeyboardArrowRight />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </PaginationStack>
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {' '}
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
                                            {`${allDisplayData.totalAllItems}`}
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
                                            <span>
                                                {allDisplayData.itemsPerPage}
                                            </span>
                                        </Box>

                                        {/** pagination arrows */}
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            className='arrows'>
                                            <Box
                                                className='left'
                                                onClick={handlePrev}>
                                                <MdKeyboardArrowLeft />
                                            </Box>
                                            <Box>
                                                {' '}
                                                {allDisplayData.currentPage}/
                                                {allDisplayData.totalPages}
                                            </Box>
                                            <Box
                                                className='right'
                                                onClick={handleNext}>
                                                <MdKeyboardArrowRight />
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </PaginationStack>
                            )}
                        </Box>
                    )}
                </Stack>
            </Box>
            {/** handle delete registration */}
            <Modal
                w='100vw'
                isOpen={removeActive}
                p='0'
                onClose={() => cancelRemoveUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <PopupForm
                            p='0px'
                            direction='column'
                            spacing='0'
                            justifyContent='space-between'>
                            <Stack direction='column' spacing={'10px'} h='50%'>
                                <Stack
                                    className='pop_title'
                                    direction='row'
                                    w='100%'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box>
                                        <h1>Delete School</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to delete
                                        <span>
                                            <li>
                                                {removeDetails !== null &&
                                                    removeDetails.name}
                                            </li>
                                        </span>
                                        from the system.
                                    </p>
                                </Stack>
                            </Stack>
                            <Stack
                                p='0px 20px'
                                h='65px'
                                bg='#ffffff'
                                direction='row'
                                borderTop='1px solid #E9EDF5'
                                borderRadius='0 0 8px 8px'
                                justifyContent='flex-end'
                                alignItems='center'>
                                <Button
                                    variant='outline'
                                    className='cancel_button'
                                    onClick={() => cancelRemoveUpload()}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onRemoveUpload}
                                    disabled={false}
                                    isLoading={isSubmittingp ? true : false}
                                    className='apply_button'>
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default SchoolTable

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

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    span {
        margin: 0 5px;
    }

    .pop_title {
        height: 45px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: bold;
            font-size: 17px;
            line-height: 21px;
            color: #111827;
        }
    }

    .list_text {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        li {
            list-style: none;
            display: inline-block;
            font-weight: 700;
            color: #20202a;
        }
        li:after {
            content: ', ';
            padding-right: 10px;
        }
        li:last-child:after {
            content: '';
            padding-right: 0px;
        }
    }

    input {
        border-radius: 6px;
        width: 100%;
        font-style: normal;
        font-weight: 500;

        line-height: 20px;
    }
    .cancel_button {
        padding: 6px 12px;
        height: 32px;
        color: #464f60;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
    }
    .apply_button {
        height: 32px;
        padding: 6px 12px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 0.02em;

        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;

        &:hover {
            background: #f4797f;
        }
    }
`
