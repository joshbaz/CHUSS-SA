/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Stack, Input, Select, useToast } from '@chakra-ui/react'
import {
    allSchools,
    reset,
} from '../../../../store/features/schools/schoolSlice'
import { useDispatch, useSelector } from 'react-redux'

const StudentDetailForm = ({
    values,
    handleChange,
    errors,
    programData,
    setFieldValue,
}) => {
    const [departments, setDepartments] = React.useState([])
    let dispatch = useDispatch()
    let toast = useToast()
    useEffect(() => {
        dispatch(allSchools())
    }, [])

    let { allSchoolItems, isError, message } = useSelector(
        (state) => state.school
    )

    const handleSchoolChange = (e) => {
        e.preventDefault()

        if (e.target.value) {
            let findSchool = allSchoolItems.items.find(
                (element) => element._id === e.target.value
            )

            //console.log('finding', findSchool)
            if (findSchool) {
                setFieldValue('schoolName', findSchool.schoolName)
                setFieldValue('departmentName', '')
                setDepartments(findSchool.departments)
            }
        } else {
            // console.log('looking at perspective')
            setFieldValue('schoolName', '')
            setFieldValue('departmentName', '')
        }
    }

    // console.log('finding', values.schoolName)

    const handleDepartmentChange = (e) => {
        e.preventDefault()

        if (e.target.value) {
            let findDepartment = departments.find(
                (element) => element.departmentId.deptName === e.target.value
            )

            if (findDepartment) {
                setFieldValue(
                    'departmentName',
                    findDepartment.departmentId.deptName
                )
            }
        } else {
            setFieldValue('departmentName', '')
        }
    }

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, dispatch])

    return (
        <FormContainer>
            <Box className='form_container'>
                {/** form title */}
                <Box className='formtitle'>
                    <h1>Student Details</h1>
                </Box>

                <Stack
                    p='25px 20px'
                    direction='column'
                    className='formfields'
                    alignItems='space-between'
                    spacing='15px'
                    h='100%'>
                    <Stack direction='row' className=''>
                        <Stack
                            direction='column'
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Student Registration Number <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    className={
                                        errors && errors.registrationNumber
                                            ? 'input_error'
                                            : ''
                                    }
                                    variant='outline'
                                    type='text'
                                    value={values.registrationNumber}
                                    name='registrationNumber'
                                    onChange={handleChange}
                                    placeholder={'[YEAR]/[CODE]/[ID]'}
                                />
                                {errors && errors.registrationNumber ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.registrationNumber}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Name <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    className={
                                        errors && errors.studentName
                                            ? 'input_error'
                                            : ''
                                    }
                                    value={values.studentName}
                                    name='studentName'
                                    onChange={handleChange}
                                    placeholder={'Lastname, Firstname'}
                                />
                                {errors && errors.studentName ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.studentName}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Stack>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Graduate Program Type <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    readOnly
                                    placeholder='select option'
                                    name='programType'
                                    value={values.programType}>
                                    {programData !== null ? (
                                        <>
                                            {programData.map((data, index) => {
                                                return (
                                                    <option
                                                        key={data._id}
                                                        value={
                                                            data.programName
                                                        }>
                                                        {data.programName}
                                                    </option>
                                                )
                                            })}
                                        </>
                                    ) : null}
                                </Select>

                                {errors && errors.programName ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.programName}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>
                                Degree Program <span>*</span>
                            </label>
                            <fieldset>
                                <Input
                                    type='text'
                                    className={
                                        errors && errors.degreeProgram
                                            ? 'input_error'
                                            : ''
                                    }
                                    value={values.degreeProgram}
                                    name='degreeProgram'
                                    onChange={handleChange}
                                    placeholder='i.e Ma in Public Science'
                                />

                                {errors && errors.degreeProgram ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.degreeProgram}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    <Stack direction='row' w='100%'>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                School Name <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    color={
                                        values.schoolName ? 'black' : 'gray.400'
                                    }
                                    placeholder='i.e Select School '
                                    onChange={handleSchoolChange}>
                                    {allSchoolItems.items.map((data) => {
                                        return (
                                            <option
                                                key={data._id}
                                                value={data._id}>
                                                {data.schoolName}
                                            </option>
                                        )
                                    })}
                                </Select>
                                {errors && errors.schoolName ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.schoolName}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Department Name <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    color={
                                        values.departmentName
                                            ? 'black'
                                            : 'gray.400'
                                    }
                                    placeholder='i.e Select Department '
                                    onChange={handleDepartmentChange}
                                    value={values.departmentName}>
                                    {departments.map((data, index) => {
                                        return (
                                            <option
                                                key={data._id}
                                                value={
                                                    data.departmentId.deptName
                                                }>
                                                {data.departmentId.deptName}
                                            </option>
                                        )
                                    })}
                                </Select>
                                {errors && errors.departmentName ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.departmentName}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Stack>

                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>Topic</label>
                            <fieldset>
                                <Input
                                    type='text'
                                    className={
                                        errors && errors.Topic
                                            ? 'input_error'
                                            : ''
                                    }
                                    value={values.Topic}
                                    name='Topic'
                                    onChange={handleChange}
                                    placeholder='i.e Uganda Refugee Policy and Food Policy'
                                />

                                {errors && errors.Topic ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.Topic}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </FormContainer>
    )
}

export default StudentDetailForm

const FormContainer = styled(Box)`
    font-family: Inter;

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
        justify-content: center;
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
        background: #ffffff;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 6px;
        border-width: 0.01px;
        height: 32px;
        width: 100%;
    }

    .formfields__Dfieldset {
        width: 100%;
    }

    .input_error {
        border-color: red !important;
        box-shadow: none;
    }
`

const ErrorMsg = styled(Box)`
    font-size: 13px;
    line-height: 20px;
    padding: 5px 10px;
    color: #f14c54;
    font-family: 'Inter', sans-serif;

    .filesError {
        padding: 0;
    }
`
