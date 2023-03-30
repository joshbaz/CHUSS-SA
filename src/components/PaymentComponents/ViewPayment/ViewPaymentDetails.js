/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Text,
    Input,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Button,
    useToast,
} from '@chakra-ui/react'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { FiCheck } from 'react-icons/fi'
import {
    updatePayment,
    reset,
} from '../../../store/features/payments/paymentSlice'

const ViewPaymentDetails = ({ values = null, projectValues }) => {
    const [projectId, setProjectId] = React.useState(null)
    const [payInfo, setPayInfo] = React.useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [changeMade, setChangeMade] = React.useState(false)
    const [activeStatusE, setActiveStatus] = React.useState(null)
    const [activeDataStatus, setActiveDataStatus] = React.useState('')
    const [newActiveStatus, setNewActiveStatus] = React.useState({
        payStatus: '',
    })

    const [projectTagData, setProjectTagData] = React.useState([
        { tagName: 'pending' },
        { tagName: 'paid' },
    ])
    const [errors, setErrors] = React.useState({})
    let { isLoading, isSuccess, isError, message } = useSelector(
        (state) => state.payment
    )
    let toast = useToast()
    let dispatch = useDispatch()

    React.useEffect(() => {
        if (values !== null && values._id) {
            setProjectId(values._id)
            setActiveStatus({
                tagName: values.payStatus,
            })
        }
    }, [values])
    useEffect(() => {
        if (values !== null) {
            if (values.examiner) {
                if (values.examiner.paymentInfo.length > 0) {
                    values.project.examiners.find((element) => {
                        if (element.examinerId === values.examiner._id) {
                            values.examiner.paymentInfo.find((element2) => {
                                if (
                                    element2.preferredPayment ===
                                    element.preferredPayment
                                ) {
                                    setPayInfo(element2)
                                }
                            })
                        }
                    })
                }
            } else {
                if (values.opponent.paymentInfo.length > 0) {
                    values.project.opponents.find((element) => {
                        if (element.opponentId === values.opponent._id) {
                            values.opponent.paymentInfo.find((element2) => {
                                if (
                                    element2.preferredPayment ===
                                    element.preferredPayment
                                ) {
                                    setPayInfo(element2)
                                }
                            })
                        }
                    })
                }
            }
        }
    }, [values])

    React.useEffect(() => {
        if (isError && isSubmittingp) {
            // toast({
            //     position: 'top',
            //     title: message.message,
            //     status: 'error',
            //     duration: 10000,
            //     isClosable: true,
            // })
            setIsSubmittingp(false)
            setChangeMade(false)

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
            setChangeMade(false)
            onClose()
            dispatch(reset())
        }
        dispatch(reset())
    }, [isError, isSuccess, message, dispatch])

    /** submittion of the changes */
    React.useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmittingp && changeMade) {
            dispatch(
                updatePayment({
                    ...newActiveStatus,
                    _id: projectId,
                })
            )
            //setIsSubmittingp(false)
        }

        if (Object.keys(errors).length > 0 && isSubmittingp && changeMade) {
            setIsSubmittingp(false)
            setChangeMade(false)
        }
    }, [isSubmittingp])

    const statusUpdateChange = (data, type) => {
        if (type === 'status') {
            setIsSubmittingp(false)
            setChangeMade(true)
            setNewActiveStatus({
                payStatus: data.tagName,
            })
        }
    }

    const statusNotesUpdate = (e) => {
        e.preventDefault()
        setIsSubmittingp(false)
        setChangeMade(true)
        setNewActiveStatus({
            ...newActiveStatus,
            notes: e.target.value,
        })
    }

    let validate = (valuess) => {
        const errors = {}
        if (!valuess.payStatus) {
            errors.payStatus = ' required'
        }

        return errors
    }

    /**
     * function to submit change to server
     */

    const statusSubmitChange = (e) => {
        e.preventDefault()
        setErrors(validate(newActiveStatus))
        setIsSubmittingp(true)
    }

    /**
     * function to cancel submit change
     */

    const cancelStatusChange = () => {
        setNewActiveStatus(activeDataStatus)

        setChangeMade(false)
        setIsSubmittingp(false)
        onClose()
    }

    return (
        <Container>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>Payment Details</h1>
                    </Box>

                    <Stack
                        className='status_dropdown'
                        direction='row'
                        alignItems='center'>
                        <h5>Current Pay Status</h5>

                        <Stack direction='row' alignItems='center'>
                            <StatusItem
                                minW='90px'
                                className={
                                    activeStatusE !== null &&
                                    activeStatusE.tagName
                                        ? activeStatusE.tagName.toLowerCase()
                                        : ''
                                }
                                direction='row'
                                alignItems='center'>
                                <div />
                                <Text>
                                    {activeStatusE !== null &&
                                    activeStatusE.tagName
                                        ? activeStatusE.tagName
                                        : ''}
                                </Text>
                            </StatusItem>
                            <Box onClick={onOpen}>
                                <MdKeyboardArrowDown />
                            </Box>
                        </Stack>
                    </Stack>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing='15px'
                        borderBottom='1px solid #EEEEEF'
                        pb='25px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Transaction amount </Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={
                                    payInfo !== null && payInfo.preferredPayment
                                }
                            />
                        </Box>
                    </Stack>

                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing='15px'
                        pt='20px'>
                        <label htmlFor='phone'>
                            <Stack
                                direction={'row'}
                                alignItems='flex-start'
                                spacing='8px'>
                                <Text>Prefereed payment </Text>
                            </Stack>
                        </label>

                        <Box className='form_input'>
                            <Input
                                readOnly
                                value={
                                    payInfo !== null && payInfo.preferredPayment
                                }
                            />
                        </Box>
                    </Stack>

                    {payInfo !== null &&
                    payInfo.preferredPayment === 'mobileMoney' ? (
                        <>
                            {' '}
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Network Operator</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileOperator
                                                ? payInfo.mobileOperator
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Subscriber's Name</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileSubscriberName
                                                ? payInfo.mobileSubscriberName
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Mobile Number</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.mobileNumber
                                                ? payInfo.mobileNumber
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                        </>
                    ) : (
                        <>
                            {' '}
                            <Stack direction='row' width='100%'>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>Bank</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null && payInfo.bank
                                                    ? payInfo.bank
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>A/C Holder Name</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.AccountName
                                                    ? payInfo.AccountName
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction='row' width='100%'>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>A/C Number</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.AccountNumber
                                                    ? payInfo.AccountNumber
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>SWIFT/BIC Code</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.swift_bicCode
                                                    ? payInfo.swift_bicCode
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack direction='row' width='100%'>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>Bank Code</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.bankCode
                                                    ? payInfo.bankCode
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                                <Stack
                                    width='100%'
                                    direction='row'
                                    alignItems='center'
                                    spacing='15px'>
                                    <label htmlFor='phone'>
                                        <Stack
                                            direction={'row'}
                                            alignItems='flex-start'
                                            spacing='8px'>
                                            <Text>Branch Code</Text>
                                        </Stack>
                                    </label>

                                    <Box className='form_input'>
                                        <Input
                                            readOnly
                                            value={
                                                payInfo !== null &&
                                                payInfo.branchCode
                                                    ? payInfo.branchCode
                                                    : ''
                                            }
                                        />
                                    </Box>
                                </Stack>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank Address</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null &&
                                            payInfo.bankAddress
                                                ? payInfo.bankAddress
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                            <Stack
                                direction='row'
                                alignItems='center'
                                spacing='15px'>
                                <label htmlFor='phone'>
                                    <Stack
                                        direction={'row'}
                                        alignItems='flex-start'
                                        spacing='8px'>
                                        <Text>Bank City</Text>
                                    </Stack>
                                </label>

                                <Box className='form_input'>
                                    <Input
                                        readOnly
                                        value={
                                            payInfo !== null && payInfo.bankCity
                                                ? payInfo.bankCity
                                                : ''
                                        }
                                    />
                                </Box>
                            </Stack>
                        </>
                    )}
                </Stack>
            </Box>

            <Modal w='100vw' isOpen={isOpen} p='0' onClose={cancelStatusChange}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />
                <ModalContent p='0'>
                    <ModalBody p='0'>
                        <form onSubmit={statusSubmitChange}>
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
                                        Change Status
                                    </Box>

                                    <Stack direction='column'>
                                        <Stack>
                                            <label>
                                                Status <span>*</span>
                                            </label>

                                            <Stack
                                                direction='column'
                                                spacing='10px'>
                                                {projectTagData.length > 0 ? (
                                                    <>
                                                        {' '}
                                                        {projectTagData.map(
                                                            (data, index) => {
                                                                return (
                                                                    <StatusChangeItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        onClick={() =>
                                                                            statusUpdateChange(
                                                                                data,
                                                                                'status'
                                                                            )
                                                                        }
                                                                        bg='gray'
                                                                        color='#ffffff'
                                                                        minW='90px'
                                                                        h='28px'
                                                                        direction='row'
                                                                        justifyContent='space-between'
                                                                        alignItems='center'>
                                                                        <Stack
                                                                            direction='row'
                                                                            alignItems='center'>
                                                                            <div
                                                                                className={`colorcontainer ${
                                                                                    data.tagName
                                                                                        ? data.tagName.toLowerCase()
                                                                                        : ''
                                                                                }`}
                                                                            />
                                                                            <Text>
                                                                                {
                                                                                    data.tagName
                                                                                }
                                                                            </Text>
                                                                        </Stack>

                                                                        {newActiveStatus.payStatus ===
                                                                        data.tagName ? (
                                                                            <Box color='#ffffff'>
                                                                                <FiCheck />
                                                                            </Box>
                                                                        ) : null}
                                                                    </StatusChangeItem>
                                                                )
                                                            }
                                                        )}{' '}
                                                    </>
                                                ) : null}
                                            </Stack>
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
                                        onClick={cancelStatusChange}>
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={
                                            isSubmittingp || !changeMade
                                                ? true
                                                : false
                                        }
                                        type='submit'
                                        isLoading={isSubmittingp ? true : false}
                                        className='apply_button'>
                                        Confirm
                                    </Button>
                                </Stack>
                            </PopupForm>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default ViewPaymentDetails

