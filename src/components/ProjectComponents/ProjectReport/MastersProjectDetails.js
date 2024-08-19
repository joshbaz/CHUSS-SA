/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
} from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import Moments from 'moment-timezone'
import { AiOutlinePlus } from 'react-icons/ai'
// import { HiPencil } from 'react-icons/hi'
// import { ImBin2 } from 'react-icons/im'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    supervisorRemove,
    reset,
} from '../../../store/features/supervisors/supervisorSlice'

import { Logout, reset as areset } from '../../../store/features/auth/authSlice'

import toast from 'react-hot-toast'

const MastersProjectDetails = ({ values, rlink }) => {
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const [provisionalAdm, setProvisionalAdm] = React.useState(null)

    const [fullAdm, setFullAdm] = React.useState(null)
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    // let toast = useToast()
    let { isSuccess, message, isError } = useSelector(
        (state) => state.supervisor
    )

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

    const handleRemove = (supId, nam, title) => {
        if (values._id && supId) {
            let rvalues = {
                supId: supId,
                name: `${title + nam}`,
                projectId: values._id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.projectId && removeDetails.supId) {
            setIsSubmittingp(true)
            toast.dismiss()
            toast.promise(
                dispatch(supervisorRemove(removeDetails)).then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'removing supervisor',
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

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
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
            setRemoveActive(false)
            setRemoveDetails(null)

            dispatch(reset())
            dispatch(areset())
        }

        dispatch(reset())
        dispatch(areset())
    }, [isSuccess, message])

    React.useEffect(() => {
        if (values !== null && values.registration.length > 0) {
            let dataArray = values.registration

            /** look for Provisional Admission */
            let foundPData = dataArray.find(
                (element) =>
                    element.registrationId.registrationtype.toLowerCase() ===
                    'provisional admission'
            )

            /** look for  Full Admission */
            let foundFullData = dataArray.find(
                (element) =>
                    element.registrationId.registrationtype.toLowerCase() ===
                    'full admission'
            )

            if (foundPData) {
                setProvisionalAdm(foundPData)
            } else {
                setProvisionalAdm(null)
            }

            if (foundFullData) {
                setFullAdm(foundFullData)
            } else {
                setFullAdm(null)
            }
        } else {
            setProvisionalAdm(null)
            setFullAdm(null)
        }
    }, [values])
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
                        <h1>Thesis Details</h1>
                    </Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack
                        direction='row'
                        alignItems='flex-start'
                        spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='center'
                                spacing='8px'>
                                <Text>Topic</Text>
                                <Box fontSize='14px' color='#868FA0'>
                                    <BsInfoCircleFill />
                                </Box>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <textarea
                                readOnly
                                id='phone'
                                value={
                                    values !== null && values.topic
                                        ? values.topic
                                        : ''
                                }
                            />
                        </Box>
                    </Stack>

                    <Stack direction='column' w='100%' spacing='30px'>
                        {/** Members */}
                        <Stack direction='row' spacing='5%'>
                            {/** supervisors */}
                            <Stack direction='column' w='50%'>
                                {/** title and button */}
                                <Stack
                                    w='100%'
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box className='form_subtitle'>
                                        <h1>Supervisors</h1>
                                    </Box>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        onClick={() =>
                                            routeNavigate(
                                                `${rlink}/projects/supervisors/assign/${values._id}`
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}>
                                        <Box className='add_examiners'>
                                            <AiOutlinePlus />
                                        </Box>
                                        <Box className='s_name'>
                                            <Text>Assign Supervisor</Text>
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** lists */}
                                <Stack spacing={'8px'} w='100%'>
                                    {values !== null &&
                                    values.supervisor.length > 0 ? (
                                        <Stack spacing={'8px'} w='100%'>
                                            {values.supervisor.map(
                                                (data, index) => {
                                                    return (
                                                        <Stack
                                                            w='100%'
                                                            key={index}
                                                            direction='row'
                                                            alignItems='center'
                                                            spacing='15px'>
                                                            <label
                                                                htmlFor={
                                                                    data
                                                                        .supervisorId
                                                                        ._id
                                                                }>
                                                                <Stack
                                                                    direction={
                                                                        'row'
                                                                    }
                                                                    alignItems='center'
                                                                    spacing='8px'>
                                                                    <Text>
                                                                        Name of
                                                                        Supervisor
                                                                    </Text>
                                                                </Stack>
                                                            </label>

                                                            <Stack
                                                                direction='row'
                                                                alignItems={
                                                                    'center'
                                                                }
                                                                className='form_input'>
                                                                <InputGroup>
                                                                    <Input
                                                                        readOnly
                                                                        value={
                                                                            data
                                                                                .supervisorId
                                                                                .name
                                                                        }
                                                                        id={
                                                                            data
                                                                                .supervisorId
                                                                                ._id
                                                                        }
                                                                    />
                                                                    <InputRightElement
                                                                        h='32px'
                                                                        pr='20px'>
                                                                        <Stack
                                                                            direction='row'
                                                                            alignItems='center'>
                                                                            <Button
                                                                                bg='transparent'
                                                                                h='100%'
                                                                                w='100%'
                                                                                size='28px'
                                                                                onClick={() =>
                                                                                    handleRemove(
                                                                                        data
                                                                                            .supervisorId
                                                                                            ._id,
                                                                                        data
                                                                                            .supervisorId
                                                                                            .name,
                                                                                        data
                                                                                            .supervisorId
                                                                                            .jobtitle
                                                                                    )
                                                                                }>
                                                                                <RiDeleteBin6Line />
                                                                            </Button>
                                                                            <Button
                                                                                bg='transparent'
                                                                                h='100%'
                                                                                w='100%'
                                                                                size='28px'
                                                                                onClick={() =>
                                                                                    routeNavigate(
                                                                                        `${rlink}/projects/supervisors/view/${values._id}/${data.supervisorId._id}`
                                                                                    )
                                                                                }>
                                                                                <BiLinkExternal />
                                                                            </Button>
                                                                        </Stack>
                                                                    </InputRightElement>
                                                                </InputGroup>
                                                            </Stack>
                                                        </Stack>
                                                    )
                                                }
                                            )}
                                        </Stack>
                                    ) : (
                                        <Stack w='100%'>
                                            <Box className='noItems2'>
                                                No Supervisors
                                            </Box>

                                            <Stack spacing={'8px'} w='100%'>
                                                <Stack
                                                    direction='row'
                                                    alignItems='center'
                                                    spacing='15px'>
                                                    <label htmlFor='supervisor'>
                                                        <Stack
                                                            direction={'row'}
                                                            alignItems='center'
                                                            spacing='8px'>
                                                            <Text>
                                                                Name of
                                                                Supervisor
                                                            </Text>
                                                        </Stack>
                                                    </label>

                                                    <Box
                                                        className='form_input'
                                                        w='100%'>
                                                        <input
                                                            readOnly
                                                            value={''}
                                                            id='supervisor'
                                                        />
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    )}
                                </Stack>
                            </Stack>
                            {/** end supervisors */}
                        </Stack>

                        {/** Admissions */}
                        <Stack direction='column' w='100%'>
                            <Box className='form_subtitle'>
                                <h1>Admissions</h1>
                            </Box>

                            {/** lists of admission */}
                            <Stack direction='row' width='100%' spacing='5%'>
                                {/** provisional */}
                                <Stack spacing={'8px'} width='50%'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Type</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    provisionalAdm !== null &&
                                                    provisionalAdm
                                                        .registrationId
                                                        .registrationtype
                                                        ? provisionalAdm
                                                              .registrationId
                                                              .registrationtype
                                                        : ''
                                                }
                                                id='phone'
                                            />
                                        </Box>
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
                                                <Text>Date</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    provisionalAdm !== null &&
                                                    provisionalAdm
                                                        .registrationId.date
                                                        ? Moments(
                                                              provisionalAdm
                                                                  .registrationId
                                                                  .date
                                                          )
                                                              .tz(
                                                                  'Africa/Kampala'
                                                              )
                                                              .format(
                                                                  'DD MMM Y'
                                                              )
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
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
                                                <Text>Semester</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    provisionalAdm !== null &&
                                                    provisionalAdm
                                                        .registrationId.semester
                                                        ? provisionalAdm
                                                              .registrationId
                                                              .semester
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** full */}
                                <Stack spacing={'8px'} width='50%'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Type</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    fullAdm !== null &&
                                                    fullAdm.registrationId
                                                        .registrationtype
                                                        ? fullAdm.registrationId
                                                              .registrationtype
                                                        : ''
                                                }
                                                id='phone'
                                            />
                                        </Box>
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
                                                <Text>Date</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    fullAdm !== null &&
                                                    fullAdm.registrationId.date
                                                        ? Moments(
                                                              provisionalAdm
                                                                  .registrationId
                                                                  .date
                                                          )
                                                              .tz(
                                                                  'Africa/Kampala'
                                                              )
                                                              .format(
                                                                  'DD MMM Y'
                                                              )
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
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
                                                <Text>Semester</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                readOnly
                                                value={
                                                    fullAdm !== null &&
                                                    fullAdm.registrationId
                                                        .semester
                                                        ? fullAdm.registrationId
                                                              .semester
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
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
                                        <h1>Remove Supervisor</h1>
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

export default MastersProjectDetails

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
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .noItems2 {
        font-style: italic;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #abaaaf;
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
            border: 1px solid transparent;
        }
    }

    .form_subtitle {
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

        font-style: normal;
        font-weight: 500;
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
