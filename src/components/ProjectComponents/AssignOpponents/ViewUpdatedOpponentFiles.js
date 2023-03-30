/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
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
    Button,
    useToast,
} from '@chakra-ui/react'
import { MdOutlineFilePresent } from 'react-icons/md'

import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { useDispatch, useSelector } from 'react-redux'
import {
    reset,
    deleteFileOpponent,
    addFileOpponent,
} from '../../../store/features/opponents/opponentSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_API_2 } from '../../../utils/base_url.config'

const ViewUpdatedOpponentFiles = ({ values, projectValues }) => {
   // const [filesList, setFilesList] = React.useState([])
    const [filesList2, setFilesList2] = React.useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [nameValues, setNameValues] = React.useState('examiner')
    const [projectAppLetter, setProjectAppLetter] = React.useState(null)
    const [changeMade, setChangeMade] = React.useState(false)
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [updateSubmitting, setUpdateSubmitting] = React.useState(false)
    let dispatch = useDispatch()
    let toast = useToast()
    let routeNavigate = useNavigate()
    let { isError, isSuccess, message } = useSelector((state) => state.opponent)

    /** new file submission */
    const handleFileSubmission = () => {
        if (projectValues !== null && values !== null && changeMade) {
            let examinerToFind = values._id
            let projectId = projectValues._id

            let newValues = {
                examinerId: examinerToFind,
                projectId: projectId,
                projectAppLetter: {
                    ...projectAppLetter,
                },
            }

            dispatch(addFileOpponent(newValues))
            setChangeMade(false)
            setUpdateSubmitting(true)
        }
    }

    /** activate delete project App file */
    const handleRemove = (fdetail) => {
        if (projectValues._id && fdetail._id) {
            let rvalues = {
                fileId: fdetail._id,
                name: fdetail.fileName,
                projectId: projectValues._id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    /** handle confirm delete */
    const onRemoveUpload = () => {
        if (removeDetails.projectId && removeDetails.fileId) {
            dispatch(deleteFileOpponent(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)
        setIsSubmittingp(false)

        // onClose()
    }

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
        }

        if (isError && updateSubmitting) {
            setUpdateSubmitting(false)
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

        if (isSuccess && message && updateSubmitting) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setUpdateSubmitting(false)
            routeNavigate(-1)

            dispatch(reset())
        }

        dispatch(reset())
    }, [isSuccess, message, isSubmittingp, updateSubmitting])

    const handlefile = async () => {
        const getfiles = await window.electronAPI.oppDetail()

        if (getfiles === null) {
        } else {
            setChangeMade(true)
            setProjectAppLetter({
                ...getfiles,
                buffer: getfiles.buffer.toString(),
            })
        }
    }

    React.useEffect(() => {
        if (projectValues !== null && values !== null) {
            setNameValues(values.name)

            let examinerToFind = values._id
            let arrayToCheck = projectValues.opponents

            let checks = arrayToCheck.find(
                (data) => data.opponentId._id === examinerToFind
            )

            if (checks && checks.projectAppointmentLetter) {
                setFilesList2([{ ...checks.projectAppointmentLetter }])
            } else {
                setFilesList2([])
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
                <Box className='formtitle'>
                    <h1> Edit Project Appointment Letter</h1>
                </Box>

                {filesList2.length > 0 ? (
                    <Stack
                        p='25px 20px'
                        direction='column'
                        className='formfields'
                        alignItems='space-between'
                        spacing='15px'
                        h='100%'>
                        {filesList2.map((data, index) => {
                            let size

                            if (data.fileSize) {
                                size = formatSize(parseInt(data.fileSize))
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
                                                    {data.fileExtension}
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
                                                        {data.fileName}
                                                    </Text>
                                                    <Text className='filesize'>
                                                        {size}
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
                                                            handleFileView(data)
                                                        }
                                                        fontSize={'14px'}>
                                                        View File
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() =>
                                                            handleDownloadFile(
                                                                data
                                                            )
                                                        }
                                                        fontSize={'14px'}>
                                                        Download File
                                                    </MenuItem>

                                                    <MenuItem
                                                        onClick={() =>
                                                            handleRemove(data)
                                                        }
                                                        fontSize={'14px'}>
                                                        Delete File
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Box>
                                    </Stack>
                                </FileStack>
                            )
                        })}
                    </Stack>
                ) : (
                    <Stack
                        p='25px 20px'
                        direction='column'
                        className='formfields'
                        alignItems='space-between'
                        spacing='15px'
                        h='100%'>
                        <Stack direction='column'>
                            {projectAppLetter !== null ? (
                                <Stack>
                                    <Box className='fileview'>
                                        <Stack
                                            direction='row'
                                            alignItems='center'
                                            h='100%'>
                                            <Box w='20%'>
                                                <Box
                                                    className='label2'
                                                    onClick={handlefile}></Box>
                                            </Box>
                                            <Stack
                                                w='70%'
                                                spacing='10px'
                                                direction='row'
                                                justifyContent={'center'}
                                                alignItems='center'>
                                                <Box fontSize='20px'>
                                                    <MdOutlineFilePresent />
                                                </Box>
                                                <Text>
                                                    {projectAppLetter.name}
                                                    {projectAppLetter.ext}
                                                </Text>
                                            </Stack>
                                        </Stack>
                                    </Box>
                                    <Stack>
                                        <Button
                                            onClick={handleFileSubmission}
                                            disabled={
                                                updateSubmitting ? true : false
                                            }
                                            isLoading={
                                                updateSubmitting ? true : false
                                            }>
                                            Upload File
                                        </Button>
                                    </Stack>
                                </Stack>
                            ) : (
                                <Box className='formfields__Sfieldset'>
                                    <Stack spacing='8px' className='form_wrap'>
                                        <Text>
                                            Please upload the Examiner's
                                            appointment letter for this student.
                                        </Text>
                                        <Box
                                            className='label'
                                            onClick={handlefile}>
                                            Click to <span>Browse files</span>
                                        </Box>
                                    </Stack>
                                </Box>
                            )}
                        </Stack>
                    </Stack>
                )}
            </Box>

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
                                        <h1>Remove Project Appoint File</h1>
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
                                    isLoading={isSubmittingp ? true : false}
                                    className='apply_button'>
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>

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

export default ViewUpdatedOpponentFiles

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

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
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #d1d5db;
        padding: 0 20px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .label {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #5e5c60;
        letter-spacing: 0.02em;
        border: 1px dashed #fbb649;
        background: #fef9ef;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
            padding-left: 5px;
            color: #1371ff;
        }
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 20px;
    }

    #upload[type='file'] {
        display: none;
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .fileview {
        background: #ffffff;
        border: 1px solid #838389;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        height: 49px;

        p {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            color: #5e5c60;
        }
    }

    .label2 {
        border: 1px solid transparent;
        height: 47px;
        border-radius: 6px 0 0 6px;
        background: #eeeeef;
    }

    .form_wrap {
        p {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 20px;
            color: #abaaaf;
        }
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
