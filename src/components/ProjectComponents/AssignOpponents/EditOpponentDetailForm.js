import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Input } from '@chakra-ui/react'
import { BsInfoCircleFill } from 'react-icons/bs'

const EditOpponentDetailForm = ({ values, handleChange, errors }) => {
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
                        <h1>Details of Opponent</h1>
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
                                type='text'
                                value={
                                    values !== null && values.jobtitle
                                        ? values.jobtitle
                                        : ''
                                }
                                name='jobtitle'
                                onChange={handleChange}
                                placeholder={'i.e Prof. or Assoc.Prof.'}
                            />
                            {errors && errors.jobtitle ? (
                                <ErrorMsg className='filesError'>
                                    {errors.jobtitle}
                                </ErrorMsg>
                            ) : null}
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
                                type='text'
                                value={
                                    values !== null && values.name
                                        ? values.name
                                        : ''
                                }
                                name='name'
                                onChange={handleChange}
                                placeholder={'i.e Apollo Kimani'}
                            />
                            {errors && errors.name ? (
                                <ErrorMsg className='filesError'>
                                    {errors.name}
                                </ErrorMsg>
                            ) : null}
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
                                            type='text'
                                            value={
                                                values !== null && values.email
                                                    ? values.email
                                                    : null
                                            }
                                            name='email'
                                            onChange={handleChange}
                                            placeholder={
                                                'email i.e apollo@yahoo.com'
                                            }
                                        />

                                        {errors && errors.email ? (
                                            <ErrorMsg className='filesError'>
                                                {errors.email}
                                            </ErrorMsg>
                                        ) : null}
                                    </Box>
                                </Stack>
                            </Stack>
                        </Stack>

                        {/** phone number */}
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
                                            type='text'
                                            value={
                                                values !== null &&
                                                values.phoneNumber
                                                    ? values.phoneNumber
                                                    : ''
                                            }
                                            name='phoneNumber'
                                            onChange={handleChange}
                                            placeholder={'e.g 256787785114'}
                                        />

                                        {errors && errors.phoneNumber ? (
                                            <ErrorMsg className='filesError'>
                                                {errors.phoneNumber}
                                            </ErrorMsg>
                                        ) : null}
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
                                type='text'
                                value={
                                    values !== null && values.postalAddress
                                        ? values.postalAddress
                                        : ''
                                }
                                name='postalAddress'
                                onChange={handleChange}
                                placeholder={'postalAddress'}
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
                                type='text'
                                value={
                                    values !== null && values.countryOfResidence
                                        ? values.countryOfResidence
                                        : ''
                                }
                                name='countryOfResidence'
                                onChange={handleChange}
                                placeholder={'i.e Uganda'}
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
                                type='text'
                                value={
                                    values !== null && values.placeOfWork
                                        ? values.placeOfWork
                                        : ''
                                }
                                name='placeOfWork'
                                onChange={handleChange}
                                placeholder={'i.e Makerere University'}
                            />

                            {errors && errors.placeOfWork ? (
                                <ErrorMsg className='filesError'>
                                    {errors.placeOfWork}
                                </ErrorMsg>
                            ) : null}
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
                                type='text'
                                value={
                                    values !== null && values.otherTitles
                                        ? values.otherTitles
                                        : ''
                                }
                                name='otherTitles'
                                onChange={handleChange}
                            />
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        </Container>
    )
}

export default EditOpponentDetailForm

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

const ErrorMsg = styled(Box)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;
    font-family: 'Inter', sans-serif;

    .filesError {
        padding: 0;
    }
`