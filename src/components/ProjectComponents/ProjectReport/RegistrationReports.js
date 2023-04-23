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
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useToast,
    Button,
} from '@chakra-ui/react'
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'

import { TbDotsVertical } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'

import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import RegistrationRpCreatePopup from './RegistrationRpCreatePopup'
//import RegistrationRpEditPopup from './RegistrationRpEditPopup'
import RegistrationRpViewPopup from './RegistrationRpViewPopup'
import Moments from 'moment-timezone'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

import {
    removeRegistration,
    reset,
} from '../../../store/features/registration/registrationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_API_2 } from '../../../utils/base_url.config'
const TableHead = [
    {
        title: '#',
        filter: true,
    },

    {
        title: 'Registration Type',
        filter: true,
    },
    {
        title: 'Date',
    },
    {
        title: 'Semester',
    },
    {
        title: 'Academic Year',
    },

    {
        title: 'files',
    },
    { title: '' },
]
const RegistrationReports = ({ values, yearData, nameValues = 'student' }) => {
    const [reportLists, setReportLists] = React.useState([])
    const [projectId, setProjectId] = React.useState(null)
    const [createRegister, setCreateRegister] = React.useState(false)
    //const [editRegister, setEditRegister] = React.useState(false)
    const [viewRegister, setViewRegister] = React.useState(false)
    const [viewData, setViewData] = React.useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = React.useState(null)

    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    // let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, message, isError } = useSelector(
        (state) => state.registration
    )
    const handleRemove = (regId, type) => {
        if (values._id && regId) {
            let rvalues = {
                regId: regId,
                type: type,
                projectId: values._id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.projectId && removeDetails.regId) {
            dispatch(removeRegistration(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    useEffect(() => {
        if (values !== null && values.registration.length > 0) {
            setReportLists(values.registration)
        } else {
            setReportLists([])
        }
    }, [values])

    useEffect(() => {
        if (values !== null && values._id) {
            setProjectId(values._id)
        } else {
            setProjectId(null)
        }
    }, [values])

    /** function to activate add register */
    const activateAddRegister = () => {
        if (projectId !== null) {
            setCreateRegister(true)
        }
    }

    /** function to cancel create submission */
    const cancelCreateUpload = () => {
        setCreateRegister(false)

        // onClose()
    }

    /** function to activate add register */
    const activateViewRegister = (data) => {
        if (projectId !== null) {
            setViewData(() => data)
            setViewRegister(true)
        }
    }

    /** function to cancel create submission */
    const cancelViewUpload = () => {
        setViewRegister(false)

        // onClose()
    }

    //size format
    const formatSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (
            (size / Math.pow(1024, i)).toFixed(2) * 1 +
            ' ' +
            ['B', 'KB', 'MB', 'GB', 'TB'][i]
        )
    }

    /** function to download file */
    const handleDownloadFile = async (data) => {
        const dataGiven = await window.electronAPI.getdownloadFile(data.fileId)

        if (!dataGiven.message) {
            let newData = {
                ...dataGiven,
            }
            if (nameValues !== null) {
                let newNameValue = nameValues.toString().split(' ')[0]

                newData = {
                    ...newData,
                    name: newNameValue,
                    filename: data.fileName ? data.fileName : 'registration',
                }
            } else {
            }

            const performDowload = await window.electronAPI.downloadFile(
                newData
            )

            if (performDowload.message) {
                // alert(performDowload.message)
            }
        }
    }

    /** function to handle viewing file */
    const handleFileView = async (data) => {
        // const dataGiven = await window.electronAPI.getViewFile(
        //     data.files.fileId
        // )

        const dataGiven = 'herer'

        setSelectedFile([
            {
                uri: `${BASE_API_2}/docs/files/${data.fileId}`,
                fileType: data.fileType,
                fileData: new ArrayBuffer(dataGiven),
            },
        ])
        onOpen()
    }

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, message, isSubmittingp, isError])
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

                    <SubmitButton as='button' onClick={activateAddRegister}>
                        Add Registration
                    </SubmitButton>
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
                                            let size

                                            if (
                                                data.registrationId
                                                    .registrationfile
                                            ) {
                                                size = formatSize(
                                                    parseInt(
                                                        data.registrationId
                                                            .registrationfile
                                                            .fileSize
                                                    )
                                                )
                                            }

                                            return (
                                                <>
                                                    {' '}
                                                    <Tr className='table_row'>
                                                        <Td>{index + 1}</Td>

                                                        <Td className='type_examiner'>
                                                            {
                                                                data
                                                                    .registrationId
                                                                    .registrationtype
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {data.registrationId
                                                                .date
                                                                ? Moments(
                                                                      data
                                                                          .registrationId
                                                                          .date
                                                                  )
                                                                      .tz(
                                                                          'Africa/Kampala'
                                                                      )
                                                                      .format(
                                                                          'DD MMM Y'
                                                                      )
                                                                : '-'}
                                                        </Td>
                                                        <Td>
                                                            <Box className='sub_date'>
                                                                {
                                                                    data
                                                                        .registrationId
                                                                        .semester
                                                                }
                                                            </Box>
                                                        </Td>
                                                        <Td>
                                                            <Box className='sub_date'>
                                                                {
                                                                    data
                                                                        .registrationId
                                                                        .academicYear
                                                                }
                                                            </Box>
                                                        </Td>
                                                        <Td>
                                                            {data.registrationId
                                                                .registrationfile ? (
                                                                <FileStack className='fileview'>
                                                                    <Stack
                                                                        direction='row'
                                                                        justifyContent='space-between'
                                                                        alignItems='center'
                                                                        h='100%'>
                                                                        <Stack
                                                                            spacing='10px'
                                                                            direction='row'
                                                                            justifyContent={
                                                                                'center'
                                                                            }
                                                                            alignItems='center'>
                                                                            <Box className='icon_wrap '>
                                                                                <Stack
                                                                                    w='30px'
                                                                                    h='30px'
                                                                                    p='10px'
                                                                                    spacing='0px'
                                                                                    direction='column'
                                                                                    justifyContent='center'
                                                                                    alignItems={
                                                                                        'center'
                                                                                    }
                                                                                    className={`icon_stack ${data.registrationId.registrationfile.fileExtension}`}>
                                                                                    <Box className='icon_stack_icon'>
                                                                                        <BsFileEarmark />
                                                                                    </Box>
                                                                                    <Box className='icon_stack_text'>
                                                                                        {
                                                                                            data
                                                                                                .registrationId
                                                                                                .registrationfile
                                                                                                .fileExtension
                                                                                        }
                                                                                    </Box>
                                                                                </Stack>
                                                                            </Box>
                                                                            <Stack
                                                                                direction='column'
                                                                                spacing='0px'>
                                                                                <Box
                                                                                    className='filename'
                                                                                    maxW='170px'>
                                                                                    {
                                                                                        data
                                                                                            .registrationId
                                                                                            .registrationfile
                                                                                            .fileName
                                                                                    }
                                                                                </Box>

                                                                                <Box className='filesize'>
                                                                                    {
                                                                                        size
                                                                                    }
                                                                                </Box>
                                                                            </Stack>
                                                                        </Stack>

                                                                        <Box>
                                                                            <Menu>
                                                                                <MenuButton>
                                                                                    <Box color='#838389'>
                                                                                        <BsThreeDots />
                                                                                    </Box>
                                                                                </MenuButton>

                                                                                <MenuList>
                                                                                    <MenuItem
                                                                                        onClick={() =>
                                                                                            handleFileView(
                                                                                                data
                                                                                                    .registrationId
                                                                                                    .registrationfile
                                                                                            )
                                                                                        }
                                                                                        fontSize={
                                                                                            '14px'
                                                                                        }>
                                                                                        View
                                                                                        File
                                                                                    </MenuItem>
                                                                                    <MenuItem
                                                                                        onClick={() =>
                                                                                            handleDownloadFile(
                                                                                                data
                                                                                                    .registrationId
                                                                                                    .registrationfile
                                                                                            )
                                                                                        }
                                                                                        fontSize={
                                                                                            '14px'
                                                                                        }>
                                                                                        Download
                                                                                        File
                                                                                    </MenuItem>
                                                                                </MenuList>
                                                                            </Menu>
                                                                        </Box>
                                                                    </Stack>
                                                                </FileStack>
                                                            ) : (
                                                                <Box className='sub_date'>
                                                                    No file
                                                                </Box>
                                                            )}
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
                                                                            activateViewRegister(
                                                                                data
                                                                            )
                                                                        }>
                                                                        View
                                                                        Registration
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() =>
                                                                            handleRemove(
                                                                                data
                                                                                    .registrationId
                                                                                    ._id,
                                                                                data
                                                                                    .registrationId
                                                                                    .registrationtype
                                                                            )
                                                                        }>
                                                                        Delete
                                                                        Registration
                                                                    </MenuItem>
                                                                </MenuList>
                                                            </Menu>
                                                        </Td>
                                                    </Tr>
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

            {/** registration create */}
            <RegistrationRpCreatePopup
                cancelSubmissionUpload={cancelCreateUpload}
                createRegister={createRegister}
                setCreateRegister={setCreateRegister}
                yearData={yearData}
                projectId={projectId}
            />
            {/** registration Edit */}
            {/** 
         <RegistrationRpEditPopup
                cancelSubmissionUpload={cancelCreateUpload}
                createRegister={editRegister}
                setCreateRegister={setCreateRegister}
                yearData={yearData}
                projectId={projectId}
            />
        
        */}

            {/** registration view */}
            <RegistrationRpViewPopup
                cancelSubmissionUpload={cancelViewUpload}
                createRegister={viewRegister}
                setCreateRegister={setViewRegister}
                yearData={yearData}
                projectId={projectId}
                viewData={viewData}
            />

            {/** modal for viewing file */}
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose} size=''>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' style={{ width: '60vw', height: '80vh' }}>
                    <ModalBody p='0' style={{ width: '100%', height: '80vh' }}>
                        <Box style={{ width: '100%', height: '80vh' }}>
                            <DocViewer
                                className='documentViewer'
                                prefetchMethod='GET'
                                documents={selectedFile}
                                pluginRenderers={DocViewerRenderers}
                                config={{
                                    header: {
                                        disableHeader: true,
                                        disableFileName: true,
                                        retainURLParams: false,
                                    },
                                }}
                                style={{ width: '100%', height: '80vh' }}
                            />
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>

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
                                        <h1>Delete Registration</h1>
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
                                                    removeDetails.type}
                                            </li>
                                        </span>
                                        from this student.
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

const FileStack = styled(Box)`
    font-family: 'Inter', sans-serif;
    background: #ffffff;

    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);

    height: 50px;
    width: 100%;
    border: 1px solid #eeeeef;
    border-radius: 8px;
    padding: 10px 12px;
    .filename {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #20202a;
        text-transform: capitalize;
    }

    .filesize {
        color: #838389;

        font-style: normal;
        font-weight: 400;
        font-size: 11px;
        line-height: 20px;
    }

    .icon_stack {
        border-radius: 8px;
        height: 35px;
        justify-content: center;
        align-items: center;

        .icon_stack_text {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 8px;
            text-transform: capitalize;
        }

        .icon_stack_icon {
            font-family: 'Inter', sans-serif;
            font-size: 13px;
        }
    }

    .pdf,
    .PDF {
        background: #fceded;
        color: #f14c54;
    }

    .doc,
    .docx {
        color: #faa723;
        background: #feecd0;
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

const SubmitButton = styled(Box)`
    width: 200px;
    height: 32px;
    background: #f4797f;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
    border-radius: 6px;

    color: #ffffff;
    letter-spacing: 0.02em;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
