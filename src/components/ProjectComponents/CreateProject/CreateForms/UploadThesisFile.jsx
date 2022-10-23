import React from 'react'
import styled from 'styled-components'
import { Box, Stack, Text } from '@chakra-ui/react'
import { MdOutlineFilePresent } from 'react-icons/md'

const UploadThesisFile = ({ setFieldValue, values }) => {
    //const [thesisfile, setThesisFile] = React.useState(null)

    const handlefile = async () => {
        const getfiles = await window.electronAPI.oppDetail()
        console.log('getfiles', getfiles)
        if (getfiles === null) {
        } else {
            setFieldValue('thesisfile', {
                ...getfiles,
                buffer: getfiles.buffer.toString(),
            })
        }
    }

    console.log('thesis Values', values.thesisfile)

    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Upload Thesis or Dissertation</h1>
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
                            {values.thesisfile !== null ? (
                                <Box className='fileview'>
                                    <Stack
                                        direction='row'
                                        alignItems='center'
                                        h='100%'>
                                        <Box w='20%'>
                                            <Box
                                                onClick={handlefile}
                                                className='label2'></Box>
                                        </Box>
                                        <Stack
                                            w='70%'
                                            spacing='10px'
                                            direction='row'
                                            justifyContent={'center'}
                                            alignItems='center'>
                                            <Box fontSize='20px'>
                                                <MdOutlineFilePresent />
                                            </Box>
                                            <Text>
                                                {values.thesisfile.name}
                                                {values.thesisfile.ext}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                            ) : (
                                <Box className='label' onClick={handlefile}>
                                    Click to <span>Browse files</span>
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default UploadThesisFile

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

    .label {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #5e5c60;
        letter-spacing: 0.02em;
        border: 1px dashed #fbb649;
        background: #fef9ef;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        height: 49px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        span {
            padding-left: 5px;
            color: #1371ff;
        }
    }

    .label2 {
        border: 1px solid transparent;
        height: 47px;
        border-radius: 6px 0 0 6px;
        background: #eeeeef;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 20px;
    }

    #upload[type='file'] {
        display: none;
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .fileview {
        background: #ffffff;
        border: 1px solid #838389;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        height: 49px;

        p {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 700;
            font-size: 14px;
            line-height: 20px;
            color: #5e5c60;
        }
    }
`