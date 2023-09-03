/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    useToast,
    Input,
    RadioGroup,
    Radio,
} from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md'
//import { renderToStaticMarkup } from 'react-dom/server'
//import { useElementSize } from 'use-element-size'
// const reactSvgComponentToMarkupString = (Component, props) =>
//     `data:image/svg+xml,${encodeURIComponent(
//         renderToStaticMarkup(React.createElement(Component, props))
//     )}`

import { useDispatch, useSelector } from 'react-redux'
import {
    updateProjectStatus,
    reset,
} from '../../../store/features/project/projectSlice'
import {
    reset as treset,
    tagCreate,
} from '../../../store/features/tags/tagSlice'
import { FiCheck } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'
import { SketchPicker } from 'react-color'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Moments from 'moment-timezone'

const ProgressStatus2 = ({ values, allTagData, type, sNames }) => {
    const [projectId, setProjectId] = React.useState(null)
    const [projectTagData, setProjectTagData] = React.useState([])
    const [colorPicked, setColorPicked] = React.useState({ hex: '' })
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [newStatusPopup, setNewStatusPopup] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeStatusE, setActiveStatus] = React.useState(null)

    const [newActiveStatus, setNewActiveStatus] = React.useState({
        status: '',
        startDate: '',
        expectedEnd: '',
        statusEntryType: '',
        endDate: '',
        dateOfGraduation: '',
        timeline: 'false',
        statusDate: '',
    })
    const [errors, setErrors] = React.useState({})
    //submitting state
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChangeMade] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [Sizes, setSizes] = React.useState({
        width: 100,
        height: 100,
    })

    //const [activeDataStatus, setActiveDataStatus] = React.useState('')
    const [listState, setListState] = React.useState([
        {
            title: 'Entry',
            completed: true,
            completeA: true,
        },

        {
            title: 'Add Status',
            icon: '',
            completeA: false,
        },
        {
            title: 'Graduated',
            completed: false,
            completeA: false,
            step: 11,
        },
    ])

    const [displayListState, setDisplayListState] = React.useState([
        {
            title: 'Entry',
            completed: true,
            completeA: true,
        },

        {
            title: 'Add Status',
            icon: '',
            completeA: false,
        },
        {
            title: 'Graduated',
            completed: false,
            completeA: false,
            step: 11,
        },
    ])
    // const ref = useElementSize((size, prevSize, elem) => {})
    const ref = React.useRef(null)
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, isError, message } = useSelector((state) => state.project)
    let tagGStates = useSelector((state) => state.tag)

    useEffect(() => {
        let newList = []
        let projectStatusValues = []

        if (
            values !== null &&
            values.projectStatus &&
            values.projectStatus.length > 0
        ) {
            projectStatusValues = [...values.projectStatus]
        } else {
            projectStatusValues = []
        }
        if (
            values !== null &&
            projectStatusValues &&
            projectStatusValues.length > 0
        ) {
            for (
                let iteration = 0;
                iteration < projectStatusValues.length;
                iteration++
            ) {
                let totalIteration = iteration + 1
                if (
                    projectStatusValues[iteration].projectStatusId.status !==
                    'Graduated'
                ) {
                    let newValue = {
                        title: projectStatusValues[iteration].projectStatusId
                            .status,
                        ...projectStatusValues[iteration].projectStatusId,
                    }

                    newList.push(newValue)
                }

                if (totalIteration === projectStatusValues.length) {
                    let newData = projectStatusValues.filter((data, index) => {
                        if (data.projectStatusId.status === 'Graduated') {
                            let newValue = {
                                title: data.projectStatusId.status,
                                ...data.projectStatusId,
                            }

                            return newValue
                        } else {
                            return null
                        }
                    })

                    //console.log('allnews', newData)

                    let allValues = [
                        {
                            title: 'Entry',
                            completed: true,
                            completeA: true,
                        },

                        ...newList,

                        newData.length > 0
                            ? {
                                  title: 'Add Status',
                                  icon: '',
                                  completeA: true,
                              }
                            : {
                                  title: 'Add Status',
                                  icon: '',
                                  completeA: false,
                              },

                        newData.length > 0
                            ? {
                                  title: 'Graduated',
                                  ...newData[0].projectStatusId,
                                  completed: false,
                                  completeA: false,
                                  step: 11,
                              }
                            : {
                                  title: 'Graduated',
                                  completed: false,
                                  completeA: false,
                                  step: 11,
                              },
                    ]

                    setListState(() => allValues)
                }
            }
        } else {
            setListState(() => [
                {
                    title: 'Entry',
                    completed: true,
                    completeA: true,
                },

                {
                    title: 'Add Status',
                    icon: '',
                    completeA: false,
                },
                {
                    title: 'Graduated',
                    completed: false,
                    completeA: false,
                    step: 11,
                },
            ])
        }
    }, [values, sNames])

    //new trial
    useEffect(() => {
        let newList = [...listState]

        if (
            values !== null &&
            values.projectStatus &&
            values.projectStatus.length > 0
        ) {
            let arrayData = newList.map((data, index) => {
                if (
                    data.endDate &&
                    !data.active &&
                    data.title !== 'Add Status'
                ) {
                    return {
                        ...data,
                        active: false,
                        completed: true,
                        completeA: true,
                    }
                } else if (
                    data.endDate &&
                    data.active &&
                    data.title !== 'Add Status'
                ) {
                    return {
                        ...data,
                        active: false,
                        completed: true,
                        completeA: true,
                    }
                } else {
                    return data
                }
            })

            setDisplayListState(() => arrayData)
        } else {
            setDisplayListState(() => [...listState])
        }
    }, [values, listState, type, sNames])

    useEffect(() => {
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
                    ...newActiveStatus,
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
            setActiveStatus(null)
            setNewActiveStatus({
                status: '',
                startDate: '',
                expectedEnd: '',
                statusEntryType: '',
                endDate: '',
                dateOfGraduation: '',
                timeline: 'false',
                statusDate: '',
            })
        }
        setProjectTagData(allInfoData)
    }, [allTagData, values, type, sNames])

    /**
     * effect for projectId to change
     * the state
     */
    React.useEffect(() => {
        if (values !== null && values._id) {
            setProjectId(values._id)
        }
    }, [values])

    /**
     * function to update status change
     *
     */
    const statusUpdateChange = (data, type) => {
        if (type === 'status') {
            setIsSubmittingp(false)
            setChangeMade(true)
            setNewActiveStatus({
                ...newActiveStatus,
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

    /** radio buttons for status entry type */
    const statusUpdateEntryChange = (name, onit) => {
        // console.log('valueonit', onit)
        setIsSubmittingp(false)
        setChangeMade(true)
        setNewActiveStatus({
            ...newActiveStatus,
            [name]: `${onit}`,
        })
    }

    /** radio buttons for timeline check */
    const statusUpdateTimelineChange = (name, onit) => {
        // console.log('valueonit', onit)
        setIsSubmittingp(false)
        setChangeMade(true)
        setNewActiveStatus({
            ...newActiveStatus,
            [name]: `${onit}`,
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
        }

        if (isSuccess && message) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChangeMade(false)
            onClose()
            dispatch(reset())
        }
        dispatch(reset())
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

            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }
        }

        if (tagGStates.isSuccess && tagGStates.message) {
            toast({
                position: 'top',
                title: tagGStates.message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChangeMade(false)
            onClose()
            dispatch(treset())

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
    }, [tagGStates.isError, tagGStates.isSuccess, tagGStates.message, dispatch])

    /** submittion of the changes */
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(
                updateProjectStatus({
                    ...newActiveStatus,
                    projectId,
                })
            )
            //setIsSubmittingp(false)
        }

        if (Object.keys(errors).length > 0 && isSubmittingp && changeMade) {
            setIsSubmittingp(false)
            setChangeMade(false)
        }
    }, [isSubmittingp])

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
        <Container w='100%'>
            <Stack spacing='0px' className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Progress</h1>
                    </Box>

                    <Stack
                        className='status_dropdown'
                        direction='row'
                        alignItems='center'>
                        <h5>Current Project Status</h5>

                        <Stack direction='row' alignItems='center'>
                            <StatusItem
                                tcolors={
                                    activeStatusE !== null && activeStatusE.hex
                                        ? activeStatusE.hex
                                        : ''
                                }
                                bcolors={
                                    activeStatusE !== null && activeStatusE.rgba
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
                </Stack>

                {/** details */}
                <Stack
                    className='content_wrap'
                    h='100%'
                    alignItems='center'
                    justifyContent='center'>
                    <StatusContainer
                        className='status_contentWrap'
                        sizes={Sizes}
                        elementsize={listState.length}>
                        <ul ref={ref}>
                            {displayListState.map((data, index) => {
                                let firstlast =
                                    (index === 0 &&
                                        data.title !== 'Add Status') ||
                                    data.title === 'Graduated'
                                        ? true
                                        : false

                                return (
                                    <li
                                        key={index}
                                        className={`${
                                            data.completed ? 'completed' : ''
                                        } ${data.active ? 'active' : ''} ${
                                            data.completeA ? 'completeA' : ''
                                        }`}>
                                        <Stack
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                position: 'relative',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                            <Box
                                                h='100px'
                                                className={`${'innerwrapper'}`}>
                                                <Box
                                                    onClick={
                                                        data.title ===
                                                        'Add Status'
                                                            ? onOpen
                                                            : null
                                                    }
                                                    className={`${
                                                        firstlast
                                                            ? 'li'
                                                            : 'middleLi'
                                                    } ${
                                                        data.title ===
                                                        'Add Status'
                                                            ? 'statusAdd'
                                                            : ''
                                                    } ${
                                                        data.completed
                                                            ? 'completed'
                                                            : ''
                                                    }`}>
                                                    {data.title ===
                                                    'Add Status' ? (
                                                        <AiOutlinePlus />
                                                    ) : (
                                                        ''
                                                    )}

                                                    {data.title !==
                                                        'Add Status' &&
                                                    !firstlast
                                                        ? index + 1
                                                        : null}

                                                    {data.title !==
                                                        'Add Status' &&
                                                    firstlast
                                                        ? data.title
                                                        : null}
                                                </Box>
                                            </Box>
                                            <Box
                                                h='100px'
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    position: 'relative',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                <StatusText>
                                                    <Stack
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            position:
                                                                'relative',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'center',
                                                        }}>
                                                        <Text>
                                                            {data.title !==
                                                                'Add Status' &&
                                                            !firstlast
                                                                ? data.title
                                                                : null}
                                                        </Text>

                                                        {data.title ===
                                                            'Add Status' ||
                                                        data.title ===
                                                            'Entry' ||
                                                        data.title ===
                                                            'Graduated' ? null : (
                                                            <Stack>
                                                                {data.timeline ===
                                                                'false' ? (
                                                                    <Stack direction='row'>
                                                                        <Text>
                                                                            Date:{' '}
                                                                        </Text>
                                                                        <Text>
                                                                            {' '}
                                                                            {data.statusDate
                                                                                ? Moments(
                                                                                      data.statusDate
                                                                                  )
                                                                                      .tz(
                                                                                          'Africa/Kampala'
                                                                                      )
                                                                                      .format(
                                                                                          'DD MMM YYYY '
                                                                                      )
                                                                                : ''}
                                                                        </Text>
                                                                    </Stack>
                                                                ) : (
                                                                    <Stack>
                                                                        <Stack direction='row'>
                                                                            <Text>
                                                                                Started:{' '}
                                                                            </Text>
                                                                            <Text>
                                                                                {' '}
                                                                                {data.startDate
                                                                                    ? Moments(
                                                                                          data.startDate
                                                                                      )
                                                                                          .tz(
                                                                                              'Africa/Kampala'
                                                                                          )
                                                                                          .format(
                                                                                              'DD MMM YYYY '
                                                                                          )
                                                                                    : ''}
                                                                            </Text>
                                                                        </Stack>
                                                                        <Stack direction='row'>
                                                                            <Text>
                                                                                Expected:{' '}
                                                                            </Text>
                                                                            <Text>
                                                                                {data.expectedEndDate
                                                                                    ? Moments(
                                                                                          data.expectedEndDate
                                                                                      )
                                                                                          .tz(
                                                                                              'Africa/Kampala'
                                                                                          )
                                                                                          .format(
                                                                                              'DD MMM YYYY '
                                                                                          )
                                                                                    : ''}
                                                                            </Text>
                                                                        </Stack>
                                                                        {data.endDate && (
                                                                            <Stack direction='row'>
                                                                                <Text>
                                                                                    Finished:
                                                                                </Text>

                                                                                <Text>
                                                                                    {data.endDate
                                                                                        ? Moments(
                                                                                              data.endDate
                                                                                          )
                                                                                              .tz(
                                                                                                  'Africa/Kampala'
                                                                                              )
                                                                                              .format(
                                                                                                  'DD MMM YYYY '
                                                                                              )
                                                                                        : ''}
                                                                                </Text>
                                                                            </Stack>
                                                                        )}
                                                                    </Stack>
                                                                )}
                                                            </Stack>
                                                        )}
                                                    </Stack>
                                                </StatusText>
                                            </Box>
                                        </Stack>
                                    </li>
                                )
                            })}
                        </ul>
                    </StatusContainer>
                </Stack>
            </Stack>

            {/** status change */}
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
                                        {/** Check if there status has timelines */}
                                        {newActiveStatus.status ===
                                        'Graduated' ? null : (
                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Has Timeline?{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <RadioGroup
                                                            onChange={(
                                                                onval
                                                            ) => {
                                                                statusUpdateTimelineChange(
                                                                    'timeline',
                                                                    onval
                                                                )
                                                            }}
                                                            name='timeline'
                                                            value={
                                                                newActiveStatus !==
                                                                    null &&
                                                                newActiveStatus.timeline
                                                                    ? newActiveStatus.timeline
                                                                    : ''
                                                            }>
                                                            <Stack
                                                                direction='row'
                                                                spacing='20px'>
                                                                <Radio
                                                                    value={
                                                                        'true'
                                                                    }>
                                                                    <Stack spacing='0'>
                                                                        <Text className='radio_title'>
                                                                            true
                                                                        </Text>
                                                                    </Stack>
                                                                </Radio>

                                                                <Radio
                                                                    value={
                                                                        'false'
                                                                    }>
                                                                    <Stack spacing='0'>
                                                                        <Text className='radio_title'>
                                                                            false
                                                                        </Text>
                                                                    </Stack>
                                                                </Radio>
                                                            </Stack>
                                                        </RadioGroup>
                                                    </fieldset>
                                                </Stack>
                                            </Stack>
                                        )}
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
                                                {newActiveStatus.timeline ===
                                                'false' ? (
                                                    <Stack>
                                                        <Stack direction='column'>
                                                            <Stack>
                                                                <label>
                                                                    Status Date{' '}
                                                                    <span>
                                                                        *
                                                                    </span>
                                                                </label>

                                                                <fieldset>
                                                                    <Input
                                                                        placeholder='Select Date and Time'
                                                                        size='md'
                                                                        type='date'
                                                                        name='statusDate'
                                                                        value={
                                                                            newActiveStatus !==
                                                                                null &&
                                                                            newActiveStatus.statusDate
                                                                                ? newActiveStatus.statusDate
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
                                                                    <span>
                                                                        *
                                                                    </span>
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
                                                                    <span>
                                                                        *
                                                                    </span>
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
                                                                    <span>
                                                                        *
                                                                    </span>
                                                                </label>

                                                                <fieldset>
                                                                    <RadioGroup
                                                                        onChange={(
                                                                            onval
                                                                        ) => {
                                                                            statusUpdateEntryChange(
                                                                                'statusEntryType',
                                                                                onval
                                                                            )
                                                                        }}
                                                                        name='statusEntryType'
                                                                        value={
                                                                            newActiveStatus !==
                                                                                null &&
                                                                            newActiveStatus.statusEntryType
                                                                                ? newActiveStatus.statusEntryType
                                                                                : ''
                                                                        }>
                                                                        <Stack
                                                                            direction='row'
                                                                            spacing='20px'>
                                                                            <Radio value='new entry'>
                                                                                <Stack spacing='0'>
                                                                                    <Text className='radio_title'>
                                                                                        new
                                                                                        entry
                                                                                    </Text>
                                                                                </Stack>
                                                                            </Radio>

                                                                            <Radio value='old entry'>
                                                                                <Stack spacing='0'>
                                                                                    <Text className='radio_title'>
                                                                                        old
                                                                                        entry
                                                                                    </Text>
                                                                                </Stack>
                                                                            </Radio>
                                                                        </Stack>
                                                                    </RadioGroup>
                                                                </fieldset>
                                                            </Stack>
                                                        </Stack>

                                                        {newActiveStatus.statusEntryType ===
                                                        'old entry' ? (
                                                            <Stack direction='column'>
                                                                <Stack>
                                                                    <label>
                                                                        End Date{' '}
                                                                        <span>
                                                                            *
                                                                        </span>
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
                                                        ) : null}
                                                    </Stack>
                                                )}
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

            {/** create modal */}
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
                                dispatch(tagCreate(values))
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
        </Container>
    )
}

