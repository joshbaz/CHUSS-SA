/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Text,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    allFacilitators,
    facilitatorUpdate,
    facilitatorResetPassword,
} from '../../../store/features/facilitators/facilitatorSlice'

import UpdateFacilatorDetails from '../../../components/Facilitators/UpdateFacilitator/UpdateFacilatorDetails'
import UpdateFacilitatorPrivileges from '../../../components/Facilitators/UpdateFacilitator/UpdateFacilitatorPrivileges'
import UpdateFacilitatorPassword from '../../../components/Facilitators/UpdateFacilitator/UpdateFacilitatorPassword'
import { initSocketConnection } from '../../../socketio.service'
import { dashboardLightTheme } from '../../../theme/dashboard_theme'
const { backgroundMainColor, textLightColor } = dashboardLightTheme

const UpdateFacilitators = () => {
    let toast = useToast()
    let dispatch = useDispatch()
    let routeNavigate = useNavigate()
    let params = useParams()
    const [individual, setIndividual] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)

    useEffect(() => {
        dispatch(allFacilitators())
        // dispatch(allLoginActivities())
        const io = initSocketConnection()

        io.on('updatedAdmin', (data) => {
            if (data.actions === 'update-admin' && data.data === params.id) {
                //dispatch(tagGetAll())
                dispatch(allFacilitators())
            }
        })
    }, [])
    const { allfacilitatorItems, isError, isSuccess, message } = useSelector(
        (state) => state.facilitator
    )

    useEffect(() => {
        let findfacilitator = allfacilitatorItems.items.find(
            (element) => element._id === params.id
        )

        if (findfacilitator) {
            setIndividual(() => findfacilitator)
        }
    }, [allfacilitatorItems, params.id])

    /** function to handle value changes */
    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setIndividual((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const handlePhoneChange = (name, value) => {
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setIndividual((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    let validate = (values) => {
        const errors = {}
        if (!values.jobtitle) {
            errors.jobtitle = 'jobtitle required'
        }

        if (!values.firstname) {
            errors.firstname = ' Name required'
        }

        if (!values.lastname) {
            errors.lastname = ' Name required'
        }

        if (!values.email) {
            errors.email = 'Email required'
        }

        if (!values.contact) {
            errors.contact = 'Phone Number required'
        }

        if (!values.role) {
            errors.role = 'role required'
        }

        if (!values.privileges) {
            errors.privileges = ' required'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(individual))
        setIsSubmittingp(() => true)
    }

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(facilitatorUpdate(individual))
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingp &&
            changeMade
        ) {
            setIsSubmittingp(false)
            setChnageMade(false)
        }
    }, [isSubmittingp])

    useEffect(() => {
        if (isError && message) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(() => false)
            setChnageMade(() => false)
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
            setIsSubmittingp(() => false)
            setChnageMade(() => false)
            dispatch(reset())
        }

        dispatch(reset())
    }, [isError, isSuccess, message])

    /** HANDLE PROJECT DELETION */
    const handleReset = (ppId, name) => {
        if (individual !== null && individual._id && individual.lastname) {
            let rvalues = {
                name: `${individual.jobtitle + ' ' + individual.lastname}`,
                exId: params.id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.exId) {
            dispatch(facilitatorResetPassword(removeDetails))
            setIsSubmittingp(true)
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)

        // onClose()
    }
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                w='100%'
                spacing='20px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{
                            title: 'Update Facilitator',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Stack
                        direction='column'
                        bg={backgroundMainColor}
                        minH='80vh'
                        spacing={'20px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** title head */}
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'
                            color={textLightColor}>
                            <BackButtonStack
                                className='back_button'
                                direction='row'
                                alignItems='center'>
                                <Box
                                    fontSize='25px'
                                    onClick={() => routeNavigate(-1)}>
                                    <MdArrowBack />
                                </Box>
                                <Text>Update Facilitator</Text>
                            </BackButtonStack>

                            <SubmitButton>
                                <Button
                                    disabled={
                                        isSubmittingp || !changeMade
                                            ? true
                                            : false
                                    }
                                    isLoading={isSubmittingp ? true : false}
                                    onClick={handleSubmit}
                                    className='button'>
                                    Submit Update
                                </Button>
                            </SubmitButton>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            <Stack direction='row'>
                                {/** Details & files */}
                                <Stack
                                    direction='column'
                                    w='65%'
                                    spacing='20px'>
                                    <UpdateFacilatorDetails
                                        values={individual}
                                        handleChange={handleChange}
                                        setFieldValue={handlePhoneChange}
                                        errors={errors}
                                    />
                                </Stack>

                                {/** priviledges & password */}

                                <Stack
                                    direction='column'
                                    w='35%'
                                    spacing='20px'>
                                    <UpdateFacilitatorPrivileges
                                        values={individual}
                                        handleChange={handleChange}
                                        setFieldValue={handlePhoneChange}
                                        errors={errors}
                                    />

                                    <UpdateFacilitatorPassword
                                        values={individual}
                                        handleReset={handleReset}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/** handle delete registration */}
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
                                        <h1>Reset Facilitator Password</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to reset
                                        <span>
                                            <li>
                                                {removeDetails !== null &&
                                                    removeDetails.name}
                                            </li>
                                        </span>
                                        's password.
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

export default UpdateFacilitators

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`

const SubmitButton = styled(Box)`
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        &:hover {
            background: ${({ disabledb, ...props }) =>
                disabledb ? '#d0d0d0' : '#F4797F'};
        }
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
