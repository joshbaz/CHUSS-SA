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
const TableHead = [
    {
        title: '#',
        filter: true,
    },
    { title: '' },
    {
        title: 'Type',
        filter: true,
    },
    {
        title: 'Name',
    },
    {
        title: 'email',
    },
    {
        title: 'Grade',
    },
    {
        title: 'Report Status',
    },
    {
        title: 'submission Date',
    },
    {
        title: 'files',
    },
    { title: '' },
]
const RegistrationReports = ({ values }) => {
    const [activityDrpdown, setActivityDropDown] = React.useState(false)
    const [reportLists, setReportLists] = React.useState([])
    let activeDrop = React.useRef(null)
    const handleDropDown = () => {
        setActivityDropDown(!activityDrpdown)
    }
    let routeNavigate = useNavigate()

    useEffect(() => {
        if (values !== null && values.examinerReports.length > 0) {
            let arrayData = []
            values.examinerReports.filter((data, index) => {
                let newData = { ...data }

                let examinerData2 = values.examiners.find(
                    (element) =>
                        element.examinerId._id === data.reportId.examiner
                )
                newData.examinerDetails = examinerData2

                arrayData.push(newData)
            })

            setReportLists(arrayData)
        } else {
            setReportLists([])
        }
    }, [values])
    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Registration</h1>
                    </Box>

                    <Box className={`registrationBtn`}>Add registration</Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='20px'
                    h='100%'>
                    {/*
                
                <Stack
                        w='140px'
                        direction='row'
                        alignItems='center'
                        onClick={() =>
                            routeNavigate(
                                '/projects/examiners/createreport/:s_id/:e_id'
                            )
                        }
                        style={{ cursor: 'pointer' }}>
                        <Box className='add_examiners'>
                            <AiOutlinePlus />
                        </Box>
                        <Box className='s_name'>
                            <Text>Upload Report</Text>
                        </Box>
                    </Stack>
                */}

                    {/** table */}
                    <Box>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    {TableHead.map((data, index) => {
                                        return (
                                            <Th
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
                                {reportLists.length > 0 ? (
                                    <>
                                        {reportLists.map((data, index) => {
                                            return (
                                                <>
                                                    {' '}
                                                    <Tr className='table_row'>
                                                        <Td>1</Td>
                                                        <Td w='36px'>
                                                            <Box
                                                                onClick={
                                                                    handleDropDown
                                                                }
                                                                ref={activeDrop}
                                                                style={{
                                                                    color: '#5E5C60',
                                                                    fontSize:
                                                                        '16px',
                                                                }}>
                                                                {activityDrpdown ? (
                                                                    <IoIosArrowDropdown />
                                                                ) : (
                                                                    <IoIosArrowDropright />
                                                                )}
                                                            </Box>
                                                        </Td>
                                                        <Td className='type_examiner'>
                                                            {
                                                                data
                                                                    .examinerDetails
                                                                    .examinerId
                                                                    .typeOfExaminer
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .examinerDetails
                                                                    .examinerId
                                                                    .jobtitle
                                                            }{' '}
                                                            {
                                                                data
                                                                    .examinerDetails
                                                                    .examinerId
                                                                    .name
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .examinerDetails
                                                                    .examinerId
                                                                    .email
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data.reportId
                                                                    .score
                                                            }
                                                            %
                                                        </Td>
                                                        <Td>
                                                            {' '}
                                                            <StatusItem
                                                                width='90px'
                                                                className='pending'
                                                                direction='row'
                                                                alignItems='center'>
                                                                <div />
                                                                <Text>
                                                                    {
                                                                        data
                                                                            .reportId
                                                                            .reportStatus
                                                                    }
                                                                </Text>
                                                            </StatusItem>
                                                        </Td>

                                                        <Td>
                                                            <Box className='sub_date'>
                                                                15 May 2021
                                                            </Box>
                                                        </Td>
                                                        <Td>
                                                            <Box className='files'>
                                                                {
                                                                    data
                                                                        .reportId
                                                                        .reportFiles
                                                                        .length
                                                                }
                                                            </Box>
                                                        </Td>

                                                        <Td>
                                                            <Menu>
                                                                <MenuButton>
                                                                    <Box fontSize='20px'>
                                                                        <TbDotsVertical />
                                                                    </Box>
                                                                </MenuButton>
                                                                <MenuList>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            routeNavigate(
                                                                                `/projects/examiners/updatereport/${values._id}/${data.reportId._id}`
                                                                            )
                                                                        }>
                                                                        Edit
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            routeNavigate(
                                                                                `/projects/examiners/viewreport/${values._id}/${data.reportId._id}`
                                                                            )
                                                                        }>
                                                                        View
                                                                    </MenuItem>
                                                                    <MenuItem>
                                                                        Delete
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Td>
                                                    </Tr>
                                                    {activityDrpdown && (
                                                        <Tr
                                                            position='relative'
                                                            h='200px'>
                                                            <Box h='100%'>
                                                                <TableDropDown
                                                                    w='100vw'
                                                                    bg='#ffffff'
                                                                    position='absolute'>
                                                                    <ListStack spacing='36px'>
                                                                        <Stack
                                                                            className='list-item'
                                                                            direction='row'
                                                                            w='100%'
                                                                            alignItems={
                                                                                'center'
                                                                            }>
                                                                            <Box className='icon_add'>
                                                                                <RiPencilFill />
                                                                            </Box>

                                                                            <Box className='activities'>
                                                                                <Text>
                                                                                    <span className='activity_identity'>{`{name}`}</span>{' '}
                                                                                    updated{' '}
                                                                                    <span className='activity_type'>
                                                                                        payment
                                                                                        reciept
                                                                                    </span>{' '}
                                                                                    from{' '}
                                                                                    <span className='activity_text'>
                                                                                        150000
                                                                                    </span>{' '}
                                                                                    to{' '}
                                                                                    <span className='activity_text'>
                                                                                        520,000
                                                                                        Ugx
                                                                                    </span>{' '}
                                                                                    on{' '}
                                                                                    {`{Date}`}{' '}
                                                                                    @{' '}
                                                                                    {`{time}`}
                                                                                </Text>
                                                                            </Box>
                                                                        </Stack>

                                                                        <Stack
                                                                            direction='row'
                                                                            w='100%'
                                                                            className='list-item'
                                                                            alignItems={
                                                                                'flex-start'
                                                                            }>
                                                                            <Box className='icon_stat'>
                                                                                <IoIosStats />
                                                                            </Box>

                                                                            <Stack className='activities'>
                                                                                <Box>
                                                                                    <Stack
                                                                                        spacing='5px'
                                                                                        direction='row'
                                                                                        className='activities_texts'>
                                                                                        <Text className='activity_identity'>{`{name}`}</Text>{' '}
                                                                                        <Text>
                                                                                            updated
                                                                                        </Text>
                                                                                        <span className='activity_type'>
                                                                                            status
                                                                                        </span>
                                                                                        <Text>
                                                                                            from
                                                                                        </Text>
                                                                                        <StatusItem
                                                                                            className='reviews'
                                                                                            direction='row'
                                                                                            alignItems='center'>
                                                                                            <div />
                                                                                            <Text>
                                                                                                {' '}
                                                                                                In
                                                                                                Review
                                                                                            </Text>
                                                                                        </StatusItem>
                                                                                        <Text>
                                                                                            to
                                                                                        </Text>
                                                                                        <StatusItem
                                                                                            className='approved'
                                                                                            direction='row'
                                                                                            alignItems='center'>
                                                                                            <div />
                                                                                            <Text>
                                                                                                Approved
                                                                                                Viva
                                                                                            </Text>
                                                                                        </StatusItem>
                                                                                        <Text>
                                                                                            on{' '}
                                                                                            {`{Date}`}{' '}
                                                                                            @{' '}
                                                                                            {`{time}`}
                                                                                        </Text>
                                                                                    </Stack>
                                                                                </Box>

                                                                                <Stack
                                                                                    className='status_update'
                                                                                    direction='row'
                                                                                    alignItems={
                                                                                        'center'
                                                                                    }>
                                                                                    <Box>
                                                                                        <CgNotes />
                                                                                    </Box>

                                                                                    <Box>
                                                                                        <Text>
                                                                                            This
                                                                                            is
                                                                                            a
                                                                                            note,
                                                                                            user
                                                                                            fills
                                                                                            in
                                                                                            while
                                                                                            changing
                                                                                            the
                                                                                            status,
                                                                                            which
                                                                                            explains
                                                                                            the
                                                                                            current
                                                                                            project
                                                                                            status.
                                                                                        </Text>
                                                                                    </Box>
                                                                                </Stack>
                                                                            </Stack>
                                                                        </Stack>

                                                                        <Stack
                                                                            direction='row'
                                                                            w='100%'
                                                                            alignItems={
                                                                                'center'
                                                                            }
                                                                            className='list-item'>
                                                                            <Box className='icon_create'>
                                                                                <AiOutlinePlus />
                                                                            </Box>

                                                                            <Box className='activities'>
                                                                                <Text>
                                                                                    <span className='activity_identity'>{`{name}`}</span>{' '}
                                                                                    created{' '}
                                                                                    <span className='activity_type'>
                                                                                        project
                                                                                    </span>{' '}
                                                                                    on{' '}
                                                                                    {`{Date}`}{' '}
                                                                                    @{' '}
                                                                                    {`{time}`}
                                                                                </Text>
                                                                            </Box>
                                                                        </Stack>
                                                                    </ListStack>
                                                                </TableDropDown>
                                                            </Box>
                                                        </Tr>
                                                    )}
                                                </>
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
                        </Table>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export default RegistrationReports

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

    .registrationBtn {
        padding: 6px 12px;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        color: #ffffff;
        letter-spacing: 0.02em;
        cursor: pointer;
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

    .s_name {
        color: #5e5c60;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }
    .form_subtitle {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
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

    .sub_date {
        height: 20px;
        color: #3a3a43;
        font-family: 'Inter', sans-serif;
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

    .files {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .type_examiner {
        color: #15151d;
        font-weight: 500;
        font-size: 12px;
        letter-spacing: 0.02em;
        text-transform: uppercase;
    }
`

const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;

    div {
        border-radius: 2px;
        width: 6px;
        height: 6px;
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
    }
`

const TableDropDown = styled(Stack)`
    padding: 10px 0 0 52px;
    .icon_add,
    .icon_stat,
    .icon_create {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: gray;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        z-index: 10;
        border: 6px solid #ffffff;
    }

    .icon_add {
        background: #fbd2d4;
        color: #f14c54;
    }

    .icon_stat {
        background: #ccddff;
        color: #2264e6;
    }

    .icon_create {
        background: #d4d4d6;
        color: #5e5c60;
    }

    .activities {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #5e5c60;
    }

    .activity_identity {
        color: #171c26;
    }
    .activity_type {
        color: #f14c54;
    }
    .activity_text {
        color: #171c26;
    }
`

const ListStack = styled(Stack)`
    position: relative;
    height: 100%;
    list-style-type: none;
    z-index:10;
  .list-item {
        display: flex;
        padding: 0px 0px;
        flex-basis: 0;
        -webkit-box-flex: 0
        -ms-flex-positive: 0;
        flex-grow: 0;
        width: 100%;
        min-width: 170px;
        padding-bottom: 0px;

    }
    .list-item + .list-item:after {
        content: '';
        position: absolute;
        left: 19px;
        top: 0;
        background: #D5DBE5;
        width: 2px;
        height: 100%;
        transform: translateY(0%);
        z-index:-2;
       
    }

    .status_update {
        border-left: 1px solid  #D5DBE5;
        padding-left: 10px;
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
