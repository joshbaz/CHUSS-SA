import React from 'react'
import { Box, Stack, SimpleGrid } from '@chakra-ui/react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Stats = () => {
    const [tiledata, setTileData] = React.useState([
        {
            title: 'Total Students',
            value: 0,
            subText: 'All students in the system.',
            link: '',
            bg: '#FFE2D9',
            color: '#FF3D00',
        },
        {
            title: 'Total Examiners',
            value: 0,
            subText: 'Examinars in the system.',
            link: '',
            bg: '#EDEEFF',
            color: '#293AD1',
        },
        {
            title: 'Total Opponents',
            value: 0,
            subText: 'Opponents in the system',
            link: '',
            bg: '#DDF5DF',
            color: '#1BBD2B',
        },
        {
            title: 'Total Supervisors',
            value: 0,
            subText: 'supervisors in the system ',
            link: '',
            bg: '#DDF5DF',
            color: '#1BBD2B',
        },
    ])

    const { allSupervisorItems } = useSelector((state) => state.supervisor)
    const { allprojects } = useSelector((state) => state.project)
    const { allOpponentItems } = useSelector((state) => state.opponent)
    const { allExaminerItems } = useSelector((state) => state.examiner)

    React.useEffect(() => {
        setTileData([
            {
                title: 'Total Students',
                value: allprojects.items.length,
                subText: 'All students in the system.',
                link: '',
                bg: '#FFE2D9',
                color: '#FF3D00',
            },
            {
                title: 'Total Examiners',
                value: allExaminerItems.items.length,
                subText: 'Examinars in the system.',
                link: '',
                bg: '#EDEEFF',
                color: '#293AD1',
            },
            {
                title: 'Total Opponents',
                value: allOpponentItems.items.length,
                subText: 'Opponents in the system',
                link: '',
                bg: '#DDF5DF',
                color: '#1BBD2B',
            },
            {
                title: 'Total Supervisors',
                value: allSupervisorItems.items.length,
                subText: 'supervisors in the system ',
                link: '',
                bg: '#DDF5DF',
                color: '#1BBD2B',
            },
        ])
    }, [
        allSupervisorItems.items,
        allprojects.items,
        allOpponentItems.items,
        allExaminerItems.items,
    ])

    return (
        <Container>
            <SimpleGrid columns={2} spacing='20px'>
                {tiledata.map((data, index) => (
                    <Stack
                        p='10px 18px'
                        direction='column'
                        justifyContent='space-between'
                        spacing='20px'
                        key={index}
                        className='statbox'
                        w={{ base: '100%', xl: '220px' }}>
                        <h5 className='link_text'>{data.title}</h5>
                        <Box className='link_value'>{data.value}</Box>
                        <p className='link_subtext'>{data.subText}</p>
                    </Stack>
                ))}
            </SimpleGrid>
        </Container>
    )
}

export default Stats

const Container = styled.div`
    width: 100%;
    .statbox {
        height: 163px;

        background: #ffffff;
        box-shadow: 0px 4.65px 34.875px rgba(0, 0, 0, 0.03);
        border-radius: 10.4625px;
    }

    link_icon {
        width: 34.88px;
        height: 34.88px;

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 17px;
        border-radius: 6.975px;
    }

    .link_text {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 17.4375px;
        line-height: 21px;
        color: #000000;
    }

    .link_value {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 40px;
        line-height: 48px;
        color: #1a2240;
    }

    .link_subtext {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 11px;
        line-height: 12px;
        color: #868fa0;
    }
`
