import React from 'react'
import {
    Box,
    Stack,
    Button,
    Menu,
    MenuButton,
    InputGroup,
    Input,
    InputLeftElement,
} from '@chakra-ui/react'
import styled from 'styled-components'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

const OrdStudentSearch = ({
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
                        leftIcon={<FaFilter />}>
                        {'Find Student'}
                    </MenuButton>
                </Menu>
            </Box>

            {/** input */}
            <Box h='32px'>
                <InputGroup
                    h='32px'
                    minW='400px'
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
    )
}

export default OrdStudentSearch

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
