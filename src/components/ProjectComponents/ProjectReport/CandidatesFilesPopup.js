/* eslint-disable react-hooks/exhaustive-deps */
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
    Select,
    useToast,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import {
    updateCandidateFiles,
    reset,
} from '../../../store/features/project/projectSlice'
//import { useNavigate } from 'react-router-dom'
import { ImBin2 } from 'react-icons/im'

import { BsFileEarmark } from 'react-icons/bs'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

const filetype = [
    {
        type: 'intent',
    },
    { type: 'thesis' },

    {
        type: 'others',
    },
]

const CandidatesFilesPopup = ({
    projectId,
    fileUploadActive,
    setFileUploadActive,
}) => {
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    // const [filesList, setFilesList] = React.useState([])
    // let routeNavigate = useNavigate()
    let dispatch = useDispatch()
    let toast = useToast()
    let { isSuccess, isError, message } = useSelector((state) => state.project)

    /**
     * function to cancel submit change
     */

    const cancelFileUpload = () => {
        //setNewActiveStatus(activeDataStatus)

        setFileUploadActive(false)
        //setIsSubmittingp(false)
        // onClose()
    }

    /** function to get files */
    const handlefile = async (setFieldValue) => {
        const getfiles = await window.electronAPI.oppDetail()

        if (getfiles === null) {
        } else {
            setFieldValue('candidatefiles', {
                ...getfiles,
                buffer: getfiles.buffer.toString(),
            })
        }
    }

    const validationSchema = yup.object().shape({
        candidatefiles: yup.mixed().required('file is required'),
        filetypename: yup.string().required('file type is required'),
        othername: yup.string().when('filetypename', {
            is: 'others',
            then: yup.string().required('other name is required'),
            otherwise: yup.string(),
        }),
    })

    const initialValues = {
        candidatefiles: null,
        filetypename: '',
        othername: '',
    }

    const removeFiles = (setFieldValue) => {
        setFieldValue('candidatefiles', null)
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

            dispatch(reset())
        }

        if (isSuccess && isSubmittingp && message) {
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

                // setFileUploadActive(false)
                dispatch(reset())
            }
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])
    return (
        <>
            <Modal
                isCentered
                size=''
                isOpen={fileUploadActive}
                p='0'
                onClose={() => setFileUploadActive(!fileUploadActive)}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0' bg='transparent' w=''>
                    <ModalBody p='0' w=''>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)
                                let values2 = {
                                    ...values,
                                    projectId,
                                }
                                dispatch(updateCandidateFiles(values2))
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
                                            w='100%'
                                            p='0px 0px 0px 0px'
                                            direction='column'
                                            spacing={'10px'}
                                            h='50%'>
                                            <Box className='formupload_container'>
                                                {/** form title */}
                                                <Stack
                                                    className='formuploadtitle'
                                                    direction='row'
                                                    w='100%'
                                                    alignItems='center'
                                                    justifyContent='space-between'>
                                                    <Box>
                                                        <h1>
                                                            Upload Candidate
                                                            files
                                                        </h1>
                                                    </Box>
                                                </Stack>

                                                {/** file upload */}

                                                <Stack direction='row' w='100%'>
                                                    <Stack
                                                        direction='column'
                                                        w='485px'
                                                        p='20px 29px 20px 29px'>
                                                        <Box
                                                            className='formfields__upload'
                                                            onClick={() =>
                                                                handlefile(
                                                                    setFieldValue
                                                                )
                                                            }>
                                                            <Stack
                                                                alignItems='center'
                                                                spacing='8px'
                                                                className='form_wrap'>
                                                                <Box className='label'>
                                                                    Click to
                                                                    <span>
                                                                        Browse
                                                                        files
                                                                    </span>
                                                                </Box>

                                                                <Box className='label'>
                                                                    upload a
                                                                    maximum of
                                                                    one(1) file.
                                                                </Box>
                                                            </Stack>
                                                        </Box>

                                                        <Stack direction='column'>
                                                            <Stack
                                                                direction='row'
                                                                alignItems='center'
                                                                justifyContent='space-between'>
                                                                <Text className='filestitle'>
                                                                    Files
                                                                </Text>

                                                                {errors &&
                                                                errors.candidatefiles ? (
                                                                    <ErrorMsg className='filesError'>
                                                                        {
                                                                            errors.candidatefiles
                                                                        }
                                                                    </ErrorMsg>
                                                                ) : null}
                                                            </Stack>

                                                            <Stack
                                                                direction='column'
                                                                spacing='10px '>
                                                                {values.candidatefiles !==
                                                                null ? (
                                                                    <FileStack className='fileview'>
                                                                        <Stack
                                                                            direction='row'
                                                                            justifyContent='space-between'
                                                                            alignItems='center'
                                                                            h='100%'>
                                                                            <Stack
                                                                                spacing='10px'
                                                                                direction='row'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems='center'>
                                                                                <Box className='icon_wrap '>
                                                                                    <Stack
                                                                                        w='45px'
                                                                                        h='45px'
                                                                                        spacing='0'
                                                                                        direction='column'
                                                                                        className={`icon_stack ${values.candidatefiles.fileType}`}>
                                                                                        <Box>
                                                                                            <BsFileEarmark />
                                                                                        </Box>
                                                                                        <Text>
                                                                                            {
                                                                                                values
                                                                                                    .candidatefiles
                                                                                                    .fileType
                                                                                            }
                                                                                        </Text>
                                                                                    </Stack>
                                                                                </Box>
                                                                                <Stack
                                                                                    direction='column'
                                                                                    spacing='2px'>
                                                                                    <Text className='filename'>
                                                                                        {
                                                                                            values
                                                                                                .candidatefiles
                                                                                                .name
                                                                                        }
                                                                                        {
                                                                                            values
                                                                                                .candidatefiles
                                                                                                .ext
                                                                                        }
                                                                                    </Text>

                                                                                    <Text className='filesize'>
                                                                                        {
                                                                                            values
                                                                                                .candidatefiles
                                                                                                .size
                                                                                        }
                                                                                    </Text>
                                                                                </Stack>
                                                                            </Stack>

                                                                            <Box>
                                                                                <EditIcon
                                                                                    onClick={() =>
                                                                                        removeFiles(
                                                                                            setFieldValue
                                                                                        )
                                                                                    }>
                                                                                    <ImBin2 />
                                                                                </EditIcon>
                                                                            </Box>
                                                                        </Stack>
                                                                    </FileStack>
                                                                ) : (
                                                                    <Box className='nofiles'>
                                                                        No files
                                                                        to
                                                                        upload
                                                                    </Box>
                                                                )}
                                                            </Stack>
                                                        </Stack>
                                                    </Stack>

                                                    <Stack
                                                        direction='column'
                                                        p='20px 29px 20px 29px'
                                                        spacing='20px'>
                                                        <Box>
                                                            <Box className='optionstitle'>
                                                                Options
                                                            </Box>
                                                        </Box>

                                                        <Stack direction='column'>
                                                            <Stack
                                                                spacing='8px'
                                                                className='form_wrap formfields__Dfieldset'>
                                                                <label className='savelabel'>
                                                                    Save As{' '}
                                                                    <span>
                                                                        *
                                                                    </span>
                                                                </label>
                                                                <fieldset>
                                                                    <Select
                                                                        placeholder='select type'
                                                                        name='filetypename'
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        value={
                                                                            values.filetypename
                                                                        }>
                                                                        {filetype.map(
                                                                            (
                                                                                data,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <option
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                        value={
                                                                                            data.type
                                                                                        }>
                                                                                        {
                                                                                            data.type
                                                                                        }
                                                                                    </option>
                                                                                )
                                                                            }
                                                                        )}
                                                                    </Select>
                                                                    {errors &&
                                                                    errors.filetypename ? (
                                                                        <ErrorMsg>
                                                                            {
                                                                                errors.filetypename
                                                                            }
                                                                        </ErrorMsg>
                                                                    ) : null}
                                                                </fieldset>
                                                            </Stack>

                                                            {values.filetypename ===
                                                                'others' && (
                                                                <Stack
                                                                    spacing='8px'
                                                                    className='form_wrap formfields__Dfieldset'>
                                                                    <label className='savelabel'>
                                                                        Others
                                                                    </label>
                                                                    <fieldset>
                                                                        <Input
                                                                            type='text'
                                                                            name='othername'
                                                                            readOnly={
                                                                                values.filetypename ===
                                                                                'others'
                                                                                    ? false
                                                                                    : true
                                                                            }
                                                                            onChange={
                                                                                values.filetypename ===
                                                                                    'others' &&
                                                                                handleChange
                                                                            }
                                                                            value={
                                                                                values.filetypename ===
                                                                                    'others' &&
                                                                                values.othername
                                                                            }
                                                                            placeholder={
                                                                                "if 'Other' indicate name here"
                                                                            }
                                                                        />

                                                                        {errors &&
                                                                        errors.othername ? (
                                                                            <ErrorMsg>
                                                                                {
                                                                                    errors.othername
                                                                                }
                                                                            </ErrorMsg>
                                                                        ) : null}
                                                                    </fieldset>
                                                                </Stack>
                                                            )}
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
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
                                                    cancelFileUpload()
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
        </>
    )
}

