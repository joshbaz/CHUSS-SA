import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Input,
    Button,
    InputGroup,
    useDisclosure,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Grid,
    GridItem,
} from '@chakra-ui/react'
import { BsListUl } from 'react-icons/bs'
import { RiLayoutGridFill } from 'react-icons/ri'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeViFiles,
    updateProjectStatus,
    reset,
} from '../../../store/features/project/projectSlice'
import {
    reset as treset,
    tagCreate,
} from '../../../store/features/tags/tagSlice'
import { FiCheck } from 'react-icons/fi'
import VivaPopupFileUpload from './VivaPopupFileUpload'
import VivaPopupDefense from './VivaPopupDefense'
import Moments from 'moment-timezone'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { SketchPicker } from 'react-color'
import toast from 'react-hot-toast'

import { BASE_API_2 } from '../../../utils/base_url.config'

import { Logout, reset as areset } from '../../../store/features/auth/authSlice'

const MastersVivaReport = ({ values = null, allTagData, nameValues, type }) => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [selectedView, setSelectedView] = React.useState('grid')
    const [colorPicked, setColorPicked] = React.useState({ hex: '' })
    const [filesList, setFilesList] = React.useState([])
    const [fileUploadActive, setFileUploadActive] = React.useState(false)
    const [defenseUploadActive, setDefenseUploadActive] = React.useState(false)
    const [projectTagData, setProjectTagData] = React.useState([])
    const [newStatusPopup, setNewStatusPopup] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeStatusE, setActiveStatus] = React.useState(null)
    // const [activeDataStatus, setActiveDataStatus] = React.useState('')
    const [newActiveStatus, setNewActiveStatus] = React.useState({
        status: '',
        startDate: '',
        expectedEnd: '',
        statusEntryType: '',
        endDate: '',
        dateOfGraduation: '',
    })
    const [errors, setErrors] = React.useState({})
    const [changeMade, setChangeMade] = React.useState(false)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [projectId, setProjectId] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)

    const [isViewFile, setIsViewFile] = React.useState(false)

    let dispatch = useDispatch()
    //let toast = useToast()
    let { isSuccess, isError, message } = useSelector((state) => state.project)
    let tagGStates = useSelector((state) => state.tag)

    React.useEffect(() => {
        if (values !== null && values._id) {
            setProjectId(values._id)
        }
        if (values !== null && values.vivaFiles.length > 0) {
            setFilesList(values.vivaFiles)
        }
    }, [values])

    React.useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) =>
                data.table === 'project' && data.projectType === type
        )

        if (
            values !== null &&
            values.projectStatus &&
            values.projectStatus.length > 0 &&
            allInfoData.length > 0
        ) {
            let activeStatus = values.projectStatus.find(
                (element) => element.projectStatusId.active
            )
            if (activeStatus) {
                setNewActiveStatus({
                    status: activeStatus.projectStatusId.status,
                    ...activeStatus.projectStatusId,
                })
                // setActiveDataStatus(activeStatus)
                let activeElementSet = allInfoData.find(
                    (element) =>
                        element.tagName === activeStatus.projectStatusId.status
                )

                if (activeElementSet) {
                    setActiveStatus(activeElementSet)
                }
            }
        } else {
        }
        setProjectTagData(allInfoData)
    }, [allTagData, values, type])

    /** handle popup defense submit */
    // const handleDefenseSubmit = () => {
    //     setIsSubmittingp(true)
    //     let allValues = {
    //         //items: selectedExaminers,
    //         projectId,
    //     }
    //     //dispatch(assignOpponent(allValues))
    // }

    // /** handle popup viva files submit */
    // const handleFilesSubmit = () => {
    //     setIsSubmittingp(true)
    //     let allValues = {
    //         //items: selectedExaminers,
    //         projectId,
    //     }
    //     // dispatch(assignOpponent(allValues))
    // }

    // /** handle popup status submit */
    // const handleStatusSubmit = () => {
    //     setIsSubmittingp(true)
    //     let allValues = {
    //         // items: selectedExaminers,
    //         projectId,
    //     }
    //     //dispatch(assignOpponent(allValues))
    // }

    /**
     * function to update status change
     *
     */
    const statusUpdateChange = (data, type) => {
        if (type === 'status') {
            setIsSubmittingp(false)
            setChangeMade(true)
            setNewActiveStatus({
                status: data.tagName,
                statusId: data._id,
            })
        }
    }

    const statusUpdateDetailsChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(false)
        setChangeMade(true)
        setNewActiveStatus({
            ...newActiveStatus,
            [e.target.name]: e.target.value,
        })
    }

    let validate = (values) => {
        const errors = {}

        return errors
    }

    /**
     * function to submit change to server
     */

    const statusSubmitChange = (e) => {
        e.preventDefault()
        setErrors(validate(newActiveStatus))
        setIsSubmittingp(true)
    }

    /**
     * function to cancel submit change
     */

    const cancelStatusChange = () => {
        setChangeMade(false)
        setIsSubmittingp(false)
        onClose()
    }

    /** error handler for toast response */
    let errorHandler = (errorResponse) => {
        if (errorResponse.payload.includes('ECONNREFUSED')) {
            return 'Check your internet connection'
        } else if (errorResponse.payload.includes('jwt expired')) {
            return 'Authentication expired'
        } else if (
            errorResponse.payload.includes('jwt malformed') ||
            errorResponse.payload.includes('invalid token')
        ) {
            return 'Authentication expired'
        } else if (errorResponse.payload.includes('Not authenticated')) {
            return 'Authentication required'
        } else if (errorResponse.payload.includes('Not authorized')) {
            return 'Authentication required'
        } else {
            let errorMessage = errorResponse.payload
            return errorMessage
        }
    }

    //function to handle smooth Logout
    let handleLogout = () => {
        toast.dismiss()

        toast.loading('Logging out. please wait...')

        //inner logout toast function
        let handleLogoutToast = () => {
            toast.dismiss()
            toast.promise(
                dispatch(Logout()).then((res) => {
                    // routeNavigate('/auth/signin', { replace: true })
                }),
                {
                    loading: 'Logging out',
                    success: (data) => 'Logged out successfully',
                    error: (err) => {
                        return 'error while Logging out'
                    },
                }
            )
        }

        setTimeout(handleLogoutToast, 3000)
    }

    /** run after submission awaiting for response */

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            // toast({
            //     position: 'top',
            //     title: message.message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })
            setIsSubmittingp(false)
            setChangeMade(false)

            dispatch(reset())
            dispatch(areset())
        }

        if (isSuccess && isSubmittingp && message) {
            // toast({
            //     position: 'top',
            //     title: message.message,
            //     status: 'success',
            //     duration: 10000,
            //     isClosable: true,
            // })
            setIsSubmittingp(false)
            setChangeMade(false)
            onClose()
            dispatch(reset())
            setRemoveActive(false)
            setRemoveDetails(null)
            dispatch(areset())
        }
        dispatch(reset())
        dispatch(areset())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    //tag responses
    React.useEffect(() => {
        if (tagGStates.isError && isSubmittingp) {
            // toast({
            //     position: 'top',
            //     title: message.message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })
            setIsSubmittingp(false)
            setChangeMade(false)

            dispatch(treset())
            dispatch(areset())

            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }
        }

        if (tagGStates.isSuccess && tagGStates.message) {
            // toast({
            //     position: 'top',
            //     title: tagGStates.message.message,
            //     status: 'success',
            //     duration: 10000,
            //     isClosable: true,
            // })
            setIsSubmittingp(false)
            setChangeMade(false)
            onClose()
            dispatch(treset())
            dispatch(areset())

            if (newStatusPopup) {
                handleCloseNewStatusPopup()
            }

            if (helperFunctions !== null) {
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setHelperFunctions(null)
            }
        }
        dispatch(treset())
        dispatch(areset())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tagGStates.isError, tagGStates.isSuccess, tagGStates.message, dispatch])

    /** submittion of the changes */
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            toast.dismiss()

            toast.promise(
                dispatch(
                    updateProjectStatus({
                        ...newActiveStatus,
                        projectId,
                    })
                ).then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'updating student status',
                    success: (data) => `${data}`,
                    error: (err) => {
                        if (
                            err
                                .toString()
                                .includes('Check your internet connection')
                        ) {
                            return 'Check Internet Connection'
                        } else if (
                            err.toString().includes('Authentication required')
                        ) {
                            setTimeout(handleLogout, 3000)
                            return 'Not Authenticated'
                        } else if (
                            err.toString().includes('Authentication expired')
                        ) {
                            setTimeout(handleLogout, 3000)
                            return 'Authentication Expired'
                        } else {
                            return `${err}`
                        }
                    },
                }
            )
            //setIsSubmittingp(false)
        }

        if (Object.keys(errors).length > 0 && isSubmittingp && changeMade) {
            setIsSubmittingp(false)
            setChangeMade(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmittingp])

    //size format
    const formatSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (
            (size / Math.pow(1024, i)).toFixed(2) * 1 +
            ' ' +
            ['B', 'KB', 'MB', 'GB', 'TB'][i]
        )
    }

    const handleFileView = async (data) => {
        setSelectedFile([
            {
                uri: `${BASE_API_2}/docs/files/${data.fileId.fileId}`,
                fileType: data.fileId.fileType,
            },
        ])
        setIsViewFile(() => true)
    }

    const handleDownloadFile = async (data) => {
        const dataGiven = await window.electronAPI.getdownloadFile(
            data.fileId.fileId
        )

        if (!dataGiven.message) {
            let newData = {
                ...dataGiven,
            }
            if (nameValues !== null) {
                let newNameValue = nameValues.toString().split(' ')[0]

                newData = {
                    ...newData,
                    name: newNameValue,
                    filename: data.fileId.fileName
                        ? data.fileId.fileName
                        : 'files',
                }
            } else {
            }

            const performDowload = await window.electronAPI.downloadFile(
                newData
            )

            if (performDowload.message) {
                //  alert(performDowload.message)
            }
        }
    }

    const handleRemove = (fId, nam, secId) => {
        if (values._id && fId) {
            let rvalues = {
                fId: fId,
                name: nam,
                secId: secId,
                projectId: values._id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.projectId && removeDetails.fId) {
            toast.dismiss()
            setIsSubmittingp(true)
            toast.promise(
                dispatch(removeViFiles(removeDetails)).then((res) => {
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'Removing files',
                    success: (data) => `${data}`,
                    error: (err) => {
                        if (
                            err
                                .toString()
                                .includes('Check your internet connection')
                        ) {
                            return 'Check Internet Connection'
                        } else if (
                            err.toString().includes('Authentication required')
                        ) {
                            setTimeout(handleLogout, 3000)
                            return 'Not Authenticated'
                        } else if (
                            err.toString().includes('Authentication expired')
                        ) {
                            setTimeout(handleLogout, 3000)
                            return 'Authentication Expired'
                        } else {
                            return `${err}`
                        }
                    },
                }
            )
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    const handleOpenNewStatusPopup = () => {
        setNewStatusPopup(() => true)
        cancelStatusChange()
    }

    const handleCloseNewStatusPopup = () => {
        setNewStatusPopup(() => false)
        onOpen()
    }

    const handleColorPicked = (color, setFieldValue) => {
        let rgba = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b}, 0.34)`
        let hex = color.hex
        setColorPicked(color)
        setFieldValue('rgba', rgba)
        setFieldValue('hex', hex)
        setFieldValue('fullColor', color)
    }

    const validationSchema = yup.object().shape({
        tagName: yup.string().required('tagName is required'),
        rgba: yup.string().required('please select a color'),
        hex: yup.string().required('color missing too'),
    })

    return (
        <Container>
            {' '}
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    h='54px'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Viva Report & Support Files</h1>
                    </Box>

                    <Stack direction='row' alignItems='center;'>
                        <SubmitButton
                            as='button'
                            onClick={() =>
                                setFileUploadActive(!fileUploadActive)
                            }>
                            Upload file
                        </SubmitButton>
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

                {/** details */}
                {/** details */}
                <Stack>
                    <Stack
                        p='25px 0px'
                        borderBottom='1px solid #EEEEEF'
                        direction='column'
                        className='formfields'
                        alignItems='space-between'
                        spacing='15px'>
                        <Stack
                            p='0px 20px'
                            direction='row'
                            w='100%'
                            spacing='30px'>
                            <Stack direction='column' w='50%'>
                                <Box className='form_subtitle'>
                                    <h1>Status</h1>
                                </Box>

                                <Stack spacing={'8px'}>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Status</Text>
                                            </Stack>
                                        </label>

                                        <Stack
                                            direction='row'
                                            alignItems='center'>
                                            <StatusItem
                                                tcolors={
                                                    activeStatusE !== null &&
                                                    activeStatusE.hex
                                                        ? activeStatusE.hex
                                                        : ''
                                                }
                                                bcolors={
                                                    activeStatusE !== null &&
                                                    activeStatusE.rgba
                                                        ? activeStatusE.rgba
                                                        : ''
                                                }
                                                minW='90px'
                                                className='pending'
                                                direction='row'
                                                alignItems='center'>
                                                <div />
                                                <Text>
                                                    {activeStatusE !== null &&
                                                    activeStatusE.tagName
                                                        ? activeStatusE.tagName
                                                        : ''}
                                                </Text>
                                            </StatusItem>
                                            <Box onClick={onOpen}>
                                                <MdKeyboardArrowDown />
                                            </Box>
                                        </Stack>
                                    </Stack>

                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='email'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Date of Defense</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <InputGroup>
                                                <Input
                                                    placeholder='Select Date and Time'
                                                    size='md'
                                                    readOnly
                                                    type='text'
                                                    name='DateOfDefense'
                                                    value={
                                                        values !== null &&
                                                        values.DateOfDefense
                                                            ? Moments(
                                                                  values.DateOfDefense
                                                              )
                                                                  .tz(
                                                                      'Africa/Kampala'
                                                                  )
                                                                  .format(
                                                                      'DD MMM Y'
                                                                  )
                                                            : ''
                                                    }
                                                />
                                            </InputGroup>
                                        </Box>

                                        <Box
                                            display='flex'
                                            justifyContent={'center'}>
                                            <Stack
                                                direction='row'
                                                alignItems='center'
                                                onClick={() =>
                                                    setDefenseUploadActive(
                                                        !defenseUploadActive
                                                    )
                                                }>
                                                <EditIcon>
                                                    <HiPencil />
                                                </EditIcon>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/** files */}

                    <Stack
                        h='100%'
                        p='30px 20px'
                        borderBottom='1px solid #EEEEEF'
                        direction='column'
                        w='100%'
                        spacing='30px'>
                        <Stack direction='column' w='50%'>
                            <Box className='form_subtitle'>
                                <h1> Files</h1>
                            </Box>

                            <Stack spacing={'8px'} w='100%'>
                                {filesList.length > 0 ? (
                                    <Box w='100%'>
                                        {selectedView === 'grid' ? (
                                            <Grid
                                                templateColumns='repeat(3, 1fr)'
                                                w='100%'
                                                gap={'20px'}>
                                                {filesList.map(
                                                    (data, index) => {
                                                        let size = formatSize(
                                                            parseInt(
                                                                data.fileId
                                                                    .fileSize
                                                            )
                                                        )

                                                        let createdDates =
                                                            Moments(
                                                                data.fileId
                                                                    .createdAt
                                                            )
                                                                .tz(
                                                                    'Africa/Kampala'
                                                                )
                                                                .format(
                                                                    ' DD MMM, YYYY  H:M A'
                                                                )
                                                        return (
                                                            <GridItem>
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
                                                                            className={`icon_stack ${data.fileId.fileExtension}`}>
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

                                                                    <Stack
                                                                        padding='0 20px'
                                                                        pb='10px'>
                                                                        <Stack
                                                                            direction='row'
                                                                            justifyContent={
                                                                                'space-between'
                                                                            }
                                                                            alignItems='center'>
                                                                            <Stack
                                                                                spacing='0'
                                                                                direction='column'>
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
                                                                                    <MenuItem
                                                                                        onClick={() =>
                                                                                            handleRemove(
                                                                                                data
                                                                                                    .fileId
                                                                                                    .fileId,
                                                                                                data
                                                                                                    .fileId
                                                                                                    .fileName,
                                                                                                data._id
                                                                                            )
                                                                                        }
                                                                                        fontSize={
                                                                                            '14px'
                                                                                        }>
                                                                                        Delete
                                                                                        File
                                                                                    </MenuItem>
                                                                                </MenuList>
                                                                            </Menu>
                                                                        </Stack>

                                                                        <Box className='filedates'>
                                                                            {
                                                                                createdDates
                                                                            }
                                                                        </Box>
                                                                    </Stack>
                                                                </FileStack>
                                                            </GridItem>
                                                        )
                                                    }
                                                )}
                                            </Grid>
                                        ) : (
                                            <Grid
                                                templateColumns='repeat(3, 1fr)'
                                                w='100%'
                                                gap={'20px'}>
                                                {filesList.map(
                                                    (data, index) => (
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
                                                                        className={`icon_stack ${data.fileId.fileExtension}`}>
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
                                                                                    data
                                                                                        .fileId
                                                                                        .fileSize
                                                                                }
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
                                                                        <MenuItem
                                                                            onClick={() =>
                                                                                handleRemove(
                                                                                    data
                                                                                        .fileId
                                                                                        .fileId,
                                                                                    data
                                                                                        .fileId
                                                                                        .fileName,
                                                                                    data._id
                                                                                )
                                                                            }
                                                                            fontSize={
                                                                                '14px'
                                                                            }>
                                                                            Delete
                                                                            File
                                                                        </MenuItem>
                                                                    </MenuList>
                                                                </Menu>
                                                            </Stack>
                                                        </FileStack>
                                                    )
                                                )}
                                            </Grid>
                                        )}
                                    </Box>
                                ) : (
                                    <Box className='nofiles'>
                                        <Text>No Files Uploaded</Text>
                                    </Box>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
            {/** vieing file */}
            {/** modal for viewing file */}
            <Modal
                w='100vw'
                isOpen={isViewFile}
                p='0'
                onClose={() => setIsViewFile(() => false)}
                size=''>
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
            {/** change project status */}
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={cancelStatusChange}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <form onSubmit={statusSubmitChange}>
                            <PopupForm
                                p='0px'
                                direction='column'
                                spacing='0'
                                justifyContent='space-between'>
                                <Stack
                                    p='10px 20px 10px 20px'
                                    direction='column'
                                    spacing={'10px'}
                                    h='50%'>
                                    <Box className='pop_title'>
                                        Change Status
                                    </Box>

                                    <Stack direction='column' spacing='20px'>
                                        <Stack>
                                            <label>
                                                Status <span>*</span>
                                            </label>

                                            <Stack
                                                direction='column'
                                                spacing='0'>
                                                {projectTagData.length > 0 ? (
                                                    <>
                                                        {' '}
                                                        {projectTagData.map(
                                                            (data, index) => {
                                                                return (
                                                                    <StatusChangeItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() =>
                                                                            statusUpdateChange(
                                                                                data,
                                                                                'status'
                                                                            )
                                                                        }
                                                                        tcolors={
                                                                            data.hex
                                                                        }
                                                                        bcolors={
                                                                            newActiveStatus.status ===
                                                                            data.tagName
                                                                                ? '#F8A5A9'
                                                                                : '#ffffff'
                                                                        }
                                                                        color={
                                                                            newActiveStatus.status ===
                                                                            data.tagName
                                                                                ? '#ffffff'
                                                                                : '#464f60'
                                                                        }
                                                                        minW='90px'
                                                                        h='28px'
                                                                        direction='row'
                                                                        justifyContent='space-between'
                                                                        alignItems='center'>
                                                                        <Stack
                                                                            direction='row'
                                                                            alignItems='center'>
                                                                            <div className='colorcontainer' />
                                                                            <Text>
                                                                                {
                                                                                    data.tagName
                                                                                }
                                                                            </Text>
                                                                        </Stack>

                                                                        {newActiveStatus.status ===
                                                                        data.tagName ? (
                                                                            <Box color='#ffffff'>
                                                                                <FiCheck />
                                                                            </Box>
                                                                        ) : null}
                                                                    </StatusChangeItem>
                                                                )
                                                            }
                                                        )}
                                                    </>
                                                ) : null}
                                            </Stack>
                                        </Stack>

                                        {/** new status button */}
                                        <NewStatusBtnStack
                                            direction='row'
                                            alignItems='center'
                                            spacing='20px'>
                                            <Button
                                                onClick={
                                                    handleOpenNewStatusPopup
                                                }>
                                                Add new status
                                            </Button>

                                            <Text>
                                                If status does not exist in the
                                                list above
                                            </Text>
                                        </NewStatusBtnStack>
                                        {/** timelines */}

                                        {newActiveStatus.status ===
                                        'Graduated' ? (
                                            <Stack>
                                                <Stack direction='column'>
                                                    <Stack>
                                                        <label>
                                                            graduation Date
                                                            <span>*</span>
                                                        </label>

                                                        <fieldset>
                                                            <Input
                                                                placeholder='Select Date and Time'
                                                                size='md'
                                                                type='date'
                                                                name='graduationDate'
                                                                value={
                                                                    newActiveStatus !==
                                                                        null &&
                                                                    newActiveStatus.graduationDate
                                                                        ? newActiveStatus.graduationDate
                                                                        : ''
                                                                }
                                                                onChange={
                                                                    statusUpdateDetailsChange
                                                                }
                                                            />
                                                        </fieldset>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        ) : (
                                            <Stack>
                                                <Stack direction='column'>
                                                    <Stack>
                                                        <label>
                                                            Start Date{' '}
                                                            <span>*</span>
                                                        </label>

                                                        <fieldset>
                                                            <Input
                                                                placeholder='Select Date and Time'
                                                                size='md'
                                                                type='date'
                                                                name='startDate'
                                                                value={
                                                                    newActiveStatus !==
                                                                        null &&
                                                                    newActiveStatus.startDate
                                                                        ? newActiveStatus.startDate
                                                                        : ''
                                                                }
                                                                onChange={
                                                                    statusUpdateDetailsChange
                                                                }
                                                            />
                                                        </fieldset>
                                                    </Stack>
                                                </Stack>

                                                <Stack direction='column'>
                                                    <Stack>
                                                        <label>
                                                            Expected End{' '}
                                                            <span>*</span>
                                                        </label>

                                                        <fieldset>
                                                            <Input
                                                                placeholder='Select Date and Time'
                                                                size='md'
                                                                type='date'
                                                                name='expectedEnd'
                                                                value={
                                                                    newActiveStatus !==
                                                                        null &&
                                                                    newActiveStatus.expectedEnd
                                                                        ? newActiveStatus.expectedEnd
                                                                        : ''
                                                                }
                                                                onChange={
                                                                    statusUpdateDetailsChange
                                                                }
                                                            />
                                                        </fieldset>
                                                    </Stack>
                                                </Stack>

                                                <Stack direction='column'>
                                                    <Stack>
                                                        <label>
                                                            Entry Type{' '}
                                                            <span>*</span>
                                                        </label>

                                                        <fieldset>
                                                            <Input
                                                                type='text'
                                                                value={
                                                                    newActiveStatus !==
                                                                        null &&
                                                                    newActiveStatus.endDate
                                                                        ? newActiveStatus.endDate
                                                                        : ''
                                                                }
                                                                name='tagName'
                                                                onChange={
                                                                    statusUpdateDetailsChange
                                                                }
                                                                placeholder={
                                                                    'i.e In Review'
                                                                }
                                                            />
                                                        </fieldset>
                                                    </Stack>
                                                </Stack>

                                                <Stack direction='column'>
                                                    <Stack>
                                                        <label>
                                                            End Date{' '}
                                                            <span>*</span>
                                                        </label>

                                                        <fieldset>
                                                            <Input
                                                                placeholder='Select Date and Time'
                                                                size='md'
                                                                type='date'
                                                                name='endDate'
                                                                value={
                                                                    newActiveStatus !==
                                                                        null &&
                                                                    newActiveStatus.endDate
                                                                        ? newActiveStatus.endDate
                                                                        : ''
                                                                }
                                                                onChange={
                                                                    statusUpdateDetailsChange
                                                                }
                                                            />
                                                        </fieldset>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        )}
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
                                        onClick={cancelStatusChange}>
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        type='submit'
                                        isLoading={isSubmittingp ? true : false}
                                        className='apply_button'>
                                        Confirm
                                    </Button>
                                </Stack>
                            </PopupForm>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/** create new status */}
            <Modal
                w='100vw'
                isOpen={newStatusPopup}
                p='0'
                onClose={handleCloseNewStatusPopup}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                table: 'project',
                                tagName: '',
                                rgba: '',
                                hex: '',
                                fullColor: '',
                                projectType: type,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)

                                toast.dismiss()
                                toast.promise(
                                    dispatch(tagCreate(values)).then((res) => {
                                        //console.log('res', res)
                                        if (
                                            res.meta.requestStatus ===
                                            'rejected'
                                        ) {
                                            let responseCheck =
                                                errorHandler(res)
                                            throw new Error(responseCheck)
                                        } else {
                                            return res.payload.message
                                        }
                                    }),
                                    {
                                        loading: 'creating new student status',
                                        success: (data) => `${data}`,
                                        error: (err) => {
                                            if (
                                                err
                                                    .toString()
                                                    .includes(
                                                        'Check your internet connection'
                                                    )
                                            ) {
                                                return 'Check Internet Connection'
                                            } else if (
                                                err
                                                    .toString()
                                                    .includes(
                                                        'Authentication required'
                                                    )
                                            ) {
                                                setTimeout(handleLogout, 3000)
                                                return 'Not Authenticated'
                                            } else if (
                                                err
                                                    .toString()
                                                    .includes(
                                                        'Authentication expired'
                                                    )
                                            ) {
                                                setTimeout(handleLogout, 3000)
                                                return 'Authentication Expired'
                                            } else {
                                                return `${err}`
                                            }
                                        },
                                    }
                                )
                            }}>
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                isValid,
                                dirty,
                            }) => (
                                <Form>
                                    <PopupForm
                                        p='0px'
                                        direction='column'
                                        spacing='0'
                                        justifyContent='space-between'>
                                        <Stack
                                            p='10px 20px 10px 20px'
                                            direction='column'
                                            spacing={'10px'}
                                            h='50%'>
                                            <Box className='pop_title'>
                                                Create New Status
                                            </Box>

                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Status name{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.tagName
                                                            }
                                                            name='tagName'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e In Review'
                                                            }
                                                        />
                                                    </fieldset>
                                                </Stack>
                                            </Stack>

                                            <Stack
                                                direction='column'
                                                width='100%'
                                                h='100%'>
                                                <Stack width='100%'>
                                                    <label>
                                                        Status color{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <Box
                                                        width='100%'
                                                        display='flex'
                                                        minH='450px'
                                                        height='100%'>
                                                        <SketchPicker
                                                            color={
                                                                colorPicked.rgb
                                                            }
                                                            onChange={(color) =>
                                                                handleColorPicked(
                                                                    color,
                                                                    setFieldValue
                                                                )
                                                            }
                                                            width='100%'
                                                            height='100%'
                                                            padding='0'
                                                            presetColors={[
                                                                '#C97A20',
                                                                '#38A06C',
                                                                '#EF5466',
                                                            ]}
                                                        />
                                                    </Box>
                                                </Stack>
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
                                                onClick={() =>
                                                    handleCloseNewStatusPopup()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                type='submit'
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/** viva files report */}
            <VivaPopupFileUpload
                projectId={projectId}
                fileUploadActive={fileUploadActive}
                setFileUploadActive={setFileUploadActive}
            />
            {/** viva defense Date */}
            <VivaPopupDefense
                projectId={projectId}
                valuess={values}
                setDefenseUploadActive={setDefenseUploadActive}
                defenseUploadActive={defenseUploadActive}
            />
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

export default MastersVivaReport

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;
    overflow: hidden;

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

    .files {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uploadBtn {
        padding: 6px 12px;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        color: #ffffff;
        letter-spacing: 0.02em;
        cursor: pointer;
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

    input {
        background: #fefaf2;
        border-radius: 6px;

        height: 32px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        border: 0px;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
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

        font-family: 'Inter', sans-serif;
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

    .filedates {
        background: #f5f5f5;
        border-radius: 2px;
        height: 20px;
        color: #838389;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 18px;
        padding-left: 8px;
        display: flex;
        aling-items: center;
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
            font-family: 'Inter', sans-serif;
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

    .doc,
    .docx {
        color: #faa723;
        background: #feecd0;
    }

    .filename {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
    }

    .filesize {
        color: #838389;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
    }
`

const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};

    div {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        color: ${({ tcolors }) => tcolors};
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

const StatusChangeItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};
    cursor: pointer;
    .colorcontainer {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
    }

    :hover {
        color: #ffffff;
        background: #f8a5a9;
    }
`

const SubmitButton = styled(Box)`
    width: 126px;
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

const NewStatusBtnStack = styled(Stack)`
    button {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        color: #ffffff;
        background: #f4797f;
        border-radius: 6px;
    }

    p {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: 500;
        font-size: 14px;
        color: #db0000;
    }
`
