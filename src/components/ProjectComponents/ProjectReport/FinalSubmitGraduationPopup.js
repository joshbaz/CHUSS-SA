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
    useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateGraduationDate,
    reset,
} from '../../../store/features/project/projectSlice'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const FinalSubmitGraduationPopup = ({
    projectId,
    graduationDateActive,
    setGraduationDateActive,
    valuess,
}) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
   // const [filesList, setFilesList] = React.useState([])
    const [dateOfGraduation, setDateOfGraduation] = React.useState('')
   // let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, isError, message } = useSelector((state) => state.project)

    /**
     * function to cancel submit change
     */

    const cancelGraduationUpload = () => {
        setIsSubmittingp(false)
        setGraduationDateActive(false)

        // onClose()
    }

    React.useEffect(() => {
        if (valuess !== null && valuess.GraduationDate !== null) {
            setDateOfGraduation(valuess.GraduationDate)
        }
    }, [valuess])

    const validationSchema = yup.object().shape({
        GraduationDate: yup.string().required('submission date is required'),
    })

    const initialValues = {
        GraduationDate: dateOfGraduation ? dateOfGraduation : '',
    }

    /** run after submission awaiting for response */

    React.useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'error',
                    duration: 10000,
                    isClosable: true,
                })
                setIsSubmittingp(false)
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
            }
            toast({
                position: 'top',
                title: message.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(reset())
        }

        if (isSuccess && isSubmittingp) {
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
                setHelperFunctions(null)

                // setDefenseUploadActive(false)
                dispatch(reset())
            }
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])
    return (
        <Modal
            w='100vw'
            isOpen={graduationDateActive}
            p='0'
            onClose={() => setGraduationDateActive(!graduationDateActive)}>
            <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
            <ModalContent p='0'>
                <ModalBody p='0'>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, helpers) => {
                            setHelperFunctions(helpers)
                            setIsSubmittingp(true)
                            if (projectId && projectId !== null) {
                                let values2 = {
                                    ...values,
                                    projectId,
                                }
                                dispatch(updateGraduationDate(values2))
                            }
                        }}>
                        {({
                            values,
                            handleChange,
                            errors,
                            isValid,
                            dirty,
                            touched,
                            isSubmitting,
                            setFieldValue,
                            handleSubmit,
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <PopupForm
                                    p='0px'
                                    direction='column'
                                    spacing='0'
                                    justifyContent='space-between'>
                                    <Stack
                                        direction='column'
                                        spacing={'10px'}
                                        h='50%'>
                                        <Stack
                                            className='pop_title'
                                            direction='row'
                                            w='100%'
                                            alignItems='center'
                                            justifyContent='space-between'>
                                            <Box>
                                                <h1>Graduation Date</h1>
                                            </Box>
                                        </Stack>

                                        <Stack
                                            p='10px 20px 10px 20px'
                                            spacing={'2px'}
                                            direction='row'
                                            w='100%'
                                            className='list_text'>
                                            <Box
                                                className='form_input'
                                                w='100%'>
                                                <Input
                                                    placeholder='Select Date and Time'
                                                    size='md'
                                                    type='date'
                                                    name='GraduationDate'
                                                    value={
                                                        values !== null &&
                                                        values.GraduationDate
                                                            ? values.GraduationDate
                                                            : ''
                                                    }
                                                    onChange={handleChange}
                                                />

                                                {errors &&
                                                errors.GraduationDate ? (
                                                    <ErrorMsg>
                                                        {errors.GraduationDate}
                                                    </ErrorMsg>
                                                ) : null}
                                            </Box>
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
                                                cancelGraduationUpload()
                                            }>
                                            Cancel
                                        </Button>
                                        <Button
                                            disabled={!(isValid && dirty)}
                                            isLoading={
                                                isSubmittingp ? true : false
                                            }
                                            className='apply_button'
                                            type='submit'>
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
    )
}

export default FinalSubmitGraduationPopup

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

const ErrorMsg = styled(Text)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;

    .filesError {
        padding: 0;
    }
`
