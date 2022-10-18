import React from 'react'
import { Box, Stack } from '@chakra-ui/react'
import styled from 'styled-components'
import { Line } from 'react-chartjs-2'
import { RiInformationLine } from 'react-icons/ri'
import { Chart, registerables } from 'chart.js'

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
                beginAtZero: false,
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

const LineGraph = () => {
    let LineData = {
        labels: ['2017', '2018', '2019', '2020', '2021', '2022'],
        datasets: [
            {
                label: 'messages',
                data: [10, 20, 80, 100],
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
                        <h1>Analysis</h1>
                    </Box>
                </Stack>
                <Box className='graphbox'>
                    <LineTitleWrap>
                        <h4>Total Graduate Students</h4>
                        <div>
                            <RiInformationLine />
                        </div>
                    </LineTitleWrap>
                    <LineGraphWrap>
                        <Line data={LineData} options={lineOptions} />
                    </LineGraphWrap>
                </Box>
            </Stack>
        </Container>
    )
}

export default LineGraph

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

const LineTitleWrap = styled.div`
    width: 90%;
    height: 32px;
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
        font-family: 'Roboto', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 15px;
        line-height: 132%;
        display: flex;
        align-items: center;
        color: #333333;
    }

    div {
        color: #5b5b5b;
        font-size: 24px;
    }
    @media all and (min-width: 1365px) {
        width: 100%;
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
