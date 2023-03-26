import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input } from '@chakra-ui/react'

const UpdateExaminerDetail = ({ values }) => {
    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Details of Examiner</h1>
                    </Box>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Current Job Title</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={values !== null && values.jobtitle}
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Name</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={values !== null && values.name}
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' w='100%' spacing='30px'>
                        <Stack direction='column' w='50%'>
                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>Email</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null && values.email
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/** academic details */}
                        <Stack direction='column' w='50%'>
                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='email'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Phone Number</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.phoneNumber
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Postal address</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={values !== null && values.postalAddress}
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Counry of Residence</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={
                                    values !== null && values.countryOfResidence
                                }
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone' className='label2'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Higer Education Institution</Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={values !== null && values.placeOfWork}
                            />
                        </Box>
                    </Stack>

                    <Stack direction='row' alignItems='center' spacing='15px'>
                        <label htmlFor='phone' className='label2'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>
                                    Other Academic or Professional Titles
                                </Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={values !== null && values.otherTitles}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default UpdateExaminerDetail

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

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
        color: #20202a;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    .label2 {
        width: 90px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
    }

    .form_subtitle {
        font-family: 'Inter', sans-serif;
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
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
`
