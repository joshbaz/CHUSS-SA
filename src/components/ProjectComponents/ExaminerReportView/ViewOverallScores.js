import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, useDisclosure, Checkbox } from '@chakra-ui/react'

const ViewOverallScores = ({ values }) => {
    return (
        <FormContainer>
            {' '}
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Overall Scores</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box className='text_description'>
                        <Text>
                            {' '}
                            Higher or the 60th percentile is considered a pass.{' '}
                        </Text>
                    </Box>

                    <Stack
                        pb='26px'
                        width='100%'
                        borderBottom={
                            values !== null && values.ungraded === 'true'
                                ? '1px solid #EBEEFA'
                                : null
                        }
                        direction='column'
                        className='formfields2'
                        alignItems='space-between'
                        spacing='15px'>
                        <Box className='grade__title'>
                            <Text>Percentage Score - Grade</Text>
                        </Box>

                        <Box className='grade__percent'>
                            <Text>{values !== null ? values.score : 0}%</Text>
                        </Box>
                    </Stack>
                    {values !== null && values.ungraded ? (
                        <>
                            {' '}
                            <Stack direction='row'>
                                <Checkbox
                                    id='ungraded'
                                    isChecked={
                                        values !== null &&
                                        values.ungraded === 'true'
                                            ? true
                                            : false
                                    }
                                />
                                <label
                                    className='checkbox_label'
                                    htmlFor='ungraded'>
                                    Ungraded
                                </label>
                            </Stack>
                            <Stack direction='column'>
                                <label>Remarks</label>
                                <fieldset>
                                    <textarea
                                        type='text'
                                        readOnly
                                        value={
                                            values !== null && values.remarks
                                                ? values.remarks
                                                : ''
                                        }
                                    />
                                </fieldset>
                            </Stack>
                        </>
                    ) : null}
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default ViewOverallScores

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 125px;
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
        text-transform: capitalize;
    }

    .text_description {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #abaaaf;
    }

    .grade__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
    }

    .grade__percent {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 22px;
        line-height: 20px;
        color: #20202a;
    }

    .checkbox_label {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #20202a;
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }
`
