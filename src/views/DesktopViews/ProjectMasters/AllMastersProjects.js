/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Text,
    SimpleGrid,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import ProjectTable from '../../../components/ProjectComponents/AllProjects/ProjectTable'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getPProjects,
    getAllProjects,
    reset,
} from '../../../store/features/project/projectSlice'

import {
    reset as treset,
    tagGetAll,
} from '../../../store/features/tags/tagSlice'

import {
    allSchools,
    reset as sreset,
} from '../../../store/features/schools/schoolSlice'
import { initSocketConnection } from '../../../socketio.service'

import { reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'

import {
    errorHandler,
    handleLogout,
} from '../../../components/common/CustomToastFunctions/ToastFunctions'
import OrdStudentSearch from '../../../components/common/SearhBars/OrdStudentSearch'
import AdvStudentSearh from '../../../components/common/SearhBars/AdvStudentSearh'

const AllMastersProjects = () => {
    const tagsData = useSelector((state) => state.tag)
    const [filterSearchOption, setFilterSearchOption] =
        React.useState('Student Name')
    const [searchWord, setSearchWord] = React.useState('')
    const [searchStatus, setSearchStatus] = React.useState('')
    const [exportData, setExportData] = React.useState([])
    /** button state */
    const [searchButtonState, setSearchButtonState] =
        React.useState('DefaultSearch')
    const filterItems = [
        {
            title: 'Student Name',
        },
        {
            title: 'Student (SRN)',
        },
        {
            title: 'Registration',
        },
        {
            title: 'Submission',
        },
        {
            title: 'Status',
        },
        {
            title: 'School',
        },
        {
            title: 'Award',
        },
        {
            title: 'Topic',
        },
    ]

    const [searchActive, setSearchActive] = React.useState(false)
    const [filterInfo, setFilterInfo] = React.useState([])

    /** handle search option change */
    const handleSearchOptionChange = (valuet) => {
        setSearchWord('')
        setSearchStatus('')
        setFilterSearchOption(valuet)
    }

    /** handle status changes */
    /** function to add a search status */
    const handleSearchStatusChange = (e) => {
        e.preventDefault()

        setSearchStatus(e.target.value.toLowerCase())
    }

    /** this handles search word changes */
    const handleSearchInput = (e) => {
        e.preventDefault()
        let value = e.target.value || ''
        setSearchWord(value.toLowerCase())
        if (value !== '' && searchButtonState === 'DefaultSearch') {
            setSearchActive(() => true)
        } else if (value === '' && searchButtonState === 'DefaultSearch') {
            setSearchActive(() => false)
        }
    }

    const handleSubmitFilter = () => {
        /** search word */
        if (searchWord) {
            if (filterInfo.length > 0) {
                let newFilterInfo = [...filterInfo]

                for (let i = 0; i < newFilterInfo.length; i++) {
                    let iteration = i + 1

                    if (newFilterInfo[i].title === filterSearchOption) {
                        if (newFilterInfo[i].searchfor.includes(searchWord)) {
                            return null
                        } else {
                            let filterSelected = {
                                title: filterSearchOption,
                                searchfor: [
                                    ...newFilterInfo[i].searchfor,
                                    searchWord,
                                ],
                            }
                            newFilterInfo.splice(i, 1, filterSelected)
                            setFilterInfo(newFilterInfo)
                            setSearchWord('')
                            return filterSelected
                        }
                    } else if (
                        newFilterInfo[i].title !== filterSearchOption &&
                        iteration === newFilterInfo.length
                    ) {
                        let filterSelected = {
                            title: filterSearchOption,
                            searchfor: [searchWord],
                        }

                        setFilterInfo([...newFilterInfo, filterSelected])
                        setSearchWord('')
                    }
                }
            } else {
                let filterSelected = {
                    title: filterSearchOption,
                    searchfor: [searchWord],
                }

                setFilterInfo([...filterInfo, filterSelected])
                setSearchWord('')
                //setFilterSearchOption('All')
                // console.log('filtered Info', filterInfo)
            }
        }

        /** search status */
        if (searchStatus) {
            if (filterInfo.length > 0) {
                let newFilterInfo = [...filterInfo]

                for (let i = 0; i < newFilterInfo.length; i++) {
                    let iteration = i + 1

                    if (newFilterInfo[i].title === filterSearchOption) {
                        if (newFilterInfo[i].searchfor.includes(searchStatus)) {
                            return null
                        } else {
                            let filterSelected = {
                                title: filterSearchOption,
                                searchfor: [
                                    ...newFilterInfo[i].searchfor,
                                    searchStatus,
                                ],
                            }
                            newFilterInfo.splice(i, 1, filterSelected)
                            setFilterInfo(newFilterInfo)
                            setSearchWord('')
                            return filterSelected
                        }
                    } else if (
                        newFilterInfo[i].title !== filterSearchOption &&
                        iteration === newFilterInfo.length
                    ) {
                        let filterSelected = {
                            title: filterSearchOption,
                            searchfor: [searchStatus],
                        }

                        setFilterInfo([...newFilterInfo, filterSelected])
                        setSearchWord('')
                    }
                }
            } else {
                let filterSelected = {
                    title: filterSearchOption,
                    searchfor: [searchStatus],
                }

                setFilterInfo([...filterInfo, filterSelected])
                setSearchStatus('')
                //setFilterSearchOption('All')
                // console.log('filtered Info', filterInfo)
            }
        }
    }

    /** function to set the search active  */
    const handleSearchActive = () => {
        if (filterInfo.length > 0) {
            setSearchActive(true)
        }
    }

    //this is for the checkbox filter
    const checkboxesFilter = (title, value) => {
        if (filterInfo.length > 0) {
            let newFilterInfo = [...filterInfo]

            for (let i = 0; i < newFilterInfo.length; i++) {
                let iteration = i + 1

                if (newFilterInfo[i].title === title) {
                    //word is found
                    if (value.length < 1) {
                        newFilterInfo.splice(i, 1)
                        return setFilterInfo(newFilterInfo)
                    } else {
                        let filterSelected = {
                            title: title,
                            searchfor: value,
                        }
                        newFilterInfo.splice(i, 1, filterSelected)
                        setFilterInfo(newFilterInfo)

                        return filterSelected
                    }
                } else if (
                    newFilterInfo[i].title !== title &&
                    iteration === newFilterInfo.length
                ) {
                    let filterSelected = {
                        title: title,
                        searchfor: value,
                    }

                    setFilterInfo([...newFilterInfo, filterSelected])
                }
            }
        } else {
            let filterSelected = {
                title: title,
                searchfor: value,
            }

            setFilterInfo([...filterInfo, filterSelected])

            //setFilterSearchOption('All')
            // console.log('filtered Info', filterInfo)
        }
    }

    const clearAllFilters = () => {
        setFilterInfo([])
        setSearchWord('')
        setSearchStatus('')
        setSearchActive(false)
        setFilterSearchOption('Student Name')
    }

    const handleRemoveFilter = (Info) => {
        let newFilterInfo = [...filterInfo]

        newFilterInfo.filter((data, index) => {
            if (data.title === Info.title) {
                newFilterInfo.splice(index, 1)

                return setFilterInfo([...newFilterInfo])
            } else {
                return null
            }
        })
    }

    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let { isError, isSuccess, message } = useSelector((state) => state.project)
    let { allSchoolItems } = useSelector((state) => state.school)

    let Location = useLocation()

    useEffect(() => {
        let page = Location.search.split('').slice(3).join('')
        let values = {
            page: page,
        }
        //  dispatch(getPProjects(values))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Location])

    useEffect(() => {
        const io = initSocketConnection()
        toast.dismiss()
        toast.promise(
            dispatch(getAllProjects())
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(tagGetAll())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return dispatch(allSchools())
                    }
                })
                .then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
            {
                loading: 'Retrieving Information',
                success: (data) => `Successfully retrieved`,
                error: (err) => {
                    if (
                        err
                            .toString()
                            .includes('Check your internet connection')
                    ) {
                        return 'Check Internet Connection'
                    } else if (
                        err.toString().includes('Authentication required')
                    ) {
                        setTimeout(() => handleLogout(dispatch), 3000)
                        return 'Not Authenticated'
                    } else if (
                        err.toString().includes('Authentication expired')
                    ) {
                        setTimeout(() => handleLogout(dispatch), 3000)
                        return 'Authentication Expired'
                    } else {
                        return `${err}`
                    }
                },
            }
        )

        io.on('updatestudent', (data) => {
            if (data.actions === 'update-all-student') {
                toast.dismiss()
                toast.promise(
                    dispatch(getAllProjects())
                        .then((res) => {
                            if (res.meta.requestStatus === 'rejected') {
                                let responseCheck = errorHandler(res)
                                throw new Error(responseCheck)
                            } else {
                                return dispatch(tagGetAll())
                            }
                        })
                        .then((res) => {
                            if (res.meta.requestStatus === 'rejected') {
                                let responseCheck = errorHandler(res)
                                throw new Error(responseCheck)
                            } else {
                                return res.payload.message
                            }
                        }),
                    {
                        loading: 'updating Information',
                        success: (data) => `Successfully updated`,
                        error: (err) => {
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication required')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Not Authenticated'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication expired')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Authentication Expired'
                            } else {
                                return `${err}`
                            }
                        },
                    },
                    {
                        position: 'bottom-right',
                    }
                )

                // dispatch(tagGetAll())
            }
        })

        io.on('updatetag', (data) => {
            if (data.actions === 'update-tag') {
                toast.dismiss()

                toast.promise(
                    dispatch(tagGetAll()).then((res) => {
                        if (res.meta.requestStatus === 'rejected') {
                            let responseCheck = errorHandler(res)
                            throw new Error(responseCheck)
                        } else {
                            return 'data collected'
                        }
                    }),
                    {
                        loading: 'updating Information',
                        success: (data) => `Successfully updated`,
                        error: (err) => {
                            if (
                                err
                                    .toString()
                                    .includes('Check your internet connection')
                            ) {
                                return 'Check Internet Connection'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication required')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Not Authenticated'
                            } else if (
                                err
                                    .toString()
                                    .includes('Authentication expired')
                            ) {
                                setTimeout(() => handleLogout(dispatch), 3000)
                                return 'Authentication Expired'
                            } else {
                                return `${err}`
                            }
                        },
                    },
                    {
                        position: 'bottom-right',
                    }
                )
            }
        })
    }, [])

    useEffect(() => {
        if (tagsData.isError) {
            dispatch(treset())
            dispatch(sreset())
            dispatch(areset())
        }
        dispatch(sreset())
        dispatch(areset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagsData.isError, tagsData.isSuccess, tagsData.message, dispatch])

    useEffect(() => {
        if (isError) {
            dispatch(reset())
            dispatch(sreset())
            dispatch(areset())
        }
        dispatch(sreset())
        dispatch(areset())
    }, [isSuccess, isError, message])

    /** function to select statuses */
    const TableStatuses = React.useMemo(() => {
        if (filterSearchOption) {
            if (filterSearchOption === 'Status') {
                let allInfoData = tagsData.allTagItems.items.filter(
                    (data, index) =>
                        data.table === 'project' &&
                        data.projectType === 'Masters'
                )

                return allInfoData
            } else if (filterSearchOption === 'School') {
                let allInfoData = allSchoolItems.items.map((data) => {
                    return {
                        tagName: data.schoolName,
                    }
                })

                return allInfoData
            } else if (filterSearchOption === 'Award') {
                let MaDegreePrograms = [
                    { title: 'Master of Arts in Gender Studies' },
                    { title: 'Master of Arts in Human Rights' },
                    { title: 'Master of Arts in Philosophy ' },
                    { title: 'Master of Arts in Philosophy in Applied Ethics' },
                    { title: 'Master of Arts in History' },
                    { title: 'Master of Arts in Music' },
                    { title: 'Master of Arts in Peace and Conflict Studies' },
                    {
                        title: 'Master of Arts in Religious and Theological Studies(ggaba)',
                    },
                    {
                        title: 'Master of Arts in Religious and Theological Studies(kinyamasika)',
                    },
                    { title: 'Master of Arts in Development Studies' },
                    { title: 'Master of Arts in Literature' },
                    { title: 'Master of Arts in French Language Studies' },
                    { title: 'Master of Arts in Journalism and Communication' },
                    {
                        title: 'Master of Arts in Strategic and Corporate Communication',
                    },
                    { title: 'Master of Arts in Journalism and Multimedia' },
                    { title: 'Master of Arts in African Languages' },
                    { title: 'Master of Arts in Linguistics' },
                    {
                        title: 'Master of Arts in Public Administration and Management',
                    },
                    { title: 'Master of Arts in Sociology' },
                    {
                        title: 'Master of Arts in International Relations and Diplomatic Studies',
                    },
                    { title: 'Master of Arts in Rural Development' },
                    { title: 'Master of Arts in Social Work' },
                    { title: 'Master of Arts in Defense and Security Studies' },
                    { title: 'Master of Arts in Security and Strategy' },
                    { title: 'Master of Education in Educational Psychology' },
                    { title: 'Master of Arts in Organizational Psychology' },
                    { title: 'Master of Arts in Counselling Psychology' },
                    { title: 'Master of Science in Clinical Psychology' },
                    {
                        title: 'Master of Arts in Social Sector Planning and Management',
                    },
                ]

                let allInfoData = MaDegreePrograms.map((data) => ({
                    tagName: data.title,
                }))

                return allInfoData
            } else if (filterSearchOption === 'Registration') {
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
            } else if (filterSearchOption === 'Submission') {
                let allInfoData = [
                    {
                        tagName: 'normal',
                    },
                    {
                        tagName: 'resubmission',
                    },
                ]

                return allInfoData
            } else {
                return []
            }
        } else {
            return []
        }
    }, [tagsData.allTagItems.items, filterSearchOption])

    /** handle search change */
    const handleSearchState = (searchButtonStatus) => {
        setSearchButtonState(() => searchButtonStatus)
        if (searchButtonStatus === 'DefaultSearch') {
            setFilterInfo(() => [])
            setSearchWord('')
            setSearchStatus('')
            setSearchActive(() => false)
        } else {
            setFilterInfo([])
            setSearchWord('')
            setSearchStatus('')
            setSearchActive(() => false)
        }
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
                spacing='20px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{ title: 'Master Students', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'0 20px'}>
                    <Stack direction='column'>
                        {/** advanced search bar tabs */}
                        <Stack direction='row'>
                            <Box>
                                <Button
                                    onClick={() =>
                                        handleSearchState('DefaultSearch')
                                    }
                                    className={`searchState_button ${
                                        searchButtonState === 'DefaultSearch'
                                            ? 'activeSearchBtn'
                                            : ''
                                    }`}
                                    leftIcon={<BiSearch />}
                                    colorScheme={'red'}
                                    variant='solid'>
                                    Default Search
                                </Button>
                            </Box>

                            <Box>
                                <Button
                                    onClick={() =>
                                        handleSearchState('AdvSearch')
                                    }
                                    className={`searchState_button ${
                                        searchButtonState === 'AdvSearch'
                                            ? 'activeSearchBtn'
                                            : ''
                                    }`}
                                    leftIcon={<BiSearch />}
                                    colorScheme={'red'}
                                    variant='solid'>
                                    Advanced Search
                                </Button>
                            </Box>
                        </Stack>
                        {/** filter inputs && button */}
                        <Stack
                            h='50px'
                            direction='row'
                            justifyContent='space-between'
                            alignItems={'center'}>
                            {/** filter inputs */}
                            <Stack direction='column'>
                                {/** advanced search */}
                                {searchButtonState === 'AdvSearch' && (
                                    <AdvStudentSearh
                                        filterSearchOption={filterSearchOption}
                                        filterItems={filterItems}
                                        handleSearchStatusChange={
                                            handleSearchStatusChange
                                        }
                                        handleSearchOptionChange={
                                            handleSearchOptionChange
                                        }
                                        handleSearchInput={handleSearchInput}
                                        searchWord={searchWord}
                                        handleSubmitFilter={handleSubmitFilter}
                                        searchStatus={searchStatus}
                                        handleSearchActive={handleSearchActive}
                                        filterInfo={filterInfo}
                                        checkboxesFilter={checkboxesFilter}
                                        TableStatuses={TableStatuses}
                                    />
                                )}

                                {searchButtonState === 'DefaultSearch' && (
                                    <OrdStudentSearch
                                        filterSearchOption={filterSearchOption}
                                        filterItems={filterItems}
                                        handleSearchStatusChange={
                                            handleSearchStatusChange
                                        }
                                        handleSearchOptionChange={
                                            handleSearchOptionChange
                                        }
                                        handleSearchInput={handleSearchInput}
                                        searchWord={searchWord}
                                        handleSubmitFilter={handleSubmitFilter}
                                        searchStatus={searchStatus}
                                        handleSearchActive={handleSearchActive}
                                        filterInfo={filterInfo}
                                        checkboxesFilter={checkboxesFilter}
                                        TableStatuses={TableStatuses}
                                    />
                                )}
                            </Stack>

                            {/**  button */}
                            <Box>
                                <Button
                                    onClick={() =>
                                        routeNavigate(
                                            '/masters/projects/create'
                                        )
                                    }
                                    className='add_button'
                                    leftIcon={<AiOutlinePlus />}
                                    colorScheme='red'
                                    variant='solid'>
                                    New Student
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack direction='column' spacing='28px'>
                        {/** filter information */}
                        <Box>
                            <Stack direction='column'>
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

                                {filterInfo.length > 0 && (
                                    <SimpleGrid
                                        gap='20px'
                                        minChildWidth='max-content'>
                                        {filterInfo.map((data, index) => (
                                            <Box
                                                key={index}
                                                w='-webkit-fit-content'>
                                                <FilterInfoStack
                                                    direction='row'
                                                    w='-webkit-fit-content'
                                                    alignItems='center'>
                                                    <h1>{data.title}:</h1>
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
                                                                data
                                                            )
                                                        }>
                                                        <GrClose />
                                                    </Box>
                                                </FilterInfoStack>
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                )}
                            </Stack>
                        </Box>

                        {/** table & tabs */}

                        <Box>
                            <ProjectTable
                                setExportData={setExportData}
                                exportData={exportData}
                                searchActive={searchActive}
                                filterInfo={filterInfo}
                                allTagData={tagsData.allTagItems.items}
                                studentType={'masters'}
                                rpath={'/masters/projects'}
                                searchButtonState={searchButtonState}
                                searchWord={searchWord}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default AllMastersProjects

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
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

    .searchState_button {
        height: 32px;
        color: #ffffff;
        background: #edafb2;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #edafb2;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        font-size: 14px;
    }

    .activeSearchBtn {
        background: #9c3439;
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
        border-radius: 0px 6px 6px 0px;

        -webkit-user-select: none;

        :hover {
            border: 0px solid transparent;
            box-shadow: 0px;
            border-radius: 0px 6px 6px 0px;
            outline: none;
        }

        button {
            :hover {
                background: transparent;
            }
        }

        input {
            border: 0px solid transparent;
            -webkit-box-shadow: none;
        }

        select {
            border: 0px solid transparent;
            height: 32px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0px 6px 6px 0px;
            background: transparent;
            outline: none;
            -webkit-user-select: none;
            -webkit-box-shadow: none;
        }

        background: #ffffff;
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
        font-size: 12px;
        line-height: 18px;
        color: #838389;
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

    .close_icon {
        color: #838389;
        font-size: 12px;
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