export default CandidatesFilesPopup

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

    .formupload_container {
        width: 100%;
        min-height: 288px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formuploadtitle {
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

    .formfields__upload {
        height: 375px !important;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #5e5c60;
        letter-spacing: 0.02em;
        border: 1px dashed #fbb649;
        background: #fef9ef;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
            padding-left: 0px;
            color: #1371ff;
        }

        .label {
            font-style: normal;
            font-weight: bold;
            font-size: 14px;
            line-height: 20px;
        }
    }

    .pop_title {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
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

    .optionstitle {
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #f14c54;

        border-bottom: 2px solid #db5a5a;
        width: 56px;
        padding-bottom: 5px;
    }

    .savelabel {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .icon_stack {
        border-radius: 8px;

        justify-content: center;
        align-items: center;

        p {
            font-style: normal;
            font-weight: 700;
            font-size: 8px;
        }

        div {
            font-size: 18px;
        }
    }

    .pdf {
        background: #fceded;
        color: #f14c54;
    }

    .doc {
        color: #faa723;
        background: #feecd0;
    }

    .filestitle {
        font-style: normal;
        font-weight: bold;
        font-size: 14px;
        line-height: 17px;
        color: #1a2240;
    }

    .nofiles {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: #1a2240;
    }
    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        border-width: 0.01px;
        height: 32px;
        width: 300px;
    }

    select {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        border-width: 0.01px;
        height: 32px;
        width: 300px;
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

const ErrorMsg = styled(Text)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;

    .filesError {
        padding: 0;
    }
`

const FileStack = styled(Box)`
    width: 100%;
    border: 1px solid #eeeeef;
    border-radius: 8px;
    padding: 10px 12px;
    .filename {
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
    }

    .filesize {
        color: #838389;

        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
    }
`
