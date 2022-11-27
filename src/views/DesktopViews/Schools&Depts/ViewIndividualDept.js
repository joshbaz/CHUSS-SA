import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Input,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'

const ViewIndividualDept = ({ onClose, viewValues }) => {
    return (
        <PopupForm p='0px' justifyContent='space-between'>
            <Stack
                p='10px 20px 20px 20px'
                direction='column'
                spacing={'20px'}
                h='70%'>
                <Box className='pop_title'>View Department</Box>

                <Stack spacing={'10px'}>
                    <label>
                        Department Name <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='deptName'
                        value={viewValues.deptName}
                        readOnly
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Dept Head <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='deptHead'
                        value={viewValues.deptHead}
                        readOnly
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Phone number <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='officeNumber'
                        value={viewValues.officeNumber}
                        readOnly
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Email <span>*</span>
                    </label>
                    <Input
                        type='email'
                        name='email'
                        value={viewValues.email}
                        readOnly
                    />
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
                <Box className='cancel_button' onClick={() => onClose()}>
                    Close
                </Box>
            </Stack>
        </PopupForm>
    )
}

export default ViewIndividualDept

const PopupForm = styled(Stack)`
    width: 100%;
    font-family: 'Inter', sans-serif;
    min-height: 217px;
    background: #fbfbfb;
    border-radius: 8px;

    span {
        color: #ed1f29;
    }

    .pop_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    label {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #464f60;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;
        border: 0px solid black;

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
