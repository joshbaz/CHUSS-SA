/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuOptionGroup,
    MenuItemOption,
    InputGroup,
    Input,
    InputLeftElement,
    Text,
    useToast,
    SimpleGrid,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'

import { GrClose } from 'react-icons/gr'

import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    reset,
    allSupervisors,
} from '../../../store/features/supervisors/supervisorSlice'
import SupervisorTable from '../../../components/MExaminerSupervisors/AllSupervisors/SupervisorTable'

import { reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../../components/common/CustomToastFunctions/ToastFunctions'

const AllSupervisors = () => {
    const [filterSearchOption, setFilterSearchOption] =
        React.useState('Examiner Name')
    const [searchWord, setSearchWord] = React.useState('')
    const [exportData, setExportData] = React.useState([])
    const filterItems = [
        {
            title: 'Examiner Name',
        },

        {
            title: 'Email',
        },
    ]
    const [filterInfo, setFilterInfo] = React.useState([])

    const [searchActive, setSearchActive] = React.useState(false)

    /** handle search option change */
    const handleSearchOptionChange = (valuet) => {
        setSearchWord('')
        //setSearchStatus('')
        setFilterSearchOption(valuet)
    }

    const handleSearchInput = (e) => {
        e.preventDefault()

        let value = e.target.value || ''
        setSearchWord(value.toLowerCase())
        // let filterSelected = {
        //     title: filterSearchOption,
        //     searchfor: e.target.value,
        // }
        // setFilterInfo([...filterInfo, filterSelected])
    }

    const handleSubmitFilter = () => {
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

        setSearchActive(false)
        setFilterSearchOption('Examiner Name')
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

    let { isSuccess, isError, message } = useSelector(
        (state) => state.supervisor
    )

    //let Location = useLocation()

    useEffect(() => {
        toast.dismiss()
        toast.promise(
            dispatch(allSupervisors()).then((res) => {
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
    }, [])

    useEffect(() => {
        if (isError) {
            dispatch(reset())
            dispatch(areset())
        }
    }, [isSuccess, isError, message])

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
                        topbarData={{ title: 'Supervisors ', count: null }}
                    />
                </Box>

                <Stack direction='column' padding={'0 20px'}>
                    {/** filter inputs && button */}
                    <Stack
                        h='50px'
                        direction='row'
                        justifyContent='space-between'
                        alignItems={'center'}>
                        {/** filter inputs */}
                        <Stack direction='row'>
                            <Stack
                                direction='row'
                                spacing={'0px'}
                                alignItems='center'>
                                <Box>
                                    <Menu closeOnSelect={true}>
                                        <MenuButton
                                            h='32px'
                                            w='198px'
                                            className='filter_button'
                                            as={Button}
                                            variant='solid'
                                            leftIcon={<FaFilter />}
                                            rightIcon={<IoIosArrowDown />}>
                                            {filterSearchOption || 'All'}
                                        </MenuButton>
                                        <MenuList>
                                            {filterItems.map((data, index) => {
                                                if (data.subItems) {
                                                    return (
                                                        <MenuItem
                                                            padding='0'
                                                            key={index}
                                                            w='100%'>
                                                            <Menu
                                                                offset={[
                                                                    225, -40,
                                                                ]}
                                                                closeOnSelect={
                                                                    false
                                                                }>
                                                                <MenuButton
                                                                    borderRadius='none'
                                                                    _hover={{
                                                                        bg: 'gray.200',
                                                                    }}
                                                                    _expanded={{
                                                                        bg: 'gray.200',
                                                                    }}
                                                                    _focus={{
                                                                        boxShadow:
                                                                            'none',
                                                                    }}
                                                                    w='100%'
                                                                    bg='transparent'
                                                                    className='subfilter_button'
                                                                    as={Button}
                                                                    rightIcon={
                                                                        <IoIosArrowForward />
                                                                    }>
                                                                    {data.title}
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuOptionGroup
                                                                        onChange={(
                                                                            value
                                                                        ) => {
                                                                            checkboxesFilter(
                                                                                data.title,
                                                                                value
                                                                            )
                                                                        }}
                                                                        type='checkbox'>
                                                                        {data.subItems.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <MenuItemOption
                                                                                    className='menu_options'
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    value={
                                                                                        item
                                                                                    }>
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </MenuItemOption>
                                                                            )
                                                                        )}
                                                                    </MenuOptionGroup>
                                                                </MenuList>
                                                            </Menu>
                                                        </MenuItem>
                                                    )
                                                } else {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            onClick={() =>
                                                                handleSearchOptionChange(
                                                                    data.title
                                                                )
                                                            }>
                                                            {data.title}
                                                        </MenuItem>
                                                    )
                                                }
                                            })}
                                        </MenuList>
                                    </Menu>
                                </Box>

                                {/** input */}
                                <Box h='32px'>
                                    <InputGroup
                                        h='32px'
                                        minW='300px'
                                        pr='0'
                                        p='0'
                                        m='0'
                                        className='input_group'>
                                        <InputLeftElement h='32px' p='0' m='0'>
                                            <Button
                                                p='0'
                                                m='0'
                                                bg='transparent'
                                                h='100%'
                                                w='100%'
                                                borderRadius='0px'
                                                size='28px'>
                                                <BiSearch />
                                            </Button>
                                        </InputLeftElement>
                                        <Input
                                            h='32px'
                                            type='text'
                                            placeholder='Search'
                                            onChange={handleSearchInput}
                                            value={searchWord}
                                            style={{ textIndent: '5px' }}
                                        />
                                    </InputGroup>
                                </Box>
                            </Stack>

                            <TableButton>
                                <Button
                                    onClick={handleSubmitFilter}
                                    disabled={searchWord ? false : true}
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

                        {/**  button */}
                        <Box>
                            <Button
                                onClick={() =>
                                    routeNavigate(
                                        `/m-examiners/supervisors/create`
                                    )
                                }
                                className='add_button'
                                leftIcon={<AiOutlinePlus />}
                                colorScheme='red'
                                variant='solid'>
                                Add New Supervisor
                            </Button>
                        </Box>
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
                            <SupervisorTable
                                setExportData={setExportData}
                                exportData={exportData}
                                searchActive={searchActive}
                                filterInfo={filterInfo}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default AllSupervisors

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
