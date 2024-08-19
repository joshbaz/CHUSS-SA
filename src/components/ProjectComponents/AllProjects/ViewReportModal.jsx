import React from 'react'
import styled from 'styled-components'

import {
    Stack,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'

const ViewReportModal = ({
    cancelRemoveUpload,
    removeActive,
    removeDetails,
    onRemoveUpload,
    isSubmittingp,
}) => {
    return (
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
                                    <h1>Delete Student</h1>
                                </Box>
                            </Stack>

                            <Stack
                                p='10px 20px 10px 20px'
                                spacing={'2px'}
                                direction='row'
                                className='list_text'>
                                <p>
                                    Are you sure you want to delete
                                    <span>
                                        <li>
                                            {removeDetails !== null &&
                                                removeDetails.name}
                                        </li>
                                    </span>
                                    from the system.
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
    )
}

export default ViewReportModal

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
