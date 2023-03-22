import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input, Button } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const EditIndividualDept = ({
    onClose,
    editValues,
    handleChange,
    handleEditSubmit,
    isSubmittingedits,
    handleEditPhoneChange,
}) => {
    return (
        <PopupForm p='0px' justifyContent='space-between'>
            <Stack
                p='10px 20px 20px 20px'
                direction='column'
                spacing={'20px'}
                h='70%'>
                <Box className='pop_title'>Edit Department</Box>

                <Stack spacing={'10px'}>
                    <label>
                        Department Name <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='deptName'
                        value={editValues.deptName}
                        onChange={handleChange}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Dept Head <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='deptHead'
                        value={editValues.deptHead}
                        onChange={handleChange}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Office number <span>*</span>
                    </label>
                    <PhoneInput
                        inputStyle={{
                            width: '100%',
                        }}
                        inputProps={{
                            name: 'officeNumber',
                        }}
                        country={'ug'}
                        value={editValues.officeNumber}
                        name='officeNumber'
                        onChange={(phone, e, formatedVal) => {
                            if (formatedVal.target.value === '+') {
                                handleEditPhoneChange('officeNumber', '')
                            } else {
                                handleEditPhoneChange(
                                    'officeNumber',
                                    formatedVal.target.value
                                )
                            }
                        }}
                        placeholder={'office number'}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>Mobile number</label>
                    <PhoneInput
                        inputStyle={{
                            width: '100%',
                        }}
                        inputProps={{
                            name: 'mobileNumber',
                        }}
                        country={'ug'}
                        value={editValues.mobileNumber}
                        name='mobileNumber'
                        onChange={(phone, e, formatedVal) => {
                            if (formatedVal.target.value === '+') {
                                handleEditPhoneChange('mobileNumber', '')
                            } else {
                                handleEditPhoneChange(
                                    'mobileNumber',
                                    formatedVal.target.value
                                )
                            }
                        }}
                        placeholder={'mobile number'}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Email <span>*</span>
                    </label>
                    <Input
                        type='email'
                        name='email'
                        value={editValues.email}
                        onChange={handleChange}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>Other Email</label>
                    <Input
                        type='email'
                        name='otherEmail'
                        value={editValues.otherEmail}
                        onChange={handleChange}
                    />
                </Stack>
            </Stack>
            <Stack
                p='10px 20px'
                h='100%'
                bg='#ffffff'
                direction='row'
                borderRadius='0 0 8px 8px'
                justifyContent='flex-end'
                alignItems='center'>
                <Button className='cancel_button' onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button
                    colorScheme={'red'}
                    isLoading={isSubmittingedits ? true : false}
                    onClick={handleEditSubmit}
                    className='apply_button'>
                    {' '}
                    Apply
                </Button>
            </Stack>
        </PopupForm>
    )
}

export default EditIndividualDept

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
        width: 84px;
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
        width: 84px;
        height: 32px;
        color: #ffffff;

        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
    }
`
