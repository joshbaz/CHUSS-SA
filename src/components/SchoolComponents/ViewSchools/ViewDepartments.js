/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Button,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
} from '@chakra-ui/react'
import DepartmentTable from '../../../views/DesktopViews/Schools&Depts/DepartmentTable'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
//import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    departmentCreate,
    departmentUpdate,
    reset,
} from '../../../store/features/schools/schoolSlice'
import CreateDepartment from '../../../views/DesktopViews/Schools&Depts/CreateDepartment'
import ViewIndividualDept from '../../../views/DesktopViews/Schools&Depts/ViewIndividualDept'
import EditIndividualDept from '../../../views/DesktopViews/Schools&Depts/EditIndividualDept'
const ViewDepartments = ({ indivdualValues }) => {
    const [helperFunctions, setHelperFunctions] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)
    const [isSubmittingedits, setIsSubmittingedits] = React.useState(false)

    const [exportData, setExportData] = React.useState([])
    const [changeMade, setChnageMade] = React.useState(false)
    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = React.useState(7)
    const [errors, setErrors] = React.useState({})
    const [allDisplayData, setAllDisplayData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allItems: [],
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })

    const [createActive, setCreateActive] = React.useState(false)
    const [viewActive, setViewActive] = React.useState(false)
    const [editActive, setEditActive] = React.useState(false)

    const [viewValues, setViewValues] = React.useState({
        deptName: '',
        deptHead: '',
        email: '',
        otherEmail: '',
        officeNumber: '',
        mobileNumber: ''
    })

    const [editValues, setEditValues] = React.useState({
        deptName: '',
        deptHead: '',
        email: '',
        otherEmail: '',
        officeNumber: '',
        mobileNumber: '',
    })

    //let routeNavigate = useNavigate()
    let toast = useToast()
    let dispatch = useDispatch()

    const { isError, isSuccess, message } = useSelector((state) => state.school)

    React.useEffect(() => {
        /** initial items  */
        //items collected
        const allItemsCollected = indivdualValues.departments
        //total all items
        const totalItems = indivdualValues.departments.length
        let itemsPerPage = perPage
        const currentPage = 1
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

        const currentItems = allItemsCollected.slice(
            indexOfFirstItem,
            indexOfLastItem
        )

        const pageLength = Math.ceil(totalItems / itemsPerPage)

        setAllDisplayData({
            currentPage: currentPage,
            itemsPerPage: itemsPerPage,
            items: currentItems,
            allItems: indivdualValues.departments,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: totalItems,
            totalPages: pageLength,
        })
        /** export trial */
        // const newExports = allItems.items.map((data, index) => {
        //     return {
        //         _id: data._id,
        //         studentName: data.student.studentName,
        //         studentContacts: data.student.phoneNumber,
        //         topic: data.topic,
        //         status: data.activeStatus,
        //     }
        // })
        // // console.log('newExports', newExports)
        // setExportData(newExports)
    }, [indivdualValues.departments, perPage])

    /** function to activate create Departments  */
    const addDepartment = () => {
        setCreateActive(true)
    }

    /** function to activate create Departments  */
    const activateView = (data) => {
        setViewValues({
            ...viewValues,
            deptName: data.departmentId.deptName,
            deptHead: data.departmentId.deptHead,
            email: data.departmentId.email,
            otherEmail: data.departmentId.otherEmail,
            mobileNumber: data.departmentId.mobileNumber,
            officeNumber: data.departmentId.officeNumber,
        })
        setViewActive(true)
    }

    const activateEdit = (data) => {
        setEditValues({
            ...editValues,
            deptName: data.departmentId.deptName,
            deptHead: data.departmentId.deptHead,
            email: data.departmentId.email,
            otherEmail: data.departmentId.otherEmail,
            officeNumber: data.departmentId.officeNumber,
            mobileNumber: data.departmentId.mobileNumber,
            id: data.departmentId._id,
        })
        setEditActive(true)
    }

    /** function to de-activate create Departments  */
    const closeAddDepartment = () => {
        setCreateActive(false)
    }

    /** function to de-activate create Departments  */
    const closeView = () => {
        setViewValues({
            deptName: '',
            deptHead: '',
            email: '',
            otherEmail: '',
            officeNumber: '',
            mobileNumber: '',
        })
        setViewActive(false)
    }

    /** function to de-activate create Departments  */
    const closeEdit = () => {
        setEditValues({
            deptName: '',
            deptHead: '',
            email: '',
            officeNumber: '',
        })
        setChnageMade(false)
        setEditActive(false)
    }

    /** initial values for departments */
    const initialValues = {
        deptName: '',
        deptHead: '',
        email: '',
        otherEmail: '',
        officeNumber: '',
        mobileNumber: '',
    }

    const validationSchema = yup.object().shape({
        deptName: yup.string().required('required'),
        deptHead: yup.string().required('required'),
        officeNumber: yup.string().required('required'),
        email: yup.string().email('Invalid email').required('required'),
    })

    React.useEffect(() => {
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
            setIsSubmittingedits(false)
            setChnageMade(false)
            dispatch(reset())
        }

        if (isSuccess && message) {
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
                setIsSubmittingedits(false)
                setChnageMade(false)
                setHelperFunctions(null)
            }

            if (isSubmittingedits) {
                toast({
                    position: 'top',
                    title: message.message,
                    status: 'success',
                    duration: 10000,
                    isClosable: true,
                })

                setIsSubmittingp(false)
                setIsSubmittingedits(false)
                setChnageMade(false)
                setHelperFunctions(null)
            }
            dispatch(reset())
        }
    }, [isError, isSuccess, message])

    /** function to handleChange */

    const handleEditChange = (e) => {
        e.preventDefault()
        setChnageMade(true)
        setEditValues({
            ...editValues,
            [e.target.name]: e.target.value,
        })
    }

    /** handle phone change */
     const handleEditPhoneChange = (name, phoneVal) => {
         
         setChnageMade(true)
         setEditValues({
             ...editValues,
             [name]: phoneVal,
         })
     }

    let validate = (values) => {
        const errors = {}
        if (!values.deptName) {
            errors.deptName = 'Required'
        }
        if (!values.deptHead) {
            errors.deptHead = 'Required'
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
        if (
            Object.keys(errors).length === 0 &&
            isSubmittingedits &&
            changeMade
        ) {
            let values2 = {
                ...editValues,
                schoolId: editValues.id,
            }
            dispatch(departmentUpdate(values2))
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
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    className='formtitle'>
                    <Box>
                        <h1>Departments</h1>
                    </Box>

                    {/**  button */}
                    <Box>
                        <Button
                            className='add_button'
                            variant='solid'
                            onClick={addDepartment}>
                            Add Department
                        </Button>
                    </Box>
                </Stack>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Box>
                        <DepartmentTable
                            allDisplayData={allDisplayData}
                            setAllDisplayData={setAllDisplayData}
                            exportData={exportData}
                            setExportData={setExportData}
                            activateView={activateView}
                            activateEdit={activateEdit}
                            schoolName={
                                indivdualValues !== null &&
                                indivdualValues.schoolName
                                    ? indivdualValues.schoolName
                                    : ''
                            }
                            schoolId={
                                indivdualValues !== null && indivdualValues._id
                                    ? indivdualValues._id
                                    : ''
                            }
                        />
                    </Box>
                </Stack>
            </Box>

            <Modal
                w='100vw'
                isOpen={createActive}
                p='0'
                onClose={closeAddDepartment}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />{' '}
                <ModalContent p='0'>
                    {' '}
                    <ModalBody p='0'>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values, helpers) => {
                                setHelperFunctions(helpers)
                                setIsSubmittingp(true)
                                let values2 = {
                                    ...values,
                                    schoolId: indivdualValues._id,
                                }
                                dispatch(departmentCreate(values2))
                            }}>
                            {({
                                values,
                                handleChange,
                                errors,
                                isValid,
                                dirty,
                                touched,
                                isSubmitting,
                                setFieldValue,
                            }) => (
                                <Form>
                                    {' '}
                                    <CreateDepartment
                                        onClose={closeAddDepartment}
                                        values={values}
                                        handleChange={handleChange}
                                        isSubmittingp={isSubmittingp}
                                        setFieldValue={setFieldValue}
                                    />
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>{' '}
                </ModalContent>{' '}
            </Modal>
            {/** view departments */}
            <Modal w='100vw' isOpen={viewActive} p='0' onClose={closeView}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />{' '}
                <ModalContent p='0'>
                    {' '}
                    <ModalBody p='0'>
                        {' '}
                        <ViewIndividualDept
                            onClose={closeView}
                            viewValues={viewValues}
                        />
                    </ModalBody>{' '}
                </ModalContent>{' '}
            </Modal>

            {/** edit departments  */}
            <Modal w='100vw' isOpen={editActive} p='0' onClose={closeEdit}>
                <ModalOverlay w='100vw' overflowY={'visible'} p='0' />{' '}
                <ModalContent p='0'>
                    {' '}
                    <ModalBody p='0'>
                        {' '}
                        <EditIndividualDept
                            onClose={closeEdit}
                            editValues={editValues}
                            handleChange={handleEditChange}
                            handleEditPhoneChange={handleEditPhoneChange}
                            handleEditSubmit={handleEditSubmit}
                            isSubmittingedits={isSubmittingedits}
                        />
                    </ModalBody>{' '}
                </ModalContent>{' '}
            </Modal>
        </FormContainer>
    )
}

export default ViewDepartments

const FormContainer = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;
        min-height: 325px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }
    .formtitle {
        height: 54px;
        width: 100%;
        display: flex;

        align-items: center;
        border-bottom: 1px solid #d1d5db;
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

    .add_button {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: 0.02em;
        color: #ffffff;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        border-radius: 6px;
        width: 139px;
        height: 32px;
    }

    label {
        font-family: 'Inter', sans-serif;
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
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        height: 32px;
        width: 100%;
    }

    .formfields__Dfieldset {
        width: 100%;
    }
`
