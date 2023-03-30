/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Stack,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
} from '@chakra-ui/react'
import { AiOutlineMinus } from 'react-icons/ai'

import AdvPagination from './AdvPagination'
import AdvPagination2 from './AdvPagination2'

const AdvExaminerTable = ({
    tableLists,
    tableData = [],
    allItems,
    searchActive,
    allTagData,
    filterInfo,
    exportData,
    setExportData,
}) => {
    const [allDisplayItems, setAllDisplayItems] = React.useState([])
    const [allDisplayData, setAllDisplayData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allSearchItems: [],
        totalItemsDisplayed: 0,
        totalSearchedItems: 0,
        totalPages: 0,
    })
    // eslint-disable-next-line no-unused-vars
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

    //const [exportData, setExportData] = React.useState([])
    React.useEffect(() => {
        //  console.log('items her333e', allItems.items)
        setAllDisplayItems(allItems.items)

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
            allSearchItems: allItems.items,
            totalItemsDisplayed: currentItems.length,
            totalSearchedItems: totalItems,
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
    }, [allItems])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'examinerReport'
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

    // console.log(allDisplayItems, 'allDisplayItems')

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

                const currentItems = allDisplayData.allSearchItems.slice(
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

                const currentItems = allDisplayData.allSearchItems.slice(
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
        //  console.log('checking0', e.target.checked, data)
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
                        _id: data._id,
                        studentName: data.student.studentName,
                        studentContacts: data.student.phoneNumber,
                        topic: data.topic,
                        status: data.activeStatus,
                    },
                ])
            }
        } else {
            setExportData([
                {
                    _id: data._id,
                    studentName: data.student.studentName,
                    studentContacts: data.student.phoneNumber,
                    topic: data.topic,
                    status: data.activeStatus,
                },
            ])
        }
    }

    /** function to handle general checkbox */
    const handleGeneralCheckbox = (e) => {
        if (e.target.checked) {
            if (searchActive) {
                if (searchData.allSearchItems.length > 0) {
                    let newDataToSave = searchData.allSearchItems.map(
                        (data) => {
                            return {
                                _id: data._id,
                                studentName: data.student.studentName,
                                studentContacts: data.student.phoneNumber,
                                topic: data.topic,
                                status: data.activeStatus,
                            }
                        }
                    )

                    //     console.log('generalss', newDataToSave)

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allSearchItems.length > 0) {
                    let newDataToSave = allDisplayData.allSearchItems.map(
                        (data) => {
                            //     console.log('allDisplayData', data.activeStatus)
                            return {
                                _id: data._id,
                                studentName: data.student.studentName,
                                studentContacts: data.student.phoneNumber,
                                topic: data.topic,
                                status: data.activeStatus,
                            }
                        }
                    )

                    //   console.log('generalstts', newDataToSave)
                    setExportData(newDataToSave)
                }
            }
        } else {
            setExportData([])
        }
    }
    return (
        <Container>
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
                                    return <Th key={index}>{data.mtitle}</Th>
                                })}
                            </Tr>
                        )}
                    </Thead>

                    {searchActive ? (
                        <Tbody>
                            {tableData.length > 0 ? (
                                <>
                                    {tableData.map((data, index) => {
                                        return <Tr key={index}></Tr>
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
                                    {allDisplayData.items.map((data, index) => {
                                        let includedInExport

                                        if (exportData.length > 0) {
                                            let checkData = exportData.some(
                                                (datacheck, index) =>
                                                    data._id === datacheck._id
                                            )

                                            includedInExport = checkData
                                        } else {
                                            includedInExport = false
                                        }
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
                                                    {data.jobtitle} {data.name}{' '}
                                                </Td>
                                                <Td maxW='250px'>
                                                    {data.typeOfExaminer.toUpperCase()}
                                                </Td>
                                                <Td
                                                    maxW='250px'
                                                    style={{
                                                        fontWeight: 500,
                                                        color: '#15151D',
                                                    }}>
                                                    {' '}
                                                    {data.phoneNumber}
                                                </Td>
                                                <Td>{data.email}</Td>
                                                <Td maxW='250px'>
                                                    {' '}
                                                    {data.jobtitle} {data.name}
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
                <AdvPagination2
                    paginationFirstNumber={PaginationSFirstNumber}
                    paginationLastNumber={PaginationSLastNumber}
                    overalltotal={searchData.totalSearchedItems}
                    perPages={perPage}
                    currentPage={searchData.currentPage}
                    totalPages={searchData.totalPages}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            ) : (
                <AdvPagination
                    paginationFirstNumber={PaginationFirstNumber}
                    paginationLastNumber={PaginationLastNumber}
                    overalltotal={allDisplayData.totalSearchedItems}
                    perPages={perPage}
                    currentPage={allDisplayData.currentPage}
                    totalPages={allDisplayData.totalPages}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                />
            )}
        </Container>
    )
}

export default AdvExaminerTable

const Container = styled(Stack)`
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