export default ProgressStatus2

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;
    overflow-y: hidden;

    height: 100%;
    width: 100%;

    .form_container {
        width: 100%;
        min-height: 280px;
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
    .content_wrap {
        height: 100%;
        overflow-x: hidden;
    }

    .status_dropdown {
        h5 {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 18px;
            color: #5e5c60;
            letter-spacing: 0.03em;
        }
    }

    .status_contentWrap::-webkit-scrollbar {
        height: 10px;
    }
`

const StatusContainer = styled(Stack)`
    padding: 10px 20px;
    font-family: 'Inter', sans-serif;
    list-style-type: none;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;

    overflow-x: auto;

    ul {
        list-style-type: none;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    li {
        width: 100%;
        height: 100%;
        display: flex;

        align-items: flex-start;
    }
    .li {
        width: 100px;
        height: 100px;
        height: 7.4vw;
        height: 92px;
        background: #fef4e3;
        border-radius: 3.7vw;
        border-radius: 50%;
        position: relative;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-transform: uppercase;
        color: #ebb969;
        padding: 0 5px;
        flex-grow: 0;

        width: 100px;
        width: 7.4vw;
        width: 92px;
    }

    .middleLi {
        width: 100px;
        height: 100px;
        height: 7.4vw;
        height: 60px;
        background: #eeeeef;
        border-radius: 3.7vw;
        border-radius: 50%;
        border: 4px solid #abaaaf;
        position: relative;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-transform: uppercase;
        color: #abaaaf;
        padding: 0 5px;
        flex-grow: 0;

        width: 100px;
        width: 60px;
    }

    .statusAdd {
        width: 100px;
        height: 100px;
        height: 7.4vw;
        height: 60px;
        background: #eeeeef;
        border-radius: 3.7vw;
        border-radius: 50%;
        border: 4px solid #f4797f;
        position: relative;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 12px;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-transform: uppercase;
        color: #464f60;
        padding: 0 5px;
        flex-grow: 1;

        width: 100px;
        width: 60px;
    }

    .innerwrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    li:after {
        content: '';
        background: #ffe5a6;
        width: 15%;
        min-width: 200px;
        height: 23px;
        position: relative;
        top: 40px;
        flex-grow: 1;
        clip-path: polygon(
            0 10px,
            calc(100% - 0px) 10px,
            calc(100% - 0px) 0,
            calc(100% - 0px) 100%,
            calc(100% - 0px) calc(100% - 9px),
            0 calc(100% - 9px)
        );
    }

    .completed {
        .li {
            background: #00a651;
            color: #fef4e3;
        }

        .middleLi {
            background: #00a651;
            border: 4px solid #00a651;
            color: #fbfbfb;
        }
    }

    .completed {
        &:after {
            background: linear-gradient(90deg, #00a651 0%, #fcd7d9 86.55%);
        }
    }

    .active {
        .li {
            background: #f8a5a9;
            color: #450103;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 2px rgba(70, 79, 96, 0.3), 0px 0px 0px 9px #fcd7d9;
        }
        &:after {
            z-index: 2;
        }
    }

    .completeA {
        &:after {
            background: green !important;
        }
    }

    li:nth-last-child(1) {
        width: 50%;
        &:after {
            content: none;
            display: none;
            width: 0px;
        }
    }
`

const StatusText = styled(Box)`
    bottom: 0;
    position: absolute;
    text-align: center;
    min-width: 200px;
    max-width: 220px;
    min-height: 100px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 14px;

    color: #9c9c9c;
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

    input {
        height: 32px;
    }

    label {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        font-weight: 600;
        color: #464f60;

        span {
            color: red;
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

    .radio_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }
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
