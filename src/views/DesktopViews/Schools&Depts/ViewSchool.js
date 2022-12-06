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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { GrClose } from 'react-icons/gr'
import { MdArrowBack } from 'react-icons/md'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
    reset,
    allSchools,
    schoolUpdate,
    paginatedSchool,
} from '../../../store/features/schools/schoolSlice'
import SchoolTable from '../../../components/SchoolComponents/AllSchools/SchoolTable'
import ViewSchoolDetails from '../../../components/SchoolComponents/ViewSchools/ViewSchoolDetails'
import ViewDepartments from '../../../components/SchoolComponents/ViewSchools/ViewDepartments'
import EditSchool from './EditSchool'

const ViewSchool = (props) => {
    const [schoolId, setSchoolId] = React.useState('')
    const [values, setValues] = React.useState({
        schoolName: '',
        deanName: '',
        deanDesignation: '',
        email: '',
        officeNumber: '',
        departments: [],
    })
    const [isSubmittingedits, setIsSubmittingedits] = React.useState(false)
    const [changeMade, setChnageMade] = React.useState(false)
    const [editActive, setEditActive] = React.useState(false)
    const [errors, setErrors] = React.useState({})
    const [editValues, setEditValues] = React.useState({
        schoolName: '',
        deanName: '',
        deanDesignation: '',
        email: '',
        officeNumber: '',
    })

    let dispatch = useDispatch()
    let routeNavigate = useNavigate()
    let Location = useLocation()
    let toast = useToast()
    let params = useParams()

    useEffect(() => {
        let page = Location.search.split('').slice(3).join('')
        let values = {
            page: page,
        }
        console.log(page)
        dispatch(allSchools(values))
    }, [Location])

    let { paginatedSchools, allSchoolItems, isSuccess, isError, message } =
        useSelector((state) => state.school)

    useEffect(() => {
        console.log('location', allSchoolItems, params)

        if (allSchoolItems.items.length > 0) {
            let checkItem = allSchoolItems.items.filter(
                (data, index) => data._id === params.id
            )

            if (checkItem.length > 0) {
                setValues(...checkItem)
                setSchoolId(checkItem[0]._id)

                console.log('location333', checkItem, params, ...checkItem)
            }
        }
    }, [params, allSchoolItems])

    const activateEdit = (data) => {
        if (schoolId) {
            setEditValues({
                ...editValues,
                ...values,
                schoolId: schoolId,
            })
            setEditActive(true)
        }
    }

    /** function to de-activate create Departments  */
    const closeEdit = () => {
        setEditValues({
            schoolName: '',
            deanName: '',
            deanDesignation: '',
            email: '',
            officeNumber: '',
            schoolId: '',
        })
        setChnageMade(false)
        setEditActive(false)
    }

    /** function to handleChange */

    const handleEditChange = (e) => {
        e.preventDefault()
        setChnageMade(true)
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value,
        })
    }

    let validate = (values) => {
        const errors = {}
        if (!values.schoolName) {
            errors.schoolName = 'Required'
        }
        if (!values.deanName) {
            errors.deanName = 'Required'
        }
        if (!values.deanDesignation) {
            errors.deanDesignation = 'Required'
        }
        if (!values.officeNumber) {
            errors.officeNumber = 'Required'
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

    const handleEditSubmit = () => {
        setErrors(validate(editValues))
        setIsSubmittingedits(true)
    }

    React.useEffect(() => {
        if (isError) {
            setIsSubmittingedits(false)
            setChnageMade(false)
            dispatch(reset())
        }

        if (isSuccess) {
            if (isSubmittingedits) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })

                setIsSubmittingedits(false)
                setChnageMade(false)
            }
            dispatch(reset())
        }
    }, [isError, isSuccess, message])

    React.useEffect(() => {
        console.log('errors', errors)
        if (
            Object.keys(errors).length === 0 &&
            isSubmittingedits &&
            changeMade
        ) {
            console.log(Object.keys(errors).length, 'No errors', errors)
            let values2 = {
                ...editValues,
                schoolId: editValues._id,
            }
            dispatch(schoolUpdate(values2))
        } else if (
            Object.keys(errors).length > 0 &&
            isSubmittingedits &&
            changeMade
        ) {
            setIsSubmittingedits(false)
            setChnageMade(false)
        }
    }, [errors, isSubmittingedits])

    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar topbarData={{ title: 'View School ', count: null }} />

                <Stack direction='column' padding={'0 20px'}>
                    <Stack
                        direction='column'
                        bg='#FBFBFB'
                        minH='85vh'
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
                                <Text>View School Details</Text>
                            </BackButtonStack>

                            <SubmitButton>
                                <Button
                                    className='button'
                                    onClick={() => activateEdit()}>
                                    Edit Details
                                </Button>
                            </SubmitButton>
                        </Stack>

                        {/** forms */}

                        <Stack direction='column' w='100%'>
                            <Stack direction='column' spacing='40px'>
                                {/** Details & Departments */}
                                <Stack
                                    direction='column'
                                    w='70%'
                                    spacing='20px'>
                                    <ViewSchoolDetails values={values} />
                                </Stack>

                                <Stack
                                    direction='column'
                                    w='100%'
                                    spacing='20px'>
                                    <ViewDepartments indivdualValues={values} />
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>

            {/** edit school  */}
            <Modal w='100vw' isOpen={editActive} p='0' onClose={closeEdit}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />{' '}
                <ModalContent p='0'>
                    {' '}
                    <ModalBody p='0'>
                        {' '}
                        <EditSchool
                            onClose={closeEdit}
                            editValues={editValues}
                            handleChange={handleEditChange}
                            handleEditSubmit={handleEditSubmit}
                            isSubmittingp={isSubmittingedits}
                        />
                    </ModalBody>{' '}
                </ModalContent>{' '}
            </Modal>
        </Container>
    )
}

export default ViewSchool

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    .s_title {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        color: #1a2240;
    }

    .sumbox {
        width: 296.44px;
        height: 93px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
        cursor: pointer;
    }

    .add_button {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #ffffff;
    }
`

const InputStack = styled(Stack)`
    .button {
        min-width: 73px;
        height: 32px;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #ffffff;
        padding: 0px 12px;
    }
`

const AdStack = styled(Stack)`
    color: #838389;
    .ad_icon {
        font-size: 25px;
    }

    .ad_text {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: 600;
        font-size: 17px;
    }
`

const LinksStack = styled(Stack)`
    h1 {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17px;
        line-height: 21px;
        color: #1a2240;
    }

    .link_icon {
        width: 34.88px;
        height: 34.88px;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 6.975px;
    }

    .link_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17.4375px;
        line-height: 21px;
        color: #000000;
    }
`

const StatStack = styled(Stack)``

const FilterInfoStack = styled(Stack)`
    position: relative;
    width: 100%;
    height: 22px;
    padding: 0 8px;
    background: #fceded;
    border-radius: 4px;
    h1 {
        color: #f14c54;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    p {
        color: #15151d;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    .close_icon {
        color: #838389;
        font-size: 12px;
    }
`

const BackButtonStack = styled(Stack)`
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 600;
        font-size: 17px;
        line-height: 20px;
        color: #1a1a24;
        letter-spacing: 0.02em;
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
