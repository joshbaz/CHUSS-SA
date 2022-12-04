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
const ProgressStatus = ({ values, allTagData }) => {
    const [projectId, setProjectId] = React.useState(null)
    const [projectTagData, setProjectTagData] = React.useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [activeStatusE, setActiveStatus] = React.useState(null)
    const [activeDataStatus, setActiveDataStatus] = React.useState('')
    const [newActiveStatus, setNewActiveStatus] = React.useState({
        status: '',
        notes: '',
    })
    const [errors, setErrors] = React.useState({})
    //submitting state
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChangeMade] = React.useState(false)
    const [Sizes, setSizes] = React.useState({
        width: 100,
        height: 100,
    })
    const [listState, setListState] = React.useState([
        {
            title: 'Admissions',
            completed: false,
            completeA: false,
            step: 1,
        },

        {
            title: 'Thesis / dessertation Approval',
            completed: false,
            completeA: false,
            step: 2,
        },
        {
            title: 'Looking For Examinar',
            completed: false,
            completeA: false,
            step: 3,
        },
        {
            title: 'Marking In Progress',
            completed: false,
            completeA: false,
            step: 4,
        },
        {
            title: 'Waiting For viva approval',
            completed: false,
            completeA: false,
            step: 5,
        },
        {
            title: 'waiting for viva minutes',
            completed: false,
            completeA: false,
            step: 6,
        },
        {
            title: 'final submission',
            completed: false,
            completeA: false,
            step: 7,
        },
        {
            title: 'Waiting for graduation',
            completed: false,
            completeA: false,
            step: 8,
        },
        {
            title: 'Graduated',
            completed: false,
            completeA: false,
            step: 9,
        },
    ])
    // const ref = useElementSize((size, prevSize, elem) => {})
    const ref = React.useRef(null)
    let dispatch = useDispatch()
    let toast = useToast()
    let { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.project
    )
    useEffect(() => {
        const newList = [...listState]
        if (
            values !== null &&
            values.projectStatus &&
            values.projectStatus.length > 0
        ) {
            values.projectStatus.filter((data, index) => {
                for (
                    let iteration = 0;
                    iteration < newList.length;
                    iteration++
                ) {
                    if (
                        newList[iteration].title.toLowerCase() ===
                        data.status.toLowerCase()
                    ) {
                        newList[iteration].completed = data.completed
                        newList[iteration].active = data.active
                        let checkStep =
                            newList[iteration].step === 1 ||
                            newList[iteration].step === 9
                                ? false
                                : true

                        if (checkStep) {
                            let value = iteration - 1

                            let completeA =
                                newList[value].completed && data.completed
                                    ? true
                                    : false

                            newList[iteration].completeA = completeA
                            if (
                                newList[iteration].completeA &&
                                newList[iteration].step === 2
                            ) {
                                newList[value].completeA = completeA
                            }
                        }
                    }
                }
            })
        }
    }, [values, listState])

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'project'
        )

        if (
            values !== null &&
            values.projectStatus &&
            values.projectStatus.length > 0 &&
            allInfoData.length > 0
        ) {
            let activeStatus = values.projectStatus.find(
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
    }, [allTagData, values])

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
                status: data.tagName,
                notes: '',
            })
        }
    }

    const statusNotesUpdate = (e) => {
        e.preventDefault()
        setIsSubmittingp(false)
        setChangeMade(true)
        setNewActiveStatus({
            ...newActiveStatus,
            notes: e.target.value,
        })
    }

    let validate = (values) => {
        const errors = {}
        if (!values.notes) {
            errors.notes = 'notes required'
        }

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
        setNewActiveStatus(activeDataStatus)

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

        if (isSuccess && isSubmittingp) {
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

                                    <Stack direction='column'>
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
                                                        )}{' '}
                                                    </>
                                                ) : null}
                                            </Stack>
                                        </Stack>
                                    </Stack>

                                    <Stack
                                        direction='column'
                                        width='100%'
                                        h='100%'>
                                        <Stack width='100%'>
                                            <label>
                                                Notes <span>*</span>
                                            </label>

                                            <StatusNotesArea
                                                type='text'
                                                placeholder='Please add a note'
                                                value={newActiveStatus.notes}
                                                onChange={statusNotesUpdate}
                                            />
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
    font-family: 'Inter', sans-serif;
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
        height: 100px;
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
        width: 100px;
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

const StatusNotesArea = styled(Textarea)`
    background: #ffffff !important;
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
