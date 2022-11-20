import React from 'react'
import styled from 'styled-components'
import { Stack, Box } from '@chakra-ui/react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

const AdvPagination = ({
    paginationFirstNumber,
    paginationLastNumber,
    overalltotal,
    perPages,
    handlePrev,
    handleNext,
    totalPages,
    currentPage,
}) => {
    return (
        <PaginationStack
            direction='row'
            height='56px'
            alignItems='center'
            justifyContent={'space-between'}>
            <Box className='pages'>
                <span>
                    {`${paginationFirstNumber}`} - {`${paginationLastNumber}`}{' '}
                    of {`${overalltotal}`}
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
                    <span>{perPages}</span>
                </Box>

                {/** pagination arrows */}
                <Stack direction='row' alignItems='center' className='arrows'>
                    <Box className='left' onClick={handlePrev}>
                        <MdKeyboardArrowLeft />
                    </Box>
                    <Box>
                        {currentPage}/{totalPages}
                    </Box>
                    <Box className='right' onClick={handleNext}>
                        <MdKeyboardArrowRight />
                    </Box>
                </Stack>
            </Stack>
        </PaginationStack>
    )
}

export default AdvPagination

const PaginationStack = styled(Stack)`
    font-family: 'Inter', sans-serif;
    .pagination {
        color: #6b7280;
        align-items: center;
        justify-content: flex-end;

        background: #ffffff;
    }
    .pages {
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
            
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
          
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 19px;

            letter-spacing: 0.3px;
            color: #111827;
        }
    }

    .arrows {
        
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
