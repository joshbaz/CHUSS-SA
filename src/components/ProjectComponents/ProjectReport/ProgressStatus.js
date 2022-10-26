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
    Textarea,
    useToast,
} from '@chakra-ui/react'
import { MdKeyboardArrowDown } from 'react-icons/md'
//import { renderToStaticMarkup } from 'react-dom/server'
//import { useElementSize } from 'use-element-size'
// const reactSvgComponentToMarkupString = (Component, props) =>
//     `data:image/svg+xml,${encodeURIComponent(
//         renderToStaticMarkup(React.createElement(Component, props))
//     )}`
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateProjectStatus,
    reset,
} from '../../../store/features/project/projectSlice'
import { FiCheck } from 'react-icons/fi'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import PopupEditStatus from './PopupEditStatus'

const DataArray = [
    {
        title: 'Create Project',
        completed: false,
        completeA: false,
        step: 1,
    },
    {
        title: 'Looking For Examinar',
        completed: false,
        completeA: false,
        step: 2,
    },
    {
        title: 'Marking in Progress',
        completed: false,
        completeA: false,
        step: 3,
    },
    {
        title: 'Waiting for viva approval',
        completed: false,
        completeA: false,
        step: 4,
    },
    {
        title: 'waiting for viva minutes',
        completed: false,
        completeA: false,
        step: 5,
    },
    {
        title: 'waiting for final submission',
        completed: false,
        completeA: false,
        step: 6,
    },
    {
        title: 'Graduated',
        completed: false,
        completeA: false,
        step: 7,
    },
]
const ProgressStatus = ({ valuess, allTagData }) => {
    const [projectId, setProjectId] = React.useState(null)
    const [projectTagData, setProjectTagData] = React.useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeStatusE, setActiveStatus] = React.useState(null)
    const [activeDataStatus, setActiveDataStatus] = React.useState('')
    const [newActiveStatus, setNewActiveStatus] = React.useState({
        status: '',
        notes: '',
    })
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [errors, setErrors] = React.useState({})
    //submitting state
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChangeMade] = React.useState(false)
    const [Sizes, setSizes] = React.useState({
        width: 100,
        height: 100,
    })
    const [listState, setListState] = React.useState([])
    // const ref = useElementSize((size, prevSize, elem) => {})
    const ref = React.useRef(null)
    let dispatch = useDispatch()
    let toast = useToast()
    let { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.project
    )

    useEffect(() => {}, [])
    // useEffect(() => {
    //     const newList = [...listState]
    //     if (
    //         valuess !== null &&
    //         valuess.projectStatus &&
    //         valuess.projectStatus.length > 0
    //     ) {
    //         valuess.projectStatus.filter((data, index) => {
    //             for (
    //                 let iteration = 0;
    //                 iteration < newList.length;
    //                 iteration++
    //             ) {
    //                 if (newList[iteration].title === data.status) {
    //                     newList[iteration].completed = data.completed
    //                     newList[iteration].active = data.active
    //                     let checkStep =
    //                         newList[iteration].step === 1 ||
    //                         newList[iteration].step === 7
    //                             ? false
    //                             : true

    //                     if (checkStep) {
    //                         let value = iteration - 1

    //                         let completeA =
    //                             newList[value].completed && data.completed
    //                                 ? true
    //                                 : false

    //                         newList[iteration].completeA = completeA
    //                         if (
    //                             newList[iteration].completeA &&
    //                             newList[iteration].step === 2
    //                         ) {
    //                             newList[value].completeA = completeA
    //                         }
    //                     }
    //                 }
    //             }
    //         })
    //     }
    // }, [valuess])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'project'
        )

        if (
            valuess !== null &&
            valuess.projectStatus &&
            valuess.projectStatus.length > 0 &&
            allInfoData.length > 0
        ) {
            let activeStatus = valuess.projectStatus.find(
                (element) => element.active
            )
            if (activeStatus) {
                setNewActiveStatus({
                    status: activeStatus.status,
                    notes: activeStatus.notes,
                })
                setActiveDataStatus(activeStatus)

                let activeElementSet = allInfoData.find(
                    (element) => element.tagName === activeStatus.status
                )

                if (activeElementSet) {
                    setActiveStatus(activeElementSet)
                }
            }
        } else {
        }
        setProjectTagData(allInfoData)
    }, [valuess])

    /**
     * effect for projectId to change
     * the state
     */
    React.useEffect(() => {
        if (valuess !== null && valuess._id) {
            setProjectId(valuess._id)
        }
    }, [valuess])

    /**
     * function to update status change
     *
     */
    // const statusUpdateChange = (data, type) => {
    //     if (type === 'status') {
    //         setIsSubmittingp(false)
    //         setChangeMade(true)
    //         setNewActiveStatus({
    //             status: data.tagName,
    //             notes: '',
    //         })
    //     }
    // }

    // const statusNotesUpdate = (e) => {
    //     e.preventDefault()
    //     setIsSubmittingp(false)
    //     setChangeMade(true)
    //     setNewActiveStatus({
    //         ...newActiveStatus,
    //         notes: e.target.value,
    //     })
    // }

    // let validate = (valuess) => {
    //     const errors = {}
    //     if (!valuess.notes) {
    //         errors.notes = 'notes required'
    //     }

    //     return errors
    // }
    const validationSchema = yup.object().shape({
        notes: yup.string().required('notes is required'),
        status: yup.string().required('status is required'),
    })

    /**
     * function to submit change to server
     */

    // const statusSubmitChange = (e) => {
    //     e.preventDefault()
    //     setErrors(validate(newActiveStatus))
    //     setIsSubmittingp(true)
    // }

    /**
     * function to cancel submit change
     */

    const cancelStatusChange = () => {
        setNewActiveStatus(activeDataStatus)

        setChangeMade(false)
        setIsSubmittingp(false)
        onClose()
    }

    /** run after submission awaiting for response */

    // React.useEffect(() => {
    //     if (isError) {
    //         toast({
    //             position: 'top',
    //             title: message,
    //             status: 'error',
    //             duration: 10000,
    //             isClosable: true,
    //         })
    //         setIsSubmittingp(false)
    //         setChangeMade(false)

    //         dispatch(reset())
    //     }

    //     if (isSuccess && isSubmittingp) {
    //         toast({
    //             position: 'top',
    //             title: message.message,
    //             status: 'success',
    //             duration: 10000,
    //             isClosable: true,
    //         })
    //         setIsSubmittingp(false)
    //         setChangeMade(false)
    //         dispatch(reset())
    //     }
    //     dispatch(reset())
    // }, [isError, isSuccess, message, dispatch])

    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }
            toast({
                position: 'top',
                title: message.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)

            dispatch(reset())
        }

        if (isSuccess) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setChangeMade(false)
                //setEditDetails(null)
                onClose()
                setHelperFunctions(null)
            }
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message])

    // /** submittion of the changes */
    // React.useEffect(() => {
    //     if (
    //         Object.keys(errors).length === 0 &&
    //         setIsSubmittingp &&
    //         changeMade
    //     ) {
    //         dispatch(
    //             updateProjectStatus({
    //                 ...newActiveStatus,
    //                 projectId,
    //             })
    //         )
    //         //setIsSubmittingp(false)
    //     }

    //     if (Object.keys(errors).length > 0 && setIsSubmittingp && changeMade) {
    //         setIsSubmittingp(false)
    //         setChangeMade(false)
    //     }
    // }, [isSubmittingp])

    return (
        <Container>
            {' '}
            <Stack spacing='0px' className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
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
                        sizes={Sizes}
                        elementsize={listState.length}>
                        <ul ref={ref}>
                            {listState.map((data, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`${
                                            data.completed ? 'completed' : ''
                                        } ${data.active ? 'active' : ''} ${
                                            data.completeA ? 'completeA' : ''
                                        }`}>
                                        <span
                                            className={`li ${
                                                data.completed ? 'complete' : ''
                                            }`}>
                                            {data.title}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </StatusContainer>
                </Stack>
            </Stack>
            {/** edit status */}
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                ...newActiveStatus,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)
                                console.log('vddgsdsd', values)
                                let newValues = {
                                    ...values,
                                    projectId,
                                }
                                dispatch(updateProjectStatus(newValues))
                            }}>
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                isValid,
                                dirty,
                            }) => (
                                <Form>
                                    <PopupEditStatus
                                        values={values}
                                        setFieldValue={setFieldValue}
                                        setChangeMade={setChangeMade}
                                        projectTagData={projectTagData}
                                        isSubmittingp={isSubmittingp}
                                        cancelStatusChange={cancelStatusChange}
                                        changeMade={changeMade}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default ProgressStatus

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

    height: 100%;
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
    .content_wrap {
        height: 100%;
        width: 100%;
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
`

const StatusContainer = styled(Stack)`
    padding: 10px 20px;

    list-style-type: none;
    position: relative;
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
    z-index: 10;

    ul {
        list-style-type: none;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 100%;
        z-index: 10;
    }
    li {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .li {
        width: 100px;
        height: 100px;
        height: 7.4vw;
        background: #fef4e3;
        border-radius: 3.7vw;
        position: relative;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
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
    }

    li:after {
        content: '';
        background: #ffe5a6;
        width: 15%;
        height: 23px;
        clip-path: polygon(
            0 10px,
            calc(100% - 13px) 10px,
            calc(100% - 13px) 0,
            100% 50%,
            calc(100% - 13px) 100%,
            calc(100% - 13px) calc(100% - 9px),
            0 calc(100% - 9px)
        );
        flex-grow: 1;
    }

    .completed {
        .li {
            background: #00a651;
            color: #fef4e3;
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
            z-index: -2;
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
