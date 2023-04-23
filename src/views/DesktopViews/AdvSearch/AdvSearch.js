/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Select,
    InputGroup,
    Input,
    InputLeftElement,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Radio,
    RadioGroup,
    SimpleGrid,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'

import { BiSearch } from 'react-icons/bi'

import { GrClose } from 'react-icons/gr'
//import ProjectTable from '../../../components/ProjectComponents/AllProjects/ProjectTable'
//import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllProjects,
    // reset,
} from '../../../store/features/project/projectSlice'
import {
    allExaminers,
    // reset as eReset,
} from '../../../store/features/Examiner/examinerSlice'
import {
    getAllExaminerReports,
    // reset as rpReset,
} from '../../../store/features/reports/reportSlice'
import {
    reset as treset,
    tagGetAll,
} from '../../../store/features/tags/tagSlice'
import { MdTableView } from 'react-icons/md'
import AdvStudentTable from '../../../components/AdvSearchItems/AdvStudentTable'
import AdvReportTable from '../../../components/AdvSearchItems/AdvReportTable'
import AdvExaminerTable from '../../../components/AdvSearchItems/AdvExaminerTable'

const dataModels = [
    {
        title: 'Examiner Reports Table',
        models: [
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
                mtitle: 'Examiner Contacts',
            },
            {
                mtitle: 'Report Delay',
            },
        ],
    },
]

const QuerySets = [
    {
        title: 'is',
    },
    {
        title: 'greater than',
    },
    {
        title: 'equal to',
    },
    {
        title: 'less than',
    },
]

// const studentHeaders = [
//     {
//         label: 'Student Name',
//         key: 'studentName',
//     },
//     {
//         label: 'Student Contacts',
//         key: 'studentContacts',
//     },
//     {
//         label: 'topic',
//         key: 'topic',
//     },
//     {
//         label: 'status',
//         key: 'status',
//     },
// ]

