import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    InputGroup,
    InputRightElement,
    Button,
} from '@chakra-ui/react'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiLinkExternal } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

const AssignedExaminers = ({ values, rlink }) => {
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
                        <h1>Assigned Examiners</h1>
                    </Box>
                </Stack>

                {/** details */}

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='20px'
                    h='100%'>
                    <Stack
                        direction='row'
                        alignItems='center'
                        onClick={() =>
                            routeNavigate(
                                `/projects/examiners/assign/${values._id}`
                            )
                        }
                        style={{ cursor: 'pointer' }}>
                        <Box className='add_examiners'>
                            <AiOutlinePlus />
                        </Box>
                        <Box className='s_name'>
                            <Text>Add New Examiner</Text>
                        </Box>
                    </Stack>

                    {values !== null && values.examiners.length > 0 ? (
                        <Stack direction='column' w='100%'>
                            <Stack spacing={'16px'}>
                                {values.examiners.map((data, index) => (
                                    <Stack
                                        key={index}
                                        direction='row'
                                        alignItems='center'
                                        spacing='15px'>
                                        <label htmlFor='phone'>
                                            <Stack
                                                direction={'row'}
                                                alignItems='center'
                                                h='24px'>
                                                <Text>
                                                    {
                                                        data.examinerId
                                                            .typeOfExaminer
                                                    }{' '}
                                                    Examiners
                                                </Text>
                                            </Stack>
                                        </label>

                                        <Box className='form_input'>
                                            <InputGroup>
                                                <input
                                                    readOnly
                                                    value={data.examinerId.name}
                                                    id='email'
                                                />
                                                <InputRightElement h='32px'>
                                                    <Button
                                                        onClick={() =>
                                                            routeNavigate(
                                                                `/projects/examiners/view/${values._id}/${data.examinerId._id}`
                                                            )
                                                        }
                                                        bg='transparent'
                                                        h='100%'
                                                        w='100%'
                                                        size='28px'>
                                                        <BiLinkExternal />
                                                    </Button>
                                                </InputRightElement>
                                            </InputGroup>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    ) : null}
                </Stack>
            </Box>
        </Container>
    )
}

export default AssignedExaminers

const Container = styled(Box)`
    font-family: 'Inter';

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
        font-family: 'Inter';
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
            line-height: 12px;
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
    }

    .form_subtitle {
        font-family: 'Inter';
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
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
`
