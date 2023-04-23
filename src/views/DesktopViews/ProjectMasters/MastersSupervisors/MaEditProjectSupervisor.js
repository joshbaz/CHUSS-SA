/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Box, Stack, Text, useToast, Button } from '@chakra-ui/react'
import styled from 'styled-components'
import { MdArrowBack } from 'react-icons/md'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    allSupervisors,
    supervisorUpdate,
    reset,
} from '../../../../store/features/supervisors/supervisorSlice'
import EditSupervisorADetailForm from '../../../../components/ProjectComponents/AssignSupervisors/EditSupervisorADetailForm'
import { dashboardLightTheme } from '../../../../theme/dashboard_theme'
const { backgroundMainColor, textLightColor, backgroundRadius } =
    dashboardLightTheme

const MaEditProjectSupervisor = () => {
    let routeNavigate = useNavigate()
    let params = useParams()
    let dispatch = useDispatch()
    let toast = useToast()
    const [individual, setIndividual] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [errors, setErrors] = React.useState({})

    useEffect(() => {
        dispatch(allSupervisors())
    }, [])

    let { allSupervisorItems, isSuccess, isError, message } = useSelector(
        (state) => state.supervisor
    )

    useEffect(() => {
        if (isError) {
            toast({
                position: 'top',
                title: message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(() => false)
            setChnageMade(false)

            dispatch(reset())
        }

        if (isSuccess && isSubmittingp) {
            toast({
                position: 'top',
                title: message.message,
                status: 'success',
                duration: 10000,
                isClosable: true,
            })
            setIsSubmittingp(false)
            setChnageMade(false)
            dispatch(reset())
        }

        dispatch(reset())
    }, [isSuccess, isError, message])

    useEffect(() => {
        let findSupervisor = allSupervisorItems.items.find(
            (element) => element._id === params.s_id
        )

        if (findSupervisor) {
            setIndividual({ ...findSupervisor, examinerId: params.s_id })
        }
    }, [allSupervisorItems, params.s_id])

    /** function to handle value changes */
    const handleChange = (e) => {
        e.preventDefault()
        setIsSubmittingp(() => false)
        setErrors({})
        setChnageMade(true)

        setIndividual((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    let validate = (values) => {
        const errors = {}
        if (!values.jobtitle) {
            errors.jobtitle = 'jobtitle required'
        }

        if (!values.name) {
            errors.name = ' Name required'
        }

        if (!values.email) {
            errors.email = 'Email required'
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone Number required'
        }

        if (!values.countryOfResidence) {
            errors.countryOfResidence = 'countryOfResidence required'
        }

        if (!values.placeOfWork) {
            errors.placeOfWork = 'Place Of Work required'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors(validate(individual))
        setIsSubmittingp(true)
    }

    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(supervisorUpdate(individual))
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingp &&
            changeMade
        ) {
            setIsSubmittingp(false)
            setChnageMade(false)
        }
    }, [isSubmittingp])
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
                            title: 'Edit Supervisor ',
                            count: null,
                        }}
                    />
                </Box>

                <Stack direction='column' padding={'10px 20px 20px 10px'}>
                    <form onSubmit={handleSubmit}>
                        <Stack
                            direction='column'
                            bg={backgroundMainColor}
                            minH='80vh'
                            borderRadius={backgroundRadius}
                            spacing={'20px'}
                            padding={'20px 20px 30px 20px'}>
                            {/** title head */}
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
                                    <Text>Update Masters Supervisor</Text>
                                </BackButtonStack>

                                <SubmitButton
                                    disabledb={
                                        isSubmittingp || !changeMade
                                            ? true
                                            : false
                                    }>
                                    <Button
                                        type='submit'
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        isLoading={isSubmittingp ? true : false}
                                        className='button'>
                                        Submit Update
                                    </Button>
                                </SubmitButton>
                            </Stack>

                            {/** forms */}
                            <Stack direction='column' w='100%'>
                                <Stack direction='row'>
                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='70%'
                                        spacing='20px'>
                                        <EditSupervisorADetailForm
                                            values={individual}
                                            handleChange={handleChange}
                                            errors={errors}
                                        />
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                    </form>
                </Stack>
            </Stack>
        </Container>
    )
}

export default MaEditProjectSupervisor

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap {
        overflow: hidden;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
    }
`

const SubmitButton = styled(Box)`
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;

        &:hover {
            background: ${({ disabledb, ...props }) =>
                disabledb ? '#d0d0d0' : '#F4797F'};
        }
    }
`
