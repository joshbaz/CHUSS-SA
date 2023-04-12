import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    Radio,
    RadioGroup,
    Input,
} from '@chakra-ui/react'

import { BsFileEarmark } from 'react-icons/bs'

const typeArray = [
    {
        type: 'Provisional Admission',
        value: 'Provisional Admission',
    },
    {
        type: 'Normal registration',
        value: 'Normal registration',
    },
    {
        type: 'Full Admission',
        value: 'Full Admission',
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

const RegistrationRpViewPopup = ({
    yearData,
    viewData,
    projectId,
    setCreateRegister,
    createRegister,
    cancelSubmissionUpload,
}) => {
    //size format
    const formatSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (
            (size / Math.pow(1024, i)).toFixed(2) * 1 +
            ' ' +
            ['B', 'KB', 'MB', 'GB', 'TB'][i]
        )
    }

    let size

    if (viewData !== null && viewData.registrationId.registrationfile) {
        size = formatSize(
            parseInt(viewData.registrationId.registrationfile.fileSize)
        )
    } else {
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
                                    <h1>View Registration</h1>
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
                                    <Stack direction='column' spacing='11px'>
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
                                                readOnly
                                                value={
                                                    viewData !== null &&
                                                    viewData.registrationId.date
                                                        ? viewData
                                                              .registrationId
                                                              .date
                                                        : ''
                                                }
                                            />
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
                                            value={
                                                viewData !== null &&
                                                viewData.registrationId
                                                    .registrationtype
                                                    ? viewData.registrationId
                                                          .registrationtype
                                                    : ''
                                            }
                                            readOnly>
                                            <Stack direction='column'>
                                                {typeArray.map(
                                                    (data, index) => {
                                                        return (
                                                            <Radio
                                                                key={data.value}
                                                                value={
                                                                    data.value
                                                                }
                                                                size='sm'>
                                                                {data.type}
                                                            </Radio>
                                                        )
                                                    }
                                                )}
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
                                        value={
                                            viewData !== null &&
                                            viewData.registrationId.academicYear
                                                ? viewData.registrationId
                                                      .academicYear
                                                : ''
                                        }
                                        readOnly>
                                        <Stack direction='column'>
                                            {yearData.map((data) => {
                                                return (
                                                    <Radio
                                                        size='sm'
                                                        key={data._id}
                                                        value={
                                                            data.academicYear
                                                        }>
                                                        {data.academicYear}
                                                    </Radio>
                                                )
                                            })}
                                        </Stack>
                                    </RadioGroup>
                                </Stack>

                                {/** semester */}
                                {/***
                                     * 
                                     *  <Stack
                                    minW='120px'
                                    className='form_input'
                                    direction='column'
                                    w='100%'>
                                    <Box className='content_title'>
                                        Semester
                                    </Box>

                                    <RadioGroup
                                        readOnly
                                        value={
                                            viewData !== null &&
                                            viewData.registrationId.semester
                                                ? viewData.registrationId
                                                      .semester
                                                : ''
                                        }>
                                        <Stack direction='column' w='100%'>
                                            {semArray.map((data, index) => {
                                                return (
                                                    <Radio
                                                        size='sm'
                                                        key={index}
                                                        value={data.value}>
                                                        {data.type}
                                                    </Radio>
                                                )
                                            })}
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
                                            {viewData !== null &&
                                            viewData.registrationId
                                                .registrationfile ? (
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
                                                                    className={`icon_stack ${
                                                                        viewData !==
                                                                            null &&
                                                                        viewData
                                                                            .registrationId
                                                                            .registrationfile
                                                                            .fileExtension
                                                                    }`}>
                                                                    <Box className='icon_stack_icon'>
                                                                        <BsFileEarmark />
                                                                    </Box>
                                                                    <Box className='icon_stack_text'>
                                                                        {viewData !==
                                                                            null &&
                                                                            viewData
                                                                                .registrationId
                                                                                .registrationfile
                                                                                .fileExtension}
                                                                    </Box>
                                                                </Stack>
                                                            </Box>
                                                            <Stack
                                                                direction='column'
                                                                spacing='2px'>
                                                                <Box
                                                                    className='filename'
                                                                    maxW='170px'>
                                                                    {viewData !==
                                                                        null &&
                                                                        viewData
                                                                            .registrationId
                                                                            .registrationfile
                                                                            .fileName}
                                                                </Box>

                                                                <Box className='filesize'>
                                                                    {size}
                                                                </Box>
                                                            </Stack>
                                                        </Stack>

                                                        <Box></Box>
                                                    </Stack>
                                                </FileStack>
                                            ) : (
                                                <Box className='formfields__Sfieldset'>
                                                    <Stack
                                                        spacing='8px'
                                                        className='form_wrap'>
                                                        <Box className='label'>
                                                            No files
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            )}
                                        </Stack>
                                        {/** file type */}
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
                                onClick={() => cancelSubmissionUpload()}>
                                Close
                            </Button>
                        </Stack>
                    </PopupForm>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default RegistrationRpViewPopup

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
