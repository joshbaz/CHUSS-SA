/* eslint-disable array-callback-return */
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
import Moments from 'moment-timezone'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

const TableHead = [
    {
        title: '#',
        filter: true,
    },
    //{ title: '' },
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
        title: 'creation Date',
    },
    {
        title: 'submission Date',
    },
    {
        title: 'files',
    },
    { title: '' },
]
const ExaminersReports = ({ values, rlink, sNames }) => {
    // eslint-disable-next-line no-unused-vars
    const [reportLists, setReportLists] = React.useState([])
    const [normalReports, setNormalReports] = React.useState([])
    const [resubmissionReports, setResubmissionReports] = React.useState([])

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

            const filterNormal = arrayData.filter(
                (data) => data.submissionType === 'normal'
            )

            const filterResubmission = arrayData.filter(
                (data) => data.submissionType === 'resubmission'
            )

            setNormalReports(filterNormal)
            setResubmissionReports(filterResubmission)

            setReportLists(arrayData)
        } else {
            setReportLists([])
            setNormalReports([])
            setResubmissionReports([])
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
                        <h1>Examiners reports</h1>
                    </Box>
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
                    <Stack direction='column' spacing='40px'>
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
                                {normalReports.length > 0 ? (
                                    <>
                                        {normalReports.map((data, index) => {
                                            let submissionDate = data.reportId
                                                .submissionDate
                                                ? Moments(
                                                      data.reportId
                                                          .submissionDate
                                                  )
                                                      .tz('Africa/Kampala')
                                                      .format('DD MMM Y')
                                                : '-'

                                            let creationDate = data.reportId
                                                .creationDate
                                                ? Moments(
                                                      data.reportId.creationDate
                                                  )
                                                      .tz('Africa/Kampala')
                                                      .format('DD MMM Y')
                                                : '-'

                                            // let submissionDate
                                            // let datef= Moments('2022-10-4')
                                            // let datey =
                                            //     Moments().tz('Africa/Kampala')
                                            // submissionDate = datey.diff(
                                            //     datef,
                                            //     'months'
                                            // )
                                            return (
                                                <Tr
                                                    key={index}
                                                    className='table_row'>
                                                    <Td>{index + 1}</Td>
                                                    {/**<Td w='36px'>
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
                                                        </Td>**/}
                                                    <Td className='type_examiner'>
                                                        {
                                                            data.examinerDetails
                                                                .examinerId
                                                                .typeOfExaminer
                                                        }
                                                    </Td>
                                                    <Td>
                                                        {
                                                            data.examinerDetails
                                                                .examinerId
                                                                .jobtitle
                                                        }{' '}
                                                        {
                                                            data.examinerDetails
                                                                .examinerId.name
                                                        }
                                                    </Td>
                                                    <Td>
                                                        {
                                                            data.examinerDetails
                                                                .examinerId
                                                                .email
                                                        }
                                                    </Td>
                                                    <Td>
                                                        {data.reportId.score}%
                                                    </Td>
                                                    <Td>
                                                        {' '}
                                                        <StatusItem
                                                            width='90px'
                                                            className={data.reportId.reportStatus.toLowerCase()}
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
                                                            {creationDate}
                                                        </Box>
                                                    </Td>

                                                    <Td>
                                                        <Box className='sub_date'>
                                                            {submissionDate}
                                                        </Box>
                                                    </Td>
                                                    <Td>
                                                        <Box className='files'>
                                                            {
                                                                data.reportId
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
                                                                            `${rlink}/projects/examiners/updatereport/${values._id}/${data.reportId._id}`
                                                                        )
                                                                    }>
                                                                    Edit Report
                                                                </MenuItem>
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        routeNavigate(
                                                                            `${rlink}/projects/examiners/viewreport/${values._id}/${data.reportId._id}`
                                                                        )
                                                                    }>
                                                                    View Report
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>
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
                        </Table>

                        {resubmissionReports.length > 0 && (
                            <Stack direction='column' spacing='10px'>
                                <Box className='rreports_title'>
                                    {' '}
                                    Examiner Reports For Resubmission
                                </Box>
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
                                                            alignItems={
                                                                'center'
                                                            }>
                                                            <Text>
                                                                {data.title}
                                                            </Text>

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
                                        {resubmissionReports.length > 0 ? (
                                            <>
                                                {resubmissionReports.map(
                                                    (data, index) => {
                                                        let submissionDate =
                                                            data.reportId
                                                                .submissionDate
                                                                ? Moments(
                                                                      data
                                                                          .reportId
                                                                          .submissionDate
                                                                  )
                                                                      .tz(
                                                                          'Africa/Kampala'
                                                                      )
                                                                      .format(
                                                                          'DD MMM Y'
                                                                      )
                                                                : '-'

                                                        let creationDate = data
                                                            .reportId
                                                            .creationDate
                                                            ? Moments(
                                                                  data.reportId
                                                                      .creationDate
                                                              )
                                                                  .tz(
                                                                      'Africa/Kampala'
                                                                  )
                                                                  .format(
                                                                      'DD MMM Y'
                                                                  )
                                                            : '-'
                                                        return (
                                                            <Tr
                                                                key={index}
                                                                className='table_row'>
                                                                <Td>
                                                                    {index + 1}
                                                                </Td>
                                                                {/**<Td w='36px'>
                                                                    <Box
                                                                        onClick={
                                                                            handleDropDown
                                                                        }
                                                                        ref={
                                                                            activeDrop
                                                                        }
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
                                                                        </Td>**/}
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
                                                                        data
                                                                            .reportId
                                                                            .score
                                                                    }
                                                                    %
                                                                </Td>
                                                                <Td>
                                                                    {' '}
                                                                    <StatusItem
                                                                        width='90px'
                                                                        className={data.reportId.reportStatus.toLowerCase()}
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
                                                                        {
                                                                            creationDate
                                                                        }
                                                                    </Box>
                                                                </Td>

                                                                <Td>
                                                                    <Box className='sub_date'>
                                                                        {
                                                                            submissionDate
                                                                        }
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
                                                                                        `${rlink}/projects/examiners/updatereport/${values._id}/${data.reportId._id}`
                                                                                    )
                                                                                }>
                                                                                Edit
                                                                                Report
                                                                            </MenuItem>
                                                                            <MenuItem
                                                                                onClick={() =>
                                                                                    routeNavigate(
                                                                                        `${rlink}/projects/examiners/viewreport/${values._id}/${data.reportId._id}`
                                                                                    )
                                                                                }>
                                                                                View
                                                                                Report
                                                                            </MenuItem>
                                                                        </MenuList>
                                                                    </Menu>
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
                                                borderBottom={
                                                    '1px solid #E1FCEF'
                                                }>
                                                <Box>
                                                    <NoItems>
                                                        No Records Found
                                                    </NoItems>
                                                </Box>
                                            </Tr>
                                        )}
                                    </Tbody>
                                </Table>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default ExaminersReports

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

        border-bottom: 1px solid #d1d5db;
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

    .s_name {
        color: #5e5c60;

        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }
    .form_subtitle {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    .table_head {
        color: #5e5c60 !important;

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

    .rreports_title {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
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
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
    }
`

const NoItems = styled(Box)`
    font-family: 'Inter', sans-serif;
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`
