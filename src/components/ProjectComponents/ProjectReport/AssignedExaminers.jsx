import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import {
    reset,
    removeProjectExaminer,
} from '../../../store/features/project/projectSlice'
const AssignedExaminers = ({ values, rlink }) => {
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [normalExaminers, setNormalExaminers] = React.useState([])
    const [resubmissionExaminers, setResubmissionExaminers] = React.useState([])
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, message, isError } = useSelector((state) => state.project)
    const handleRemove = (supId, nam, title, secId) => {
       
        if (values._id && supId && secId) {
            let rvalues = {
                exId: supId,
                name: `${title + nam}`,
                projectId: values._id,
                secId: secId,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.projectId && removeDetails.exId) {
            dispatch(removeProjectExaminer(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    /** handle separation of examiners */
    useEffect(() => {
       
        if (values !== null) {
            const filterNormal = values.examiners.filter(
                (data) => data.submissionType === 'normal'
            )

            const filterResubmission = values.examiners.filter(
                (data) => data.submissionType === 'resubmission'
            )

            setNormalExaminers(filterNormal)
            setResubmissionExaminers(filterResubmission)
        }
    }, [values])

    React.useEffect(() => {
        if (isError && isSubmittingp && message) {
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
    }, [isSuccess, message])

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
                        <h1>Assigned Examiners</h1>
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
                    <Stack
                        direction='row'
                        alignItems='center'
                        onClick={() =>
                            routeNavigate(
                                `${rlink}/projects/examiners/assign/${values._id}`
                            )
                        }
                        style={{ cursor: 'pointer' }}>
                        <Box className='add_examiners'>
                            <AiOutlinePlus />
                        </Box>
                        <Box className='s_name'>
                            <Text>Add New Examiner</Text>
                        </Box>
                    </Stack>

                    {values !== null && normalExaminers.length > 0 ? (
                        <Stack direction='column' w='100%'>
                            <Stack spacing={'16px'}>
                                {normalExaminers.map((data, index) => (
                                    <Stack
                                        key={index}
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                h='24px'>
                                                <Text>
                                                    {
                                                        data.examinerId
                                                            .typeOfExaminer
                                                    }{' '}
                                                    Examiners
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <InputGroup>
                                                <input
                                                    readOnly
                                                    value={data.examinerId.name}
                                                    id='email'
                                                />
                                                <InputRightElement h='32px'>
                                                    <Stack
                                                        direction='row'
                                                        pr='10px'>
                                                        <Button
                                                            onClick={() =>
                                                                handleRemove(
                                                                    data
                                                                        .examinerId
                                                                        ._id,
                                                                    data
                                                                        .examinerId
                                                                        .name,
                                                                    data
                                                                        .examinerId
                                                                        .jobtitle,
                                                                    data._id
                                                                )
                                                            }
                                                            bg='transparent'
                                                            h='100%'
                                                            w='100%'
                                                            size='28px'>
                                                            <RiDeleteBin6Line />
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                routeNavigate(
                                                                    `${rlink}/projects/examiners/view/${values._id}/${data.examinerId._id}`
                                                                )
                                                            }
                                                            bg='transparent'
                                                            h='100%'
                                                            w='100%'
                                                            size='28px'>
                                                            <BiLinkExternal />
                                                        </Button>
                                                    </Stack>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ) : null}

                    {/** resubmission */}
                    {values !== null && resubmissionExaminers.length > 0 ? (
                        <Stack direction='column' w='100%'>
                            <Box className='rexaminer_title'>
                                Examiners for resubmission
                            </Box>
                            <Stack spacing={'16px'}>
                                {resubmissionExaminers.map((data, index) => (
                                    <Stack
                                        key={index}
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                h='24px'>
                                                <Text>
                                                    {
                                                        data.examinerId
                                                            .typeOfExaminer
                                                    }{' '}
                                                    Examiners
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <InputGroup>
                                                <input
                                                    readOnly
                                                    value={data.examinerId.name}
                                                    id='email'
                                                />
                                                <InputRightElement h='32px'>
                                                    <Stack
                                                        direction='row'
                                                        pr='10px'>
                                                        <Button
                                                            onClick={() =>
                                                                handleRemove(
                                                                    data
                                                                        .examinerId
                                                                        ._id,
                                                                    data
                                                                        .examinerId
                                                                        .name,
                                                                    data
                                                                        .examinerId
                                                                        .jobtitle,
                                                                    data._id
                                                                )
                                                            }
                                                            bg='transparent'
                                                            h='100%'
                                                            w='100%'
                                                            size='28px'>
                                                            <RiDeleteBin6Line />
                                                        </Button>
                                                        <Button
                                                            onClick={() =>
                                                                routeNavigate(
                                                                    `${rlink}/projects/examiners/view/${values._id}/${data.examinerId._id}`
                                                                )
                                                            }
                                                            bg='transparent'
                                                            h='100%'
                                                            w='100%'
                                                            size='28px'>
                                                            <BiLinkExternal />
                                                        </Button>
                                                    </Stack>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ) : null}
                </Stack>
            </Box>

            {/** remove examiner */}
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
                                        <h1>Remove Examiner?</h1>
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

export default AssignedExaminers

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

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
            line-height: 12px;
        }
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
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
        text-indent: 21px;
        height: 32px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
    .rexaminer_title {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
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
