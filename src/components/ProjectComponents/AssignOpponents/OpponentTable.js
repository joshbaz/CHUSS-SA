/* eslint-disable array-callback-return */
import React from 'react'
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
    Checkbox,
} from '@chakra-ui/react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdVerified,
} from 'react-icons/md'
const TableHead = [
   
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
        title: 'Verified',
        maxW: '100px',
    },
]

const OpponentTable = ({
    allExaminerItems,
    setSelectedExaminers,
    selectedExaminers,
    searchActive,
    allSearchedData,
    handleResetAll,
    handleSearchReset,
    setSearchData,
    setAllDisplayData,
    perPage,
}) => {
    const handleCheckChange = (e, dataCollected) => {
        e.preventDefault()

        if (e.target.checked === false) {
            let dataArray = [...selectedExaminers]
            dataArray.filter((data, index) => {
                if (dataCollected._id === data._id) {
                    dataArray.splice(index, 1)
                }
            })

            setSelectedExaminers(dataArray)
        }

        if (e.target.checked === true) {
            let dataArray = [...selectedExaminers, dataCollected]

            setSelectedExaminers(dataArray)
        }
    }

    /** pagination */
    let PaginationFirstNumber =
        allExaminerItems.currentPage * allExaminerItems.itemsPerPage -
        allExaminerItems.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allExaminerItems.totalItemsDisplayed - 1

    /** search pagination */
    let PaginationFirstNumber2 =
        allSearchedData.currentPage * allSearchedData.itemsPerPage -
        allSearchedData.itemsPerPage +
        1

    let PaginationLastNumber2 =
        PaginationFirstNumber2 + allSearchedData.totalItemsDisplayed - 1

    const handlePrev = () => {
        if (searchActive) {
            if (allSearchedData.currentPage - 1 >= 1) {
                let page = allSearchedData.currentPage - 1
                const indexOfLastItem = page * allSearchedData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allSearchedData.itemsPerPage

                const currentItems = allSearchedData.allSearchItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData(() => ({
                    ...allSearchedData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                }))
            }
        } else {
            if (allExaminerItems.currentPage - 1 >= 1) {
                let page = allExaminerItems.currentPage - 1
                const indexOfLastItem = page * allExaminerItems.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allExaminerItems.itemsPerPage

                const currentItems = allExaminerItems.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setAllDisplayData({
                    ...allExaminerItems,
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
             if (
                 allSearchedData.currentPage + 1 <=
                 allSearchedData.totalPages
             ) {
                 let page = allSearchedData.currentPage + 1
                 const indexOfLastItem = page * allSearchedData.itemsPerPage
                 const indexOfFirstItem =
                     indexOfLastItem - allSearchedData.itemsPerPage

                 const currentItems = allSearchedData.allSearchItems.slice(
                     indexOfFirstItem,
                     indexOfLastItem
                 )

                 setSearchData({
                     ...allSearchedData,
                     currentPage: page,
                     itemsPerPage: perPage,
                     items: currentItems,
                     totalItemsDisplayed: currentItems.length,
                 })
             }
         } else {
             if (
                 allExaminerItems.currentPage + 1 <=
                 allExaminerItems.totalPages
             ) {
                 let page = allExaminerItems.currentPage + 1
                 const indexOfLastItem = page * allExaminerItems.itemsPerPage
                 const indexOfFirstItem =
                     indexOfLastItem - allExaminerItems.itemsPerPage

                 const currentItems = allExaminerItems.allItems.slice(
                     indexOfFirstItem,
                     indexOfLastItem
                 )

                 setAllDisplayData(() => ({
                     ...allExaminerItems,
                     currentPage: page,
                     itemsPerPage: perPage,
                     items: currentItems,
                     totalItemsDisplayed: currentItems.length,
                 }))
             }
         }
    }
    return (
        <Container>
            <Box className='form_container'>
                {/** details */}
                <Stack
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='20px'
                    h='100%'>
                    {/** table */}
                    <Stack direction='column' spacing='10px' minH={'65vh'}>
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'>
                            <Stack direction='row'>
                                {/** clear button */}
                                <Box
                                    as='button'
                                    className='clear_button'
                                    onClick={handleResetAll}>
                                    Reset All
                                </Box>
                                <Box
                                    as='button'
                                    className='clear_button'
                                    onClick={() => handleSearchReset()}>
                                    Reset Search
                                </Box>

                                <Box className='clear_button'>
                                    Selected: {selectedExaminers.length}
                                </Box>
                            </Stack>

                            <SearchActivity direction='row' alignItems='center'>
                                <Box
                                    className='sactivity_indicator'
                                    bg={searchActive ? 'green' : 'red'}
                                />
                                <Box className='sactivity_text'>Search</Box>
                            </SearchActivity>
                        </Stack>

                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th></Th>
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
                                </Tr>
                            </Thead>

                            {searchActive ? (
                                <Tbody>
                                    {allSearchedData.items.length > 0 ? (
                                        <>
                                            {allSearchedData.items.map(
                                                (data, index) => {
                                                    let checkData =
                                                        selectedExaminers.find(
                                                            (element) =>
                                                                element._id ===
                                                                data._id
                                                        )
                                                    let selectionColor =
                                                        checkData
                                                            ? '#fef9ef'
                                                            : ''
                                                    let checkedStatus =
                                                        checkData ? true : false

                                                    return (
                                                        <Tr
                                                            className='table_row'
                                                            bg={selectionColor}
                                                            key={index}>
                                                            <Td>
                                                                <Checkbox
                                                                    colorScheme='pink'
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCheckChange(
                                                                            e,
                                                                            data
                                                                        )
                                                                    }
                                                                    isChecked={
                                                                        checkedStatus
                                                                    }
                                                                />
                                                            </Td>
                                                        
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
                                                            <Td>
                                                                {data.email}
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
                                    {allExaminerItems.items.length > 0 ? (
                                        <>
                                            {allExaminerItems.items.map(
                                                (data, index) => {
                                                    let checkData =
                                                        selectedExaminers.find(
                                                            (element) =>
                                                                element._id ===
                                                                data._id
                                                        )
                                                    let selectionColor =
                                                        checkData
                                                            ? '#fef9ef'
                                                            : ''
                                                    let checkedStatus =
                                                        checkData ? true : false

                                                    return (
                                                        <Tr
                                                            className='table_row'
                                                            bg={selectionColor}
                                                            key={index}>
                                                            <Td>
                                                                <Checkbox
                                                                    colorScheme='pink'
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleCheckChange(
                                                                            e,
                                                                            data
                                                                        )
                                                                    }
                                                                    isChecked={
                                                                        checkedStatus
                                                                    }
                                                                />
                                                            </Td>
                                                            
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
                                                            <Td>
                                                                {data.email}
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
                    </Stack>

                    {/** Pagination */}

                    {searchActive ? (
                        <Box>
                            {' '}
                            {allSearchedData.items.length > 0 && (
                                <PaginationStack
                                    direction='row'
                                    height='56px'
                                    alignItems='center'
                                    justifyContent={'space-between'}>
                                    <Box className='pages'>
                                        <span>
                                            {`${PaginationFirstNumber2}`} -{' '}
                                            {`${PaginationLastNumber2}`} of{' '}
                                            {`${allSearchedData.totalSearchedItems}`}
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
                                                {' '}
                                                {allSearchedData.itemsPerPage}
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
                                            <Box style={{ display: 'flex' }}>
                                                <span>
                                                    {
                                                        allSearchedData.currentPage
                                                    }
                                                </span>
                                                /
                                                <span>
                                                    {allSearchedData.totalPages}
                                                </span>
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
                                            {`${allExaminerItems.totalItems}`}
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
                                                {allExaminerItems.itemsPerPage}
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
                                            <Box style={{ display: 'flex' }}>
                                                <span>
                                                    {
                                                        allExaminerItems.currentPage
                                                    }
                                                </span>
                                                /
                                                <span>
                                                    {
                                                        allExaminerItems.totalPages
                                                    }
                                                </span>
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

export default OpponentTable

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

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
        font-family: 'Inter', sans-serif;
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
        font-family: 'Inter', sans-serif;
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

    .clear_button {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        color: #838389;
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
