/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    useDisclosure,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { BsListUl } from 'react-icons/bs'
import { RiLayoutGridFill } from 'react-icons/ri'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import {
    removeExRpfiles,
    reset,
} from '../../../store/features/reports/reportSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { BASE_API_2 } from '../../../utils/base_url.config'

const ViewUpdatedFiles = ({ values }) => {
    const [selectedView, setSelectedView] = React.useState('grid')
    const [filesList, setFilesList] = React.useState([])

    let params = useParams()
    let dispatch = useDispatch()
    let toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingsp, setIsSubmittingsp] = React.useState(false)

    let { isSuccess, isError, message } = useSelector((state) => state.report)

    React.useEffect(() => {
      
        if (values !== null && values.reportFiles.length > 0) {
            setFilesList(values.reportFiles)
        }else {
             setFilesList([])
        }
    }, [values, params.rp_id])

    React.useEffect(() => {
        if (isError && isSubmittingsp) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingsp(() => false)

            dispatch(reset())
        }

        if (isSuccess && isSubmittingsp) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingsp(() => false)
            setRemoveActive(() => false)
            dispatch(reset())
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch, isSubmittingsp])

    /** handle viewing file */
    const handleFileView = async (data) => {
        setSelectedFile([
            {
                uri: `${BASE_API_2}/docs/files/${data.files.fileId}`,
                fileType: data.files.fileType,
            },
        ])
        onOpen()
    }

    /** downloading file */
    const handleDownloadFile = async (data) => {
        const dataGiven = await window.electronAPI.getdownloadFile(
            data.files.fileId
        )
      

        if (!dataGiven.message) {
            let newData = {
                ...dataGiven,
            }
            let nameValues = 'examiners'
            if (nameValues !== null) {
               
                let newNameValue = nameValues.toString().split(' ')[0]

                newData = {
                    ...newData,
                    name: newNameValue,
                    filename: data.files.fileName
                        ? data.files.fileName
                        : 'files',
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

    /** removing the file */

    const handleRemove = (fId, nam, secId) => {
       
        if (params.rp_id && fId) {
            let rvalues = {
                fId: fId,
                name: nam,
                secId: secId,
                reportId: params.rp_id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    /** on press remove */
    const onRemoveUpload = () => {
        if (removeDetails.reportId && removeDetails.fId) {
            dispatch(removeExRpfiles(removeDetails))
            setIsSubmittingsp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

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
                        <h1>Files</h1>
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
                    {filesList.length > 0 ? (
                        <Box>
                            {selectedView === 'grid' ? (
                                <Stack direction='row'>
                                    {filesList.map((data, index) => {
                                        let size = formatSize(
                                            parseInt(data.files.fileSize)
                                        )
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
                                                            {' '}
                                                            {
                                                                data.files
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
                                                                    data.files
                                                                        .fileName
                                                                }
                                                            </Text>
                                                            <Text className='filesize'>
                                                                {size}
                                                            </Text>
                                                        </Stack>
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
                                                                    View File
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
                                                                <MenuItem
                                                                    onClick={() =>
                                                                        handleRemove(
                                                                            data
                                                                                .files
                                                                                .fileId,
                                                                            data
                                                                                .files
                                                                                .fileName,
                                                                            data._id
                                                                        )
                                                                    }
                                                                    fontSize={
                                                                        '14px'
                                                                    }>
                                                                    Delete File
                                                                </MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Stack>
                                                </Box>
                                            </FileStack>
                                        )
                                    })}
                                </Stack>
                            ) : (
                                <Stack direction='row'>
                                    {filesList.map((data, index) => {
                                        let size = formatSize(
                                            parseInt(data.files.fileSize)
                                        )
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
                                                                    data.files
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
                                                                            .files
                                                                            .fileName
                                                                    }
                                                                </Text>
                                                                <Text className='filesize'>
                                                                    {size}
                                                                </Text>
                                                            </Stack>
                                                        </Stack>
                                                    </Box>
                                                </Stack>

                                                <Stack justifyContent='center'>
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
                                                                View File
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
                                                                Download File
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        data
                                                                            .files
                                                                            .fileId,
                                                                        data
                                                                            .files
                                                                            .fileName,
                                                                        data._id
                                                                    )
                                                                }
                                                                fontSize={
                                                                    '14px'
                                                                }>
                                                                Delete File
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Stack>
                                            </FileStack>
                                        )
                                    })}
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

            {/** viewing file */}
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

            {/** deleting file */}
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
                                    className='pop_titleRR'
                                    direction='row'
                                    w='100%'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box>
                                        <h1>Remove Files</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to remove
                                        <span>
                                            <li>
                                                {removeDetails !== null &&
                                                    removeDetails.name}
                                            </li>
                                        </span>
                                        from this project.
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
                                    isLoading={isSubmittingsp ? true : false}
                                    className='apply_button'>
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </FormContainer>
    )
}

export default ViewUpdatedFiles

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

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;

    span {
        margin: 0 5px;
    }

    .pop_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    .pop_titleRR {
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
        font-family: 'Inter', sans-serif;
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
