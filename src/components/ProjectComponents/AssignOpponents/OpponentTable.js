import React, { useEffect } from 'react'
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
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Checkbox,
    Flex,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import {
    IoIosArrowDropright,
    IoIosArrowDropdown,
    IoIosStats,
} from 'react-icons/io'
import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { RiPencilFill } from 'react-icons/ri'
import { CgNotes } from 'react-icons/cg'
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdVerified,
} from 'react-icons/md'
const TableHead = [
    {
        title: '#',
        filter: true,
    },
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
}) => {
    const [activityDrpdown, setActivityDropDown] = React.useState(false)
    const [pexaminers, setPExaminers] = React.useState({
        currentPage: 0,
        perPage: 8,
        current_total: 0,
        overall_total: 0,
        items: [],
        allItems: [],
    })
    const [examinerLists, setExaminerLists] = React.useState([])

    let routeNavigate = useNavigate()

    useEffect(() => {}, [])
    console.log(allExaminerItems)
    console.log(selectedExaminers, 'seke')
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
        pexaminers.currentPage * pexaminers.perPage - pexaminers.perPage + 1

    let PaginationLastNumber =
        PaginationFirstNumber + pexaminers.current_total - 1

    const handlePrev = () => {}

    const handleNext = () => {}
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
                    <Box>
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
                                                let selectionColor = checkData
                                                    ? '#fef9ef'
                                                    : ''
                                                let checkedStatus = checkData
                                                    ? true
                                                    : false

                                                return (
                                                    <Tr
                                                        className='table_row'
                                                        bg={selectionColor}
                                                        key={index}>
                                                        <Td>
                                                            <Checkbox
                                                                colorScheme='pink'
                                                                onChange={(e) =>
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
                                                        <Td>1</Td>
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
                                                        <Td>{data.email}</Td>
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
                                            <NoItems>No Records Found</NoItems>
                                        </Box>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>

                    {/** Pagination */}
                    {examinerLists.length > 0 && (
                        <PaginationStack
                            direction='row'
                            height='56px'
                            alignItems='center'
                            justifyContent={'space-between'}>
                            <Box className='pages'>
                                <span>
                                    {`${PaginationFirstNumber}`} -{' '}
                                    {`${PaginationLastNumber}`} of{' '}
                                    {`${pexaminers.overall_total}`}
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
                                    <span>{pexaminers.perPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box className='left' onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>{pexaminers.currentPage}</Box>
                                    <Box className='right' onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Stack>
            </Box>
        </Container>
    )
}

export default OpponentTable

const Container = styled(Box)`
    font-family: 'Inter';

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
        font-family: 'Inter';
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
        font-family: 'Inter';
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
`

const NoItems = styled(Box)`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter';
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
        font-family: Inter;
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
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
            font-family: Inter;
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
