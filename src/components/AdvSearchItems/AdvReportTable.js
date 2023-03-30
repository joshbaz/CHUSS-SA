/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
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
    Tabs,
    TabList,
    Tab,
    Checkbox,
    Button,
} from '@chakra-ui/react'
import { BiDownload } from 'react-icons/bi'
import { AiOutlineMinus } from 'react-icons/ai'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'


// import AdvPagination from './AdvPagination'
// import AdvPagination2 from './AdvPagination2'
import Moments from 'moment-timezone'

const AdvReportTable = ({
    tableData = [],
    allItems,
    searchActive,
    allTagData,
    filterInfo,
    allProjects,
    exportData,
    setExportData,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [allDisplayItems, setAllDisplayItems] = React.useState([])

   

   
    // eslint-disable-next-line no-unused-vars
    const [tableLists, setTableLists] = React.useState([
        {
            mtitle: 'Student Name',
        },
        {
            mtitle: 'Student Contacts',
        },
        {
            mtitle: 'topic',
        },
        {
            mtitle: 'Report Status',
        },
        {
            mtitle: 'Examiner Name',
        },
        {
            mtitle: 'Creation Date',
        },
        {
            mtitle: 'Submission Date',
        },
        {
            mtitle: 'Report Delay',
        },
    ])
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

    React.useEffect(() => {
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

    //const [exportData, setExportData] = React.useState([])
    React.useEffect(() => {
        //  console.log('items hereeerer', allItems.items, allProjects)
        setAllDisplayItems(allItems.items)

        const filteredData = allItems.items.map((data) => {
            for (
                let iteration = 0;
                iteration < allProjects.length;
                iteration++
            ) {
                if (allProjects[iteration]._id === data.projectId._id) {
                    return {
                        ...data,
                        projectsData: allProjects[iteration],
                    }
                }
            }
        })

        //  console.log('Data achieved', filteredData)

        /** initial items  */
        //items collected
        const allItemsCollected = filteredData
        //total all items
        const totalItems = filteredData.length
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
            allItems: filteredData,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: totalItems,
            totalPages: pageLength,
        })
        /** export trial */
        // const newExports = allItems.items.map((data, index) => {
        //     return {
        //         _id: data._id,
        //         studentName: data.student.studentName,
        //         studentContacts: data.student.phoneNumber,
        //         topic: data.topic,
        //         status: data.activeStatus,
        //     }
        // })
        // // console.log('newExports', newExports)
        // setExportData(newExports)
    }, [allItems.items])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'examinerReport'
        )

        setProjectTagData(allInfoData)
    }, [allTagData])

    /** function to handle search filters */
    const handleFilters = () => {
        const searchResults = allDisplayData.allItems.filter((data1, index) => {
            /** student name */
            if (filterInfo[0].title === 'Student Name') {
                if (filterInfo[0].queryfunction === 'is') {
                    let name =
                        data1.projectsData.student.studentName.toLowerCase()
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
            if (filterInfo[0].title === 'Student Contacts') {
                if (filterInfo[0].queryfunction === 'is') {
                    let phone =
                        data1.projectsData.student.phoneNumber.toLowerCase()
                    let email = data1.projectsData.student.email.toLowerCase()
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
                    let topic = data1.projectsData.topic.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        topic.includes(details)
                    )

                    return check
                }
            }
            /** status */
            if (filterInfo[0].title === 'Report Status') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status = data1.reportStatus.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        status.includes(details)
                    )

                    return check
                }
            }
            /** report delay */
            let currentDate = Moments(new Date())
            let pastDate = Moments(data1.creationDate)
            let diff = data1.creationDate
                ? currentDate.diff(pastDate, 'days')
                : 0
            let reportDelay = data1.submissionDate ? 0 : diff
            if (filterInfo[0].title === 'Report Delay') {
                if (filterInfo[0].queryfunction === 'greater than') {
                    let status = reportDelay

                    let check = filterInfo[0].searchfor.some(
                        (details) => status > details
                    )

                    //    console.log('this greater t', check, diff)
                    return check
                }

                if (filterInfo[0].queryfunction === 'less than') {
                    let status = reportDelay

                    let check = filterInfo[0].searchfor.some(
                        (details) => status < details
                    )

                    return check
                }

                if (filterInfo[0].queryfunction === 'equal to') {
                    let status = reportDelay
                    //  console.log('whT IS THE D', diff)
                    let check = filterInfo[0].searchfor.some(
                        (details) => details === status
                    )

                    return check
                }
            }
            /** email */
            if (filterInfo[0].title === 'Examiner Name') {
                if (filterInfo[0].queryfunction === 'is') {
                    let status1 = `${
                        data1.examiner.jobtitle.toLowerCase() +
                        ' ' +
                        data1.examiner.name.toLowerCase()
                    }`
                    let status2 = data1.examiner.name.toLowerCase()

                    let check = filterInfo[0].searchfor.some((details) =>
                        status1.includes(details)
                    )

                    let check2 = filterInfo[0].searchfor.some((details) =>
                        status2.includes(details)
                    )

                    if (check || check2) {
                        return true
                    }
                }
            }

            /** contacts */
            if (filterInfo[0].title === 'Examiner Contacts') {
                if (filterInfo[0].queryfunction === 'is') {
                    let phone = data1.examiner.phoneNumber.toLowerCase()
                    let email = data1.examiner.email.toLowerCase()
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
                                        data1.projectsData.student.studentName.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        name.includes(details)
                                    )

                                    //   console.log('check', check)

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
                                        data1.projectsData.student.phoneNumber.toLowerCase()
                                    let email =
                                        data1.projectsData.student.email.toLowerCase()
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
                                    let topic =
                                        data1.projectsData.topic.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        topic.includes(details)
                                    )

                                    return check
                                }
                            }
                            /** status */
                            if (
                                newFilterArray[iteration].title ===
                                'Report Status'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let status =
                                        data1.reportStatus.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        status.includes(details)
                                    )

                                    return check
                                }
                            }
                            /** report delay */
                            let currentDate = Moments(new Date())
                            let pastDate = Moments(data1.creationDate)
                            let diff = data1.creationDate
                                ? currentDate.diff(pastDate, 'days')
                                : 0

                            let reportDelay = data1.submissionDate ? 0 : diff
                            if (
                                newFilterArray[iteration].title ===
                                'Report Delay'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'greater than'
                                ) {
                                    let status = reportDelay

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some(
                                        (details) => status > details
                                    )

                                    return check
                                }

                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'less than'
                                ) {
                                    let status = reportDelay

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some(
                                        (details) => status < details
                                    )

                                    return check
                                }

                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'equal to'
                                ) {
                                    let status = reportDelay

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some(
                                        (details) => status === details
                                    )

                                    return check
                                }
                            }

                            /** Examiner Name */
                            if (
                                newFilterArray[iteration].title ===
                                'Examiner Name'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let status1 = `${
                                        data1.examiner.jobtitle.toLowerCase() +
                                        ' ' +
                                        data1.examiner.name.toLowerCase()
                                    }`
                                    let status2 =
                                        data1.examiner.name.toLowerCase()

                                    let check = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        status1.includes(details)
                                    )

                                    let check2 = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        status2.includes(details)
                                    )

                                    if (check || check2) {
                                        return true
                                    }
                                }
                            }
                            /** resubmission */
                            if (
                                newFilterArray[iteration].title ===
                                'Examiner Contacts'
                            ) {
                                if (
                                    newFilterArray[iteration].queryfunction ===
                                    'is'
                                ) {
                                    let phone =
                                        data1.examiner.phoneNumber.toLowerCase()
                                    let email =
                                        data1.examiner.email.toLowerCase()

                                    let checkphone = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        phone.includes(details)
                                    )

                                    let checkemail = newFilterArray[
                                        iteration
                                    ].searchfor.some((details) =>
                                        email.includes(details)
                                    )

                                    if (checkphone || checkemail) {
                                        return true
                                    }
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

                setSearchData({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
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
                setExportData([
                    ...exportData,
                    {
                        ...data,
                    },
                ])
            }
        } else {
            setExportData([
                {
                    ...data,
                },
            ])
        }
    }

    /** function to handle general checkbox */
    const handleGeneralCheckbox = (e) => {
        if (e.target.checked) {
            if (searchActive) {
                if (searchData.allSearchItems.length > 0) {
                    let newDataToSave = searchData.allSearchItems.filter(
                        (data) => {
                            return data
                        }
                    )

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allItems.length > 0) {
                    let newDataToSave = allDisplayData.allItems.filter(
                        (data) => {
                            return data
                        }
                    )

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
                tableName: 'Examiners Report Table',
                data: exportData,
            }
            await window.electronAPI.exportReportsAdvCSV(values)
        }
    }
    return (
        <Container>
            <Stack spacing='0' pb='10px'>
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
                        pb='5px'
                        direction='row'
                        alignItems='center'>
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
                                    {tableLists.map((data, index) => {
                                        return (
                                            <Th
                                                className='table_head'
                                                key={index}>
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
                                                        (element) =>
                                                            element.active
                                                    )
                                                if (activeStatus) {
                                                    // eslint-disable-next-line no-unused-vars
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
                                                        data._id ===
                                                        datacheck._id
                                                )

                                                includedInExport = checkData
                                            } else {
                                                includedInExport = false
                                            }

                                            let currentDate = Moments(
                                                new Date()
                                            )

                                            let pastDate = Moments(
                                                data.creationDate
                                            )

                                            let diff = data.creationDate
                                                ? currentDate.diff(
                                                      pastDate,
                                                      'days'
                                                  )
                                                : 0

                                            let reportDelay =
                                                data.submissionDate ? 0 : diff

                                            let submissionDate =
                                                data.submissionDate
                                                    ? Moments(
                                                          data.submissionDate
                                                      )
                                                          .tz('Africa/Kampala')
                                                          .format('DD MMM Y')
                                                    : '-'

                                            let creationDate = data.creationDate
                                                ? Moments(data.creationDate)
                                                      .tz('Africa/Kampala')
                                                      .format('DD MMM Y')
                                                : '-'
                                            return (
                                                <Tr
                                                    key={data._id}
                                                    className={`table_row ${
                                                        includedInExport
                                                            ? 'row_selected'
                                                            : ''
                                                    }`}>
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
                                                        maxW='250px'
                                                        className='studentName'>
                                                        {data.projectsData
                                                            ? data.projectsData
                                                                  .student
                                                                  .studentName
                                                            : ''}
                                                    </Td>
                                                    <Td maxW='250px'>
                                                        {data.projectsData
                                                            ? data.projectsData
                                                                  .student
                                                                  .phoneNumber
                                                            : ''}
                                                    </Td>
                                                    <Td
                                                        maxW='250px'
                                                        style={{
                                                            fontWeight: 500,
                                                            color: '#15151D',
                                                        }}>
                                                        {' '}
                                                        {data.projectsData
                                                            ? data.projectsData
                                                                  .topic
                                                            : ''}
                                                    </Td>
                                                    <Td>
                                                        <StatusItem
                                                            className={data.reportStatus.toLowerCase()}
                                                            minW='90px'
                                                            direction='row'
                                                            alignItems='center'>
                                                            <div />
                                                            <Text>
                                                                {' '}
                                                                {
                                                                    data.reportStatus
                                                                }
                                                            </Text>
                                                        </StatusItem>
                                                    </Td>
                                                    <Td maxW='250px'>
                                                        {' '}
                                                        {
                                                            data.examiner
                                                                .jobtitle
                                                        }{' '}
                                                        {data.examiner.name}
                                                    </Td>
                                                    {/**<Td maxW='250px'>
                                                        {data.examiner.email}
                                                    </Td>**/}

                                                    <Td>
                                                        <Box className='sub_date'>
                                                            {creationDate}
                                                        </Box>
                                                    </Td>

                                                    <Td>
                                                        <Box className='sub_date'>
                                                            {submissionDate}
                                                        </Box>
                                                    </Td>

                                                    <Td maxW='250px'>
                                                        <Stack
                                                            w='100%'
                                                            alignItems='center'
                                                            justifyContent={
                                                                'center'
                                                            }>
                                                            <Box className='files'>
                                                                {reportDelay}
                                                            </Box>
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
                        ) : (
                            <Tbody>
                                {allDisplayData.items.length > 0 ? (
                                    <>
                                        {allDisplayData.items.map(
                                            (data, index) => {
                                                let activeStatus
                                                let activeElementSet
                                                let includedInExport

                                                if (
                                                    data.projectStatus &&
                                                    data.projectStatus.length >
                                                        0 &&
                                                    projectTagData.length > 0
                                                ) {
                                                    activeStatus =
                                                        data.projectStatus.find(
                                                            (element) =>
                                                                element.active
                                                        )
                                                    if (activeStatus) {
                                                        // eslint-disable-next-line no-unused-vars
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
                                                    let checkData =
                                                        exportData.some(
                                                            (
                                                                datacheck,
                                                                index
                                                            ) =>
                                                                data._id ===
                                                                datacheck._id
                                                        )

                                                    includedInExport = checkData
                                                } else {
                                                    includedInExport = false
                                                }

                                                let currentDate = Moments(
                                                    new Date()
                                                )

                                                let pastDate = Moments(
                                                    data.creationDate
                                                )

                                                let diff = data.creationDate
                                                    ? currentDate.diff(
                                                          pastDate,
                                                          'days'
                                                      )
                                                    : 0

                                                let reportDelay =
                                                    data.submissionDate
                                                        ? 0
                                                        : diff

                                                let submissionDate =
                                                    data.submissionDate
                                                        ? Moments(
                                                              data.submissionDate
                                                          )
                                                              .tz(
                                                                  'Africa/Kampala'
                                                              )
                                                              .format(
                                                                  'DD MMM Y'
                                                              )
                                                        : '-'

                                                let creationDate =
                                                    data.creationDate
                                                        ? Moments(
                                                              data.creationDate
                                                          )
                                                              .tz(
                                                                  'Africa/Kampala'
                                                              )
                                                              .format(
                                                                  'DD MMM Y'
                                                              )
                                                        : '-'
                                                return (
                                                    <Tr
                                                        key={data._id}
                                                        className={`table_row ${
                                                            includedInExport
                                                                ? 'row_selected'
                                                                : ''
                                                        }`}>
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
                                                            maxW='250px'
                                                            className='studentName'>
                                                            {data.projectsData
                                                                ? data
                                                                      .projectsData
                                                                      .student
                                                                      .studentName
                                                                : ''}
                                                        </Td>
                                                        <Td maxW='250px'>
                                                            {data.projectsData
                                                                ? data
                                                                      .projectsData
                                                                      .student
                                                                      .phoneNumber
                                                                : ''}
                                                        </Td>
                                                        <Td
                                                            className='stud_topic'
                                                            maxW='250px'
                                                            style={{
                                                                fontWeight: 500,
                                                                color: '#15151D',
                                                            }}>
                                                            {' '}
                                                            {data.projectsData
                                                                ? data
                                                                      .projectsData
                                                                      .topic
                                                                : ''}
                                                        </Td>
                                                        <Td>
                                                            <StatusItem
                                                                className={data.reportStatus.toLowerCase()}
                                                                minW='90px'
                                                                direction='row'
                                                                alignItems='center'>
                                                                <div />
                                                                <Text>
                                                                    {' '}
                                                                    {
                                                                        data.reportStatus
                                                                    }
                                                                </Text>
                                                            </StatusItem>
                                                        </Td>
                                                        <Td maxW='250px'>
                                                            {' '}
                                                            {
                                                                data.examiner
                                                                    .jobtitle
                                                            }{' '}
                                                            {data.examiner.name}
                                                        </Td>
                                                        {/**<Td maxW='250px'>
                                                            {
                                                                data.examiner
                                                                    .email
                                                            }
                                                        </Td> */}

                                                        <Td>
                                                            <Box className='sub_date'>
                                                                {creationDate}
                                                            </Box>
                                                        </Td>

                                                        <Td>
                                                            <Box className='sub_date'>
                                                                {submissionDate}
                                                            </Box>
                                                        </Td>
                                                        <Td maxW='250px'>
                                                            <Stack
                                                                w='100%'
                                                                alignItems='center'
                                                                justifyContent={
                                                                    'center'
                                                                }>
                                                                <Box className='files'>
                                                                    {
                                                                        reportDelay
                                                                    }
                                                                </Box>
                                                            </Stack>
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
                        )}
                    </Table>
                </Box>
            </Stack>
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

export default AdvReportTable

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
        font-size: 14px;
        color: #3a3a43;
        line-height: 20px;
        max-width: 160px;
    }

    .studentName {
        text-transform: capitalize;
    }

    .stud_topic {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        color: #3a3a43;
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

    .row_selected {
        background: #fef9ef !important;
    }

    .passed {
        color: #14804a !important;
        background: #e1fcef !important;

        div {
            background: #38a06c;
        }
    }

    .ungraded {
        color: #5a6376 !important;
        background: #e9edf5 !important;

        div {
            background: #687182;
        }
    }

    .failed {
        color: #d1293d !important;
        background: #ffedef !important;

        div {
            background: #ef5466;
        }
    }

    .pending {
        color: #faa723 !important;
        background: #ffedef !important;

        div {
            background: #faa723;
        }
    }

    .files {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sub_date {
        height: 20px;
        color: #3a3a43;

        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        background: #eeeeef;
        border-radius: 4px;
        width: 98px;
        display: flex;
        justify-content: center;
        align-items: center;
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
