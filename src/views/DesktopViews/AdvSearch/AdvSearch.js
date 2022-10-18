import React, { useEffect } from 'react'
import {
    Box,
    Stack,
    Button,
    Select,
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
    useDisclosure,
    Checkbox,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { RiArrowRightSLine, RiArrowDownSLine } from 'react-icons/ri'

import { FaFilter } from 'react-icons/fa'
import { BiSearch } from 'react-icons/bi'
import { CgFormatSlash } from 'react-icons/cg'
import { GrClose } from 'react-icons/gr'
import ProjectTable from '../../../components/ProjectComponents/AllProjects/ProjectTable'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
    getPProjects,
    reset,
} from '../../../store/features/project/projectSlice'
import { MdTableView, MdPrint } from 'react-icons/md'

const dataModels = [
    {
        title: 'Projects',
        models: [
            {
                modelTitle: 'topic',
            },
            {
                modelTitle: 'supervisors',
                type: 'array',
            },
            {
                modelTitle: 'projectStatus',
                type: 'array',
            },
            {
                modelTitle: 'student',
                type: 'object',
                subModel: [
                    {
                        modelTitle: 'registrationNumber',
                    },
                    {
                        modelTitle: 'studentName',
                    },
                    {
                        modelTitle: 'graduate_program_type',
                    },
                    {
                        modelTitle: 'degree_program',
                    },
                    {
                        modelTitle: 'semester',
                    },
                    {
                        modelTitle: 'academicYear',
                    },
                    {
                        modelTitle: 'schoolName',
                    },
                    {
                        modelTitle: 'departmentName',
                    },
                    {
                        modelTitle: 'phoneNumber',
                    },
                    {
                        modelTitle: 'email',
                    },
                    {
                        modelTitle: 'alternative_email',
                    },
                ],
            },
        ],
    },
]

