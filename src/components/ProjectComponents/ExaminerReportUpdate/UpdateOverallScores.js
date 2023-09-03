import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Checkbox, Input } from '@chakra-ui/react'

const UpdateOverallScores = ({ values, errors, handleChange }) => {
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
                    spacing='15px'>
                    <Box className='text_description'>
                        <Text>
                            {' '}
                            Higher or the 60th percentile is considered a pass.{' '}
                        </Text>
                    </Box>

                    <Stack
                        direction='column'
                        spacing='15px'
                        pb='26px'
                        borderBottom={'1px solid #EBEEFA'}>
                        <Stack direction='column' className='form_content'>
                            <label>
                                Percentage Score - Grade <span>*</span>
                            </label>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='10px'>
                                <Box w='109px'>
                                    <Input
                                        type='number'
                                       
                                        placeholder='1 - 99'
                                        name='score'
                                        step='.01'
                                        value={
                                            values !== null && values.score
                                                ? values.score
                                                : null
                                        }
                                        onChange={handleChange}
                                    />
                                </Box>

                                <Box>/100</Box>
                            </Stack>

                            {errors !== null && errors.score ? (
                                <Box color='red'>{errors.score}</Box>
                            ) : null}
                        </Stack>
                    </Stack>

                    <Stack direction='row'>
                        <Checkbox
                            isChecked={
                                values !== null && values.ungraded === 'true'
                                    ? true
                                    : false
                            }
                            name='ungraded'
                            onChange={handleChange}
                        />
                        <label className='checkbox_label'>
                            Check this box, If assignment cannot be graded.
                        </label>
                    </Stack>

                    <Stack direction='column'>
                        <label>Remarks</label>
                        <fieldset>
                            <textarea
                                type='text'
                                name='remarks'
                                value={
                                    values !== null && values.remarks
                                        ? values.remarks
                                        : ''
                                }
                                onChange={handleChange}
                            />
                        </fieldset>
                    </Stack>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default UpdateOverallScores

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

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .text_description {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        color: #abaaaf;
    }

    .add_icon {
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

    .checkbox_label {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #ed1f29;
    }
    textarea {
        background: #ffffff;
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

        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    height: 217px;
    background: #fbfbfb;
    border-radius: 8px;

    span {
        color: #ed1f29;
    }

    .pop_title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .cancel_button {
        width: 64px;
        height: 24px;
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
        height: 24px;
        color: #f14c54;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`
