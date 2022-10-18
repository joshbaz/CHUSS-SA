import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Select } from '@chakra-ui/react'

const EditRegistrationForm = ({ values, handleChange, yearData }) => {
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Registration</h1>
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
                            <label>
                                Semester <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    value={
                                        values !== null &&
                                        values.semesterRegistration
                                            ? values.semesterRegistration
                                            : ''
                                    }
                                    name='semesterRegistration'
                                    onChange={handleChange}>
                                    <option value=''>select option</option>
                                    <option value='Semester 1'>
                                        Semester 1
                                    </option>
                                    <option value='Semester 2'>
                                        Semester 2
                                    </option>
                                </Select>
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Academic Year <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    value={
                                        values !== null && values.academicYear
                                            ? values.academicYear
                                            : ''
                                    }
                                    name='academicYear'
                                    onChange={handleChange}>
                                    <option value=''>select option</option>
                                    {yearData !== null &&
                                    yearData.length > 0 ? (
                                        <>
                                            {yearData.map((data, index) => {
                                                return (
                                                    <option
                                                        key={data._id}
                                                        value={
                                                            data.academicYear
                                                        }>
                                                        {data.academicYear}
                                                    </option>
                                                )
                                            })}
                                        </>
                                    ) : null}
                                </Select>
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default EditRegistrationForm

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 243px;
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

        span {
            color: #ed1f29;
        }
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 20px;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
