/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import {
    Stack,
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
    useToast,
} from '@chakra-ui/react'
import styled from 'styled-components'
import Navigation from '../../../components/common/Navigation/Navigation'
import TopBar from '../../../components/common/Navigation/TopBar'
import { useSelector, useDispatch } from 'react-redux'
import {
    reset as treset,
    tagGetAll,
} from '../../../store/features/tags/tagSlice'

import {
    reset as preset,
    programTypeGetAll,
    academicYearGetAll,
} from '../../../store/features/preferences/preferenceSlice'
import Account from '../../../components/SettingComponents/Account'
//import LastLogin from '../../../components/SettingComponents/LastLogin'
import ProposedFees from '../../../components/SettingComponents/ProposedFees'
import AcademicYear from '../../../components/SettingComponents/AcademicYear'
import ProjectTabTags from '../../../components/SettingComponents/ProjectTabTags'
import GradingReportTableTags from '../../../components/SettingComponents/GradingReportTableTags'
import ExaminerReportTableTags from '../../../components/SettingComponents/ExaminerReportTableTags'
import PaymentTableTags from '../../../components/SettingComponents/PaymentTableTags'



const Settings = () => {
    let dispatch = useDispatch()
    let toast = useToast()
    const tagsData = useSelector((state) => state.tag)
    const preferencesData = useSelector((state) => state.preference)
    useEffect(() => {
        dispatch(tagGetAll())
        dispatch(programTypeGetAll())
        dispatch(academicYearGetAll())
    }, [])

    useEffect(() => {
        if (preferencesData.isError) {
            toast({
                position: 'top',
                title: tagsData.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(preset())
        }
    }, [
        preferencesData.isError,
        preferencesData.isSuccess,
        preferencesData.message,
    ])

    useEffect(() => {
        if (tagsData.isError) {
            toast({
                position: 'top',
                title: tagsData.message,
                status: 'error',
                duration: 10000,
                isClosable: true,
            })

            dispatch(treset())
        }
    }, [tagsData.isError, tagsData.isSuccess, tagsData.message])

    const filterTabData = [
        // { title: 'Administrators' },
        {
            title: 'Account',
        },
        {
            title: 'Preferences',
        },
        {
            title: 'Tags',
            dataCount: tagsData.allTagItems.items.length,
        },
    ]
    return (
        <Container direction='row' w='100vw' spacing={'0px'}>
            <Box w='72px' position='relative'>
                <Box w='72px' position='relative'>
                    <Navigation />
                </Box>
            </Box>

            <Stack
                className='overwrap'
                direction='column'
                w='100%'
                spacing='20px'>
                <Box w='100%' h='65px' zIndex={'20'}>
                    <TopBar topbarData={{ title: 'Settings', count: null }} />
                </Box>

                <Stack direction='column' padding={'0 20px'}>
                    <Box>
                        <Tabs variant='unstyled'>
                            <TabList>
                                {filterTabData.map((data, index) => {
                                    return (
                                        <Tab
                                            key={index}
                                            _selected={{
                                                color: '#F14C54',
                                                fontWeight: '700',
                                                borderBottom:
                                                    '2px solid #DB5A5A',
                                            }}
                                            className='tab'>
                                            <Stack
                                                direction='row'
                                                alignItems={'center'}>
                                                <h2>{data.title}</h2>
                                                <Text>{data.dataCount}</Text>
                                            </Stack>
                                        </Tab>
                                    )
                                })}
                            </TabList>

                            <TabPanels bg='#FBFBFB' minH='80vh'>
                                <TabPanel>
                                    <Stack
                                        direction='row'
                                        pt='30px'
                                        spacing='30px'>
                                        <Box w='60%'>
                                            <Account />
                                        </Box>
                                        {/**
                                             * <Box w='40%'>
                                            <LastLogin />
                                        </Box>
                                             * 
                                             */}
                                    </Stack>
                                </TabPanel>
                                <TabPanel>
                                    <Stack
                                        direction='row'
                                        pt='30px'
                                        spacing='20px'>
                                        <Box w='60%'>
                                            <ProposedFees
                                                programData={
                                                    preferencesData
                                                        .allProgramItems.items
                                                }
                                            />
                                        </Box>
                                        <Box w='40%'>
                                            {' '}
                                            <AcademicYear
                                                yearData={
                                                    preferencesData.allYearItems
                                                        .items
                                                }
                                            />
                                        </Box>
                                    </Stack>
                                </TabPanel>
                                <TabPanel>
                                    <Stack
                                        direction='row'
                                        pt='30px'
                                        spacing='30px'>
                                        <Stack
                                            direction='column'
                                            w='50%'
                                            spacing='30px'>
                                            <ProjectTabTags
                                                allTagData={
                                                    tagsData.allTagItems.items
                                                }
                                            />
                                            <GradingReportTableTags
                                                allTagData={
                                                    tagsData.allTagItems.items
                                                }
                                            />
                                        </Stack>

                                        <Stack
                                            direction='column'
                                            w='50%'
                                            spacing='30px'>
                                            <ExaminerReportTableTags
                                                allTagData={
                                                    tagsData.allTagItems.items
                                                }
                                            />
                                            <PaymentTableTags
                                                allTagData={
                                                    tagsData.allTagItems.items
                                                }
                                            />
                                        </Stack>
                                    </Stack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Stack>
            </Stack>
        </Container>
    )
}

export default Settings

const Container = styled(Stack)`
    overflow-x: hidden !important;

    .overwrap { 
        overflow: hidden;
    }
    .tab {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        h2 {
            font-size: 14px;
            line-height: 20px;
        }

        p {
            font-size: 10px;
            line-height: 16px;
        }
    }
    .add_button {
        height: 32px;
        color: #ffffff;
        background: #f4797f;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #f4797f;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        font-size: 14px;
    }

    .subfilter_button {
        width: inherit;

        text-align: left;
        focus: none;
        border-radius: none !important;
        ::hover {
            background: transparent !important;
        }
    }
    .filter_button {
        background: #ffffff;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px 0px 0px 6px;
    }

    .menu_options {
        .chakra-menu__icon {
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
            background: green;
        }

        .chakra-menu__icon-wrapper {
            color: #fbfbfb;
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
            box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
                0px 0px 0px 1px rgba(70, 79, 96, 0.16);
            border-radius: 4px;
        }

        svg {
            background: #f4797f !important;
            border: 1px solid #f4797f !important;
        }
    }

    .input_group {
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.06),
            0px 0px 0px 1px rgba(134, 143, 160, 0.16);
        border-radius: 0px 6px 6px 0px;

        &:hover {
            border: 0px solid transparent;
            box-shadow: 0px;
            border-radius: 0px 6px 6px 0px;
        }

        input {
            border: 0px solid transparent;
        }

        background: #ffffff;
    }

    .filter_num {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        color: #3a3a43;
    }

    .clear_button {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 18px;
        color: #838389;
    }
`
