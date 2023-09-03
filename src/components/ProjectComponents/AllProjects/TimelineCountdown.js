import React from 'react'
import Moments from 'moment-timezone'
import styled from 'styled-components'

const TimelineCountdown = ({ expectedEndDate, startDate }) => {
    const [countdownDates, setCountdownDates] = React.useState({
        years: undefined,
        months: undefined,
        days: undefined,
        hours: undefined,
        minutes: undefined,
        seconds: undefined,
    })

    React.useEffect(() => {
        let intervalss
        // console.log('herrrrrrrrr', expectedEndDate, startDate, 'dates')
        // if (expectedEndDate !== null && startDate !== null) {
        //     intervals = setInterval(() => {
        //         let datesBe = Moments(
        //             new Date(expectedEndDate),
        //             'MM DD YYYY, h:mm a'
        //         )

        //         let newDatess = Moments(new Date(), 'MM DD YYYY, h:mm a')

        //         let duration;

        //         console.log('datesBe', datesBe)
        //         console.log('newDatess', newDatess)
        //         let setTime = 1000;
        //         let laterDate = Moments(datesBe, 'MM DD YYYY, h:mm a')

        //         let now = Moments(newDatess, 'MM DD YYYY, h:mm a')

        //         //   console.log('laterDates', laterDate, now)
        //          duration = Moments.duration(laterDate.diff(now))

        //         duration = Moments.duration(duration - setTime, 'milliseconds')
        //         //console.log('countdown', countdown)

        //         let days = duration.days()
        //         let hours = duration.hours()
        //         let minutes = duration.minutes()
        //         let seconds = duration.seconds()

        //         setCountdownDates(() => ({
        //             ...countdownDates,
        //             days,
        //             hours,
        //             minutes,
        //             seconds,
        //         }))
        //     }, 1000)
        // }

        if (expectedEndDate !== null && startDate !== null) {
            ;(function () {
                let eventTime, currentTime, duration, interval, intervalId

                interval = 1000 // 1 second

                // get time element

                let datesBe = Moments(new Date(expectedEndDate)).format(
                    'YYYY-MM-DDThh:mm:ss'
                )

                // calculate difference between two times
                eventTime = Moments.tz(datesBe, 'Africa/Kampala')
                // based on time set in user's computer time / OS
                currentTime = Moments().tz()
                // get duration between two times
                duration = Moments.duration(eventTime.diff(currentTime))

                // loop to countdown every 1 second
                intervalss = setInterval(function () {
                    // get updated duration
                    duration = Moments.duration(
                        duration - interval,
                        'milliseconds'
                    )

                    // if duration is >= 0
                    if (duration.asSeconds() <= 0) {
                        clearInterval(intervalId)
                        // hide the countdown element
                    } else {
                        let years = duration.years()
                        let months = duration.months()
                        let days = duration.days()
                        let hours = duration.hours()
                        let minutes = duration.minutes()
                        let seconds = duration.seconds()

                        setCountdownDates(() => ({
                            ...countdownDates,
                            years,
                            months,
                            days,
                            hours,
                            minutes,
                            seconds,
                        }))
                    }
                }, interval)
            })()
        }

        return () => {
            clearInterval(intervalss)
        }
    }, [expectedEndDate, startDate])

    // function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    //     var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0

    //     return {
    //         x: centerX + radius * Math.cos(angleInRadians),
    //         y: centerY + radius * Math.sin(angleInRadians),
    //     }
    // }

    // function describeArc(x, y, radius, startAngle, endAngle) {
    //     var start = polarToCartesian(x, y, radius, endAngle)
    //     var end = polarToCartesian(x, y, radius, startAngle)
    //     var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    //     var d = [
    //         'M',
    //         start.x,
    //         start.y,
    //         'A',
    //         radius,
    //         radius,
    //         0,
    //         largeArcFlag,
    //         0,
    //         end.x,
    //         end.y,
    //     ].join(' ')

    //     return d
    // }

    // function mapNumber(number, in_min, in_max, out_min, out_max) {
    //     return (
    //         ((number - in_min) * (out_max - out_min)) / (in_max - in_min) +
    //         out_min
    //     )
    // }

    // const yearsRadius = mapNumber(countdownDates.years, 30, 0, 0, 360)
    // const monthsRadius = mapNumber(countdownDates.months, 30, 0, 0, 360)
    // const daysRadius = mapNumber(countdownDates.days, 30, 0, 0, 360)
    // const hoursRadius = mapNumber(countdownDates.hours, 24, 0, 0, 360)
    // const minutesRadius = mapNumber(countdownDates.minutes, 60, 0, 0, 360)
    // const secondsRadius = mapNumber(countdownDates.seconds, 60, 0, 0, 360)

    // const SVGCircle = ({ radius }) => (
    //     <svg className='countdown-svg'>
    //         <path
    //             fill='none'
    //             stroke='#333'
    //             stroke-width='4'
    //             d={describeArc(50, 50, 48, 0, radius)}
    //         />
    //     </svg>
    // )
    return (
        <Container>
            <div className='countdown-wrapper'>
                {countdownDates.years ? (
                    <div className='countdown-item'>
                        {countdownDates.years ? countdownDates.years : null}
                        <span>years</span>
                    </div>
                ) : null}
                {countdownDates.months ? (
                    <div className='countdown-item'>
                        {countdownDates.months ? countdownDates.months : 0}
                        <span>months</span>
                    </div>
                ): null}

                <div className='countdown-item'>
                    {countdownDates.days ? countdownDates.days : 0}
                    <span>days</span>
                </div>

                <div className='countdown-item'>
                    {countdownDates.hours ? countdownDates.hours : 0}
                    <span>hours</span>
                </div>
                <div className='countdown-item'>
                    {countdownDates.minutes ? countdownDates.minutes : 0}
                    <span>minutes</span>
                </div>
                <div className='countdown-item'>
                    {countdownDates.seconds ? countdownDates.seconds : 0}
                    <span>seconds</span>
                </div>
            </div>
        </Container>
    )
}

export default TimelineCountdown

const Container = styled.div`
    .countdown-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .countdown-item {
        color: #111;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        line-height: 30px;
        margin: 2px;
        padding-top: 10px;
        position: relative;
        width: 40px;
        height: 50px;
    }

    .countdown-item span {
        color: #333;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
    }

    .countdown-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 40px;
        height: 50px;
    }
`
