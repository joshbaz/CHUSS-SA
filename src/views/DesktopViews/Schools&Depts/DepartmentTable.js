/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import { BiDownload } from 'react-icons/bi'
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
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import { AiOutlineMinus } from 'react-icons/ai'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

import { TbDotsVertical } from 'react-icons/tb'
//import { useNavigate } from 'react-router-dom'

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import Moments from 'moment-timezone'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteDepartment,
    reset,
} from '../../../store/features/schools/schoolSlice'

const TableHead = [
    // {
    //     title: '#',
    //     filter: true,
    // },
    {
        title: 'Department Name',
        filter: true,
    },
    {
        title: 'Dept Head',
    },
    {
        title: 'Office Number',
    },
    {
        title: 'Mobile Number',
    },
    {
        title: 'Email',
    },
    {
        title: 'Date Added',
    },
]

const DepartmentTable = ({
    setAllDisplayData,
    allDisplayData,
    setExportData,
    exportData,
    activateEdit,
    activateView,
    schoolName,
    schoolId,
}) => {
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    let dispatch = useDispatch()
    let toast = useToast()
    //let routeNavigate = useNavigate()
    let { message, isSuccess, isError } = useSelector((state) => state.school)
    /** pagination */
    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

    const handlePrev = () => {
        if (allDisplayData.currentPage - 1 >= 1) {
            let page = allDisplayData.currentPage - 1
            const indexOfLastItem = page * allDisplayData.itemsPerPage
            const indexOfFirstItem =
                indexOfLastItem - allDisplayData.itemsPerPage

            const currentItems = allDisplayData.allItems.slice(
                indexOfFirstItem,
                indexOfLastItem
            )

            setAllDisplayData({
                ...allDisplayData,
                currentPage: page,
                itemsPerPage: allDisplayData.itemsPerPage,
                items: currentItems,
                totalItemsDisplayed: currentItems.length,
            })
        }
    }

    const handleNext = () => {
        if (allDisplayData.currentPage + 1 <= allDisplayData.totalPages) {
            let page = allDisplayData.currentPage + 1
            const indexOfLastItem = page * allDisplayData.itemsPerPage
            const indexOfFirstItem =
                indexOfLastItem - allDisplayData.itemsPerPage

            const currentItems = allDisplayData.allItems.slice(
                indexOfFirstItem,
                indexOfLastItem
            )

            setAllDisplayData(() => ({
                ...allDisplayData,
                currentPage: page,
                itemsPerPage: allDisplayData.itemsPerPage,
                items: currentItems,
                totalItemsDisplayed: currentItems.length,
            }))
        }
    }

    /** function to handle data exportation */
    const handleExportation = async () => {
        if (exportData.length > 0) {
            let values = {
                tableName: schoolName,
                data: exportData,
            }
            await window.electronAPI.exportDepartmentsCSV(values)
        }
    }

    /** function to handle checkbox on each item */
    const handleIndivCheckbox = (e, data) => {
        if (exportData.length > 0) {
            let checkData = exportData.some(
                (datacheck, index) => data.departmentId._id === datacheck._id
            )

            if (checkData) {
                let newChecksData = [...exportData]
                for (
                    let iteration = 0;
                    iteration < newChecksData.length;
                    iteration++
                ) {
                    if (
                        newChecksData[iteration]._id === data.departmentId._id
                    ) {
                        newChecksData.splice(iteration, 1)
                        setExportData([...newChecksData])

                        return
                    }
                }
            } else {
                setExportData([
                    ...exportData,
                    {
                        _id: data.departmentId._id,
                        deptName: data.departmentId.deptName,
                        deptHead: data.departmentId.deptHead,
                        email: data.departmentId.email,
                        officeNumber: data.departmentId.officeNumber,
                        creationDate: data.departmentId.creationDate,
                    },
                ])
            }
        } else {
            setExportData([
                {
                    _id: data.departmentId._id,
                    deptName: data.departmentId.deptName,
                    deptHead: data.departmentId.deptHead,
                    email: data.departmentId.email,
                    officeNumber: data.departmentId.officeNumber,
                    creationDate: data.departmentId.creationDate,
                },
            ])
        }
    }

    /** function to handle general checkbox */
    const handleGeneralCheckbox = (e) => {
        if (e.target.checked) {
            if (allDisplayData.allItems.length > 0) {
                let newDataToSave = allDisplayData.allItems.map((data) => {
                    return {
                        _id: data.departmentId._id,
                        deptName: data.departmentId.deptName,
                        deptHead: data.departmentId.deptHead,
                        email: data.departmentId.email,
                        officeNumber: data.departmentId.officeNumber,
                        creationDate: data.departmentId.creationDate,
                    }
                })

                setExportData(newDataToSave)
            }
        } else {
            setExportData([])
        }
    }

    /** HANDLE DEPARTMENT DELETION */
    const handleRemove = (ppId, name) => {
        if (ppId && name) {
            let rvalues = {
                name: name,
                deptId: ppId,
                schoolId: schoolId,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.deptId && removeDetails.schoolId) {
            dispatch(deleteDepartment(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
            dispatch(reset())
        }
        if (isSuccess && message && isSubmittingp) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setRemoveActive(false)
            setRemoveDetails(null)

            dispatch(reset())
        }

        dispatch(reset())
    }, [isSuccess, message, isSubmittingp, isError])
    return (
        <Container>
            {' '}
            <Box className='form_container'>
                {/** details */}
                <Stack
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='10px'
                    h='100%'>
                    <Stack
                        direction='row'
                        alignItems={'flex-end'}
                        justifyContent={'space-between'}>
                        <Box></Box>
                        <SearchActivity direction='row' alignItems='center'>
                            <TableButton>
                                <Button
                                    onClick={handleExportation}
                                    leftIcon={<BiDownload />}
                                    disabled={
                                        exportData.length > 0 ? false : true
                                    }
                                    className='btn__print'>
                                    Export
                                </Button>
                            </TableButton>
                        </SearchActivity>
                    </Stack>
                    {/** table */}
                    <Box minH='48vh'>
                        <Table size='sm'>
                            <Thead>
                                <Tr>
                                    <Th w='46px'>
                                        <Checkbox
                                            isChecked={
                                                exportData.length > 0
                                                    ? true
                                                    : false
                                            }
                                            onChange={handleGeneralCheckbox}
                                            bg='#ffffff'
                                            icon={<AiOutlineMinus />}
                                            colorScheme='pink'
                                        />
                                    </Th>
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
                                    <Th></Th>
                                </Tr>
                            </Thead>

                            <Tbody>
                                {allDisplayData.items.length > 0 ? (
                                    <>
                                        {allDisplayData.items.map(
                                            (data, index) => {
                                                let checkData = exportData.find(
                                                    (element) =>
                                                        element._id ===
                                                        data.departmentId._id
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
                                                        key={
                                                            data.departmentId
                                                                ._id
                                                        }>
                                                        <Td w='46px'>
                                                            <Checkbox
                                                                isChecked={
                                                                    checkedStatus
                                                                }
                                                                onChange={(e) =>
                                                                    handleIndivCheckbox(
                                                                        e,
                                                                        data
                                                                    )
                                                                }
                                                                colorScheme='pink'
                                                            />
                                                        </Td>
                                                        {/** <Td>1</Td> */}

                                                        <Td>
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .deptName
                                                            }{' '}
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .deptHead
                                                            }
                                                        </Td>

                                                        <Td>
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .officeNumber
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .mobileNumber
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .email
                                                            }
                                                            <br />
                                                            {
                                                                data
                                                                    .departmentId
                                                                    .otherEmail
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {data.departmentId
                                                                .creationDate
                                                                ? Moments(
                                                                      data
                                                                          .departmentId
                                                                          .creationDate
                                                                  )
                                                                      .tz(
                                                                          'Africa/Kampala'
                                                                      )
                                                                      .format(
                                                                          'DD MMM Y'
                                                                      )
                                                                : ''}
                                                        </Td>

                                                        <Td>
                                                            <Menu>
                                                                <MenuButton>
                                                                    <Box fontSize='20px'>
                                                                        <TbDotsVertical />
                                                                    </Box>
                                                                </MenuButton>
                                                                <MenuList
                                                                    zIndex={
                                                                        '10'
                                                                    }>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            activateEdit(
                                                                                data
                                                                            )
                                                                        }>
                                                                        Edit
                                                                        Department
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            activateView(
                                                                                data
                                                                            )
                                                                        }>
                                                                        View
                                                                        Department
                                                                    </MenuItem>

                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            handleRemove(
                                                                                data
                                                                                    .departmentId
                                                                                    ._id,
                                                                                data
                                                                                    .departmentId
                                                                                    .deptName
                                                                            )
                                                                        }>
                                                                        Delete
                                                                        Department
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
                                        borderBottom={'1px solid #E1FCEF'}>
                                        <Box>
                                            <NoItems>No Records Found</NoItems>
                                        </Box>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>

                    {allDisplayData.items.length > 0 && (
                        <PaginationStack
                            direction='row'
                            height='56px'
                            alignItems='center'
                            justifyContent={'space-between'}>
                            <Box className='pages'>
                                <span>
                                    {`${PaginationFirstNumber}`} -{' '}
                                    {`${PaginationLastNumber}`} of{' '}
                                    {`${allDisplayData.totalAllItems}`}
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
                                    <span>{allDisplayData.itemsPerPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box className='left' onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>
                                        {' '}
                                        {allDisplayData.currentPage}/
                                        {allDisplayData.totalPages}
                                    </Box>
                                    <Box className='right' onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Stack>
            </Box>
            {/** handle delete registration */}
            <Modal
                w='100vw'
                isOpen={removeActive}
                p='0'
                onClose={() => cancelRemoveUpload()}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <PopupForm
                            p='0px'
                            direction='column'
                            spacing='0'
                            justifyContent='space-between'>
                            <Stack direction='column' spacing={'10px'} h='50%'>
                                <Stack
                                    className='pop_title'
                                    direction='row'
                                    w='100%'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box>
                                        <h1>Delete Department</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to delete
                                        <span>
                                            <li>
                                                {removeDetails !== null &&
                                                    removeDetails.name}
                                            </li>
                                        </span>
                                        from the system.
                                    </p>
                                </Stack>
                            </Stack>
                            <Stack
                                p='0px 20px'
                                h='65px'
                                bg='#ffffff'
                                direction='row'
                                borderTop='1px solid #E9EDF5'
                                borderRadius='0 0 8px 8px'
                                justifyContent='flex-end'
                                alignItems='center'>
                                <Button
                                    variant='outline'
                                    className='cancel_button'
                                    onClick={() => cancelRemoveUpload()}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onRemoveUpload}
                                    disabled={false}
                                    isLoading={isSubmittingp ? true : false}
                                    className='apply_button'>
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default DepartmentTable

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

    .examiner_item {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #3a3a43;
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
        height: 28px;
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

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    font-family: 'Inter', sans-serif;
    span {
        margin: 0 5px;
    }

    .pop_title {
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

    .list_text {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        li {
            list-style: none;
            display: inline-block;
            font-weight: 700;
            color: #20202a;
        }
        li:after {
            content: ', ';
            padding-right: 10px;
        }
        li:last-child:after {
            content: '';
            padding-right: 0px;
        }
    }

    input {
        border-radius: 6px;
        width: 100%;
        font-style: normal;
        font-weight: 500;

        line-height: 20px;
    }
    .cancel_button {
        padding: 6px 12px;
        height: 32px;
        color: #464f60;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
    }
    .apply_button {
        height: 32px;
        padding: 6px 12px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 0.02em;

        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;

        &:hover {
            background: #f4797f;
        }
    }
`
