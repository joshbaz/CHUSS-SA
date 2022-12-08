import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Input } from '@chakra-ui/react'

const ViewPayExaminerDetails = ({ values }) => {
    const [dvalues, setDValues] = React.useState(null)

    React.useEffect(() => {
        if (values !== null && values.examiner) {
            setDValues(values.examiner)
        } else if (values !== null && values.opponent) {
            setDValues(values.opponent)
        }
    }, [values])
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Examiner Details</h1>
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
                                Name <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        dvalues !== null && dvalues.name
                                            ? dvalues.name
                                            : ''
                                    }
                                    readOnly
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Place of Work <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        dvalues !== null && dvalues.placeOfWork
                                            ? dvalues.placeOfWork
                                            : ''
                                    }
                                    readOnly
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Postal Address <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        dvalues !== null &&
                                        dvalues.postalAddress
                                            ? dvalues.postalAddress
                                            : ''
                                    }
                                    readOnly
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Phone Number <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    value={
                                        dvalues !== null && dvalues.phoneNumber
                                            ? dvalues.phoneNumber
                                            : ''
                                    }
                                    readOnly
                                />
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>Email</label>
                            <fieldset>
                                <Input
                                    type='email'
                                    value={
                                        dvalues !== null && dvalues.email
                                            ? dvalues.email
                                            : ''
                                    }
                                    readOnly
                                />
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewPayExaminerDetails

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 325px;
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
        border-width: 0.01px;
        height: 32px;
        width: 100%;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
