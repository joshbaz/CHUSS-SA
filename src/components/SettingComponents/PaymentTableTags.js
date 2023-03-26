import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useToast,
} from '@chakra-ui/react'
import { HiPencil } from 'react-icons/hi'
import { ImBin2 } from 'react-icons/im'
import { AiOutlinePlus } from 'react-icons/ai'
import { useSelector, useDispatch } from 'react-redux'
import { reset, tagCreate, tagUpdate } from '../../store/features/tags/tagSlice'
import { SketchPicker } from 'react-color'
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const PaymentTableTags = ({ allTagData }) => {
    const TableHead = [
        {
            title: 'color',
            width: '20%',
        },
        {
            title: 'Label Name',
            width: '60%',
        },
        {
            title: 'Activities',
            width: '30%',
        },
    ]

    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [colorPicked, setColorPicked] = React.useState({ hex: '' })
    const [projectTagData, setProjectTagData] = React.useState([])
    const [helperFunctions, setHelperFunctions] = React.useState(null)

    const [editActive, setEditActive] = React.useState(false)
    const [editDetails, setEditDetails] = React.useState(null)
    let dispatch = useDispatch()
    let toast = useToast()

    const handleColorPicked = (color, setFieldValue) => {
        let rgba = `rbga(${color.rgb.r},${color.rgb.g},${color.rgb.b}, 0.34)`
        let hex = color.hex
        setColorPicked(color)
        setFieldValue('rgba', rgba)
        setFieldValue('hex', hex)
        setFieldValue('fullColor', color)
    }

    const validationSchema = yup.object().shape({
        tagName: yup.string().required('tagName is required'),
        rgba: yup.string().required('please select a color'),
        hex: yup.string().required('color missing too'),
    })

    useEffect(() => {
        let allInfoData = allTagData.filter(
            (data, index) => data.table === 'payment'
        )

        setProjectTagData(allInfoData)
    }, [allTagData])

    const { isError, isSuccess, message } = useSelector((state) => state.tag)
    useEffect(() => {
        if (isError) {
            if (helperFunctions !== null) {
                helperFunctions.setSubmitting(false)
            }
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

        if (isSuccess) {
            if (helperFunctions !== null) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })
                helperFunctions.resetForm()
                helperFunctions.setSubmitting(false)
                setIsSubmittingp(false)
                setEditActive(false)
                setEditDetails(null)
                onClose()
                setHelperFunctions(null)
            }
            dispatch(reset())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, isSuccess, message, dispatch])

    const ActivateEdit = (dataSelect) => {
        setEditDetails(dataSelect)
        setEditActive(true)
    }
    const DeactivateEdit = () => {
        setEditActive(false)
        setEditDetails(null)
    }
    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    direction='row'
                    alignItems='center'
                    className='titleWrap'>
                    <Box className='formtitle'>
                        <h1>Payment Table</h1>
                    </Box>

                    <Stack direction='row' alignItems='center' spacing='10px'>
                        <Button
                            onClick={() => onOpen()}
                            className='add_buttons'
                            h='27px'
                            fontSize={'14px'}
                            lineHeight='0px'
                            leftIcon={<AiOutlinePlus />}
                            colorScheme='red'
                            variant='solid'>
                            New Tag
                        </Button>
                    </Stack>
                </Stack>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    minH='310px'
                    h='100%'>
                    {/** table */}

                    <Box>
                        <Table variant=''>
                            <Thead>
                                <Tr>
                                    {TableHead.map((data, index) => {
                                        return (
                                            <Th
                                                key={index}
                                                width={data.width}
                                                className={`table_head ${data.title}`}>
                                                <Stack
                                                    className={`${data.title}`}
                                                    width='100%'
                                                    direction='row'
                                                    alignItems={'center'}>
                                                    <Text>{data.title}</Text>
                                                </Stack>
                                            </Th>
                                        )
                                    })}
                                </Tr>
                            </Thead>
                            {projectTagData.length > 0 ? (
                                <Tbody className='tableItems'>
                                    {projectTagData.map((data, index) => {
                                        return (
                                            <Tr
                                                w='100%'
                                                borderBottom='0px solid red'
                                                className='tableItems_row'>
                                                <Td width='20%'>
                                                    <Box>
                                                        <ColorDiv
                                                            bgcolor={data.hex}
                                                        />
                                                    </Box>
                                                </Td>

                                                <Td width='60%'>
                                                    {' '}
                                                    <Box w='100%'>
                                                        <fieldset>
                                                            <Input
                                                                type='text'
                                                                name='tagName'
                                                                value={
                                                                    data.tagName
                                                                }
                                                                readOnly
                                                            />
                                                        </fieldset>
                                                    </Box>
                                                </Td>
                                                <Td width='30%'>
                                                    <Box
                                                        display='flex'
                                                        justifyContent={
                                                            'center'
                                                        }>
                                                        <Stack
                                                            direction='row'
                                                            alignItems='center'>
                                                            <EditIcon>
                                                                <ImBin2 />
                                                            </EditIcon>
                                                            <EditIcon
                                                                onClick={() =>
                                                                    ActivateEdit(
                                                                        data
                                                                    )
                                                                }>
                                                                <HiPencil />
                                                            </EditIcon>
                                                        </Stack>
                                                    </Box>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            ) : (
                                <Tbody>
                                    {' '}
                                    <Tr
                                        position='relative'
                                        h='48px'
                                        borderTop={'1px solid #E1FCEF'}
                                        borderBottom={'1px solid #E1FCEF'}>
                                        <Box>
                                            <NoItems>No Tags Found</NoItems>
                                        </Box>
                                    </Tr>
                                </Tbody>
                            )}
                        </Table>
                    </Box>
                </Stack>
            </Box>

            {/** create modal */}
            <Modal w='100vw' isOpen={isOpen} p='0' onClose={onClose}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                table: 'payment',
                                tagName: '',
                                rgba: '',
                                hex: '',
                                fullColor: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)
                                dispatch(tagCreate(values))
                            }}>
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                isValid,
                                dirty,
                            }) => (
                                <Form>
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
                                                Create New Tag
                                            </Box>

                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Tag name <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.tagName
                                                            }
                                                            name='tagName'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e In Review'
                                                            }
                                                        />
                                                    </fieldset>
                                                </Stack>
                                            </Stack>

                                            <Stack
                                                direction='column'
                                                width='100%'
                                                h='100%'>
                                                <Stack width='100%'>
                                                    <label>
                                                        Tag color <span>*</span>
                                                    </label>

                                                    <Box
                                                        width='100%'
                                                        display='flex'
                                                        minH='450px'
                                                        height='100%'>
                                                        <SketchPicker
                                                            color={
                                                                colorPicked.rgb
                                                            }
                                                            onChange={(color) =>
                                                                handleColorPicked(
                                                                    color,
                                                                    setFieldValue
                                                                )
                                                            }
                                                            width='100%'
                                                            height='100%'
                                                            padding='0'
                                                            presetColors={[
                                                                '#C97A20',
                                                                '#38A06C',
                                                                '#EF5466',
                                                            ]}
                                                        />
                                                    </Box>
                                                </Stack>
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
                                                disabled={!(isValid && dirty)}
                                                type='submit'
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/** edit modal */}
            <Modal w='100vw' isOpen={editActive} p='0' onClose={DeactivateEdit}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <Formik
                            initialValues={{
                                ...editDetails,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)

                                dispatch(tagUpdate(values))
                            }}>
                            {({
                                values,
                                handleChange,
                                setFieldValue,
                                isValid,
                                dirty,
                            }) => (
                                <Form>
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
                                                Edit {editDetails.tagName} Tag
                                            </Box>

                                            <Stack direction='column'>
                                                <Stack>
                                                    <label>
                                                        Tag name <span>*</span>
                                                    </label>

                                                    <fieldset>
                                                        <Input
                                                            type='text'
                                                            value={
                                                                values.tagName
                                                            }
                                                            name='tagName'
                                                            onChange={
                                                                handleChange
                                                            }
                                                            placeholder={
                                                                'i.e In Review'
                                                            }
                                                        />
                                                    </fieldset>
                                                </Stack>
                                            </Stack>

                                            <Stack
                                                direction='column'
                                                width='100%'
                                                h='100%'>
                                                <Stack width='100%'>
                                                    <label>
                                                        Tag color <span>*</span>
                                                    </label>

                                                    <Box
                                                        width='100%'
                                                        display='flex'
                                                        minH='450px'
                                                        height='100%'>
                                                        <SketchPicker
                                                            color={values.hex}
                                                            onChange={(color) =>
                                                                handleColorPicked(
                                                                    color,
                                                                    setFieldValue
                                                                )
                                                            }
                                                            width='100%'
                                                            height='100%'
                                                            padding='0'
                                                            presetColors={[
                                                                '#C97A20',
                                                                '#38A06C',
                                                                '#EF5466',
                                                            ]}
                                                        />
                                                    </Box>
                                                </Stack>
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
                                                onClick={() =>
                                                    DeactivateEdit()
                                                }>
                                                Cancel
                                            </Button>
                                            <Button
                                                disabled={!(isValid && dirty)}
                                                type='submit'
                                                isLoading={
                                                    isSubmittingp ? true : false
                                                }
                                                className='apply_button'>
                                                Confirm
                                            </Button>
                                        </Stack>
                                    </PopupForm>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </FormContainer>
    )
}

