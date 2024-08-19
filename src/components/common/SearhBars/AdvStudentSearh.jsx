import React from 'react'
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
    Select,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

const AdvStudentSearh = ({
    filterSearchOption,
    filterItems,
    handleSearchStatusChange,
    handleSearchOptionChange,
    handleSearchInput,
    searchWord,
    handleSubmitFilter,
    searchStatus,
    handleSearchActive,
    filterInfo,
    checkboxesFilter,
    TableStatuses,
}) => {
    return (
        <Stack direction='row' spacing={'5px'} alignItems='center'>
            <Box>
                <Menu closeOnSelect={true}>
                    <MenuButton
                        h='32px'
                        w='188px'
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
                                    <MenuItem padding='0' key={index} w='100%'>
                                        <Menu
                                            offset={[225, -40]}
                                            closeOnSelect={false}>
                                            <MenuButton
                                                borderRadius='none'
                                                _hover={{
                                                    bg: 'gray.200',
                                                }}
                                                _expanded={{
                                                    bg: 'gray.200',
                                                }}
                                                _focus={{
                                                    boxShadow: 'none',
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
                                                    onChange={(value) => {
                                                        checkboxesFilter(
                                                            data.title,
                                                            value
                                                        )
                                                    }}
                                                    type='checkbox'>
                                                    {data.subItems.map(
                                                        (item, index) => (
                                                            <MenuItemOption
                                                                className='menu_options'
                                                                key={index}
                                                                value={item}>
                                                                {item}
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
                                            handleSearchOptionChange(data.title)
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
                {filterSearchOption === 'Registration' ||
                filterSearchOption === 'Submission' ||
                filterSearchOption === 'Status' ||
                filterSearchOption === 'School' ||
                filterSearchOption === 'Award' ? (
                    <InputGroup
                        h='32px'
                        minW='300px'
                        maxW='300px'
                        pr=''
                        p='0'
                        pl='30px'
                        m='0'
                        className='input_group'>
                        <InputLeftElement h='32px' bg='transparent' p='0' m='0'>
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
                        {TableStatuses.length > 0 ? (
                            <Select
                                placeholder={
                                    filterSearchOption === 'School' ||
                                    filterSearchOption === 'Award'
                                        ? 'select option'
                                        : 'select status'
                                }
                                onChange={handleSearchStatusChange}
                                value={searchStatus}>
                                {TableStatuses.map((data, index) => {
                                    return (
                                        <option key={index}>
                                            {data.tagName.toLowerCase()}
                                        </option>
                                    )
                                })}
                            </Select>
                        ) : (
                            <Select placeholder='select status'></Select>
                        )}
                    </InputGroup>
                ) : (
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
                )}
            </Box>

            <TableButton>
                <Button
                    onClick={handleSubmitFilter}
                    disabled={searchWord || searchStatus ? false : true}
                    leftIcon={<AiOutlinePlus />}
                    className='btn__rule'>
                    Add Rule
                </Button>
            </TableButton>
            <TableButton>
                <Button
                    onClick={handleSearchActive}
                    disabled={filterInfo.length > 0 ? false : true}
                    className='btn__print'>
                    Search
                </Button>
            </TableButton>
        </Stack>
    )
}

export default AdvStudentSearh


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
