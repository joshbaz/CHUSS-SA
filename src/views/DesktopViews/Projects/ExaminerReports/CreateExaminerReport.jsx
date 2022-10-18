import React from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import PercentageScoreForm from '../../../../components/ProjectComponents/CreateExaminerReport/PercentageScoreForm'
import Files from '../../../../components/ProjectComponents/CreateExaminerReport/Files'
import UploadReportForm from '../../../../components/ProjectComponents/CreateExaminerReport/UploadReportForm'
import OverallScores from '../../../../components/ProjectComponents/CreateExaminerReport/OverallScores'
import ExaminerReportDetailForm from '../../../../components/ProjectComponents/CreateExaminerReport/ExaminerReportDetailForm'
import { useNavigate } from 'react-router-dom'
const CreateExaminerReport = () => {
    let routeNavigate = useNavigate()
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar topbarData={{ title: 'Projects', count: null }} />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Stack
                        direction='column'
                        bg='#FBFBFB'
                        spacing={'20px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** back & submit button*/}
                        <Stack
                            direction='row'
                            alignItems='center'
                            justifyContent='space-between'>
                            <BackButtonStack
                                className='back_button'
                                direction='row'
                                alignItems='center'>
                                <Box
                                    fontSize='25px'
                                    onClick={() => routeNavigate(-1)}>
                                    <MdArrowBack />
                                </Box>
                                <Text>Examiner New Report</Text>
                            </BackButtonStack>

                            <SubmitButton as='button'>
                                Submit report
                            </SubmitButton>
                        </Stack>
                        {/** forms */}
                        <Stack direction='row' w='100%'>
                            {/** student and contact forms */}
                            <Stack direction='column' w='70%' spacing='20px'>
                                <PercentageScoreForm />
                                <Files />
                            </Stack>
                            {/** supervisior && date of submission & scanned form */}
                            <Stack direction='column' w='30%' spacing='20px'>
                                <ExaminerReportDetailForm />

                                <OverallScores />

                                <UploadReportForm />
                            </Stack>
                        </Stack>
                    </Stack>
                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default CreateExaminerReport

const Container = styled(Stack)``

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`

const SubmitButton = styled(Box)`
    background: #f7f9fc;
    width: 126px;
    height: 32px;
    box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
    border-radius: 6px;

    color: #868fa0;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
