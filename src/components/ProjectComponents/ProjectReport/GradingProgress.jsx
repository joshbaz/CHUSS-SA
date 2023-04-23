import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
    Box,
    Stack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { MdKeyboardArrowDown } from 'react-icons/md'
ChartJS.register(ArcElement, Tooltip)
ChartJS.defaults.plugins.legend = false

const PieLabels = [
    {
        title: 'Ungraded',
        color: '#E9EDF5',
    },
    {
        title: 'Pending report',
        color: '#FAA723',
    },
    {
        title: 'Passed',
        color: '#38A06C',
    },
    {
        title: 'Failed',
        color: '#EF5466',
    },
]
const GradingProgress = ({ values }) => {
    const [pieValues, setPieValues] = React.useState([33.3, 33.3, 33.3])
    const [pieColors, setPieColors] = React.useState([
        '#E9EDF5',
        '#38A06C',
        '#FAA723',
    ])
    const [checkSubmissionStatus, setSubmissionStatus] =
        React.useState('normal')
    const [examinerLabels, setExaminerLabels] = React.useState([])
    const piedata = {
        labels:
            values !== null && values.examiners.length > 0
                ? examinerLabels
                : ['Ex.1', 'Ex.2', 'Ex.3'],
        datasets: [
            {
                label: 'My First Dataset',
                data: pieValues,
                backgroundColor:
                    values !== null && values.examinerReports.length > 0
                        ? pieColors
                        : ['#E9EDF5', '#38A06C', '#FAA723'],
                hoverOffset: 4,
            },
        ],
    }

    useEffect(() => {
        if (values !== null && values.submissionStatus) {
            setSubmissionStatus(values.submissionStatus)
        }
    }, [values])

    useEffect(() => {
        let arrayInfo = []

        if (values !== null && values.examiners.length > 0) {
            // eslint-disable-next-line array-callback-return
            values.examiners.filter((data) => {
                arrayInfo.push(data.examinerId.name)
            })

            setExaminerLabels(arrayInfo)
        } else {
            setExaminerLabels([])
        }
        let pieData = []
        let pieColor = []
        if (values !== null && values.examinerReports.length > 0) {
            // eslint-disable-next-line array-callback-return
            values.examinerReports.filter((data) => {
                if (data.submissionType === checkSubmissionStatus) {
                    pieData.push(
                        data.reportId.score === 0 &&
                            data.reportId.marked === false
                            ? 33.3
                            : data.reportId.score
                    )

                    if (data.reportId.reportStatus === 'pending') {
                        pieColor.push('#FAA723')
                    }
                    if (data.reportId.reportStatus === 'Passed') {
                        pieColor.push('#38A06C')
                    }
                    if (data.reportId.reportStatus === 'failed') {
                        pieColor.push('#EF5466')
                    }
                    if (data.reportId.reportStatus === 'ungraded') {
                        pieColor.push('#E9EDF5')
                    }
                }
            })
            setPieColors(pieColor)
            setPieValues(pieData)
        } else {
            setPieValues([33.3, 33.3, 33.3])
        }
    }, [values, checkSubmissionStatus])

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
                        <h1>Grading Progress</h1>
                    </Box>

                    <Stack direction='row' alignItems='center'>
                        <Box className='type_text'>
                            {checkSubmissionStatus === 'resubmission'
                                ? 're-submission'
                                : 'normal'}
                        </Box>
                        <Menu>
                            <MenuButton>
                                <Box color='#838389'>
                                    <MdKeyboardArrowDown />
                                </Box>
                            </MenuButton>

                            <MenuList>
                                <MenuItem
                                    onClick={() =>
                                        setSubmissionStatus(() => 'normal')
                                    }
                                    fontSize={'14px'}>
                                    Normal
                                </MenuItem>
                                <MenuItem
                                    onClick={() =>
                                        setSubmissionStatus(
                                            () => 'resubmission'
                                        )
                                    }
                                    fontSize={'14px'}>
                                    Resubmission
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </Stack>
                </Stack>

                {/** details */}
                <Stack
                    p='25px 20px'
                    direction='row'
                    className='formfields'
                    alignItems='space-between'
                    spacing='20px'
                    h='100%'>
                    <Box
                        w={{
                            base: '58%',
                            md: '400px',
                            xl: '187.94px',
                        }}
                        h={{
                            base: '58%',
                            md: '400px',
                            xl: '187.94px',
                        }}>
                        <Pie data={piedata} />
                    </Box>

                    <Box className='chart__legend'>
                        <Stack direction='column' spacing='3px'>
                            {PieLabels.map((data, index) => (
                                <Stack direction='row' key={index}>
                                    <Box
                                        bg={data.color}
                                        className='chart__box'
                                    />
                                    <h1>{data.title}</h1>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}

export default GradingProgress

const Container = styled(Box)`
    font-family: 'Inter', sans-serif;

    .form_container {
        width: 100%;
        min-height: 288px;
        height: 100%;
        background: #ffffff;
        border-radius: 9px;
    }

    .formtitle {
        height: 54px;
        width: 100%;

        border-bottom: 1px solid #d1d5db;
        padding: 0 30px;
        h1 {
            width: 100%;

            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 137.5%;
            color: #111827;
        }
    }

    .type_text {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        text-transform: capitalize;
    }

    .add_examiners {
        width: 24px;
        height: 24px;
        border: 1px dashed #f4797f;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #5e5c60;
        font-size: 15px;
        background: #eeeeef;
    }

    .s_name {
        color: #5e5c60;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 0.02em;
    }

    label {
        width: 70px;
        p {
            color: #838389;
            font-weight: 500;
            font-size: 10px;
            line-height: 12px;
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
        text-indent: 21px;
        height: 32px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 20px;
    }

    .chart__legend {
        h1 {
            font-family: 'Inter';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 20px;
            color: #464f60;
        }

        .chart__box {
            border-radius: 4px;
            width: 16px;
            height: 16px;
        }
    }
`
