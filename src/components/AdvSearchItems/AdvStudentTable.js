/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Moments from 'moment-timezone'
import { BiDownload } from 'react-icons/bi'
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
    Button,
    Checkbox,
} from '@chakra-ui/react'
import { AiOutlineMinus } from 'react-icons/ai'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

import { useSelector } from 'react-redux'

const AdvStudentTable = ({
    tableLists,
    tableData = [],
    allItems,
    searchActive,
    allTagData,
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
    const [allDisplayData, setAllDisplayData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allItems: [],
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })
    const [projectTagData, setProjectTagData] = React.useState([])
    // eslint-disable-next-line no-unused-vars
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

    let { allprojects } = useSelector((state) => state.project)

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
        let allQueriedItems = allprojects.items.filter((datas) => {
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
    }, [allprojects.items])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'project'
        )

        setProjectTagData(allInfoData)
    }, [allTagData])

    /** function to handle search filters */
    const handleFilters = () => {
        const searchResults = allDisplayData.items.filter((data1, index) => {
            /** student name */
            if (filterInfo[0].title === 'Student Name') {
                if (filterInfo[0].queryfunction === 'is') {
                    let name = data1.student.studentName.toLowerCase()
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
            }
            /** contacts */
            if (filterInfo[0].title === 'SRN') {
                if (filterInfo[0].queryfunction === 'is') {
                    let email = data1.student.registrationNumber.toLowerCase()

                    let checkemail = filterInfo[0].searchfor.some((details) =>
                        email.includes(details)
                    )

                    if (checkemail) {
                        return true
                    }
                }
            }

            if (filterInfo[0].title === 'PhoneNumber') {
                if (filterInfo[0].queryfunction === 'is') {
                    let phone = data1.student.phoneNumber.toLowerCase()

                    let checkphone = filterInfo[0].searchfor.some((details) =>
                        phone.includes(details)
                    )

                    if (checkphone) {
                        return true
                    }
                }
            }
            /** topic */
            if (filterInfo[0].title === 'Topic') {
                if (filterInfo[0].queryfunction === 'is') {
                    let topic = data1.topic.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        topic.includes(details)
                    )

                    return check
                }
            }
            /** status */
            if (filterInfo[0].title === 'Status') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status = data1.activeStatus.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        status.includes(details)
                    )

                    return check
                }
            }

            if (filterInfo[0].title === 'Registration') {
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
                                'Student Name'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let name =
                                        data1.student.studentName.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        name.includes(details)
                                    )

                                    // console.log('check', check)

                                    return check
                                }
                            }
                            /** contacts */
                            if (
                                newFilterArray[iteration].title ===
                                'Student Contacts'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let phone =
                                        data1.student.phoneNumber.toLowerCase()
                                    let email =
                                        data1.student.email.toLowerCase()
                                    let checkphone = filterInfo[
                                        iteration
                                    ].searchfor.some((details) =>
                                        phone.includes(details)
                                    )

                                    let checkemail = filterInfo[
                                        iteration
                                    ].searchfor.some((details) =>
                                        email.includes(details)
                                    )

                                    if (checkphone || checkemail) {
                                        return true
                                    }
                                }
                            }
                            /** topic */
                            if (newFilterArray[iteration].title === 'topic') {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let topic = data1.topic.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        topic.includes(details)
                                    )

                                    return check
                                }
                            }
                            /** status */
                            if (newFilterArray[iteration].title === 'status') {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let status =
                                        data1.activeStatus.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        status.includes(details)
                                    )

                                    return check
                                }
                            }
                            /** registration */
                            if (
                                newFilterArray[iteration].title ===
                                'Registration'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let status =
                                        data1.activeStatus.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        status.includes(details)
                                    )

                                    return check
                                }
                            }
                            /** resubmission */
                            if (
                                newFilterArray[iteration].title ===
                                'Resubmission'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let status =
                                        data1.activeStatus.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some(({ details }) =>
                                        status.includes(details)
                                    )

                                    return check
                                }
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

    /** function to handle next on pagination */
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
    /** function to handle prev on pagination */
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

    /** initial pagination */
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

    /** function to handle checkbox on each item */
    /** function to handle checkbox on each item */
    const handleIndivCheckbox = (e, data) => {
        // console.log('checking0', e.target.checked, data)
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

                    //    console.log('generalss', newDataToSave)

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allItems.length > 0) {
                    let newDataToSave = allDisplayData.allItems.map((data) => {
                        //  console.log('allDisplayData', data.activeStatus)
                        return data
                    })

                    //  console.log('generalstts', newDataToSave)
                    setExportData(newDataToSave)
                }
            }
        } else {
            setExportData([])
        }
    }

    /** function to handle data exportation */
    const handleExportation = async () => {
        if (exportData.length > 0) {
            let values = {
                tableName: 'Students Table',
                data: exportData,
            }
            await window.electronAPI.exportStudentCSV(values)
        }
    }

    return (
        <Container>
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

            {/** table */}
            <Box minH='48vh'>
                <Table size='sm'>
                    <Thead>
                        {tableLists.length > 0 && (
                            <Tr>
                                <Th w='46px'>
                                    <Checkbox
                                        isChecked={
                                            exportData.length > 0 ? true : false
                                        }
                                        onChange={handleGeneralCheckbox}
                                        bg='#ffffff'
                                        icon={<AiOutlineMinus />}
                                        colorScheme='pink'
                                    />
                                </Th>
                                {tableLists.map((data, index) => {
                                    return (
                                        <Th className='table_head' key={index}>
                                            {data.mtitle}
                                        </Th>
                                    )
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
                                        let includedInExport

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
                                            }
                                        } else {
                                        }

                                        if (exportData.length > 0) {
                                            let checkData = exportData.some(
                                                (datacheck, index) =>
                                                    data._id === datacheck._id
                                            )

                                            includedInExport = checkData
                                        } else {
                                            includedInExport = false
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
                                        return (
                                            <Tr
                                                className={`table_row ${
                                                    includedInExport
                                                        ? 'row_selected'
                                                        : ''
                                                }`}
                                                key={data._id}>
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
                                                    {data.student.phoneNumber}
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
                                                    {
                                                        data.student
                                                            .graduate_program_type
                                                    }
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
                                                        className='subtype'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        {data.submissionStatus}
                                                    </Box>
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
                                        <NoItems>
                                            No Search Records Found
                                        </NoItems>
                                    </Box>
                                </Tr>
                            )}
                        </Tbody>
                    ) : (
                        <Tbody>
                            {allDisplayData.items.length > 0 ? (
                                <>
                                    {allDisplayData.items.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet
                                        let includedInExport

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
                                            }
                                        } else {
                                        }

                                        if (exportData.length > 0) {
                                            let checkData = exportData.some(
                                                (datacheck, index) =>
                                                    data._id === datacheck._id
                                            )

                                            includedInExport = checkData
                                        } else {
                                            includedInExport = false
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
                                        return (
                                            <Tr
                                                className={`table_row ${
                                                    includedInExport
                                                        ? 'row_selected'
                                                        : ''
                                                }`}
                                                key={data._id}>
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
                                                    {data.student.phoneNumber}
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
                                                    {data.student.graduate_program_type.toUpperCase()}
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
                                                        className='subtype'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        {data.submissionStatus}
                                                    </Box>
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
                    )}
                </Table>
            </Box>
            {/** pagination */}
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
                                    <span>{searchData.itemsPerPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box className='left' onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>
                                        {' '}
                                        {searchData.currentPage}/
                                        {searchData.totalPages}
                                    </Box>
                                    <Box className='right' onClick={handleNext}>
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
                                    <span>{allDisplayData.itemsPerPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box className='left' onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>
                                        {' '}
                                        {allDisplayData.currentPage}/
                                        {allDisplayData.totalPages}
                                    </Box>
                                    <Box className='right' onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Box>
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
    .row_selected {
        background: #fef9ef !important;
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
