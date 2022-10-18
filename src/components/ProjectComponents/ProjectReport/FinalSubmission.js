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
    Button
} from '@chakra-ui/react'
import { BsListUl } from 'react-icons/bs'
import { RiLayoutGridFill } from 'react-icons/ri'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'
import { HiPencil } from 'react-icons/hi'

const FinalSubmission = ({ values }) => {
    const [selectedView, setSelectedView] = React.useState('grid')
    const [filesList, setFilesList] = React.useState([])
      const [projectId, setProjectId] = React.useState('')

    React.useEffect(() => {
         if (values !== null && values._id) {
             setProjectId(values._id)
         }
        if (values !== null && values.FinalSubmissionFiles.length > 0) {
            setFilesList(values.FinalSubmissionFiles)
        }
    }, [values])
    return (
        <Container>
            {' '}
            <Stack className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    h='54px'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Final Submission & Support Files</h1>
                    </Box>

                    <Stack direction='row' alignItems='center;'>
                        <Box className={`uploadBtn`}>Upload file</Box>
                        <Box
                            onClick={() => setSelectedView('grid')}
                            className={`icon ${
                                selectedView === 'grid' ? 'active_icon' : null
                            }`}>
                            <RiLayoutGridFill />
                        </Box>
                        <Box
                            onClick={() => setSelectedView('list')}
                            className={`icon ${
                                selectedView === 'list' ? 'active_icon' : null
                            }`}>
                            <BsListUl />
                        </Box>
                    </Stack>
                </Stack>

                {/** details */}
                <Stack>
                    <Stack
                        p='25px 0px'
                        borderBottom='1px solid #EEEEEF'
                        direction='column'
                        className='formfields'
                        alignItems='space-between'
                        spacing='15px'>
                        <Stack
                            p='0px 20px'
                            direction='column'
                            w='100%'
                            spacing='30px'>
                            <Stack direction='column' w='50%'>
                                <Box className='form_subtitle'>
                                    <h1> Details</h1>
                                </Box>

                                <Stack spacing={'8px'}>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Date of Submission</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                placeholder='Select Date and Time'
                                                size='md'
                                                type='datetime-local'
                                                name='FinalSubmissionDate'
                                                value={
                                                    values !== null &&
                                                    values.FinalSubmissionDate
                                                        ? values.FinalSubmissionDate
                                                        : ''
                                                }
                                            />
                                        </Box>

                                        <Box
                                            display='flex'
                                            justifyContent={'center'}>
                                            <Stack
                                                direction='row'
                                                alignItems='center'>
                                                <EditIcon>
                                                    <HiPencil />
                                                </EditIcon>
                                            </Stack>
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
                                                <Text>Date of Graduation</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <Input
                                                placeholder='Select Date and Time'
                                                size='md'
                                                type='datetime-local'
                                                name='GraduationDate'
                                                value={
                                                    values !== null &&
                                                    values.GraduationDate
                                                        ? values.GraduationDate
                                                        : ''
                                                }
                                            />
                                        </Box>

                                        <Box
                                            display='flex'
                                            justifyContent={'center'}>
                                            <Stack
                                                direction='row'
                                                alignItems='center'>
                                                <EditIcon>
                                                    <HiPencil />
                                                </EditIcon>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    {/** files */}

                    <Stack
                        h='100%'
                        p='25px 20px'
                        direction='column'
                        w='100%'
                        spacing='30px'>
                        <Stack direction='column' w='50%'>
                            <Box className='form_subtitle'>
                                <h1> Files</h1>
                            </Box>

                            <Stack spacing={'8px'}>
                                {filesList.length > 0 ? (
                                    <Box>
                                        {selectedView === 'grid' ? (
                                            <Stack direction='row'>
                                                {filesList.map(
                                                    (data, index) => (
                                                        <FileStack
                                                            key={index}
                                                            w='202.6px'
                                                            h='168px'
                                                            direction='column'
                                                            alignitems='space-between'
                                                            className='filedoc'>
                                                            <Box
                                                                h='96px'
                                                                className='icon_wrap '>
                                                                <Stack
                                                                    spacing='0'
                                                                    direction='column'
                                                                    w='55px'
                                                                    h='55px'
                                                                    className='icon_stack doc'>
                                                                    <Box>
                                                                        <BsFileEarmark />
                                                                    </Box>
                                                                    <Text>
                                                                        {
                                                                            data
                                                                                .fileId
                                                                                .fileExtension
                                                                        }
                                                                    </Text>
                                                                </Stack>
                                                            </Box>

                                                            <Box>
                                                                <Stack
                                                                    direction='row'
                                                                    justifyContent={
                                                                        'space-between'
                                                                    }
                                                                    padding='0 20px'
                                                                    alignItems='center'>
                                                                    <Stack direction='column'>
                                                                        <Text className='filename'>
                                                                            {
                                                                                data
                                                                                    .fileId
                                                                                    .fileName
                                                                            }
                                                                        </Text>
                                                                        <Text className='filesize'>
                                                                            {
                                                                                data
                                                                                    .fileId
                                                                                    .fileSize
                                                                            }
                                                                        </Text>
                                                                    </Stack>
                                                                    <Box color='#838389'>
                                                                        <BsThreeDots />
                                                                    </Box>
                                                                </Stack>
                                                            </Box>
                                                        </FileStack>
                                                    )
                                                )}
                                            </Stack>
                                        ) : (
                                            <Stack direction='row'>
                                                {filesList.map(
                                                    (data, index) => (
                                                        <FileStack
                                                            key={index}
                                                            direction='row'
                                                            alignitems='center'
                                                            justifyContent='space-between'
                                                            w='293px'
                                                            h='64px'
                                                            padding='0 12px'
                                                            className='filedoc'>
                                                            <Stack
                                                                spacing='10px'
                                                                direction='row'
                                                                alignitems='center'>
                                                                <Box className='icon_wrap '>
                                                                    <Stack
                                                                        w='45px'
                                                                        h='45px'
                                                                        spacing='0'
                                                                        direction='column'
                                                                        className='icon_stack doc'>
                                                                        <Box>
                                                                            <BsFileEarmark />
                                                                        </Box>
                                                                        <Text>
                                                                            {
                                                                                data
                                                                                    .fileId
                                                                                    .fileExtension
                                                                            }
                                                                        </Text>
                                                                    </Stack>
                                                                </Box>

                                                                <Box>
                                                                    <Stack
                                                                        h='100%'
                                                                        direction='row'
                                                                        alignItems='center'>
                                                                        <Stack direction='column'>
                                                                            <Text className='filename'>
                                                                                {
                                                                                    data
                                                                                        .fileId
                                                                                        .fileName
                                                                                }
                                                                            </Text>
                                                                            <Text className='filesize'>
                                                                                {
                                                                                    data
                                                                                        .fileId
                                                                                        .fileSize
                                                                                }
                                                                            </Text>
                                                                        </Stack>
                                                                    </Stack>
                                                                </Box>
                                                            </Stack>

                                                            <Stack justifyContent='center'>
                                                                <Box color='#838389'>
                                                                    <BsThreeDots />
                                                                </Box>
                                                            </Stack>
                                                        </FileStack>
                                                    )
                                                )}
                                            </Stack>
                                        )}
                                    </Box>
                                ) : (
                                    <Box className='nofiles'>
                                        <Text>No Files Uploaded</Text>
                                    </Box>
                                )}
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
            {/** final submission files report */}
            <Modal w='100vw'  p='0' >
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
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
                                    Assign Opponent?
                                </Box>

                                <Stack
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to assign
                                       
                                        for this project.
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
                                   >
                                    Cancel
                                </Button>
                                <Button
                                   
                                    className='apply_button'
                                    >
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/** final submission date */}
            <Modal w='100vw'  p='0' >
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
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
                                    Assign Opponent?
                                </Box>

                                <Stack
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to assign
                                        
                                        for this project.
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
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    
                                    className='apply_button'
                                   >
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {/** graduation date */}
            <Modal w='100vw'  p='0' >
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
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
                                    Assign Opponent?
                                </Box>

                                <Stack
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to assign
                                     
                                        for this project.
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
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    
                                    className='apply_button'
                                   >
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

export default FinalSubmission

const Container = styled(Box)`
    font-family: 'Inter';

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

        border-bottom: 1px solid #ebeefa;
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

    .s_name {
        color: #5e5c60;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }
    .form_subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    .files {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .uploadBtn {
        padding: 6px 12px;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        color: #ffffff;
        letter-spacing: 0.02em;
    }

    .form_subtitle {
        font-family: 'Inter';
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        border: 0px;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    .nofiles {
        width: 202.6px;
        height: 168px;
        background: #fbfbfb;
        border: 1px solid #eeeeef;
        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #838389;
        letter-spacing: 0.02em;
    }

    .filedoc {
        background: #ffffff;

        border: 1px solid #eeeeef;
        border-radius: 8px;
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

const FileStack = styled(Stack)`
    .icon_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon_stack {
        border-radius: 8px;

        justify-content: center;
        align-items: center;

        p {
            font-family: 'Inter';
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

    .filename {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
    }

    .filesize {
        color: #838389;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
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

