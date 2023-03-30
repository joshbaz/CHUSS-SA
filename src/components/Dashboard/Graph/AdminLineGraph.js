import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'

import { Chart, registerables } from 'chart.js'
import { useSelector } from 'react-redux'
import Moments from 'moment-timezone'
Chart.register(...registerables)
Chart.defaults.plugins.legend = false
let lineOptions = {
    maintainAspectRatio: false,
    legend: {
        display: false,
        position: 'left',
        onClick: null,
    },
    layout: {
        padding: {
            left: 0,
            right: 0,
            bottom: 0,
        },
    },

    responsive: true,

    scales: {
        xAxes: {
            display: true,
            ticks: {
                display: true,
                beginAtZero: true,
                backdropPadding: {
                    x: 0,
                    y: 0,
                },
            },
            grid: {
                offsetGridLines: false,
                display: false,
                drawBorder: false,
                drawTicks: true,
            },
        },

        yAxes: {
            type: 'linear',
            display: true,
            beginAtZero: true,
            ticks: {
                display: true,
                beginAtZero: true,
            },
            grid: {
                display: true,
                drawBorder: true,
                borderDash: [2],
                borderColor: '#000000',
                tickMarkLength: 5,
                offsetGridLines: false,
            },
        },
    },
}

const AdminLineGraph = () => {
    const [graphLineSData, setGraphLineData] = React.useState({
        labelData: [],
        DataResults: [],
    })
    let LineData = {
        labels: graphLineSData.labelData,
        datasets: [
            {
                label: 'logins',
                data: graphLineSData.DataResults,
                fill: true,
                backgroundColor: '#FFC043',
                borderColor: '#991D27',
                pointBorderColor: '#FFC043',
                pointBackgroundColor: '#FFC043',
                pointBorderWidth: 0,
                tension: 0,
                borderWidth: 0,

                stack: 'line',
                borderDash: [2],
            },
        ],
    }

    const { allLoginActivityItems } = useSelector((state) => state.facilitator)

    React.useEffect(() => {
        // eslint-disable-next-line array-callback-return
        let filteredData = allLoginActivityItems.items.map((data) => {
            let Months = Moments(data.loginDate)
                .tz('Africa/Kampala')
                .format('MMM')
            let Year = Moments(data.loginDate)
                .tz('Africa/Kampala')
                .format('YYYY')

            let CurrentYear = Moments().tz('Africa/Kampala').format('YYYY')
            if (Year === CurrentYear) {
                return {
                    Month: Months,
                }
            } else {
                return null
            }
        })

        const arrayofDates = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
        ]
        const arrayofDateData = [
            {
                Date: 'Jan',
                NoOfTimes: 0,
            },
            {
                Date: 'Feb',
                NoOfTimes: 0,
            },
            {
                Date: 'Mar',
                NoOfTimes: 0,
            },
            {
                Date: 'Apr',
                NoOfTimes: 0,
            },
            {
                Date: 'May',
                NoOfTimes: 0,
            },
            {
                Date: 'Jun',
                NoOfTimes: 0,
            },
            {
                Date: 'Jul',
                NoOfTimes: 0,
            },
            {
                Date: 'Aug',
                NoOfTimes: 0,
            },
            {
                Date: 'Sep',
                NoOfTimes: 0,
            },
            {
                Date: 'Oct',
                NoOfTimes: 0,
            },
            {
                Date: 'Nov',
                NoOfTimes: 0,
            },
            {
                Date: 'Dec',
                NoOfTimes: 0,
            },
        ]

        // eslint-disable-next-line array-callback-return
        filteredData.filter((data) => {
            if (arrayofDates.length === 0) {
                // arrayofDateData.push({
                //     Date: newDate.toString(),
                //     NoOfStudents: 1,
                // })
            } else {
                for (
                    let iteration = 0;
                    iteration < arrayofDateData.length;
                    iteration++
                ) {
                    let ttiterations = iteration + 1
                    if (data.Month === arrayofDateData[iteration].Date) {
                        return (arrayofDateData[iteration].NoOfTimes =
                            arrayofDateData[iteration].NoOfTimes + 1)
                    } else if (
                        arrayofDateData[iteration].Date !== data.Month &&
                        ttiterations === arrayofDateData.length
                    ) {
                        // arrayofDates.push(newDate.toString())
                        arrayofDateData.push({
                            Date: data.Month,
                            NoOfTimes: 1,
                        })

                        return null
                    }
                }
            }
        })

        let DatesToset = {
            labelData: [],
            DataResults: [],
        }

        // eslint-disable-next-line array-callback-return
        arrayofDateData.filter((data) => {
            DatesToset.labelData.push(data.Date)
            DatesToset.DataResults.push(data.NoOfTimes)
        })
        setGraphLineData(DatesToset)
    }, [allLoginActivityItems.items])
    return (
        <Container>
            <Stack direction='column' spacing='10px' className='form_container'>
                <Stack
                    className='formtitle'
                    direction='row'
                    w='100%'
                    alignItems='center'
                    justifyContent='space-between'>
                    <Box>
                        <h1>User Access Trends</h1>
                    </Box>
                </Stack>
                <Box className='graphbox'>
                    <LineGraphWrap>
                        <Line data={LineData} options={lineOptions} />
                    </LineGraphWrap>
                </Box>
            </Stack>
        </Container>
    )
}

export default AdminLineGraph

const Container = styled.div`
    .form_container {
        width: 100%;
        min-height: 360px;
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
    .graphbox {
        width: 100%;
        background: #ffffff;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        @media all and (min-width: 1365px) {
            width: 100%;
            padding: 0 1.5em;
        }
    }
`

const LineGraphWrap = styled.div`
    display: flex;
    position: relative;
    height: 232px;
    width: 90%;

    @media all and (min-width: 1365px) {
        width: 100%;
    }
`
