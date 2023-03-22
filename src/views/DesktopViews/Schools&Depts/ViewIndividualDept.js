import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input, Button } from '@chakra-ui/react'

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
                        Office number <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='officeNumber'
                        value={viewValues.officeNumber}
                        readOnly
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>Mobile number</label>
                    <Input
                        type='text'
                        name='mobileNumber'
                        value={viewValues.mobileNumber}
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

                <Stack spacing={'10px'}>
                    <label>Other Email</label>
                    <Input
                        type='email'
                        name='email'
                        value={viewValues.otherEmail}
                        readOnly
                    />
                </Stack>
            </Stack>
            <Stack
                p='30px 20px'
                h='48px'
                bg='#ffffff'
                direction='row'
                borderRadius='0 0 8px 8px'
                justifyContent='flex-end'
                alignItems='center'>
                <Button className='cancel_button' onClick={() => onClose()}>
                    Close
                </Button>
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
        font-size: 16px;
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

    input {
        background: #ffffff;

        border: 1px solid gray.200;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        color: #20202a;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }

    .cancel_button {
        width: 64px;
        height: 32px;
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
