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
    Button,
    Radio,
    RadioGroup,
    Input,
    Select,
} from '@chakra-ui/react'

import { Formik, Form } from 'formik'
import * as yup from 'yup'

import { ImBin2 } from 'react-icons/im'
import { BsFileEarmark } from 'react-icons/bs'

const typeArray = [
    {
        type: 'Provisonal Admission',
        value: 'Provisonal',
    },
    {
        type: 'Normal registration',
        value: 'Normal',
    },
    {
        type: 'Full Admission',
        value: 'Full',
    },
    {
        type: 'De-registration',
        value: 'de-registered',
    },
]

const semArray = [
    {
        type: 'Semester 1',
        value: 'Semester 1',
    },
    {
        type: 'Semester 2',
        value: 'Semester 2',
    },
]

const filetype = [
    {
        type: 'viva_minutes',
    },
    { type: 'viva_approval' },
    { type: 'compliance' },
    {
        type: 'others',
    },
]

const RegistrationRpEditPopup = ({
    yearData,
    projectId,
    setCreateRegister,
    createRegister,
    cancelSubmissionUpload,
}) => {
    // eslint-disable-next-line no-unused-vars
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const validationSchema = yup.object().shape({
        //regfiles: yup.mixed().required('file is required'),
        regDate: yup.string().required('date is required'),
        regType: yup.string().required('registration type is required'),
        //semester: yup.string().required('semester is required'),
        academicYear: yup.string().required('academic year is required'),
        // filetypename: yup.string().required('file type is required'),
        // othername: yup.string().when('filetypename', {
        //     is: 'others',
        //     then: yup.string().required('other name is required'),
        //     otherwise: yup.string(),
        // }),
    })

    const initialValues = {
        regfiles: null,
        filetypename: '',
        othername: '',
        regDate: '',
        regType: '',
        academicYear: '',
        semester: '',
    }

    const handlefile = async (setFieldValue) => {
        const getfiles = await window.electronAPI.oppDetail()

        if (getfiles === null) {
        } else {
            setFieldValue('regfiles', {
                ...getfiles,
                buffer: getfiles.buffer.toString(),
            })
        }
    }

    const removeFiles = (setFieldValue) => {
        setFieldValue('regfiles', null)
    }
    return (
        <Modal
            size=''
            isOpen={createRegister}
            p='0'
            w=''
            onClose={() => cancelSubmissionUpload()}>
            <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
            <ModalContent p='0' w=''>
                <ModalBody p='0' w=''>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}>
                        {({ values, handleChange, errors, setFieldValue }) => (
                            <Form>
                                <PopupForm
                                    p=' 0px'
                                    direction='column'
                                    spacing='0'
                                    justifyContent='space-between'>
                                    <Stack
                                        pb='80px'
                                        direction='column'
                                        spacing={'10px'}
                                        h='100%'>
                                        <Stack
                                            className='pop_title'
                                            direction='row'
                                            w=''
                                            alignItems='center'
                                            justifyContent='space-between'>
                                            <Box>
                                                <h1>Add Registration</h1>
                                            </Box>
                                        </Stack>

                                        <Stack
                                            p='10px 20px 10px 20px'
                                            spacing={'40px'}
                                            direction='row'
                                            w='100%'>
                                            {/** registration type && date */}
                                            <Stack
                                                className='content'
                                                direction='column'
                                                w='100%'>
                                                <Stack
                                                    direction='column'
                                                    spacing='11px'>
                                                    <Box className='content_title'>
                                                        Date
                                                    </Box>

                                                    <Box
                                                        className='form_input'
                                                        w='100%'
                                                        minW='200px'>
                                                        <Input
                                                            bg='#ffffff'
                                                            placeholder='Select Date and Time'
                                                            size='md'
                                                            type='date'
                                                            name='regDate'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            value={
                                                                values.regDate
                                                            }
                                                        />

                                                        {errors &&
                                                        errors.regDate ? (
                                                            <ErrorMsg>
                                                                {errors.regDate}
                                                            </ErrorMsg>
                                                        ) : null}
                                                    </Box>
                                                </Stack>

                                                <Stack
                                                    direction='column'
                                                    spacing='11px'
                                                    className='content'>
                                                    <Box className='content_title'>
                                                        Registration Type
                                                    </Box>

                                                    <RadioGroup
                                                        size='md'
                                                        value={values.regType}
                                                        onChange={(val) =>
                                                            setFieldValue(
                                                                'regType',
                                                                val
                                                            )
                                                        }
                                                        name='regType'>
                                                        <Stack direction='column'>
                                                            {typeArray.map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Radio
                                                                            value={
                                                                                data.value
                                                                            }
                                                                            size='sm'>
                                                                            {
                                                                                data.type
                                                                            }
                                                                        </Radio>
                                                                    )
                                                                }
                                                            )}

                                                            {errors &&
                                                            errors.regType ? (
                                                                <ErrorMsg>
                                                                    {
                                                                        errors.regType
                                                                    }
                                                                </ErrorMsg>
                                                            ) : null}
                                                        </Stack>
                                                    </RadioGroup>
                                                </Stack>
                                            </Stack>

                                            {/** Academic Year */}
                                            <Stack
                                                className='form_input'
                                                direction='column'
                                                w='100%'>
                                                <Box className='content_title'>
                                                    Academic Year
                                                </Box>

                                                <RadioGroup
                                                    value={values.academicYear}
                                                    onChange={(val) =>
                                                        setFieldValue(
                                                            'academicYear',
                                                            val
                                                        )
                                                    }>
                                                    <Stack direction='column'>
                                                        {yearData.map(
                                                            (data) => {
                                                                return (
                                                                    <Radio
                                                                        size='sm'
                                                                        key={
                                                                            data._id
                                                                        }
                                                                        value={
                                                                            data.academicYear
                                                                        }>
                                                                        {
                                                                            data.academicYear
                                                                        }
                                                                    </Radio>
                                                                )
                                                            }
                                                        )}
                                                        {errors &&
                                                        errors.academicYear ? (
                                                            <ErrorMsg>
                                                                {
                                                                    errors.academicYear
                                                                }
                                                            </ErrorMsg>
                                                        ) : null}
                                                    </Stack>
                                                </RadioGroup>
                                            </Stack>

                                            {/** semester */}
                                            {/**
                                                 * <Stack
                                                minW='120px'
                                                className='form_input'
                                                direction='column'
                                                w='100%'>
                                                <Box className='content_title'>
                                                    Semester
                                                </Box>

                                                <RadioGroup
                                                    value={values.semester}
                                                    onChange={(val) =>
                                                        setFieldValue(
                                                            'semester',
                                                            val
                                                        )
                                                    }>
                                                    <Stack
                                                        direction='column'
                                                        w='100%'>
                                                        {semArray.map(
                                                            (data, index) => {
                                                                return (
                                                                    <Radio
                                                                        size='sm'
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            data.value
                                                                        }>
                                                                        {
                                                                            data.type
                                                                        }
                                                                    </Radio>
                                                                )
                                                            }
                                                        )}

                                                        {errors &&
                                                        errors.semester ? (
                                                            <ErrorMsg>
                                                                {
                                                                    errors.semester
                                                                }
                                                            </ErrorMsg>
                                                        ) : null}
                                                    </Stack>
                                                </RadioGroup>
                                            </Stack>
                                                 * 
                                                 * 
                                                 * 
                                                 * 
                                                 * 
                                                 * 
                                                 * 
                                                 * 
                                                 */}

                                            {/** Support files */}
                                            <Stack
                                                minW='320px'
                                                className='form_input form_container'
                                                direction='column'
                                                w='100%'>
                                                <Box className='content_title'>
                                                    Support files
                                                </Box>

                                                <Stack direction='column'>
                                                    {/** file */}
                                                    <Stack
                                                        p='25px 0px'
                                                        direction='column'
                                                        className='formfields'
                                                        alignItems='space-between'
                                                        spacing='15px'
                                                        h='100%'>
                                                        {values.regfiles !==
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
                                                                                className={`icon_stack ${values.regfiles.fileType}`}>
                                                                                <Box className='icon_stack_icon'>
                                                                                    <BsFileEarmark />
                                                                                </Box>
                                                                                <Box className='icon_stack_text'>
                                                                                    {
                                                                                        values
                                                                                            .regfiles
                                                                                            .fileType
                                                                                    }
                                                                                </Box>
                                                                            </Stack>
                                                                        </Box>
                                                                        <Stack
                                                                            direction='column'
                                                                            spacing='2px'>
                                                                            <Box
                                                                                className='filename'
                                                                                maxW='170px'>
                                                                                {
                                                                                    values
                                                                                        .regfiles
                                                                                        .name
                                                                                }
                                                                                {
                                                                                    values
                                                                                        .regfiles
                                                                                        .ext
                                                                                }
                                                                            </Box>

                                                                            <Box className='filesize'>
                                                                                {
                                                                                    values
                                                                                        .regfiles
                                                                                        .size
                                                                                }
                                                                            </Box>
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
                                                            <Box className='formfields__Sfieldset'>
                                                                <Stack
                                                                    spacing='8px'
                                                                    className='form_wrap'>
                                                                    <Box
                                                                        className='label'
                                                                        onClick={() =>
                                                                            handlefile(
                                                                                setFieldValue
                                                                            )
                                                                        }>
                                                                        Click to{' '}
                                                                        <span>
                                                                            Browse
                                                                            files
                                                                        </span>
                                                                    </Box>
                                                                </Stack>
                                                            </Box>
                                                        )}
                                                    </Stack>
                                                    {/** file type */}
                                                    <Stack direction='column'>
                                                        <Stack
                                                            spacing='8px'
                                                            className='form_wrap formfields__Dfieldset'>
                                                            <label className='savelabel'>
                                                                Save As{' '}
                                                                <span>*</span>
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
                                                cancelSubmissionUpload()
                                            }>
                                            Cancel
                                        </Button>
                                        <Button
                                            disabled={false}
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

export default RegistrationRpEditPopup

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

    .content {
        input {
            border-radius: 6px;
            width: 100%;
            font-style: normal;
            font-weight: 500;

            line-height: 20px;
            color: #20202a;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }

        radio {
            color: #20202a;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
        }
    }

    .content_title {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .form_container {
        .label {
            font-family: 'Inter', sans-serif;
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
                padding-left: 5px;
                color: #1371ff;
            }
        }

        .fileview {
            background: #ffffff;
            border: 1px solid #eeeeef;

            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
            border-radius: 6px;
            min-height: 50px;
        }

        .label2 {
            border: 1px solid transparent;
            height: 47px;
            border-radius: 6px 0 0 6px;
            background: #eeeeef;
        }
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
        height: 40px;
        justify-content: center;
        align-items: center;

        .icon_stack_text {
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
        }

        .icon_stack_icon {
            font-size: 14px;
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

const FileStack = styled(Box)`
    font-family: 'Inter', sans-serif;
    width: 100%;
    border: 1px solid #eeeeef;
    border-radius: 8px;
    padding: 10px 12px;
    .filename {
        font-family: 'Inter', sans-serif;
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
