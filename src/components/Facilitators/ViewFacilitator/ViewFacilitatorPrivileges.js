import React from 'react'
import styled from 'styled-components'
import { Box, Stack, RadioGroup, Radio, Text } from '@chakra-ui/react'

const ViewFacilitatorPrivileges = ({ values }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>User Priviledges</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <RadioGroup
                                value={
                                    values !== null && values.privileges
                                        ? values.privileges
                                        : ''
                                }>
                                <Stack direction='column' spacing='20px'>
                                    <Radio value='Super Administrator'>
                                        <Stack spacing='0'>
                                            <Text className='radio_title'>
                                                Super Administrator (CREATE,
                                                READ & UPDATE)
                                            </Text>
                                            <Text className='radio_subtext'>
                                                Admins, content, sharing,
                                                organistation setting
                                            </Text>
                                        </Stack>
                                    </Radio>

                                    <Radio value='Partial Administrator'>
                                        <Stack spacing='0'>
                                            <Text className='radio_title'>
                                                Partial Administrator (CREATE,
                                                READ & UPDATE)
                                            </Text>
                                            <Text className='radio_subtext'>
                                                content, sharing, organistation
                                                setting
                                            </Text>
                                        </Stack>
                                    </Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewFacilitatorPrivileges

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;

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
            font-size: 17px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    label {
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;

        span {
            color: #ed1f29;
        }
    }

    input {
        background: #ffffff;
        border-color: transparent;
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
    .input_error {
        border-color: red !important;
        box-shadow: none;
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .radio_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .radio_subtext {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 11.7px;
        color: #464f60;
    }
`
