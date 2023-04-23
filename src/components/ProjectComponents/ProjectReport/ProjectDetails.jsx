import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Tooltip,
} from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import Moments from 'moment-timezone'
import { AiOutlinePlus } from 'react-icons/ai'

import { RiDeleteBin6Line } from 'react-icons/ri'
import { TbDatabaseExport } from 'react-icons/tb'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    supervisorRemove,
    reset,
} from '../../../store/features/supervisors/supervisorSlice'
import {
    removeDCMember,
    migrateSupervisortoDCMember,
    reset as dreset,
} from '../../../store/features/doctoralmembers/doctoralSlice'
const ProjectDetails = ({ values, rlink }) => {
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const [provisionalAdm, setProvisionalAdm] = React.useState(null)

    const [removeActive2, setRemoveActive2] = React.useState(false)
    const [removeDetails2, setRemoveDetails2] = React.useState(null)

    /** state for supervisor migrate to doctoral member */
    const [migrateActive, setMigrateActive] = React.useState(false)
    const [migrateDetails, setMigrateDetails] = React.useState(null)

    const [fullAdm, setFullAdm] = React.useState(null)
    let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, message, isError } = useSelector(
        (state) => state.supervisor
    )
    let dcMState = useSelector((state) => state.doctoralMembers)

    /** this for supervisors */
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
            dispatch(supervisorRemove(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }

    /** migrating the supervisor to doctoral member */
    const handleMigrate = (supId, nam, title) => {
        // alert(`details, ${values._id}, ${supId}`)
        if (values._id && supId) {
            let rvalues = {
                supId: supId,
                name: `${title + nam}`,
                projectId: values._id,
            }
            setMigrateDetails(() => rvalues)
            setMigrateActive(() => true)
        }
    }

    const onMigrateUpload = () => {
        // alert(`details ${migrateDetails.projectId}, ${migrateDetails.supId}`)
        if (migrateDetails.projectId && migrateDetails.supId) {
            dispatch(migrateSupervisortoDCMember(migrateDetails))
            setIsSubmittingp(() => true)
        }
    }

    const cancelMigrateUpload = () => {
        setMigrateActive(false)
        setMigrateDetails(null)

        // onClose()
    }

    /** this for doctoral members */
    const handleRemove2 = (supId, nam, title) => {
        if (values._id && supId) {
            let rvalues = {
                supId: supId,
                name: `${title + nam}`,
                projectId: values._id,
            }
            setRemoveDetails2(() => rvalues)
            setRemoveActive2(true)
        }
    }

    const onRemoveUpload2 = () => {
        if (removeDetails2.projectId && removeDetails2.supId) {
            dispatch(removeDCMember(removeDetails2))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload2 = () => {
        setRemoveActive2(false)
        setRemoveDetails2(null)

        // onClose()
    }

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
            dispatch(reset())
        }
        if (isSuccess && isSubmittingp && message) {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, message])

    /** dc member */

    React.useEffect(() => {
        if (dcMState.isError && isSubmittingp) {
            setIsSubmittingp(false)
            dispatch(dreset())
        }
        if (dcMState.isSuccess && isSubmittingp && dcMState.message) {
            toast({
                position: 'top',
                title: dcMState.message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setRemoveActive2(false)
            setRemoveDetails2(null)
            setMigrateActive(false)
            setMigrateDetails(null)

            dispatch(dreset())
        }

        dispatch(dreset())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dcMState.isSuccess, dcMState.message, dcMState.isError])

    React.useEffect(() => {
        // console.log('all iten', values.doctoralmembers)
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
                        <h1>Project Details</h1>
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
                                                                            <Tooltip label='remove supervisor'>
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
                                                                            </Tooltip>

                                                                            {/** view */}
                                                                            <Tooltip label='view supervisor'>
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
                                                                            </Tooltip>

                                                                            {/** transfer supervisor to doctoral member */}
                                                                            <Tooltip label='migrate supervisor to dc member'>
                                                                                <Button
                                                                                    bg='transparent'
                                                                                    h='100%'
                                                                                    w='100%'
                                                                                    size='28px'
                                                                                    mr='5px'
                                                                                    onClick={() =>
                                                                                        handleMigrate(
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
                                                                                    <TbDatabaseExport />
                                                                                </Button>
                                                                            </Tooltip>
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

                            {/** doctoral members */}
                            <Stack direction='column' w='50%'>
                                {/** title and button */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box className='form_subtitle'>
                                        <h1>Doctoral Com. Members</h1>
                                    </Box>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        onClick={() =>
                                            routeNavigate(
                                                `${rlink}/projects/doctoralmember/assign/${values._id}`
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}>
                                        <Box className='add_examiners'>
                                            <AiOutlinePlus />
                                        </Box>
                                        <Box className='s_name'>
                                            <Text>Assign Member</Text>
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** lists */}
                                <Stack spacing={'8px'}>
                                    {values !== null &&
                                    values.doctoralmembers.length > 0 ? (
                                        <Stack spacing={'8px'}>
                                            {values.doctoralmembers.map(
                                                (data, index) => {
                                                    return (
                                                        <Stack
                                                            key={index}
                                                            direction='row'
                                                            alignItems='center'
                                                            spacing='15px'>
                                                            <label
                                                                htmlFor={
                                                                    data
                                                                        .doctoralmemberId
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
                                                                        Member
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
                                                                                .doctoralmemberId
                                                                                .name
                                                                        }
                                                                        id={
                                                                            data
                                                                                .doctoralmemberId
                                                                                ._id
                                                                        }
                                                                    />
                                                                    <InputRightElement
                                                                        h='32px'
                                                                        pr='20px'>
                                                                        <Stack
                                                                            direction='row'
                                                                            alignItems='center'>
                                                                            <Tooltip label='remove doctoral member'>
                                                                                <Button
                                                                                    bg='transparent'
                                                                                    h='100%'
                                                                                    w='100%'
                                                                                    size='28px'
                                                                                    onClick={() =>
                                                                                        handleRemove2(
                                                                                            data
                                                                                                .doctoralmemberId
                                                                                                ._id,
                                                                                            data
                                                                                                .doctoralmemberId
                                                                                                .name,
                                                                                            data
                                                                                                .doctoralmemberId
                                                                                                .jobtitle
                                                                                        )
                                                                                    }>
                                                                                    <RiDeleteBin6Line />
                                                                                </Button>
                                                                            </Tooltip>

                                                                            <Tooltip label='view doctoral member'>
                                                                                <Button
                                                                                    bg='transparent'
                                                                                    h='100%'
                                                                                    w='100%'
                                                                                    size='28px'
                                                                                    onClick={() =>
                                                                                        routeNavigate(
                                                                                            `${rlink}/projects/doctoralmember/view/${values._id}/${data.doctoralmemberId._id}`
                                                                                        )
                                                                                    }>
                                                                                    <BiLinkExternal />
                                                                                </Button>
                                                                            </Tooltip>
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
                                        <Stack>
                                            <Box className='noItems2' w='100%'>
                                                No Members
                                            </Box>

                                            <Stack spacing={'8px'}>
                                                <Stack
                                                    direction='row'
                                                    alignItems='center'
                                                    spacing='15px'>
                                                    <label htmlFor='member'>
                                                        <Stack
                                                            direction={'row'}
                                                            alignItems='center'
                                                            spacing='8px'>
                                                            <Text>
                                                                Name of Member
                                                            </Text>
                                                        </Stack>
                                                    </label>

                                                    <Box className='form_input'>
                                                        <input
                                                            readOnly
                                                            value={''}
                                                            id='member'
                                                        />
                                                    </Box>
                                                </Stack>
                                            </Stack>
                                        </Stack>
                                    )}
                                </Stack>
                            </Stack>
                            {/** end doctoral members */}
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
                                                              fullAdm
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

            {/** remove supervisor */}
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

            {/** remove dc member */}
            <Modal
                w='100vw'
                isOpen={removeActive2}
                p='0'
                onClose={() => cancelRemoveUpload2()}>
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
                                        <h1>Remove Doctoral Member</h1>
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
                                                {removeDetails2 !== null &&
                                                    removeDetails2.name}
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
                                    onClick={() => cancelRemoveUpload2()}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onRemoveUpload2}
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

            {/** migrate supervisor to dc member */}
            <Modal
                w='100vw'
                isOpen={migrateActive}
                p='0'
                onClose={() => cancelMigrateUpload()}>
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
                                        <h1>Migrate Supervisor to DC Member</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to migrate
                                        <span>
                                            <li>
                                                {migrateDetails !== null &&
                                                    migrateDetails.name}
                                            </li>
                                        </span>
                                        to dcmember on this student.
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
                                    onClick={() => cancelMigrateUpload()}>
                                    Cancel
                                </Button>
                                <Button
                                    onClick={onMigrateUpload}
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

export default ProjectDetails

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

    #SRN {
        height: 40px;
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
