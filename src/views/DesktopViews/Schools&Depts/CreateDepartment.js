import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input, Button } from '@chakra-ui/react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

const CreateDepartment = ({
    onClose,
    values,
    handleChange,
    isSubmittingp,
    setFieldValue,
}) => {
    return (
        <PopupForm p='0px' justifyContent='space-between'>
            <Stack
                p='10px 20px 20px 20px'
                direction='column'
                spacing={'20px'}
                h='70%'>
                <Box className='pop_title'>Add Department</Box>

                <Stack spacing={'10px'}>
                    <label>
                        Department Name <span>*</span>
                    </label>
                    <Input
                        type='text'
                        name='deptName'
                        value={values.deptName}
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
                        value={values.deptHead}
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
                        value={values.officeNumber}
                        name='officeNumber'
                        onChange={(phone, e, formatedVal) =>
                            setFieldValue(
                                'officeNumber',
                                formatedVal.target.value
                            )
                        }
                        placeholder={'office number'}
                    />
                </Stack>

                <Stack spacing={'10px'}>
                    <label>
                        Mobile number <span>*</span>
                    </label>
                    <PhoneInput
                        inputStyle={{
                            width: '100%',
                        }}
                        inputProps={{
                            name: 'mobileNumber',
                        }}
                        country={'ug'}
                        value={values.mobileNumber}
                        name='officeNumber'
                        onChange={(phone, e, formatedVal) =>
                            setFieldValue(
                                'mobileNumber',
                                formatedVal.target.value
                            )
                        }
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
                        value={values.email}
                        onChange={handleChange}
                    />
                </Stack>
                <Stack spacing={'10px'}>
                    <label>Other Email</label>
                    <Input
                        type='email'
                        name='otherEmail'
                        value={values.otherEmail}
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
                <Button
                    h='38px'
                    className='cancel_button'
                    onClick={() => onClose()}>
                    Cancel
                </Button>
                <Button
                    h='38px'
                    colorScheme={'red'}
                    type='submit'
                    isLoading={isSubmittingp ? true : false}
                    className='apply_button'>
                    {' '}
                    Submit
                </Button>
            </Stack>
        </PopupForm>
    )
}

export default CreateDepartment

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
        height: 32px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`
