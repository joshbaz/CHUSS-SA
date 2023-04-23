import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input } from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const CandidateProfile = ({ values, rlink }) => {
    let routeNavigate = useNavigate()
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
                        <h1>Candidate Profile</h1>
                    </Box>

                    <SubmitButton
                        as='button'
                        onClick={() =>
                            routeNavigate(
                                `${rlink}/projects/edit/${values._id}`
                            )
                        }>
                        Edit Student
                    </SubmitButton>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'>
                        <Box className='s_name'>
                            <Text>
                                {values !== null && values.student.studentName}
                            </Text>
                        </Box>

                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing='15px'>
                            <label htmlFor='SRN'>
                                <Stack
                                    direction={'row'}
                                    alignItems='center'
                                    spacing='8px'>
                                    <Text>SRN</Text>
                                    <Box fontSize='14px' color='#868FA0'>
                                        <BsInfoCircleFill />
                                    </Box>
                                </Stack>
                            </label>

                            <Input
                                width='30'
                                id='SRN'
                                readOnly
                                value={
                                    values !== null &&
                                    values.student.registrationNumber
                                }
                            />
                        </Stack>
                    </Stack>

                    <Stack direction='row' w='100%' spacing='30px'>
                        <Stack direction='column' w='50%'>
                            <Box className='form_subtitle'>
                                <h1>Contact Details</h1>
                            </Box>

                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
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
                                            id='phone'
                                            value={
                                                values !== null &&
                                                values.student.phoneNumber
                                            }
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='email'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Email</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            id='email'
                                            value={
                                                values !== null &&
                                                values.student.email
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/** academic details */}
                        <Stack direction='column' w='50%'>
                            <Box className='form_subtitle'>
                                <h1>Academic Details</h1>
                            </Box>

                            <Stack spacing={'8px'}>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Graduate Program Type</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.student
                                                    .graduate_program_type
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Degree Program</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.student.degree_program
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>School Name</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.student.schoolName
                                            }
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='email'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Department Name</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.student.departmentName
                                            }
                                        />
                                    </Box>
                                </Stack>

                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='center'
                                            spacing='8px'>
                                            <Text>Funding Type</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                values !== null &&
                                                values.student.fundingType
                                                    ? values.student.fundingType
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default CandidateProfile

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

    .s_name {
        color: #20202a;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
        text-transform: capitalize;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        color: #20202a;
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
        border: 0px;
        color: #20202a;
    }
`

const SubmitButton = styled(Box)`
    width: 126px;
    height: 32px;
    background: #f4797f;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
    border-radius: 6px;

    color: #ffffff;
    letter-spacing: 0.02em;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
