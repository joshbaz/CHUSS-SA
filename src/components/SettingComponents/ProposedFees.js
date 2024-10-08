import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Input,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import { HiPencil } from 'react-icons/hi'
import { ImBin2 } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'

import {
    reset,
    programTypeCreate,
    programTypeUpdate,
} from '../../store/features/preferences/preferenceSlice'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { reset as areset } from '../../store/features/auth/authSlice'

import toast from 'react-hot-toast'
/** handle error response and logout */
import {
    errorHandler,
    handleLogout,
} from '../../components/common/CustomToastFunctions/ToastFunctions'

const ProposedFees = ({ handleChange, programData }) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [helperFunctions, setHelperFunctions] = React.useState(null)

    const [editActive, setEditActive] = React.useState(false)
    const [editDetails, setEditDetails] = React.useState(null)
    let dispatch = useDispatch()

    const validationSchema = yup.object().shape({
        programName: yup.string().required('Program Name  required'),
        programFee: yup.number().required('valid number needed '),
    })

    const { isError, isSuccess, message } = useSelector(
        (state) => state.preference
    )
    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }

            setIsSubmittingp(false)

            dispatch(reset())
            dispatch(areset())
        }

        if (isSuccess) {
            if (helperFunctions !== null) {
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setEditActive(false)
                setEditDetails(null)
                onClose()
                setHelperFunctions(null)
            }
            dispatch(areset())
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    const ActivateEdit = (dataSelect) => {
        setEditDetails(dataSelect)
        setEditActive(true)
    }
    const DeactivateEdit = () => {
        setEditActive(false)
        setEditDetails(null)
    }
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    direction='row'
                    alignItems='center'
                    className='titleWrap'>
                    <Box className='formtitle'>
                        <h1>Program Type</h1>
                    </Box>

                    <Box>
                        <Button
                            onClick={() => onOpen()}
                            className='add_buttons'
                            h='27px'
                            leftIcon={<AiOutlinePlus />}
                            colorScheme='red'
                            variant='solid'>
                            New Type
                        </Button>
                    </Box>
                </Stack>

                {programData.length > 0 ? (
                    <Stack
                        p='25px 20px'
                        direction='column'
                        className='formfields'
                        alignItems='space-between'
                        spacing='15px'
                        h='100%'>
                        {programData.map((data, index) => {
                            return (
                                <Box
                                    key={data._id}
                                    className='formfields__Sfieldset'>
                                    <Stack spacing='8px' className='form_wrap'>
                                        <label>{data.programName}</label>
                                        <Stack
                                            direction='row'
                                            spacing={'1rem'}
                                            alignItems='center'>
                                            <Box w='90%'>
                                                <fieldset>
                                                    <Input
                                                        type='text'
                                                        value={data.programFee}
                                                        readOnly
                                                    />
                                                </fieldset>
                                            </Box>
                                            <Stack
                                                direction='row'
                                                alignItems='center'>
                                                <EditIcon>
                                                    <ImBin2 />
                                                </EditIcon>
                                                <EditIcon
                                                    onClick={() =>
                                                        ActivateEdit(data)
                                                    }>
                                                    <HiPencil />
                                                </EditIcon>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Box>
                            )
                        })}
                    </Stack>
                ) : (
                    <Box
                        p='70px 0'
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        No Programs Added
                    </Box>
                )}
            </Box>

            {/** create modal */}
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                programName: '',
                                programFee: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)

                                toast.dismiss()
                                toast.promise(
                                    dispatch(programTypeCreate(values)).then(
                                        (res) => {
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
                                        }
                                    ),
                                    {
                                        loading: 'creating program type',
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
                                                setTimeout(
                                                    () =>
                                                        handleLogout(dispatch),
                                                    3000
                                                )
                                                return 'Not Authenticated'
                                            } else if (
                                                err
                                                    .toString()
                                                    .includes(
                                                        'Authentication expired'
                                                    )
                                            ) {
                                                setTimeout(
                                                    () =>
                                                        handleLogout(dispatch),
                                                    3000
                                                )
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
                                                Create Program Type
                                            </Box>

                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Program name{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.programName
                                                            }
                                                            name='programName'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e Master'
                                                            }
                                                        />
                                                    </fieldset>
                                                </Stack>

                                                <Stack>
                                                    <label>
                                                        Program Fee{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.programFee
                                                            }
                                                            name='programFee'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e 200'
                                                            }
                                                        />
                                                    </fieldset>
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
                                                onClick={() => onClose()}>
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

            {/** edit modal */}
            <Modal w='100vw' isOpen={editActive} p='0' onClose={DeactivateEdit}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                ...editDetails,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)

                                toast.dismiss()
                                toast.promise(
                                    dispatch(programTypeUpdate(values)).then(
                                        (res) => {
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
                                        }
                                    ),
                                    {
                                        loading: 'updating program type',
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
                                                setTimeout(
                                                    () =>
                                                        handleLogout(dispatch),
                                                    3000
                                                )
                                                return 'Not Authenticated'
                                            } else if (
                                                err
                                                    .toString()
                                                    .includes(
                                                        'Authentication expired'
                                                    )
                                            ) {
                                                setTimeout(
                                                    () =>
                                                        handleLogout(dispatch),
                                                    3000
                                                )
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
                                                Edit {editDetails.ProgramName}{' '}
                                            </Box>

                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Program name{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.programName
                                                            }
                                                            name='programName'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e Master'
                                                            }
                                                        />
                                                    </fieldset>
                                                </Stack>

                                                <Stack>
                                                    <label>
                                                        Program Fee{' '}
                                                        <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.programFee
                                                            }
                                                            name='programFee'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e 200'
                                                            }
                                                        />
                                                    </fieldset>
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
                                                    DeactivateEdit()
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
        </FormContainer>
    )
}

export default ProposedFees

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 243px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .titleWrap {
        height: 54px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d1d5db;
        padding: 0 30px;
    }
    .formtitle {
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    label {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;

        span {
            color: #ed1f29;
        }
    }

    input {
        background: #fefaf2;
        border: 0px;
        border-radius: 6px;
        height: 32px;
        width: 100%;
    }

    .formfields__Dfieldset {
        width: 100%;
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    .list_text {
        font-family: 'Inter';
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
