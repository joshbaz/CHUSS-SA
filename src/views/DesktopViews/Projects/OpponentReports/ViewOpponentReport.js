/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import {
    reset,
    getOpponentReport,
} from '../../../../store/features/opponentReports/opponentReportSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import { useSelector, useDispatch } from 'react-redux'
import OpponentViewFile from '../../../../components/ProjectComponents/OpponentReportView/OpponentViewFile'
import OpponentReportDetails from '../../../../components/ProjectComponents/OpponentReportView/OpponentReportDetails'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'

const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const ViewOpponentReport = (props) => {
    const [initials, setInitials] = React.useState(null)
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let { individualReport, isSuccess, isError, message } = useSelector(
        (state) => state.opponentReport
    )
    let IndividualProject = useSelector((state) => state.project)
    useEffect(() => {
        if (params.p_id) {
            dispatch(getIndividualProject(params.p_id))
        }
    }, [])
    useEffect(() => {
        if (
            individualReport !== null &&
            individualReport._id !== params.rp_id
        ) {
            dispatch(getOpponentReport(params.rp_id))
        }
        if (individualReport === null) {
            dispatch(getOpponentReport(params.rp_id))
        }
    }, [props, dispatch, individualReport])

    let toast = useToast()
    useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(reset())
        }
        dispatch(reset())
    }, [isError, isSuccess, message])

    useEffect(() => {
        if (IndividualProject.isError) {
            toast({
                position: 'top',
                title: IndividualProject.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            dispatch(preset())
        }
        dispatch(preset())
    }, [
        IndividualProject.isError,
        IndividualProject.isSuccess,
        IndividualProject.message,
        dispatch,
    ])

    useEffect(() => {
        if (initials === null && individualReport !== null) {
            if (individualReport._id === params.rp_id) {
                setInitials({
                    score: '',
                    remarks: '',
                    ungraded: false,
                    reportFiles:
                        individualReport !== null &&
                        individualReport.reportFiles > 0
                            ? [...individualReport.reportFiles]
                            : [],
                    ...individualReport,
                })
            }
        }

        // setloadingComponent(false)
        // return () => {
        //     setInitials(null)
        // }
    }, [individualReport, params.rp_id, initials])
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                spacing='20px'
                w='100%'
                bg='#ffffff'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar
                        topbarData={{
                            title: `${
                                IndividualProject.individual !== null &&
                                IndividualProject.individual.student.studentName
                                    ? `Opponent Report for ${IndividualProject.individual.student.studentName}`
                                    : `Opponent Report`
                            }`,
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <Stack
                        direction='column'
                        bg={backgroundMainColor}
                        minH='80vh'
                        borderRadius={backgroundRadius}
                        spacing={'20px'}
                        padding={'20px 20px 30px 20px'}>
                        {/** back & submit button*/}
                        <Stack
                            direction='row'
                            alignItems='center'
                            color={textLightColor}
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
                                <Text>Opponent's Report</Text>
                            </BackButtonStack>

                            <SubmitButton
                                as='button'
                                onClick={() =>
                                    routeNavigate(
                                        `/phd/projects/opponents/updatereport/${params.p_id}/${params.rp_id}`
                                    )
                                }>
                                Update report
                            </SubmitButton>
                        </Stack>
                        {/** forms */}
                        <Stack direction='row' w='100%'>
                            {/** student and contact forms */}
                            <Stack direction='column' w='70%' spacing='20px'>
                                <OpponentViewFile
                                    values={initials}
                                    nameValues={
                                        IndividualProject.individual !== null &&
                                        IndividualProject.individual.student
                                            .studentName
                                            ? IndividualProject.individual
                                                  .student.studentName
                                            : null
                                    }
                                />
                            </Stack>
                            {/** supervisior && date of submission & scanned form */}
                            <Stack direction='column' w='30%' spacing='20px'>
                                <OpponentReportDetails values={initials} />
                            </Stack>
                        </Stack>
                    </Stack>
                    {/** footer */}
                </Stack>
            </Stack>
        </Container>
    )
}

export default ViewOpponentReport

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

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
    background: #f4797f;
    width: 126px;
    height: 32px;
    box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
    border-radius: 6px;

    color: #ffffff;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
`
