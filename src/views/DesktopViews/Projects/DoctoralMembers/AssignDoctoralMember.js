import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    InputGroup,
    Input,
    InputLeftElement,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../../components/common/Navigation/Navigation'
import TopBar from '../../../../components/common/Navigation/TopBar'
import { useNavigate, useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'

import { useSelector, useDispatch } from 'react-redux'
import {
    reset,
    allDCMembers,
    assignDCMember,
} from '../../../../store/features/doctoralmembers/doctoralSlice'
import {
    getIndividualProject,
    reset as preset,
} from '../../../../store/features/project/projectSlice'
import DoctoralTable from '../../../../components/ProjectComponents/AssignDoctoralMembers/DoctoralTable'

const AssignDoctoralMember = () => {
     const [filterSearchOption, setFilterSearchOption] = React.useState('All')
     const [searchWord, setSearchWord] = React.useState('')

     const [filterActive, setFilterActive] = React.useState(false)
     const [filterInfo, setFilterInfo] = React.useState([])
     const [projectId, setProjectId] = React.useState('')

     const [selectedExaminers, setSelectedExaminers] = React.useState([])
     const [isSubmittingp, setIsSubmittingp] = React.useState(false)
     const { isOpen, onOpen, onClose } = useDisclosure()
     let dispatch = useDispatch()
     let params = useParams()
     let toast = useToast()
     let { allDCMemberItems, isSuccess, isError, message } = useSelector(
         (state) => state.doctoralMembers
     )
     let IndividualProject = useSelector((state) => state.project)

     const handleSearchInput = (e) => {
         e.preventDefault()
         console.log('e.target', e.target.value)
         let value = e.target.value || ''
         setSearchWord(value.toLowerCase())
         // let filterSelected = {
         //     title: filterSearchOption,
         //     searchfor: e.target.value,
         // }
         // setFilterInfo([...filterInfo, filterSelected])
     }

     const handleSubmitFilter = () => {
         if (searchWord) {
             if (filterInfo.length > 0) {
                 let newFilterInfo = [...filterInfo]

                 for (let i = 0; i < newFilterInfo.length; i++) {
                     let iteration = i + 1

                     if (newFilterInfo[i].title === filterSearchOption) {
                         if (newFilterInfo[i].searchfor.includes(searchWord)) {
                             return null
                         } else {
                             let filterSelected = {
                                 title: filterSearchOption,
                                 searchfor: [
                                     ...newFilterInfo[i].searchfor,
                                     searchWord,
                                 ],
                             }
                             newFilterInfo.splice(i, 1, filterSelected)
                             setFilterInfo(newFilterInfo)
                             setSearchWord('')
                             return filterSelected
                         }
                     } else if (
                         newFilterInfo[i].title !== filterSearchOption &&
                         iteration === newFilterInfo.length
                     ) {
                         let filterSelected = {
                             title: filterSearchOption,
                             searchfor: [searchWord],
                         }

                         setFilterInfo([...newFilterInfo, filterSelected])
                         setSearchWord('')
                     }
                 }
             } else {
                 let filterSelected = {
                     title: filterSearchOption,
                     searchfor: [searchWord],
                 }

                 setFilterInfo([...filterInfo, filterSelected])
                 setSearchWord('')
                 //setFilterSearchOption('All')
                 // console.log('filtered Info', filterInfo)
             }
         }
     }
     let routeNavigate = useNavigate()

     useEffect(() => {
         if (params.pid) {
             setProjectId(params.pid)
             dispatch(getIndividualProject(params.pid))
         }
     }, [])

     useEffect(() => {
         dispatch(allDCMembers())
     }, [])

     useEffect(() => {
         if (isError) {
             toast({
                 position: 'top',
                 title: message,
                 status: 'error',
                 duration: 10000,
                 isClosable: true,
             })
             setIsSubmittingp(false)
             dispatch(reset())
         }

         if (isSuccess && message) {
             toast({
                 position: 'top',
                 title: message.message,
                 status: 'success',
                 duration: 10000,
                 isClosable: true,
             })
             setSelectedExaminers([])
             setIsSubmittingp(false)

             onClose()
             routeNavigate(`/projects/projectreport/${params.pid}`, {
                 replace: true,
             })
             dispatch(reset())
         }

         dispatch(reset())
     }, [isSuccess, isError, message])

     /** handle popup submit */
     const handleAssignSubmit = () => {
         setIsSubmittingp(true)
         let allValues = {
             items: selectedExaminers,
             projectId,
         }
         dispatch(assignDCMember(allValues))
     }
    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>

            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar
                    topbarData={{
                        title: `${
                            IndividualProject.individual !== null &&
                            IndividualProject.individual.student.studentName
                                ? `Selecting Doctoral Committee Member for ${IndividualProject.individual.student.studentName}`
                                : `Examiner Selection`
                        }`,
                        count: null,
                        backButton: true,
                    }}
                />

                <Stack direction='column' padding={'0 20px'}>
                    <Stack
                        h='50px'
                        direction='row'
                        justifyContent='space-between'
                        alignItems={'center'}>
                        {/** filter inputs */}
                        <Stack direction='row'>
                            <Stack
                                direction='row'
                                spacing={'5px'}
                                alignItems='center'>
                                {/** input */}
                                <Box h='32px'>
                                    <InputGroup
                                        minW='340px'
                                        h='32px'
                                        pr='0'
                                        p='0'
                                        m='0'
                                        className='input_group'>
                                        <InputLeftElement h='32px' p='0' m='0'>
                                            <Button
                                                p='0'
                                                m='0'
                                                h='100%'
                                                w='100%'
                                                bg='transparent'
                                                size='28px'>
                                                <BiSearch />
                                            </Button>
                                        </InputLeftElement>
                                        <Input
                                            h='32px'
                                            type='text'
                                            placeholder='Search'
                                            onChange={handleSearchInput}
                                            value={searchWord}
                                            style={{ textIndent: '5px' }}
                                        />
                                    </InputGroup>
                                </Box>
                            </Stack>

                            <Box>
                                <Button
                                    className='search_button'
                                    variant='solid'>
                                    Search
                                </Button>
                            </Box>
                        </Stack>

                        {/**  button */}
                        <Stack direction='row' alignItems={'center'}>
                            <Box>
                                <Button
                                    onClick={() => onOpen()}
                                    disabled={
                                        selectedExaminers.length < 1
                                            ? true
                                            : false
                                    }
                                    className='assign_button'
                                    variant='solid'>
                                    Assign Doctoral Committee Member
                                </Button>
                            </Box>

                            <Box>
                                <Button
                                    onClick={() =>
                                        routeNavigate(
                                            `/projects/doctoralmember/p_create/${projectId}`
                                        )
                                    }
                                    className='add_button'
                                    leftIcon={<AiOutlinePlus />}
                                    colorScheme='red'
                                    variant='solid'>
                                    Add New Member
                                </Button>
                            </Box>
                        </Stack>
                    </Stack>

                    <Stack>
                        <DoctoralTable
                            allExaminerItems={allDCMemberItems}
                            selectedExaminers={selectedExaminers}
                            setSelectedExaminers={setSelectedExaminers}
                        />
                    </Stack>
                </Stack>
            </Stack>

            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
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
                                <Box className='pop_title'>
                                    Assign Committee Member?
                                </Box>

                                <Stack
                                    spacing={'2px'}
                                    direction='row'
                                    className='list_text'>
                                    <p>
                                        Are you sure you want to assign
                                        <span>
                                            {selectedExaminers.map(
                                                (data, index) => (
                                                    <li>
                                                        {data.jobtitle}{' '}
                                                        {data.name}
                                                    </li>
                                                )
                                            )}
                                        </span>
                                        for this project.
                                    </p>
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
                                <Button
                                    variant='outline'
                                    className='cancel_button'
                                    onClick={() => onClose()}>
                                    Cancel
                                </Button>
                                <Button
                                    isLoading={isSubmittingp ? true : false}
                                    className='apply_button'
                                    onClick={handleAssignSubmit}>
                                    Confirm
                                </Button>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default AssignDoctoralMember

const Container = styled(Stack)`
    .assign_button {
        height: 32px;
        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #868fa0;
    }

    .add_button {
        height: 32px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;

        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
    }

    .search_button {
        height: 32px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;

        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;
        color: #868fa0;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 0px 1px rgba(152, 161, 178, 0.1),
        0px 30px 70px -10px rgba(17, 24, 38, 0.25),
        0px 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;

    span {
        margin: 0 5px;
    }

    .pop_title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    .list_text {
        font-family: 'Inter';
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


