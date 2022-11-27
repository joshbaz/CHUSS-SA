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
    paginatedSchool,
} from '../../../store/features/schools/schoolSlice'
import SchoolTable from '../../../components/SchoolComponents/AllSchools/SchoolTable'
import ViewSchoolDetails from '../../../components/SchoolComponents/ViewSchools/ViewSchoolDetails'
import ViewDepartments from '../../../components/SchoolComponents/ViewSchools/ViewDepartments'

const ViewSchool = (props) => {
    const [values, setValues] = React.useState({
        schoolName: '',
        deanName: '',
        deanDesignation: '',
        email: '',
        officeNumber: '',
        departments: [],
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

                console.log('location333', checkItem, params, ...checkItem)
            }
        }
    }, [params, allSchoolItems])

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
                                <Button className='button'>Edit Details</Button>
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