const AdvSearch = () => {
    const [selectedTable, setSelectedTable] = React.useState('')
    const [dropDownActive, setDropDownActive] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Container direction='row' w='100vw'>
            <Box w='72px'>
                <Navigation />
            </Box>
            <Stack direction='column' w='100%' spacing='20px'>
                <TopBar
                    topbarData={{ title: 'Advanced Search ', count: null }}
                />

                <Stack direction='column' padding={'0 20px'}>
                    {/** filter inputs */}
                    <Stack direction='column'>
                        <Stack direction='row' alignItems={'center'}>
                            {/** title */}
                            <Box>{selectedTable}</Box>

                            {/** table selection && print report button */}
                            <Stack direction='row'>
                                <TableButton>
                                    <Button
                                        onClick={() => onOpen()}
                                        className='btn_table'
                                        leftIcon={<MdTableView />}>
                                        Select Table
                                    </Button>
                                </TableButton>

                                {selectedTable && (
                                    <TableButton>
                                        {' '}
                                        <Button
                                            className='btn_table'
                                            leftIcon={<MdTableView />}>
                                            Add Another Table
                                        </Button>
                                    </TableButton>
                                )}
                                <TableButton>
                                    <Button
                                        leftIcon={<MdPrint />}
                                        className='btn__print'>
                                        Print Report
                                    </Button>
                                </TableButton>
                            </Stack>
                        </Stack>

                        {/** Rule section */}
                        <Stack direction='row'>
                            <Box>
                                <Select placeholder='select'></Select>
                            </Box>

                            <Box>
                                <Select placeholder='is'></Select>
                            </Box>

                            <Box>
                                <InputGroup
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
                                        style={{ textIndent: '5px' }}
                                    />
                                </InputGroup>
                            </Box>

                            <TableButton>
                                <Button
                                    leftIcon={<AiOutlinePlus />}
                                    className='btn__rule'>
                                    Add Rule
                                </Button>
                            </TableButton>
                        </Stack>

                        {/** Rule Items */}
                        <FilterInfoStack direction='column'>
                            <Stack
                                spacing='20px'
                                direction='row'
                                alignItems={'center'}>
                                <Box className='close_icon'>
                                    <GrClose />
                                </Box>
                                <Box className='filterTitle'>
                                    <FilterKey
                                        direction='row'
                                        alignItems='center'>
                                        <Box
                                            p='0'
                                            m='0'
                                            color={'#464f60'}
                                            bg='transparent'
                                            size='28px'>
                                            <FaFilter />
                                        </Box>
                                        <Box className='filterKey__text'>
                                            Academic Year
                                        </Box>
                                    </FilterKey>
                                </Box>
                                <Box className='filterOperation'>is</Box>
                                <Stack direction='row'>
                                    <Box className='filterText'>2021/22</Box>
                                </Stack>
                            </Stack>
                        </FilterInfoStack>
                    </Stack>
                </Stack>
            </Stack>

            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <PopupForm p='0px' justifyContent='space-between'>
                            <Stack
                                p='10px 20px 0 20px'
                                direction='row'
                                spacing={'20px'}
                                h='70%'>
                                {dataModels.map((data, index) => {
                                    return (
                                        <ModelStack direction='column'>
                                            <Box title='pop_title'>
                                                {data.title}
                                            </Box>

                                            <Stack direction='column'>
                                                {data.models.length > 0 &&
                                                    data.models.map(
                                                        (modelData, index1) => {
                                                            if (
                                                                modelData.subModel &&
                                                                modelData
                                                                    .subModel
                                                                    .length > 0
                                                            ) {
                                                                return (
                                                                    <Stack
                                                                        direction='column'
                                                                        key={
                                                                            index1
                                                                        }>
                                                                        <Stack
                                                                            onClick={() =>
                                                                                setDropDownActive(
                                                                                    !dropDownActive
                                                                                )
                                                                            }
                                                                            direction='row'
                                                                            alignItems={
                                                                                'center'
                                                                            }>
                                                                            <Box
                                                                                style={{
                                                                                    fontSize:
                                                                                        '21px',
                                                                                }}>
                                                                                {dropDownActive ? (
                                                                                    <RiArrowDownSLine />
                                                                                ) : (
                                                                                    <RiArrowRightSLine />
                                                                                )}
                                                                            </Box>
                                                                            <label>
                                                                                {
                                                                                    modelData.modelTitle
                                                                                }
                                                                            </label>
                                                                        </Stack>

                                                                        {dropDownActive && (
                                                                            <Stack
                                                                                direction='column'
                                                                                padding='0px 30px'>
                                                                                {modelData.subModel.map(
                                                                                    (
                                                                                        subdata,
                                                                                        index2
                                                                                    ) => {
                                                                                        return (
                                                                                            <Stack
                                                                                                direction='row'
                                                                                                key={
                                                                                                    index2
                                                                                                }>
                                                                                                <Checkbox colorScheme='red'>
                                                                                                    {' '}
                                                                                                </Checkbox>
                                                                                                <label>
                                                                                                    {
                                                                                                        subdata.modelTitle
                                                                                                    }
                                                                                                </label>
                                                                                            </Stack>
                                                                                        )
                                                                                    }
                                                                                )}
                                                                            </Stack>
                                                                        )}
                                                                    </Stack>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Stack
                                                                        direction='row'
                                                                        key={
                                                                            index1
                                                                        }>
                                                                        <Checkbox colorScheme='red'>
                                                                            {' '}
                                                                        </Checkbox>
                                                                        <label>
                                                                            {
                                                                                modelData.modelTitle
                                                                            }
                                                                        </label>
                                                                    </Stack>
                                                                )
                                                            }
                                                        }
                                                    )}
                                            </Stack>
                                        </ModelStack>
                                    )
                                })}
                            </Stack>
                            <Stack
                                p='0px 20px'
                                h='48px'
                                bg='#ffffff'
                                direction='row'
                                borderRadius='0 0 8px 8px'
                                justifyContent='flex-end'
                                alignItems='center'>
                                <Box
                                    className='cancel_button'
                                    onClick={() => onClose()}>
                                    Reset
                                </Box>
                                <Box>
                                    <Box className='apply_button'>
                                        {' '}
                                        Apply Filter
                                    </Box>
                                </Box>
                            </Stack>
                        </PopupForm>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default AdvSearch

const Container = styled(Stack)`
    .add_button {
        height: 32px;
        color: #ffffff;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        font-size: 14px;
    }

    .subfilter_button {
        width: inherit;

        text-align: left;
        focus: none;
        border-radius: none !important;
        ::hover {
            background: transparent !important;
        }
    }
    .filter_button {
        background: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px 0px 0px 6px;
    }

    .menu_options {
        .chakra-menu__icon {
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
            background: green;
        }

        .chakra-menu__icon-wrapper {
            color: #fbfbfb;
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
        }

        svg {
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
        }
    }

    .input_group {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;

        &:hover {
            border: 0px solid transparent;
            box-shadow: 0px;
            border-radius: 0px 6px 6px 0px;
        }

        input {
            border: 0px solid transparent;
        }

        background: #ffffff;
    }

    select {
        height: 32px;
        min-width: 103px;
    }
`

const TableButton = styled(Box)`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300 !important;
    font-size: 14px;
    line-height: 20px;
    .btn_table {
        height: 32px;
        color: #464f60;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
    }

    .btn__print {
        height: 32px;
        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        letter-spacing: 0.02em;
        color: #868fa0;
    }

    .btn__rule {
        height: 32px;
        background: #20202a;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #33333c;
        border-radius: 6px;
        color: #ffffff;
    }
`

const FilterInfoStack = styled(Stack)`
    h1 {
        color: #f14c54;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    p {
        color: #15151d;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 18px;
    }

    .close_icon {
        color: #838389;
        font-size: 12px;
    }
    .filterTitle {
        min-width: 152px;
    }

    .filterOperation {
        background: #fceded;
        border-radius: 4px;
        padding: 2px 8px;
        gap: 4px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #15151d;
        letter-spacing: 0.03em;
    }

    .filterText {
        background: #fceded;
        border-radius: 4px;
        padding: 2px 8px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #15151d;
        letter-spacing: 0.03em;
    }
`
const FilterKey = styled(Stack)`
    min-width: 152px;

    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
        0px 0px 0px 1px rgba(134, 143, 160, 0.16);
    border-radius: 6px;
    padding: 7px 10px;

    .filterKey__text {
        color: #464f60;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }
`

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 217px;
    background: #fbfbfb;
    border-radius: 8px;

    span {
        color: #ed1f29;
    }

    input {
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
        text-indent: 10px;

        ::placeholder {
            color: #a1a9b8;
        }
    }

    .cancel_button {
        width: 64px;
        height: 24px;
        color: #abaaaf;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .apply_button {
        width: 100%;
        height: 24px;
        color: #f14c54;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`

const ModelStack = styled(Stack)`
    .pop_title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;
    }
`
