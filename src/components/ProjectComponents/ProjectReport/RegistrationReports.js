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
import { ImBin2 } from 'react-icons/im'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import RegistrationRpCreatePopup from './RegistrationRpCreatePopup'
import RegistrationRpEditPopup from './RegistrationRpEditPopup'
import RegistrationRpViewPopup from './RegistrationRpViewPopup'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

import { removeRegistration } from '../../../store/features/registration/registrationSlice'
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

    let routeNavigate = useNavigate()

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
            console.log(data, 'trying')
            setViewData(() => data)
            setViewRegister(true)
        }
    }

    /** function to cancel create submission */
    const cancelViewUpload = () => {
        setViewRegister(false)

        // onClose()
    }

    /** function to handle delete of registration */
    const handleDeleteRegister = () => {
        setViewRegister(false)

        // onClose()
    }

    const handleCancelDeleteRegister = () => {
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
        console.log(dataGiven, 'testing')

        if (!dataGiven.message) {
            let newData = {
                ...dataGiven,
            }
            if (nameValues !== null) {
                console.log(nameValues, 'nameValues')
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

            console.log('messahe', performDowload)
            if (performDowload.message) {
                alert(performDowload.message)
            }
        }
    }

    /** function to handle viewing file */
    const handleFileView = async (data) => {
        // const dataGiven = await window.electronAPI.getViewFile(
        //     data.files.fileId
        // )

        const dataGiven = 'herer'

        console.log(dataGiven, 'given', data.fileId)
        setSelectedFile([
            {
                uri: `https://chuss-test.herokuapp.com/docs/files/${data.fileId}`,
                fileType: data.fileType,
                fileData: new ArrayBuffer(dataGiven),
            },
        ])
        onOpen()
    }

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

                    <Box
                        className={`registrationBtn`}
                        onClick={activateAddRegister}>
                        Add registration
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
                                                        <Td>1</Td>

                                                        <Td className='type_examiner'>
                                                            {
                                                                data
                                                                    .registrationId
                                                                    .registrationtype
                                                            }
                                                        </Td>
                                                        <Td>
                                                            {
                                                                data
                                                                    .registrationId
                                                                    .date
                                                            }
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
                                                                                    w='50px'
                                                                                    h='50px'
                                                                                    spacing='50x'
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
                                                                                spacing='2px'>
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
                                                                            activateViewRegister(
                                                                                data
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

const FileStack = styled(Box)`
    font-family: 'Inter', sans-serif;
    background: #ffffff;

    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);

    min-height: 50px;
    width: 100%;
    border: 1px solid #eeeeef;
    border-radius: 8px;
    padding: 10px 12px;
    .filename {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
        text-transform: capitalize;
    }

    .filesize {
        color: #838389;

        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
    }

    .icon_stack {
        border-radius: 8px;

        justify-content: center;
        align-items: center;

        .icon_stack_text {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 8px;
            text-transform: capitalize;
        }

        .icon_stack_icon {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
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

const EditIcon = styled(Box)`
    width: 24px;
    height: 24px;
    background: #eeeeef;
    border: 1px dashed #f4797f;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #464f60;
    font-size: 14px;
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
