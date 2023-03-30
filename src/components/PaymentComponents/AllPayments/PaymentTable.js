/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Stack,
    Box,
    Tabs,
    TabList,
    Tab,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
//import { BiDownload } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'
import Moments from 'moment-timezone'

import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbDotsVertical } from 'react-icons/tb'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PaymentTable = ({
    searchActive,
    filterInfo,
    exportData,
    setExportData,
}) => {
    // eslint-disable-next-line no-unused-vars
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

    const [filterTabData, setfilterTabData] = React.useState([
        {
            title: 'All',
            dataCount: 0,
        },
    ])

    const TableHead = [
        {
            title: 'Request NO.',
        },
        {
            title: 'Examiner Name',
        },
        {
            title: 'Examiner Type',
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

    let { allPaymentItems } = useSelector((state) => state.payment)

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
        let allQueriedItems = allPaymentItems.items.filter((datas) => {
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
    }, [allPaymentItems.items])

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

    /** function to handle search filters */
    const handleFilters = () => {
        const searchResults = allDisplayData.allItems.filter((data1, index) => {
            /** student name */
            if (filterInfo[0].title === 'Examiner Name') {
                let name1 = data1.examiner
                    ? `${
                          data1.examiner.jobtitle.toLowerCase() +
                          ' ' +
                          data1.examiner.name.toLowerCase()
                      }`
                    : `${
                          data1.opponent.jobtitle.toLowerCase() +
                          ' ' +
                          data1.opponent.name.toLowerCase()
                      }`
                let name2 = data1.examiner
                    ? `${data1.examiner.name.toLowerCase()}`
                    : `${data1.opponent.name.toLowerCase()}`
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name1.includes(details)
                )

                let check2 = filterInfo[0].searchfor.some((details) =>
                    name2.includes(details)
                )

                if (check || check2) {
                    return true
                }
            }

            if (filterInfo[0].title === 'Examiner Type') {
                let name = data1.examiner ? 'examiner' : 'opponent'

                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                return check
            }

            /** topic */
            if (filterInfo[0].title === 'Request No') {
                let topic = data1.payCode.toLowerCase()

                let check = filterInfo[0].searchfor.some((details) =>
                    topic.includes(details)
                )

                return check
            }
            /** status */
            if (filterInfo[0].title === 'Status') {
                let status = data1.payStatus.toLowerCase()

                let check = filterInfo[0].searchfor.some((details) =>
                    status.includes(details)
                )

                return check
            }

            /** resubmission */
            if (filterInfo[0].title === 'Student Name') {
                let status = data1.student.studentName.toLowerCase()

                let check = filterInfo[0].searchfor.some((details) =>
                    status.includes(details)
                )

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
                            /** student name */
                            if (
                                newFilterArray[iteration].title ===
                                'Examiner Name'
                            ) {
                                let name1 = data1.examiner
                                    ? `${
                                          data1.examiner.jobtitle.toLowerCase() +
                                          ' ' +
                                          data1.examiner.name.toLowerCase()
                                      }`
                                    : `${
                                          data1.opponent.jobtitle.toLowerCase() +
                                          ' ' +
                                          data1.opponent.name.toLowerCase()
                                      }`
                                let name2 = data1.examiner
                                    ? `${data1.examiner.name.toLowerCase()}`
                                    : `${data1.opponent.name.toLowerCase()}`

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name1.includes(details)
                                )

                                let check2 = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name2.includes(details)
                                )

                                if (check || check2) {
                                    return true
                                }
                            }

                            /** student SRN */
                            if (
                                newFilterArray[iteration].title ===
                                'Examiner Type'
                            ) {
                                let name = data1.examiner
                                    ? 'examiner'
                                    : 'opponent'

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )

                                return check
                            }
                            /** topic */
                            if (
                                newFilterArray[iteration].title === 'Request No'
                            ) {
                                let topic = data1.payCode.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    topic.includes(details)
                                )

                                return check
                            }
                            /** status */
                            if (newFilterArray[iteration].title === 'Status') {
                                let status = data1.payStatus.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    status.includes(details)
                                )

                                return check
                            }

                            /** resubmission */
                            if (
                                newFilterArray[iteration].title ===
                                'Student Name'
                            ) {
                                let status =
                                    data1.student.studentName.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    status.includes(details)
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
  

    return (
        <Container>
            {/** tab data */}
            <Box>
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

                    <SearchActivity
                        pb={'6px'}
                        direction='row'
                        alignItems='center'>
                        <Box
                            className='sactivity_indicator'
                            bg={searchActive ? 'green' : 'red'}
                        />
                        <Box className='sactivity_text'>Search</Box>
                        <TableButton>
                            {/**
                    
                    <Button
                                onClick={handleExportation}
                                leftIcon={<BiDownload />}
                                disabled={exportData.length > 0 ? false : true}
                                className='btn__print'>
                                Export
                            </Button>
                    */}
                        </TableButton>
                    </SearchActivity>
                </Stack>

                {/** Examiner Panel */}
                <Stack>
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
                                                    let creationDate =
                                                        new Moments(
                                                            data.createdAt
                                                        )
                                                            .tz(
                                                                'Africa/Kampala'
                                                            )
                                                            .format(
                                                                'ddd DD MMM yy H:m A'
                                                            )

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
                                                    return (
                                                        <Tr
                                                            className='table_row'
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
                                                                {data.examiner
                                                                    ? data
                                                                          .examiner
                                                                          .jobtitle
                                                                    : data
                                                                          .opponent
                                                                          .jobtitle}
                                                                {data.examiner
                                                                    ? data
                                                                          .examiner
                                                                          .name
                                                                    : data
                                                                          .opponent
                                                                          .name}
                                                            </Td>

                                                            <Td
                                                                style={{
                                                                    color: '#5E5C60',
                                                                    fontWeight: 500,
                                                                }}>
                                                                {data.examiner
                                                                    ? 'EXAMINER'
                                                                    : 'OPPONENT'}
                                                            </Td>
                                                            <Td
                                                                maxW='250px'
                                                                style={{
                                                                    fontWeight: 500,
                                                                    color: '#15151D',
                                                                }}>
                                                                {
                                                                    data.project
                                                                        .topic
                                                                }
                                                            </Td>
                                                            <Td
                                                                className='studentName'
                                                                style={{
                                                                    color: '#15151D',
                                                                    fontWeight: 500,
                                                                    fontSize:
                                                                        '13px',
                                                                }}>
                                                                {
                                                                    data.student
                                                                        .studentName
                                                                }
                                                            </Td>

                                                            <Td>
                                                                {' '}
                                                                <StatusItem
                                                                    width='90px'
                                                                    className={
                                                                        data.payStatus ===
                                                                        'pending'
                                                                            ? 'reviews'
                                                                            : 'completed'
                                                                    }
                                                                    direction='row'
                                                                    alignItems='center'>
                                                                    <div />
                                                                    <Text>
                                                                        {' '}
                                                                        {
                                                                            data.payStatus
                                                                        }
                                                                    </Text>
                                                                </StatusItem>
                                                            </Td>

                                                            <Td>
                                                                <Box className='semester'>
                                                                    {
                                                                        creationDate
                                                                    }{' '}
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
                                                                                    `/payments/view/${data._id}`
                                                                                )
                                                                            }>
                                                                            View
                                                                            Payment
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
                                                    let creationDate =
                                                        new Moments(
                                                            data.createdAt
                                                        )
                                                            .tz(
                                                                'Africa/Kampala'
                                                            )
                                                            .format(
                                                                'ddd DD MMM yy  H:m A'
                                                            )

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
                                                    return (
                                                        <Tr
                                                            className='table_row'
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
                                                                {data.examiner
                                                                    ? data
                                                                          .examiner
                                                                          .jobtitle
                                                                    : data
                                                                          .opponent
                                                                          .jobtitle}
                                                                {data.examiner
                                                                    ? data
                                                                          .examiner
                                                                          .name
                                                                    : data
                                                                          .opponent
                                                                          .name}
                                                            </Td>

                                                            <Td
                                                                style={{
                                                                    color: '#5E5C60',
                                                                    fontWeight: 500,
                                                                }}>
                                                                {data.examiner
                                                                    ? 'EXAMINER'
                                                                    : 'OPPONENT'}
                                                            </Td>
                                                            <Td
                                                                maxW='250px'
                                                                style={{
                                                                    fontWeight: 500,
                                                                    color: '#15151D',
                                                                }}>
                                                                {
                                                                    data.project
                                                                        .topic
                                                                }
                                                            </Td>
                                                            <Td
                                                                className='studentName'
                                                                style={{
                                                                    color: '#15151D',
                                                                    fontWeight: 500,
                                                                    fontSize:
                                                                        '13px',
                                                                }}>
                                                                {
                                                                    data.student
                                                                        .studentName
                                                                }
                                                            </Td>

                                                            <Td>
                                                                {' '}
                                                                <StatusItem
                                                                    width='90px'
                                                                    className={
                                                                        data.payStatus ===
                                                                        'pending'
                                                                            ? 'reviews'
                                                                            : 'completed'
                                                                    }
                                                                    direction='row'
                                                                    alignItems='center'>
                                                                    <div />
                                                                    <Text>
                                                                        {' '}
                                                                        {
                                                                            data.payStatus
                                                                        }
                                                                    </Text>
                                                                </StatusItem>
                                                            </Td>

                                                            <Td>
                                                                <Box className='semester'>
                                                                    {
                                                                        creationDate
                                                                    }{' '}
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
                                                                                    `/payments/view/${data._id}`
                                                                                )
                                                                            }>
                                                                            View
                                                                            Payment
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
        </Container>
    )
}

export default PaymentTable

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
        line-height: 20px;
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
