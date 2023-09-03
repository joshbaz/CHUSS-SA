/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Box, Stack, Input, Select, useToast } from '@chakra-ui/react'
import {
    allSchools,
    reset,
} from '../../../../store/features/schools/schoolSlice'
import { useDispatch, useSelector } from 'react-redux'

const PhdDegreePrograms = [
    {
        title: 'PhD in Literature',
    },
    {
        title: 'Phd in History',
    },

    {
        title: 'Phd in Archiology',
    },
    {
        title: 'Phd in Linguistics',
    },
    {
        title: 'Phd in Sociology',
    },
    {
        title: 'Phd in Anthrology',
    },
    {
        title: 'Phd in Political Science',
    },
    {
        title: 'Phd in African Languages',
    },
    {
        title: 'Phd in Social Studies',
    },
    {
        title: 'Phd in Gender Studies',
    },
    {
        title: 'Phd in Social work and Social Administration',
    },
    {
        title: 'Phd in Journalism and Communications',
    },
    {
        title: 'Phd in Psychology',
    },
    {
        title: 'Phd in Philosophy',
    },
    {
        title: 'Phd in Development Studies',
    },
    {
        title: 'Phd in Human Rights',
    },
    {
        title: 'Phd in Religious Studies',
    },
    {
        title: 'Phd in Public Administration',
    },
    {
        title: 'Phd in European and Oriental Studies',
    },
]

const MaDegreePrograms = [
    { title: 'Master of Arts in Gender Studies' },
    { title: 'Master of Arts in Human Rights' },
    { title: 'Master of Arts in Philosophy ' },
    { title: 'Master of Arts in Philosophy in Applied Ethics' },
    { title: 'Master of Arts in History' },
    { title: 'Master of Arts in Music' },
    { title: 'Master of Arts in Peace and Conflict Studies' },
    { title: 'Master of Arts in Religious and Theological Studies(ggaba)' },
    {
        title: 'Master of Arts in Religious and Theological Studies(kinyamasika)',
    },
    { title: 'Master of Arts in Development Studies' },
    { title: 'Master of Arts in Literature' },
    { title: 'Master of Arts in French Language Studies' },
    { title: 'Master of Arts in Journalism and Communication' },
    { title: 'Master of Arts in Strategic and Corporate Communication' },
    { title: 'Master of Arts in Journalism and Multimedia' },
    { title: 'Master of Arts in African Languages' },
    { title: 'Master of Arts in Linguistics' },
    { title: 'Master of Arts in Public Administration and Management' },
    { title: 'Master of Arts in Sociology' },
    {
        title: 'Master of Arts in International Relations and Diplomatic Studies',
    },
    { title: 'Master of Arts in Rural Development' },
    { title: 'Master of Arts in Social Work' },
    { title: 'Master ofArts in Defense and Security Studies' },
    { title: 'Master of Arts in Security and Strategy' },
    { title: 'Master of Education in Educational Psychology' },
    { title: 'Master of Arts in Organizational Psychology' },
    { title: 'Master of Arts in Counselling' },
    { title: 'Master of Science in Clinical Psychology' },
    { title: 'Master of Arts in Social Sector Planning and Management' },
]

const StudentDetailForm = ({
    values,
    handleChange,
    errors,
    programData,
    setFieldValue,
    degreetype,
}) => {
    const [departments, setDepartments] = React.useState([])
    const [allDegreeProgram, setAllDegreeProgram] = React.useState([])

    let dispatch = useDispatch()
    let toast = useToast()
    useEffect(() => {
        dispatch(allSchools())
    }, [])

    let { allSchoolItems, isError, message } = useSelector(
        (state) => state.school
    )

    React.useEffect(() => {
        if (degreetype === 'Phd') {
            setAllDegreeProgram(() => PhdDegreePrograms)
        } else {
            setAllDegreeProgram(() => MaDegreePrograms)
        }
    }, [degreetype])

    const handleSchoolChange = (e) => {
        e.preventDefault()

        if (e.target.value) {
            let findSchool = allSchoolItems.items.find(
                (element) => element.schoolName === e.target.value
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
                    {/** graduate program && gender */}
                    <Stack direction='row' w='100%'>
                        {/** gender */}
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
                            <label>
                                Gender <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                    onChange={handleChange}
                                    placeholder='select gender'
                                    name='gender'
                                    value={values.gender}>
                                    <option value={'Male'}>Male</option>
                                    <option value={'Female'}>Female</option>
                                </Select>
                            </fieldset>
                        </Stack>

                        {/** graduate program */}
                        <Stack
                            spacing='8px'
                            className='form_wrap formfields__Dfieldset'>
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
                    </Stack>

                    {/** degree program */}
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap degreeProg'>
                            <label>
                                Degree Program <span>*</span>
                            </label>
                            <fieldset>
                                <Select
                                   
                                    placeholder='select option'
                                    name='degreeProgram'
                                    onChange={handleChange}
                                    value={values.degreeProgram}>
                                    {allDegreeProgram.length > 0 ? (
                                        <>
                                            {allDegreeProgram.map(
                                                (data, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={data.title}>
                                                            {data.title}
                                                        </option>
                                                    )
                                                }
                                            )}
                                        </>
                                    ) : null}
                                </Select>
                                {/***
                                     * 
                                     *  <Input
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
                                     * 
                                     * 
                                     */}

                                {errors && errors.degreeProgram ? (
                                    <ErrorMsg className='filesError'>
                                        {errors.degreeProgram}
                                    </ErrorMsg>
                                ) : null}
                            </fieldset>
                        </Stack>
                    </Box>

                    {/** school name */}
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
                                    value={values.schoolName}
                                    onChange={handleSchoolChange}>
                                    {allSchoolItems.items.map((data) => {
                                        return (
                                            <option
                                                key={data._id}
                                                value={data.schoolName}>
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

                    {/** funding type */}
                    <Box className='formfields__Sfieldset'>
                        <Stack spacing='8px' className='form_wrap'>
                            <label>Funding Type</label>
                            <fieldset>
                                <Select
                                    placeholder='select funding type'
                                    name='fundingType'
                                    value={values.fundingType}
                                    onChange={handleChange}>
                                    <option value={'MISR'}>MISR</option>
                                    <option value={'self'}>Individual</option>
                                </Select>
                            </fieldset>
                        </Stack>
                    </Box>

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
        font-family: 'Inter', sans-serif;
        font-weight: 500;
        font-size: 13px;
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