const Container = styled(Box)`
    font-family: 'Inter';

    .form_container {
        width: 100%;
        min-height: 275px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #ebeefa;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .s_name {
        color: #20202a;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 21px;
        line-height: 20px;
    }

    label {
        width: 91px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
        }
    }

    textarea {
        background: #fefaf2;
        border-radius: 6px;
        width: 100%;
        height: 79px;
        padding: 7px 15px;

        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: #171c26;
    }

    .paid {
        color: #14804a !important;
        background: #e1fcef !important;

        div {
            background: #38a06c;
        }
    }

    .pending {
        color: #faa723 !important;
        background: #ffedef !important;

        div {
            background: #faa723;
        }
    }

    .form_input {
        width: 100%;
        input {
            width: 100%;
        }
    }

    #SRN {
        height: 40px;
    }

    .form_subtitle {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 20px;
        color: #f14c54;
        letter-spacing: 0.02em;
    }

    input {
        background: #fefaf2;
        border-radius: 6px;

        height: 32px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }
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
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 28px;
        color: #464f60;
        letter-spacing: 0.02em;
    }

    .list_text {
        font-family: 'Inter', sans-serif;
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

const StatusChangeItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};
    cursor: pointer;
    .colorcontainer {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
    }

    :hover {
        color: #ffffff;
        background: #f8a5a9;
    }
`

const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};

    div {
        border-radius: 2px;
        width: 6px;
        height: 6px;
        background: ${({ tcolors }) => tcolors};
    }
    p {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.03em;
        text-transform: capitalize;
        color: ${({ tcolors }) => tcolors};
    }
`
