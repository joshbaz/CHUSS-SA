import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuOptionGroup,
    MenuItemOption,
    InputGroup,
    Input,
    InputRightElement,
    InputLeftElement,
    Grid,
    Text,
    GridItem,
    useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'

import { Formik, Form, useFormik } from 'formik'
import * as yup from 'yup'
import { useSelector, useDispatch } from 'react-redux'
import {
    getIndividualExaminer,
    examinerUpdate,
    reset,
} from '../../../store/features/Examiner/examinerSlice'

import GEAppointmentUpload from '../../../components/ExaminerComponents/EditExaminer/GEAppointmentUpload'
import GEEditPayInfo from '../../../components/ExaminerComponents/EditExaminer/GEEditPayInfo'
import GEEditTypeForm from '../../../components/ExaminerComponents/EditExaminer/GEEditTypeForm'
import GEEditExaminerDetail from '../../../components/ExaminerComponents/EditExaminer/GEEditExaminerDetail'

const EditOpponent = () => {
     const [helperFunctions, setHelperFunctions] = React.useState(null)
     const [isSubmittingp, setIsSubmittingp] = React.useState(false)
     const [changeMade, setChnageMade] = React.useState(false)
     const [initials, setInitials] = React.useState(null)
     const [errors, setErrors] = React.useState({})
     const [loadingComponent, setloadingComponent] = React.useState(false)
     let routeNavigate = useNavigate()
     let params = useParams()
     let dispatch = useDispatch()

     const { individualExaminer, isLoading, isError, isSuccess, message } =
         useSelector((state) => state.examiner)
     useEffect(() => {
         console.log('props', params.id)

         /** dispatch to get project */
         // dispatch(getIndividualProject(params.p_id))
         /** dispatch to get examiner */
         dispatch(getIndividualExaminer(params.id))
     }, [params.id, dispatch])

     let toast = useToast()
     useEffect(() => {
         if (isError) {
             if (helperFunctions !== null) {
                 helperFunctions.setSubmitting(false)
                 setIsSubmittingp(false)
             }
             toast({
                 position: 'top',
                 title: message,
                 status: 'error',
                 duration: 10000,
                 isClosable: true,
             })
             setIsSubmittingp(false)
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
     }, [isError, isSuccess, message])

     useEffect(() => {
         if (initials === null) {
             if (individualExaminer == null) {
                 setloadingComponent(true)
             } else {
                 let paymentDetails
                 if (
                     individualExaminer !== null &&
                     individualExaminer.paymentInfo.length > 0
                 ) {
                     individualExaminer.paymentInfo.find((element2) => {
                         paymentDetails = {
                             ...element2,
                         }
                     })
                 } else {
                 }
                 setInitials({
                     jobtitle: '',
                     name: '',
                     email: '',
                     phoneNumber: '',
                     postalAddress: '',
                     countryOfResidence: '',
                     placeOfWork: '',
                     otherTitles: '',
                     typeOfExaminer: '',
                     preferredPayment: 'mobileMoney',
                     mobileOperator: '',
                     mobileSubscriberName: '',
                     mobileNumber: '',
                     bank: '',
                     AccountName: '',
                     AccountNumber: '',
                     swift_bicCode: '',
                     bankCode: '',
                     branchCode: '',
                     bankAddress: '',
                     bankCity: '',
                     ...individualExaminer,
                     ...paymentDetails,
                     examinerAppLetter: null,
                     examinerId: params.id,
                 })
                 setloadingComponent(false)
             }
         } else {
             setloadingComponent(false)
         }
     }, [individualExaminer, initials])

     console.log('initials', initials, errors)

     const handleChange = (e) => {
         e.preventDefault()
         setChnageMade(true)
         setInitials((prevState) => ({
             ...prevState,
             [e.target.name]: e.target.value,
         }))
     }

     /** handlefile Input */
     const handleFileChange = (InputFile) => {
         setChnageMade(true)
         setInitials({
             ...initials,
             examinerAppLetter: InputFile,
         })
     }

     let validate = (values) => {
         const errors = {}
         if (!values.jobtitle) {
             errors.jobtitle = 'Required'
         }
         if (!values.name) {
             errors.name = 'Required'
         }
         if (!values.phoneNumber) {
             errors.phoneNumber = 'Required'
         }
         if (!values.postalAddress) {
             errors.postalAddress = 'Required'
         }
         if (!values.countryOfResidence) {
             errors.countryOfResidence = 'Required'
         }
         if (!values.placeOfWork) {
             errors.placeOfWork = 'Required'
         }
         if (!values.typeOfExaminer) {
             errors.typeOfExaminer = 'Required'
         }
         if (!values.email) {
             errors.email = 'Required'
         } else if (
             !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
         ) {
             errors.email = 'Invalid email address'
         }

         return errors
     }

     const handleSubmit = (e) => {
         e.preventDefault()
         setErrors(validate(initials))
         // setHelperFunctions(helpers)
         setIsSubmittingp(true)

         // let values2 = {
         //     ...values,
         // }
         // dispatch(examinerCreate(values2))
     }

     useEffect(() => {
         console.log('errors', errors)
         if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
             console.log(Object.keys(errors).length, 'No errors', errors)
             dispatch(examinerUpdate(initials))
         } else if (
             Object.keys(errors).length > 0 &&
             isSubmittingp &&
             changeMade
         ) {
             setIsSubmittingp(false)
             setChnageMade(false)
         }
     }, [errors, isSubmittingp])
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' spacing='20px' w='100%' bg='#ffffff'>
                <TopBar topbarData={{ title: 'Examiners', count: null }} />

                <Stack direction='column' padding={'10px 20px 0 10px'}>
                    <form onSubmit={handleSubmit}>
                        {' '}
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
                                    <Text>Update Examiner</Text>
                                </BackButtonStack>

                                <SubmitButton disabledb={false}>
                                    <Button
                                        type='submit'
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        isLoading={isSubmittingp ? true : false}
                                        className='button'>
                                        Submit form
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
                                        <GEEditExaminerDetail
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                        />
                                    </Stack>

                                    {/** Details & files */}
                                    <Stack
                                        direction='column'
                                        w='30%'
                                        spacing='20px'>
                                        <GEEditTypeForm
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                        />
                                        {initials !== null &&
                                        initials.typeOfExaminer ===
                                            'External' ? (
                                            <GEEditPayInfo
                                                values={initials}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        ) : null}

                                        <GEAppointmentUpload
                                            values={initials}
                                            errors={errors}
                                            handleChange={handleChange}
                                            setFieldValue={handleFileChange}
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

export default EditOpponent

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
    .button {
        background: ${({ disabledb }) => (disabledb ? '#f7f9fc' : '#F4797F')};
        width: 126px;
        height: 32px;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        color: ${({ disabledb }) => (disabledb ? '#868fa0' : '#ffffff')};
        font-family: 'Inter';
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