export default PaymentTableTags

const FormContainer = styled(Box)`
    font-family: Inter;

    .form_container {
        width: 100%;
        min-height: 243px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .titleWrap {
        height: 54px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #d1d5db;
        padding: 0 30px;
    }
    .formtitle {
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #1a2240;
        }
    }

    label {
        font-family: Inter;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #464f60;
        letter-spacing: 0.02em;

        span {
            color: #ed1f29;
        }
    }

    input {
        background: #fefaf2;
        border: 0px;
        border-radius: 6px;
        height: 32px;
        width: 100%;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    thead {
        background: transparent;
    }

    .table_head {
        color: #abaaaf !important;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        height: 34px;
        border: 0px;
    }

    .Activities {
        justify-content: center;
    }

    .add_buttons {
        background: #f4797f;
    }

    .view_button {
        background: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        color: #464f60;
    }
`

const ColorDiv = styled(Box)`
    background: ${({ bgcolor }) => bgcolor};
    border-radius: 6px;
    width: 32px;
    height: 32px;
`

const EditIcon = styled(Box)`
    width: 24px;
    height: 24px;
    background: #eeeeef;
    border: 1px dashed #f4797f;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #464f60;
    font-size: 14px;
`

const PopupForm = styled(Stack)`
    width: 100%;
    min-height: 182px;
    height: 100%;
    background: #fbfbfb;
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

const NoItems = styled(Box)`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`
