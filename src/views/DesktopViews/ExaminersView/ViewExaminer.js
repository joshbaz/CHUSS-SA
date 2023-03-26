/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'

import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualExaminer,
    getStudentsByExaminer,
    reset as eReset,
} from '../../../store/features/Examiner/examinerSlice'

import GEViewExaminerDetail from '../../../components/ExaminerComponents/ViewExaminer/GEViewExaminerDetail'
import GEViewPayInfo from '../../../components/ExaminerComponents/ViewExaminer/GEViewPayInfo'
import GEViewStudentTable from '../../../components/ExaminerComponents/ViewExaminer/GEViewStudentTable'
import GEViewSupportFiles from '../../../components/ExaminerComponents/ViewExaminer/GEViewSupportFiles'
import GEViewVerification from '../../../components/ExaminerComponents/ViewExaminer/GEViewVerification'

const ViewExaminer = (props) => {
    let routeNavigate = useNavigate()
let params = useParams()
    let dispatch = useDispatch()
    let projectCase = useSelector((state) => state.project)

    let examinerCase = useSelector((state) => state.examiner)
    useEffect(() => {
      

        /** dispatch to get project */
        // dispatch(getIndividualProject(params.p_id))
        /** dispatch to get examiner */
        dispatch(getIndividualExaminer(params.id))
        /** dispatch to get all students by examiner */
        dispatch(getStudentsByExaminer(params.id))
    }, [params.id, dispatch])

   
    let toast = useToast()
    useEffect(() => {
        if (examinerCase.isError) {
            toast({
                position: 'top',
                title: examinerCase.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(eReset())
        }
    }, [examinerCase.isError, examinerCase.isSuccess, examinerCase.message])
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar
                    topbarData={{
                        title: 'Examiners',
                        count: null,
                    }}
                />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <Stack
                        direction='column'
                        bg='#FBFBFB'
                        spacing={'20px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** title head */}
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
                                <Text>
                                    {' '}
                                    {examinerCase.individualExaminer !== null &&
                                    examinerCase.individualExaminer
                                        .typeOfExaminer
                                        ? examinerCase.individualExaminer
                                              .typeOfExaminer
                                        : ''}{' '}
                                    Examiner
                                </Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/m-examiners/examiners/edit/${params.id}`
                                    )
                                }>
                                Edit Details
                            </SubmitButton>
                        </Stack>

                        {/** forms */}
                        <Stack direction='column' w='100%'>
                            {/** first set */}
                            <Stack direction='row'>
                                {/** candidate details & Project details */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <GEViewExaminerDetail
                                        values={examinerCase.individualExaminer}
                                    />
                                </Stack>

                                {/** Grading Progress & Assigned Examiners */}
                                <Stack
                                    direction='column'
                                    w='30%'
                                    spacing='20px'>
                                    <GEViewVerification
                                        values={examinerCase.individualExaminer}
                                        projectValues={projectCase.individual}
                                    />

                                    <GEViewSupportFiles
                                        values={examinerCase.individualExaminer}
                                    />
                                </Stack>
                            </Stack>

                            <Stack direction='column'>
                                {examinerCase.individualExaminer !== null &&
                                examinerCase.individualExaminer
                                    .typeOfExaminer === 'External' ? (
                                    <GEViewPayInfo
                                        values={examinerCase.individualExaminer}
                                    />
                                ) : null}

                                <GEViewStudentTable
                                    values={examinerCase.studentData}
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewExaminer

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
