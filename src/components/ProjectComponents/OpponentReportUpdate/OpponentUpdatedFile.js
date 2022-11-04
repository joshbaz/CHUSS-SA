import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text } from '@chakra-ui/react'
import { BsListUl } from 'react-icons/bs'
import { RiLayoutGridFill } from 'react-icons/ri'
import { BsFileEarmark, BsThreeDots } from 'react-icons/bs'

const OpponentUpdatedFile = ({ values }) => {
    const [selectedView, setSelectedView] = React.useState('grid')
    const [filesList, setFilesList] = React.useState([])

    React.useEffect(() => {
        if (values !== null && values.reportFiles.length > 0) {
            setFilesList(values.reportFiles)
        }
    }, [values])
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    className='formtitle'>
                    <Box>
                        <h1>Files</h1>
                    </Box>

                    <Stack direction='row'>
                        <Box
                            onClick={() => setSelectedView('grid')}
                            className={`icon ${
                                selectedView === 'grid' ? 'active_icon' : null
                            }`}>
                            <RiLayoutGridFill />
                        </Box>
                        <Box
                            onClick={() => setSelectedView('list')}
                            className={`icon ${
                                selectedView === 'list' ? 'active_icon' : null
                            }`}>
                            <BsListUl />
                        </Box>
                    </Stack>
                </Stack>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    {filesList.length > 0 ? (
                        <Box>
                            {selectedView === 'grid' ? (
                                <Stack direction='row'>
                                    {filesList.map((data, index) => (
                                        <FileStack
                                            key={index}
                                            w='202.6px'
                                            h='168px'
                                            direction='column'
                                            alignitems='space-between'
                                            className='filedoc'>
                                            <Box
                                                h='96px'
                                                className='icon_wrap '>
                                                <Stack
                                                    spacing='0'
                                                    direction='column'
                                                    w='55px'
                                                    h='55px'
                                                    className='icon_stack doc'>
                                                    <Box>
                                                        <BsFileEarmark />
                                                    </Box>
                                                    <Text>
                                                        {' '}
                                                        {
                                                            data.files
                                                                .fileExtension
                                                        }
                                                    </Text>
                                                </Stack>
                                            </Box>

                                            <Box>
                                                <Stack
                                                    direction='row'
                                                    justifyContent={
                                                        'space-between'
                                                    }
                                                    padding='0 20px'
                                                    alignItems='center'>
                                                    <Stack direction='column'>
                                                        <Text className='filename'>
                                                            {
                                                                data.files
                                                                    .fileName
                                                            }
                                                        </Text>
                                                        <Text className='filesize'>
                                                            {
                                                                data.files
                                                                    .fileSize
                                                            }
                                                        </Text>
                                                    </Stack>
                                                    <Box color='#838389'>
                                                        <BsThreeDots />
                                                    </Box>
                                                </Stack>
                                            </Box>
                                        </FileStack>
                                    ))}
                                </Stack>
                            ) : (
                                <Stack direction='row'>
                                    {filesList.map((data, index) => (
                                        <FileStack
                                            key={index}
                                            direction='row'
                                            alignitems='center'
                                            justifyContent='space-between'
                                            w='293px'
                                            h='64px'
                                            padding='0 12px'
                                            className='filedoc'>
                                            <Stack
                                                spacing='10px'
                                                direction='row'
                                                alignitems='center'>
                                                <Box className='icon_wrap '>
                                                    <Stack
                                                        w='45px'
                                                        h='45px'
                                                        spacing='0'
                                                        direction='column'
                                                        className='icon_stack doc'>
                                                        <Box>
                                                            <BsFileEarmark />
                                                        </Box>
                                                        <Text>
                                                            {
                                                                data.files
                                                                    .fileExtension
                                                            }
                                                        </Text>
                                                    </Stack>
                                                </Box>

                                                <Box>
                                                    <Stack
                                                        h='100%'
                                                        direction='row'
                                                        alignItems='center'>
                                                        <Stack direction='column'>
                                                            <Text className='filename'>
                                                                {
                                                                    data.files
                                                                        .fileName
                                                                }
                                                            </Text>
                                                            <Text className='filesize'>
                                                                {
                                                                    data.files
                                                                        .fileSize
                                                                }
                                                            </Text>
                                                        </Stack>
                                                    </Stack>
                                                </Box>
                                            </Stack>

                                            <Stack justifyContent='center'>
                                                <Box color='#838389'>
                                                    <BsThreeDots />
                                                </Box>
                                            </Stack>
                                        </FileStack>
                                    ))}
                                </Stack>
                            )}
                        </Box>
                    ) : (
                        <Box className='nofiles'>
                            <Text>No Files Uploaded</Text>
                        </Box>
                    )}
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default OpponentUpdatedFile

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 148px;
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

    .icon {
        color: #abaaaf;
        font-size: 20px;
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active_icon {
        color: #3a3a43;
    }

    .nofiles {
        width: 202.6px;
        height: 168px;
        background: #fbfbfb;
        border: 1px solid #eeeeef;
        border-radius: 8px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #838389;
        letter-spacing: 0.02em;
    }

    .filedoc {
        background: #ffffff;

        border: 1px solid #eeeeef;
        border-radius: 8px;
    }
`

const FileStack = styled(Stack)`
    .icon_wrap {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .icon_stack {
        border-radius: 8px;

        justify-content: center;
        align-items: center;

        p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 8px;
        }

        div {
            font-size: 18px;
        }
    }

    .pdf {
        background: #fceded;
        color: #f14c54;
    }

    .doc {
        color: #faa723;
        background: #feecd0;
    }

    .filename {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
        color: #20202a;
    }

    .filesize {
        color: #838389;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        line-height: 20px;
    }
`