const AdvSearch = () => {
    const [selectedTable, setSelectedTable] = React.useState('')
    const [selectingTable, setSelectingTable] = React.useState('')
    const [searchWordOption, setSearchWordOption] = React.useState('')
    const [searchWordQuery, setSearchWordQuery] = React.useState('is')
    const [searchWord, setSearchWord] = React.useState('')
    const [searchStatus, setSearchStatus] = React.useState('')
    const [searchActive, setSearchActive] = React.useState(false)
    const [filterInfo, setFilterInfo] = React.useState([])
    const [exportData, setExportData] = React.useState([])

    // const [allDisplayData, setAllDisplayData] = React.useState({
    //     currentPage: 0,
    //     itemsPerPage: 8,
    //     items: [],
    //     allSearchItems: [],
    //     totalItemsDisplayed: 0,
    //     totalSearchedItems: 0,
    //     totalPages: 0,
    // })

    // const [dropDownActive, setDropDownActive] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    let dispatch = useDispatch()
    let toast = useToast()
    React.useEffect(() => {
        dispatch(getAllProjects())
        dispatch(allExaminers())
        dispatch(getAllExaminerReports())
        dispatch(tagGetAll())
    }, [])

    let { allprojects } = useSelector((state) => state.project)

    let examinerCollectedDatas = useSelector((state) => state.examiner)
    let reportCollectedDatas = useSelector((state) => state.report)
    const tagsData = useSelector((state) => state.tag)

    useEffect(() => {
        if (tagsData.isError) {
            toast({
                position: 'top',
                title: tagsData.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(treset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagsData.isError, tagsData.isSuccess, tagsData.message, dispatch])

    /** function to select table */
    const onSelectTable = (value) => {
        setSelectingTable(value)
    }

    /** function to add table */
    const onAddTable = () => {
        if (selectingTable) {
            setSearchActive(false)
            setSelectedTable(selectingTable)
            setExportData([])
            onClose()
        }
    }

    /** function to reset table */

    const onResetTable = () => {
        setSelectedTable('')
        setSelectingTable('')
        setExportData([])
        setSearchActive(false)
    }

    /** function to cancel selection process */
    const onCancelTable = () => {
        setSelectingTable(selectedTable)
        onClose()
    }

    /** function to select the table list */
    const TableLists = React.useMemo(() => {
        if (selectedTable) {
            // eslint-disable-next-line array-callback-return
            const newdataArray = dataModels.filter((data, index) => {
                if (data.title === selectedTable) {
                    return data
                }
            })

            return newdataArray[0].models
        } else {
            return []
        }
    }, [selectedTable])

    /** function to select statuses */
    const TableStatuses = React.useMemo(() => {
        if (selectedTable) {
            if (selectedTable === 'Student Table') {
                if (searchWordOption === 'Program Type') {
                    let allInfoData = [
                        {
                            tagName: 'Masters',
                        },
                        {
                            tagName: 'PhD',
                        },
                    ]

                    return allInfoData
                } else if (searchWordOption === 'Registration') {
                    let allInfoData = [
                        {
                            tagName: 'Provisional Admission',
                        },
                        {
                            tagName: 'Full Admission',
                        },
                        {
                            tagName: 'De-registered',
                        },
                    ]

                    return allInfoData
                } else if (searchWordOption === 'Submission') {
                    let allInfoData = [
                        {
                            tagName: 'normal',
                        },
                        {
                            tagName: 'resubmission',
                        },
                    ]

                    return allInfoData
                } else if (searchWordOption === 'Status') {
                    let allInfoData = tagsData.allTagItems.items.filter(
                        (data, index) => data.table === 'project'
                    )

                    return allInfoData
                } else {
                    return []
                }
            } else if (selectedTable === 'Examiner Reports Table') {
                let allInfoData = tagsData.allTagItems.items.filter(
                    (data, index) => data.table === 'examinerReport'
                )

                return allInfoData
            } else {
                return []
            }
        } else {
            return []
        }
    }, [tagsData.allTagItems.items, selectedTable, searchWordOption])

    /** function to handle filter change option */
    const handleFilterSearchOption = (e) => {
        e.preventDefault()

        setSearchWord('')
        setSearchStatus('')
        setSearchWordOption(e.target.value)
    }

    /** function to handle query-set change */
    const handleQueryChange = (e) => {
        e.preventDefault()

        setSearchWordQuery(e.target.value)
    }

    /** function to add a search text */
    const handleSearchWordChange = (e) => {
        e.preventDefault()
        let searchvalue = e.target.value || ''
        setSearchWord(searchvalue.toLowerCase())
    }

    /** function to add a search status */
    const handleSearchStatusChange = (e) => {
        e.preventDefault()
        setSearchStatus(e.target.value.toLowerCase())
    }

    /** function to add the search options to filter Array */
    const handleSearchFilterAddition = () => {
        if (searchWord) {
            if (filterInfo.length > 0) {
                let newFilterInfo = [...filterInfo]

                for (
                    let iteration = 0;
                    iteration < newFilterInfo.length;
                    iteration++
                ) {
                    let noIteration = iteration + 1

                    /** check whether search title are equal */
                    if (newFilterInfo[iteration].title === searchWordOption) {
                        /** check whether search query equal */
                        if (
                            newFilterInfo[iteration].queryfunction ===
                            searchWordQuery
                        ) {
                            /** check whether the search word is already there */
                            if (
                                newFilterInfo[iteration].searchfor.includes(
                                    searchWord
                                )
                            ) {
                                return null
                            } else {
                                let filterSelected = {
                                    title: searchWordOption,
                                    queryfunction: searchWordQuery,
                                    searchfor: [
                                        ...newFilterInfo[iteration].searchfor,
                                        searchWord,
                                    ],
                                }

                                newFilterInfo.splice(
                                    iteration,
                                    1,
                                    filterSelected
                                )

                                setFilterInfo(newFilterInfo)
                                setSearchWord('')
                                setSearchWordOption('')
                                return filterSelected
                            }
                        } else if (
                            newFilterInfo[iteration].queryfunction !==
                                searchWordQuery &&
                            noIteration === newFilterInfo.length
                        ) {
                            let filterSelected = {
                                title: searchWordOption,
                                queryfunction: searchWordQuery,
                                searchfor: [searchWord],
                            }

                            setFilterInfo([...newFilterInfo, filterSelected])
                            setSearchWord('')
                            setSearchWordOption('')
                            return
                        }
                    } else if (
                        /** search title doesnot exist */
                        newFilterInfo[iteration].title !== searchWordOption &&
                        noIteration === newFilterInfo.length
                    ) {
                        let filterSelected = {
                            title: searchWordOption,
                            queryfunction: searchWordQuery,
                            searchfor: [searchWord],
                        }

                        setFilterInfo([...filterInfo, filterSelected])
                        setSearchWord('')
                        setSearchWordOption('')
                    }
                }
            } else {
                let filterSelected = {
                    title: searchWordOption,
                    queryfunction: searchWordQuery,
                    searchfor: [searchWord],
                }

                setFilterInfo([...filterInfo, filterSelected])
                setSearchWord('')
                setSearchWordOption('')
            }
        }

        if (searchStatus) {
            if (filterInfo.length > 0) {
                let newFilterInfo = [...filterInfo]

                for (
                    let iteration = 0;
                    iteration < newFilterInfo.length;
                    iteration++
                ) {
                    let noIteration = iteration + 1

                    /** check whether search title are equal */
                    if (newFilterInfo[iteration].title === searchWordOption) {
                        /** check whether search query equal */
                        if (
                            newFilterInfo[iteration].queryfunction ===
                            searchWordQuery
                        ) {
                            /** check whether the search word is already there */
                            if (
                                newFilterInfo[iteration].searchfor.includes(
                                    searchStatus
                                )
                            ) {
                                return null
                            } else {
                                let filterSelected = {
                                    title: searchWordOption,
                                    queryfunction: searchWordQuery,
                                    searchfor: [
                                        ...newFilterInfo[iteration].searchfor,
                                        searchStatus,
                                    ],
                                }

                                newFilterInfo.splice(
                                    iteration,
                                    1,
                                    filterSelected
                                )

                                setFilterInfo(newFilterInfo)
                                setSearchStatus('')
                                setSearchWordOption('')
                                return filterSelected
                            }
                        }
                        // else {
                        //     let filterSelected = {
                        //         title: searchWordOption,
                        //         queryfunction: searchWordQuery,
                        //         searchfor: [searchStatus],
                        //     }

                        //     setFilterInfo([...newFilterInfo, filterSelected])
                        //     setSearchStatus('')
                        //     setSearchWordOption('')
                        //     return
                        // }
                    } else if (
                        /** search title doesnot exist */
                        newFilterInfo[iteration].title !== searchWordOption &&
                        noIteration === newFilterInfo.length
                    ) {
                        let filterSelected = {
                            title: searchWordOption,
                            queryfunction: searchWordQuery,
                            searchfor: [searchStatus],
                        }

                        setFilterInfo([...filterInfo, filterSelected])
                        setSearchStatus('')
                        setSearchWordOption('')
                    }
                }
            } else {
                let filterSelected = {
                    title: searchWordOption,
                    queryfunction: searchWordQuery,
                    searchfor: [searchStatus],
                }

                setFilterInfo([...filterInfo, filterSelected])
                setSearchStatus('')
                setSearchWordOption('')
            }
        }
    }

    /** function to clear all filter functions */
    const clearAllFilters = () => {
        setFilterInfo([])
        setExportData([])
        setSearchWord('')
        setSearchStatus('')
        setSearchWordOption('')
        setSearchActive(false)
    }

    /** function to set the search active  */
    const handleSearchActive = () => {
        if (filterInfo.length > 0) {
            setSearchActive(true)
        }
    }

    /** memo for headers of csv */
    // const headerSetting = React.useMemo(() => {
    //     if (selectedTable) {
    //         if (selectedTable === 'Student Table') {
    //             return studentHeaders
    //         } else {
    //             return []
    //         }
    //     } else {
    //         return []
    //     }
    // }, [selectedTable])

    /** function to handle data exportation */
    // const handleExportation = async () => {
    //     if (exportData.length > 0) {
    //         let values = {
    //             tableName: selectedTable,
    //             data: exportData,
    //             headers: studentHeaders,
    //         }
    //         await window.electronAPI.exportCSV(values)
    //     }
    // }

    const handleRemoveFilter = (Info, indexA) => {
        let newFilterInfo = [...filterInfo]

        newFilterInfo.filter((data, index) => {
            if (data.title === Info.title && index === indexA) {
                newFilterInfo.splice(index, 1)

                return setFilterInfo([...newFilterInfo])
            } else {
                return null
            }
        })
    }

    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                w='100%'
                spacing='20px'
                pb='40px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{ title: 'Advanced Search ', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'0 20px'}>
                    {/** filter inputs */}
                    <Stack direction='column'>
                        <Stack
                            direction='row'
                            alignItems={'center'}
                            spacing='46px'>
                            {/** title */}
                            <Box className='table_title'>{selectedTable}</Box>

                            {/** table selection && print report button */}
                            <Stack direction='row'>
                                <TableButton>
                                    <Button
                                        onClick={() => onOpen()}
                                        className='btn_table'
                                        leftIcon={<MdTableView />}>
                                        Select Table
                                    </Button>
                                </TableButton>

                                {/**
                                     * 
                                     *    {selectedTable && (
                                    <TableButton>
                                        {' '}
                                        <Button
                                            className='btn_table'
                                            leftIcon={<MdTableView />}>
                                            Add Another Table
                                        </Button>
                                    </TableButton>
                                )}
                                     * 
                                     * 
                                     * 
                                     */}
                            </Stack>
                        </Stack>

                        {/** new rule */}

                        {/** Rule & search section */}
                        <Stack
                            direction='row'
                            spacing={'5px'}
                            alignItems='center'
                            h='50px'>
                            {/** column to filter */}
                            <Box minW='200px'>
                                {TableLists.length > 0 ? (
                                    <Select
                                        onChange={handleFilterSearchOption}
                                        className='option_text'
                                        value={searchWordOption}
                                        placeholder='select'>
                                        {TableLists.map((data, index) => {
                                            return (
                                                <option
                                                    className='option_text'
                                                    key={index}
                                                    value={data.mtitle}>
                                                    {data.mtitle}
                                                </option>
                                            )
                                        })}
                                    </Select>
                                ) : (
                                    <Select
                                        onChange={handleFilterSearchOption}
                                        className='option_text'
                                        value={searchWordOption}
                                        placeholder='select'></Select>
                                )}
                            </Box>
                            {/** search type option */}
                            <Box>
                                <Select
                                    className='option_text'
                                    onChange={handleQueryChange}
                                    value={searchWordQuery}>
                                    {QuerySets.map((data, index) => {
                                        return (
                                            <option
                                                key={index}
                                                default={
                                                    data.title === 'is' && true
                                                }>
                                                {data.title}
                                            </option>
                                        )
                                    })}
                                </Select>
                            </Box>
                            {/** search option */}
                            <Box>
                                {searchWordOption === 'Status' ||
                                searchWordOption === 'Registration' ||
                                searchWordOption === 'Program Type' ||
                                searchWordOption === 'Report Status' ? (
                                    <InputGroup
                                        h='32px'
                                        pr='0'
                                        p='0'
                                        m='0'
                                        className='input_group'>
                                        {TableStatuses.length > 0 ? (
                                            <Select
                                                placeholder='select status'
                                                onChange={
                                                    handleSearchStatusChange
                                                }
                                                value={searchStatus}>
                                                {TableStatuses.map(
                                                    (data, index) => {
                                                        return (
                                                            <option key={index}>
                                                                {data.tagName.toLowerCase()}
                                                            </option>
                                                        )
                                                    }
                                                )}
                                            </Select>
                                        ) : (
                                            <Select placeholder='select status'></Select>
                                        )}
                                    </InputGroup>
                                ) : (
                                    <InputGroup
                                        h='32px'
                                        pr='0'
                                        p='0'
                                        m='0'
                                        className='input_group'>
                                        <InputLeftElement h='32px' p='0' m='0'>
                                            <Button
                                                p='0'
                                                m='0'
                                                h='100%'
                                                w='100%'
                                                bg='transparent'
                                                size='28px'>
                                                <BiSearch />
                                            </Button>
                                        </InputLeftElement>

                                        <Input
                                            h='32px'
                                            type={
                                                searchWordOption ===
                                                'Report Delay'
                                                    ? 'number'
                                                    : 'text'
                                            }
                                            placeholder='Search'
                                            style={{ textIndent: '5px' }}
                                            value={searchWord}
                                            onChange={handleSearchWordChange}
                                        />
                                    </InputGroup>
                                )}
                            </Box>

                            <TableButton>
                                <Button
                                    disabled={
                                        (searchWordQuery &&
                                            searchWord &&
                                            searchWordOption) ||
                                        (searchStatus &&
                                            searchWordQuery &&
                                            searchWordOption)
                                            ? false
                                            : true
                                    }
                                    onClick={handleSearchFilterAddition}
                                    leftIcon={<AiOutlinePlus />}
                                    className='btn__rule'>
                                    Add Rule
                                </Button>
                            </TableButton>

                            <TableButton>
                                <Button
                                    onClick={handleSearchActive}
                                    disabled={
                                        filterInfo.length > 0 ? false : true
                                    }
                                    className='btn__print'>
                                    Search
                                </Button>
                            </TableButton>
                        </Stack>

                        {/** Rule Items & filter information */}
                        <Stack direction='column' spacing='28px'>
                            <Box>
                                <Stack direction='column'>
                                    {/** filter information */}
                                    <Stack
                                        direction='row'
                                        alignItems={'center'}
                                        spacing='14px'>
                                        <Box className='filter_num'>
                                            Filter : {filterInfo.length}
                                        </Box>
                                        <Box
                                            onClick={clearAllFilters}
                                            as='button'
                                            className='clear_button'>
                                            Clear all
                                        </Box>
                                    </Stack>

                                    {/**new filter lists */}
                                    {filterInfo.length > 0 && (
                                        <SimpleGrid
                                            gap='20px'
                                            minChildWidth='max-content'>
                                            {filterInfo.map((data, index) => (
                                                <Stack
                                                    direction='row'
                                                    alignItems={'center'}
                                                    key={index}
                                                    w='-webkit-fit-content'>
                                                    {index !== 0 && (
                                                        <Box className='filterOperation'>
                                                            and
                                                        </Box>
                                                    )}
                                                    <FilterInfoStack
                                                        direction='row'
                                                        w='-webkit-fit-content'
                                                        alignItems='center'>
                                                        <h1>{data.title}:</h1>
                                                        <Box className='filterOperation'>
                                                            {data.queryfunction}
                                                        </Box>
                                                        <Stack direction='row'>
                                                            {data.searchfor.map(
                                                                (
                                                                    searchdata,
                                                                    indexes
                                                                ) => {
                                                                    return (
                                                                        <Text
                                                                            key={
                                                                                indexes
                                                                            }>
                                                                            {
                                                                                searchdata
                                                                            }
                                                                        </Text>
                                                                    )
                                                                }
                                                            )}
                                                        </Stack>
                                                        <Box
                                                            className='close_icon'
                                                            onClick={() =>
                                                                handleRemoveFilter(
                                                                    data,
                                                                    index
                                                                )
                                                            }>
                                                            <GrClose />
                                                        </Box>
                                                    </FilterInfoStack>
                                                </Stack>
                                            ))}
                                        </SimpleGrid>
                                    )}

                                    {/** end of filter lists */}
                                </Stack>
                            </Box>
                        </Stack>
                    </Stack>

                    {/** Table */}
                    <Stack direction='column' pt='30px'>
                        {selectedTable === 'Student Table' && (
                            <Box>
                                <AdvStudentTable
                                    setExportData={setExportData}
                                    exportData={exportData}
                                    tableLists={TableLists}
                                    allItems={allprojects}
                                    searchActive={searchActive}
                                    allTagData={tagsData.allTagItems.items}
                                    filterInfo={filterInfo}
                                />
                            </Box>
                        )}
                        {selectedTable === 'Examiner Reports Table' && (
                            <Box>
                                <AdvReportTable
                                    setExportData={setExportData}
                                    exportData={exportData}
                                    tableLists={TableLists}
                                    allProjects={allprojects.items}
                                    allItems={reportCollectedDatas.allreports}
                                    searchActive={searchActive}
                                    allTagData={tagsData.allTagItems.items}
                                    filterInfo={filterInfo}
                                />
                            </Box>
                        )}
                        {selectedTable === 'Examiners Table' && (
                            <Box>
                                <AdvExaminerTable
                                    setExportData={setExportData}
                                    exportData={exportData}
                                    tableLists={TableLists}
                                    allItems={
                                        examinerCollectedDatas.allExaminerItems
                                    }
                                    searchActive={searchActive}
                                    allTagData={tagsData.allTagItems.items}
                                    filterInfo={filterInfo}
                                />
                            </Box>
                        )}
                    </Stack>
                </Stack>
            </Stack>

            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <PopupForm
                            p='0px'
                            spacing={'0px'}
                            justifyContent='space-between'>
                            <Stack direction='column' spacing={'10px'} h='50%'>
                                <Stack
                                    className='popup_title'
                                    direction='row'
                                    w='100%'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box>
                                        <h1> Select One(1) Table</h1>
                                    </Box>
                                </Stack>
                                <RadioGroup
                                    onChange={onSelectTable}
                                    value={selectingTable}>
                                    <Stack
                                        p='10px 20px 0 20px'
                                        direction='column'
                                        spacing={'20px'}
                                        h='70%'>
                                        {dataModels.map((data, index) => {
                                            return (
                                                <ModelStack
                                                    direction='column'
                                                    key={index}>
                                                    <Stack direction='row'>
                                                        <Radio
                                                            colorScheme='red'
                                                            value={
                                                                data.title
                                                            }></Radio>
                                                        <label>
                                                            {data.title}
                                                        </label>
                                                    </Stack>
                                                </ModelStack>
                                            )
                                        })}
                                    </Stack>
                                </RadioGroup>
                            </Stack>

                            <Stack
                                p='0px 20px'
                                direction='row'
                                alignItems='center'
                                h='55px'
                                bg='#ffffff'
                                borderRadius='0 0 8px 8px'
                                justifyContent='space-between'>
                                <Button
                                    className='cancel_button'
                                    onClick={() => onResetTable()}>
                                    Reset
                                </Button>

                                <Stack
                                    h='48px'
                                    direction='row'
                                    borderRadius='0 0 8px 8px'
                                    justifyContent='flex-end'
                                    spacing='20px'
                                    alignItems='center'>
                                    <Button
                                        className='cancel_button'
                                        onClick={() => onCancelTable()}>
                                        Cancel
                                    </Button>

                                    <Button
                                        colorScheme={'red'}
                                        className='apply_button'
                                        onClick={() => onAddTable()}>
                                        Select Table
                                    </Button>
                                </Stack>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default AdvSearch

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
    .table_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 32px;
        color: #222834;
    }

    .option_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }
    .add_button {
        height: 32px;
        color: #ffffff;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        font-size: 14px;
    }

    .subfilter_button {
        width: inherit;

        text-align: left;
        focus: none;
        border-radius: none !important;
        ::hover {
            background: transparent !important;
        }
    }
    .filter_button {
        background: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px 0px 0px 6px;
    }

    .menu_options {
        .chakra-menu__icon {
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
            background: green;
        }

        .chakra-menu__icon-wrapper {
            color: #fbfbfb;
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
        }

        svg {
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
        }
    }

    .input_group {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;

        &:hover {
            border: 0px solid transparent;
            box-shadow: 0px;
            border-radius: 0px 6px 6px 0px;
        }

        input {
            border: 0px solid transparent;
        }
        select {
            border: 0px solid transparent;
            min-width: 261px;
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #464f60;
            letter-spacing: 0.02em;
        }
        background: #ffffff;
    }

    select {
        height: 32px;
        min-width: 103px;
    }
    .filter_query {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #3a3a43;
    }

    .filter_num {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #3a3a43;
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
        height: 32px;
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

const FilterInfoStack = styled(Stack)`
    position: relative;
    width: 100%;
    min-height: 22px;
    height: 100%;
    padding: 8px 8px;
    background: #fceded;
    border-radius: 4px;
    h1 {
        color: #f14c54;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    p {
        color: #15151d;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    .filterOperation {
        color: #15151d;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    .close_icon {
        color: #838389;
        font-size: 12px;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 217px;
    background: #fbfbfb;
    border-radius: 8px;

    span {
        color: #ed1f29;
    }

    .popup_title {
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

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .cancel_button {
        width: 64px;
        height: 32px;
        color: #abaaaf;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .apply_button {
        width: 50%;
        height: 32px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`

const ModelStack = styled(Stack)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #464f60;
    letter-spacing: 0.02em;

    label {
        font-size: 14px;
        font-weight: 600;
    }
`
