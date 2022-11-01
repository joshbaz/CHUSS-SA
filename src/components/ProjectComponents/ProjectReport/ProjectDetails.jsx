import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text } from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const ProjectDetails = ({ values }) => {
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
                        <h1>Project Details</h1>
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
                    <Stack
                        direction='row'
                        alignItems='flex-start'
                        spacing='15px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='center'
                                spacing='8px'>
                                <Text>Topic</Text>
                                <Box fontSize='14px' color='#868FA0'>
                                    <BsInfoCircleFill />
                                </Box>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <textarea
                                readOnly
                                id='phone'
                                value={
                                    values !== null && values.topic
                                        ? values.topic
                                        : 'topic'
                                }
                            />
                        </Box>
                    </Stack>

                    <Stack direction='column' w='100%' spacing='30px'>
                        {/** Members */}
                        <Stack direction='row' spacing='5%'>
                            {/** supervisors */}
                            <Stack direction='column' w='50%'>
                                {/** title and button */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box className='form_subtitle'>
                                        <h1>Supervisors</h1>
                                    </Box>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        onClick={() =>
                                            routeNavigate(
                                                `/projects/supervisors/assign/${values._id}`
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}>
                                        <Box className='add_examiners'>
                                            <AiOutlinePlus />
                                        </Box>
                                        <Box className='s_name'>
                                            <Text>Assign Supervisor</Text>
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** lists */}
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
                                                <Text>
                                                    Name of Supervisor 1
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.supervisors.length >
                                                        0
                                                        ? values.supervisors[0]
                                                              .name
                                                        : ''
                                                }
                                                id='phone'
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
                                                <Text>
                                                    Name of Supervisor 2
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.supervisors.length >
                                                        1 &&
                                                    values.supervisors[1].name
                                                        ? values.supervisors[1]
                                                              .name
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>

                            {/** doctoral members */}
                            <Stack direction='column' w='50%'>
                                {/** title and button */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    justifyContent='space-between'>
                                    <Box className='form_subtitle'>
                                        <h1>Doctoral Com. Members</h1>
                                    </Box>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        onClick={() =>
                                            routeNavigate(
                                                `/projects/doctoralmember/assign/${values._id}`
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}>
                                        <Box className='add_examiners'>
                                            <AiOutlinePlus />
                                        </Box>
                                        <Box className='s_name'>
                                            <Text>Assign Member</Text>
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** lists */}
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
                                                <Text>
                                                    Name of Supervisor 1
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.supervisors.length >
                                                        0
                                                        ? values.supervisors[0]
                                                              .name
                                                        : ''
                                                }
                                                id='phone'
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
                                                <Text>
                                                    Name of Supervisor 2
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.supervisors.length >
                                                        1 &&
                                                    values.supervisors[1].name
                                                        ? values.supervisors[1]
                                                              .name
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/** Admissions */}
                        <Stack direction='column' w='100%'>
                            <Box className='form_subtitle'>
                                <h1>Admissions</h1>
                            </Box>

                            {/** lists of admission */}
                            <Stack direction='row' width='100%' spacing='5%'>
                                {/** provisional */}
                                <Stack spacing={'8px'} width='50%'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Type</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.semester
                                                        ? values.student
                                                              .semester
                                                        : ''
                                                }
                                                id='phone'
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
                                                <Text>Date</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.academicYear
                                                        ? values.student
                                                              .academicYear
                                                        : ''
                                                }
                                                id='email'
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
                                                <Text>Semester</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.academicYear
                                                        ? values.student
                                                              .academicYear
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                                {/** full */}
                                <Stack spacing={'8px'} width='50%'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                spacing='8px'>
                                                <Text>Type</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.semester
                                                        ? values.student
                                                              .semester
                                                        : ''
                                                }
                                                id='phone'
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
                                                <Text>Date</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.academicYear
                                                        ? values.student
                                                              .academicYear
                                                        : ''
                                                }
                                                id='email'
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
                                                <Text>Semester</Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <input
                                                readOnly
                                                value={
                                                    values !== null &&
                                                    values.student.academicYear
                                                        ? values.student
                                                              .academicYear
                                                        : ''
                                                }
                                                id='email'
                                            />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default ProjectDetails

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

    .add_examiners {
        width: 24px;
        height: 24px;
        border: 1px dashed #f4797f;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #5e5c60;
        font-size: 15px;
        background: #eeeeef;
    }

    .s_name {
        color: #5e5c60;

        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }

    label {
        width: 70px;
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
        text-indent: 21px;
        height: 32px;
      
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
`
