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
    useDisclosure,
} from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
const PercentageScoreForm = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    
    return (
        <FormContainer>
            {' '}
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Pecentage Scores</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box className='text_description'>
                        <Text>
                            {' '}
                            Higher or the 75th percentile is considered a pass.{' '}
                        </Text>
                    </Box>

                    <Stack direction='column' spacing='15px'>
                        <Stack direction='column' className='form_content'>
                            <label>Clarity, Grammar / spelling</label>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='10px'>
                                <Box w='109px'>
                                    <input placeholder='1 - 99' />
                                </Box>

                                <Box>/100</Box>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack
                        onClick={() => onOpen()}
                        direction='row'
                        alignItems='center'
                        style={{ cursor: 'pointer' }}>
                        <Box className='add_icon'>
                            <AiOutlinePlus />
                        </Box>
                        <Box className='s_name'>
                            <Text>Add Criteria</Text>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <PopupForm p='0px' justifyContent='space-between'>
                            <Stack
                                p='10px 20px 0 20px'
                                direction='column'
                                spacing={'20px'}
                                h='70%'>
                                <Box title='pop_title'>Add Criteria</Box>

                                <Stack spacing={'10px'}>
                                    <label>
                                        Title <span>*</span>
                                    </label>
                                    <input />
                                </Stack>
                            </Stack>
                            <Stack
                                p='0px 20px'
                                h='48px'
                                bg='#ffffff'
                                direction='row'
                                borderRadius='0 0 8px 8px'
                                justifyContent='flex-end'
                                alignItems='center'>
                                <Box
                                    className='cancel_button'
                                    onClick={() => onClose()}>
                                    Cancel
                                </Box>
                                <Box className='apply_button'> Apply</Box>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </FormContainer>
    )
}

export default PercentageScoreForm

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 125px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .formtitle {
        height: 54px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
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

    label {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .text_description {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #abaaaf;
    }

    .add_icon {
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    height: 217px;
    background: #fbfbfb;
    border-radius: 8px;

    span {
        color: #ed1f29;
    }

    .pop_title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .cancel_button {
        width: 64px;
        height: 24px;
        color: #abaaaf;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .apply_button {
        width: 64px;
        height: 24px;
        color: #f14c54;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`
