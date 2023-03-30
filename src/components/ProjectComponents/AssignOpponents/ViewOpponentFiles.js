import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
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
import { BsListUl } from 'react-icons/bs'
import { RiLayoutGridFill } from 'react-icons/ri'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { BASE_API_2 } from '../../../utils/base_url.config'

const ViewOpponentFiles = ({ values, projectValues }) => {
     const [selectedView, setSelectedView] = React.useState('grid')
     const [filesList, setFilesList] = React.useState([])
     const [filesList2, setFilesList2] = React.useState([])
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [selectedFile, setSelectedFile] = React.useState(null)
     const [nameValues, setNameValues] = React.useState('examiner')

     useEffect(() => {
         if (values !== null && values.generalAppointmentLetters.length > 0) {
           
             setFilesList(values.generalAppointmentLetters)
             setNameValues(values.name)
         }
     }, [values])

     useEffect(() => {
         if (projectValues !== null && values !== null) {
            
             setNameValues(values.name)

             let examinerToFind = values._id
             let arrayToCheck = projectValues.opponents

             let checks = arrayToCheck.find(
                 (data) => data.opponentId._id === examinerToFind
             )

             if (checks && checks.projectAppointmentLetter) {
                 setFilesList2([{ ...checks.projectAppointmentLetter }])
             }
          
         }
     }, [projectValues, values])

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
                     filename: data.fileName ? data.fileName : 'examiner',
                 }
             } else {
             }

             const performDowload = await window.electronAPI.downloadFile(
                 newData
             )

            
             // if (performDowload.message) {
             //     alert(performDowload.message)
             // }
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
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    className='formtitle'>
                    <Box>
                        <h1>Supporting Files</h1>
                    </Box>

                    <Stack direction='row'>
                        <Box
                            onClick={() => setSelectedView('grid')}
                            className={`icon ${
                                selectedView === 'grid' ? 'active_icon' : null
                            }`}>
                            <RiLayoutGridFill />
                        </Box>
                        <Box
                            onClick={() => setSelectedView('list')}
                            className={`icon ${
                                selectedView === 'list' ? 'active_icon' : null
                            }`}>
                            <BsListUl />
                        </Box>
                    </Stack>
                </Stack>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    {filesList.length > 0 || filesList2.length > 0 ? (
                        <Box>
                            {selectedView === 'grid' ? (
                                <Stack direction='row'>
                                    {filesList.length > 0 && (
                                        <>
                                            {' '}
                                            {filesList.map((data, index) => {
                                                let size

                                                if (data.fileId.fileSize) {
                                                    size = formatSize(
                                                        parseInt(
                                                            data.fileId.fileSize
                                                        )
                                                    )
                                                } else {
                                                }
                                                return (
                                                    <FileStack
                                                        key={index}
                                                        w='202.6px'
                                                        h='168px'
                                                        direction='column'
                                                        alignitems='space-between'
                                                        className='filedoc'>
                                                        <Box
                                                            h='96px'
                                                            className='icon_wrap '>
                                                            <Stack
                                                                spacing='0'
                                                                direction='column'
                                                                w='55px'
                                                                h='55px'
                                                                className='icon_stack doc'>
                                                                <Box>
                                                                    <BsFileEarmark />
                                                                </Box>
                                                                <Text>
                                                                    {
                                                                        data
                                                                            .fileId
                                                                            .fileExtension
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                        </Box>

                                                        <Box>
                                                            <Stack
                                                                direction='row'
                                                                justifyContent={
                                                                    'space-between'
                                                                }
                                                                padding='0 20px'
                                                                alignItems='center'>
                                                                <Stack direction='column'>
                                                                    <Text className='filename'>
                                                                        {
                                                                            data
                                                                                .fileId
                                                                                .fileName
                                                                        }
                                                                    </Text>
                                                                    <Text className='filesize'>
                                                                        {size}
                                                                    </Text>
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
                                                                                        data.fileId
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
                                                                                        data.fileId
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
                                                        </Box>
                                                    </FileStack>
                                                )
                                            })}
                                        </>
                                    )}

                                    {filesList2.length > 0 && (
                                        <>
                                            {' '}
                                            {filesList2.map((data, index) => {
                                                let size

                                                if (data.fileSize) {
                                                    size = formatSize(
                                                        parseInt(data.fileSize)
                                                    )
                                                } else {
                                                }
                                                return (
                                                    <FileStack
                                                        key={index}
                                                        w='202.6px'
                                                        h='168px'
                                                        direction='column'
                                                        alignitems='space-between'
                                                        className='filedoc'>
                                                        <Box
                                                            h='96px'
                                                            className='icon_wrap '>
                                                            <Stack
                                                                spacing='0'
                                                                direction='column'
                                                                w='55px'
                                                                h='55px'
                                                                className='icon_stack doc'>
                                                                <Box>
                                                                    <BsFileEarmark />
                                                                </Box>
                                                                <Text>
                                                                    {
                                                                        data.fileExtension
                                                                    }
                                                                </Text>
                                                            </Stack>
                                                        </Box>

                                                        <Box>
                                                            <Stack
                                                                direction='row'
                                                                justifyContent={
                                                                    'space-between'
                                                                }
                                                                padding='0 20px'
                                                                alignItems='center'>
                                                                <Stack direction='column'>
                                                                    <Text className='filename'>
                                                                        {
                                                                            data.fileName
                                                                        }
                                                                    </Text>
                                                                    <Text className='filesize'>
                                                                        {size}
                                                                    </Text>
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
                                                        </Box>
                                                    </FileStack>
                                                )
                                            })}
                                        </>
                                    )}
                                </Stack>
                            ) : (
                                <Stack direction='row'>
                                    {filesList.length > 0 && (
                                        <>
                                            {filesList.map((data, index) => {
                                                let size

                                                if (data.fileId.fileSize) {
                                                    size = formatSize(
                                                        parseInt(
                                                            data.fileId.fileSize
                                                        )
                                                    )
                                                } else {
                                                }
                                                return (
                                                    <FileStack
                                                        key={index}
                                                        direction='row'
                                                        alignitems='center'
                                                        justifyContent='space-between'
                                                        w='293px'
                                                        h='64px'
                                                        padding='0 12px'
                                                        className='filedoc'>
                                                        <Stack
                                                            spacing='10px'
                                                            direction='row'
                                                            alignitems='center'>
                                                            <Box className='icon_wrap '>
                                                                <Stack
                                                                    w='45px'
                                                                    h='45px'
                                                                    spacing='0'
                                                                    direction='column'
                                                                    className='icon_stack doc'>
                                                                    <Box>
                                                                        <BsFileEarmark />
                                                                    </Box>
                                                                    <Text>
                                                                        {
                                                                            data
                                                                                .fileId
                                                                                .fileExtension
                                                                        }
                                                                    </Text>
                                                                </Stack>
                                                            </Box>

                                                            <Box>
                                                                <Stack
                                                                    h='100%'
                                                                    direction='row'
                                                                    alignItems='center'>
                                                                    <Stack direction='column'>
                                                                        <Text className='filename'>
                                                                            {
                                                                                data
                                                                                    .fileId
                                                                                    .fileName
                                                                            }
                                                                        </Text>
                                                                        <Text className='filesize'>
                                                                            {
                                                                                size
                                                                            }
                                                                        </Text>
                                                                    </Stack>
                                                                </Stack>
                                                            </Box>
                                                        </Stack>

                                                        <Stack justifyContent='center'>
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
                                                                                    data.fileId
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
                                                                                    data.fileId
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
                                                )
                                            })}
                                        </>
                                    )}

                                    {filesList2.length > 0 && (
                                        <>
                                            {filesList2.map((data, index) => {
                                                let size

                                                if (data.fileSize) {
                                                    size = formatSize(
                                                        parseInt(data.fileSize)
                                                    )
                                                } else {
                                                }
                                                return (
                                                    <FileStack
                                                        key={index}
                                                        direction='row'
                                                        alignitems='center'
                                                        justifyContent='space-between'
                                                        w='293px'
                                                        h='64px'
                                                        padding='0 12px'
                                                        className='filedoc'>
                                                        <Stack
                                                            spacing='10px'
                                                            direction='row'
                                                            alignitems='center'>
                                                            <Box className='icon_wrap '>
                                                                <Stack
                                                                    w='45px'
                                                                    h='45px'
                                                                    spacing='0'
                                                                    direction='column'
                                                                    className='icon_stack doc'>
                                                                    <Box>
                                                                        <BsFileEarmark />
                                                                    </Box>
                                                                    <Text>
                                                                        {
                                                                            data.fileExtension
                                                                        }
                                                                    </Text>
                                                                </Stack>
                                                            </Box>

                                                            <Box>
                                                                <Stack
                                                                    h='100%'
                                                                    direction='row'
                                                                    alignItems='center'>
                                                                    <Stack direction='column'>
                                                                        <Text className='filename'>
                                                                            {
                                                                                data.fileName
                                                                            }
                                                                        </Text>
                                                                        <Text className='filesize'>
                                                                            {
                                                                                size
                                                                            }
                                                                        </Text>
                                                                    </Stack>
                                                                </Stack>
                                                            </Box>
                                                        </Stack>

                                                        <Stack justifyContent='center'>
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
                                                )
                                            })}
                                        </>
                                    )}
                                </Stack>
                            )}
                        </Box>
                    ) : (
                        <Box className='nofiles'>
                            <Text>No Files Uploaded</Text>
                        </Box>
                    )}
                </Stack>
            </Box>

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
        </FormContainer>
    )
}

export default ViewOpponentFiles

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 148px;
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

    .icon {
        color: #abaaaf;
        font-size: 20px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active_icon {
        color: #3a3a43;
    }

    .nofiles {
        width: 202.6px;
        height: 168px;
        background: #fbfbfb;
        border: 1px solid #eeeeef;
        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #838389;
        letter-spacing: 0.02em;
    }

    .filedoc {
        background: #ffffff;

        border: 1px solid #eeeeef;
        border-radius: 8px;
    }
`

const FileStack = styled(Stack)`
    .icon_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon_stack {
        border-radius: 8px;

        justify-content: center;
        align-items: center;

        p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 8px;
        }

        div {
            font-size: 18px;
        }
    }

    .pdf {
        background: #fceded;
        color: #f14c54;
    }

    .doc {
        color: #faa723;
        background: #feecd0;
    }

    .filename {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
    }

    .filesize {
        color: #838389;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
    }
`

