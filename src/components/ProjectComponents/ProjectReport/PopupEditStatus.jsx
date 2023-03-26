import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text, Button, Textarea } from '@chakra-ui/react'
import { FiCheck } from 'react-icons/fi'
const PopupEditStatus = ({
    projectTagData,
    values,
    setFieldValue,
    setChangeMade,
    isSubmittingp,
    cancelStatusChange,
    changeMade,
}) => {
    return (
        <PopupForm
            p='0px'
            direction='column'
            spacing='0'
            justifyContent='space-between'>
            <Stack
                p='10px 20px 10px 20px'
                direction='column'
                spacing={'10px'}
                h='50%'>
                <Box className='pop_title'>Change Status</Box>

                <Stack direction='column'>
                    <Stack>
                        <label>
                            Status <span>*</span>
                        </label>

                        <Stack direction='column' spacing='0'>
                            {projectTagData.length > 0 ? (
                                <>
                                    {' '}
                                    {projectTagData.map((data, index) => {
                                        return (
                                            <StatusChangeItem
                                                key={index}
                                                onClick={() => {
                                                    setChangeMade(true)
                                                    setFieldValue(
                                                        'status',
                                                        data.tagName
                                                    )
                                                }}
                                                tcolors={data.hex}
                                                bcolors={
                                                    values.status ===
                                                    data.tagName
                                                        ? '#F8A5A9'
                                                        : '#ffffff'
                                                }
                                                color={
                                                    values.status ===
                                                    data.tagName
                                                        ? '#ffffff'
                                                        : '#464f60'
                                                }
                                                minW='90px'
                                                h='28px'
                                                direction='row'
                                                justifyContent='space-between'
                                                alignItems='center'>
                                                <Stack
                                                    direction='row'
                                                    alignItems='center'>
                                                    <div className='colorcontainer' />
                                                    <Text>{data.tagName}</Text>
                                                </Stack>

                                                {values.status ===
                                                data.tagName ? (
                                                    <Box color='#ffffff'>
                                                        <FiCheck />
                                                    </Box>
                                                ) : null}
                                            </StatusChangeItem>
                                        )
                                    })}{' '}
                                </>
                            ) : null}
                        </Stack>
                    </Stack>
                </Stack>

                <Stack direction='column' width='100%' h='100%'>
                    <Stack width='100%'>
                        <label>
                            Notes <span>*</span>
                        </label>

                        <StatusNotesArea
                            type='text'
                            placeholder='Please add a note'
                            value={values.notes}
                            onChange={(e) => {
                                e.preventDefault()
                                setChangeMade(true)
                                setFieldValue('notes', e.target.value)
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                p='0px 20px'
                h='65px'
                bg='#ffffff'
                direction='row'
                borderTop='1px solid #E9EDF5'
                borderRadius='0 0 8px 8px'
                justifyContent='flex-end'
                alignItems='center'>
                <div
                    variant='outline'
                    className='cancel_button'
                    onClick={cancelStatusChange}>
                    Cancel
                </div>
                <Button
                    disabled={isSubmittingp ? true : false}
                    type='submit'
                    isLoading={isSubmittingp ? true : false}
                    className='apply_button'>
                    Confirm
                </Button>
            </Stack>
        </PopupForm>
    )
}

export default PopupEditStatus

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;

    span {
        margin: 0 5px;
    }

    .pop_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    .list_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;

        li {
            list-style: none;
            display: inline-block;
            font-weight: 700;
            color: #20202a;
        }
        li:after {
            content: ', ';
            padding-right: 10px;
        }
        li:last-child:after {
            content: '';
            padding-right: 0px;
        }
    }

    .cancel_button {
        padding: 6px 12px;
        height: 32px;
        color: #464f60;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
    }
    .apply_button {
        height: 32px;
        padding: 6px 12px;
        color: #ffffff;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        letter-spacing: 0.02em;

        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;

        &:hover {
            background: #f4797f;
        }
    }
`
const StatusChangeItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};
    cursor: pointer;
    .colorcontainer {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
    }

    :hover {
        color: #ffffff;
        background: #f8a5a9;
    }
`

const StatusNotesArea = styled(Textarea)`
    background: #ffffff !important;
`
