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
    useToast,
    Button,
    Checkbox,
    Radio,
    RadioGroup,
} from '@chakra-ui/react'
import { HiPencil } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
const AdmissionStatus = ({ values, nameValues = 'joshua' }) => {
    const [projectId, setProjectId] = React.useState('')
    const [editStatusActive, setEditStatusActive] = React.useState(false)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, isError, message } = useSelector((state) => state.project)
    React.useEffect(() => {
        if (values !== null && values._id) {
            setProjectId(values._id)
        }
    }, [values])
    const openEditUpload = () => {
        setEditStatusActive(true)

        // onClose()
    }

    const cancelSubmissionUpload = () => {
        setIsSubmittingp(false)
        setEditStatusActive(false)

        // onClose()
    }
    return (
        <Container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            p='0px 27px'>
            <Box className='st_title'>Submission Status</Box>
            <Stack direction='row' spacing='20px' alignItems={'flex-end'}>
                <Box className='st_text'>Normal</Box>
                <EditIcon onClick={openEditUpload}>
                    <HiPencil />
                </EditIcon>
            </Stack>

            <Modal
                w='100vw'
                isOpen={editStatusActive}
                p='0'
                onClose={() => setEditStatusActive(!editStatusActive)}>
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
                                        <h1>Submission Status Update</h1>
                                    </Box>
                                </Stack>

                                <Stack
                                    p='10px 20px 10px 20px'
                                    spacing={'40px'}
                                    direction='row'
                                    w='100%'
                                    className='list_text'>
                                    {/** submission type */}
                                    <Stack
                                        className='form_input'
                                        direction='column'
                                        w='100%'>
                                        <Box>Submission Type</Box>

                                        <RadioGroup>
                                            <Stack direction='column'>
                                                <Radio value='Normal'>
                                                    Normal
                                                </Radio>
                                                <Radio value='Re-submission'>
                                                    Re-submission
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </Stack>

                                    {/** Academic Year */}
                                    <Stack
                                        className='form_input'
                                        direction='column'
                                        w='100%'>
                                        <Box>Academic Year</Box>

                                        <RadioGroup>
                                            <Stack direction='column'>
                                                <Radio value='Normal'>
                                                    Normal
                                                </Radio>
                                                <Radio value='Re-submission'>
                                                    Re-submission
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
                                    </Stack>

                                    {/** semester */}
                                    <Stack
                                        className='form_input'
                                        direction='column'
                                        w='100%'>
                                        <Box>Semester</Box>

                                        <RadioGroup>
                                            <Stack direction='column'>
                                                <Radio value='Normal'>
                                                    Normal
                                                </Radio>
                                                <Radio value='Re-submission'>
                                                    Re-submission
                                                </Radio>
                                            </Stack>
                                        </RadioGroup>
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
                                    onClick={() => cancelSubmissionUpload()}>
                                    Cancel
                                </Button>
                                <Button
                                    disabled={false}
                                    isLoading={isSubmittingp ? true : false}
                                    className='apply_button'
                                    type='submit'>
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

export default AdmissionStatus

const Container = styled(Stack)`
    width: 100%;
    height: 100px;

    background: #ffffff;
    border-radius: 9px;
    font-family: 'Inter', sans-serif;
    .st_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        line-height: 21px;
        color: #1a2240;
    }

    .st_text {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #1a2240;
        text-transform: uppercase;
        color: #f14c54;
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
