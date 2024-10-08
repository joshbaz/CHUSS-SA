/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { BiDownload, BiColumns } from 'react-icons/bi'
import {
    Stack,
    Box,
    Tabs,
    TabList,
    Tab,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Checkbox,
    Tooltip,
    Divider,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody
} from '@chakra-ui/react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'

import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { TbDotsVertical } from 'react-icons/tb'
import { IoIosArrowDown } from 'react-icons/io'

import { reset as areset } from '../../../store/features/auth/authSlice'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Moments from 'moment-timezone'
import {
    projectDeletion,
    reset,
} from '../../../store/features/project/projectSlice'
import TimelineCountdown from './TimelineCountdown'
import toast from 'react-hot-toast'

import {
    errorHandler,
    handleLogout,
} from '../../../components/common/CustomToastFunctions/ToastFunctions'
import DeleteStudentModal from './DeleteStudentModal'
import EditReportModal from './EditReportModal'
import ViewReportModal from './ViewReportModal'

const ProjectTable = ({
    allTagData,
    studentType,
    rpath,
    searchActive,
    filterInfo,
    exportData,
    setExportData,
    searchButtonState,
    searchWord,
}) => {
    const [projectTagData, setProjectTagData] = React.useState([])
    // eslint-disable-next-line no-unused-vars
    const [perPage, setPerPage] = React.useState(10)
    const [removeActive, setRemoveActive] = React.useState(false)
    const [removeDetails, setRemoveDetails] = React.useState(null)
    const [isSubmittingp, setIsSubmittingp] = React.useState(false)

    const [allDisplayData, setAllDisplayData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allItems: [],
        totalItemsDisplayed: 0,
        totalAllItems: 0,
        totalPages: 0,
    })

    const [filterTabData, setfilterTabData] = React.useState([
        {
            title: 'All',
            dataCount: 0,
        },
    ])
    const [searchData, setSearchData] = React.useState({
        currentPage: 0,
        itemsPerPage: 8,
        items: [],
        allSearchItems: [],
        totalItemsDisplayed: 0,
        totalSearchedItems: 0,
        totalPages: 0,
    })

    const [mastersTableColumn, setMastersTableColumn] = React.useState([
        {
            title: 'Student Name',
            display: true,
        },
        {
            title: 'STUDENT(SRN)',
            display: true,
        },

        {
            title: 'Gender',
            display: false,
        },
        {
            title: 'Award',
            display: true,
        },
        {
            title: 'TOPIC',
            filter: true,
            display: false,
        },

        {
            title: 'School',
            display: false,
        },
        {
            title: 'STATUS',
            filter: true,
            display: true,
        },

        {
            title: 'EXAMINERS',
            display: false,
        },
        {
            title: 'Internal Examiners',
            display: true,
        },
        {
            title: 'External Examiner',
            display: true,
        },
        {
            title: 'Registration',
            display: false,
        },
        {
            title: 'Submission',
            display: false,
        },
    ])

    React.useEffect(() => {
        const MacolumnSettings = !!localStorage.getItem('Ma_columnSet')
        if (MacolumnSettings) {
            let listOfColumns = JSON.parse(localStorage.getItem('Ma_columnSet'))
            setMastersTableColumn(() => listOfColumns)
        } else {
            localStorage.setItem(
                'Ma_columnSet',
                JSON.stringify(mastersTableColumn)
            )
        }
    }, [])

    let dispatch = useDispatch()
    //let toast = useToast()
    let { allprojects, message, isSuccess, isError } = useSelector(
        (state) => state.project
    )

    let routeNavigate = useNavigate()

    /** changes all document tabs */
    useEffect(() => {
        if (searchActive) {
            setfilterTabData([
                {
                    title: 'All',
                    dataCount: searchData.totalSearchedItems,
                },
            ])
        } else {
            setfilterTabData([
                {
                    title: 'All',
                    dataCount: allDisplayData.totalAllItems,
                },
            ])
        }
    }, [
        searchActive,
        allDisplayData.totalAllItems,
        searchData.totalSearchedItems,
    ])

    useEffect(() => {
        let studentTypes = studentType === 'masters' ? 'Masters' : 'Phd'
        let allInfoData = allTagData.filter(
            (data, index) =>
                data.table === 'project' && data.projectType === studentTypes
        )

        setProjectTagData(allInfoData)
    }, [allTagData, studentType])

    useEffect(() => {
        // eslint-disable-next-line array-callback-return
        let allQueriedItems = allprojects.items.filter((datas) => {
            if (studentType === 'phd') {
                if (datas.student.graduate_program_type === 'PhD') {
                    return datas
                }
            } else if (studentType === 'masters') {
                if (datas.student.graduate_program_type === 'Masters') {
                    return datas
                }
            } else {
                return null
            }
        })
        /** initial items  */
        //items collected
        const allItemsCollected = allQueriedItems
        //total all items
        const totalItems = allQueriedItems.length
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
            allItems: allQueriedItems,
            totalItemsDisplayed: currentItems.length,
            totalAllItems: totalItems,
            totalPages: pageLength,
        })
    }, [studentType, allprojects.items])

    let PaginationFirstNumber =
        allDisplayData.currentPage * allDisplayData.itemsPerPage -
        allDisplayData.itemsPerPage +
        1

    let PaginationLastNumber =
        PaginationFirstNumber + allDisplayData.totalItemsDisplayed - 1

    /** searched Pagination */
    let PaginationSFirstNumber =
        searchData.currentPage * searchData.itemsPerPage -
        searchData.itemsPerPage +
        1
    let PaginationSLastNumber =
        PaginationSFirstNumber + searchData.totalItemsDisplayed - 1

    /** handle function to give registration */
    const getLatestRegistration = (dataArray) => {
        let filDatas = dataArray.filter((data) => {
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'provisional admission'
            ) {
                return data
            }
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'full admission'
            ) {
                return data
            }
            if (
                data.registrationId.registrationtype.toLowerCase() ===
                'de-registered'
            ) {
                return data
            }
        })

        if (filDatas.length > 1) {
            let latest = filDatas[0]

            filDatas.forEach((element) => {
                if (
                    Moments(element.registrationId.date).isAfter(
                        latest.registrationId.date
                    )
                ) {
                    latest = element
                }
            })

            return latest.registrationId.registrationtype
        } else if (filDatas.length > 0 && filDatas.length === 1) {
            return filDatas[0].registrationId.registrationtype
        } else {
            return '-'
        }
    }

    /** function to handle search filters */
    const handleFilters = () => {
        const searchResults = allDisplayData.allItems.filter((data1, index) => {
            /** student name */
            if (filterInfo[0].title === 'Student Name') {
                let name = data1.student.studentName.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                return check
            }

            if (filterInfo[0].title === 'Student (SRN)') {
                let name = data1.student.registrationNumber.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                return check
            }

            /** Award search */
            if (filterInfo[0].title === 'Award') {
                let name = data1.student.degree_program.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                return check
            }

            /** topic */
            if (filterInfo[0].title === 'Topic') {
                let topic = data1.topic.toLowerCase()
                let check = filterInfo[0].searchfor.some((details) =>
                    topic.includes(details)
                )
                return check
            }

            /** Award search */
            if (filterInfo[0].title === 'School') {
                let name = data1.student.schoolName.toLowerCase()
                //console.log('name', name)
                let check = filterInfo[0].searchfor.some((details) =>
                    name.includes(details)
                )

                return check
            }

            /** status */
            if (filterInfo[0].title === 'Status') {
                let status = data1.activeStatus
                    ? data1.activeStatus.toLowerCase()
                    : ''

                let check = filterInfo[0].searchfor.some((details) =>
                    status.includes(details)
                )

                return check
            }
            /** registration */
            if (filterInfo[0].title === 'Registration') {
                let allRegistrations = [...data1.registration]
                /** function to return latest registration */
                let returnedData = getLatestRegistration(allRegistrations)
                let status = returnedData.toLowerCase()
                let check = filterInfo[0].searchfor.some((details) =>
                    status.includes(details)
                )

                return check
            }
            /** resubmission */
            if (filterInfo[0].title === 'Submission') {
                //  console.log('submission', data1.submissionStatus.toLowerCase())
                let status = data1.submissionStatus.toLowerCase()
                let check = filterInfo[0].searchfor.some((details) =>
                    status.includes(details)
                )
                return check
            }

            return null
        })

        /** filters to add to the first */
        if (searchResults.length > 0 && filterInfo.length > 1) {
            let newFilterArray = [...filterInfo]
            newFilterArray.splice(0, 1)
            //make a new copy of the searched Data
            let newSearchedData = [...searchResults]
            //iterate through the queries
            for (
                let iteration = 0;
                iteration < newFilterArray.length;
                iteration++
            ) {
                if (newSearchedData.length > 0) {
                    /** filter the data */
                    const newResults = newSearchedData.filter(
                        (data1, index) => {
                            /** student name */
                            if (
                                newFilterArray[iteration].title ===
                                'Student Name'
                            ) {
                                let name =
                                    data1.student.studentName.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )
                                return check
                            }

                            /** student SRN */
                            if (
                                newFilterArray[iteration].title ===
                                'Student (SRN)'
                            ) {
                                let name =
                                    data1.student.registrationNumber.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )
                                return check
                            }

                            /** Award search */
                            if (newFilterArray[iteration].title === 'Award') {
                                let name =
                                    data1.student.degree_program.toLowerCase()
                                //console.log('name', name)
                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )

                                return check
                            }

                            /** School search */
                            if (newFilterArray[iteration].title === 'School') {
                                let name =
                                    data1.student.schoolName.toLowerCase()
                                //console.log('name', name)
                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    name.includes(details)
                                )

                                return check
                            }

                            /** topic */
                            if (newFilterArray[iteration].title === 'Topic') {
                                let topic = data1.topic
                                    ? data1.topic.toLowerCase()
                                    : ''
                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    topic.includes(details)
                                )
                                return check
                            }
                            /** status */
                            if (newFilterArray[iteration].title === 'Status') {
                                let status = data1.activeStatus
                                    ? data1.activeStatus.toLowerCase()
                                    : ''
                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    status.includes(details)
                                )
                                return check
                            }
                            /** registration */
                            if (
                                newFilterArray[iteration].title ===
                                'Registration'
                            ) {
                                let allRegistrations = [...data1.registration]
                                /** function to return latest registration */
                                let returnedData =
                                    getLatestRegistration(allRegistrations)
                                let status = returnedData.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    status.includes(details)
                                )
                                return check
                            }
                            /** resubmission */
                            if (
                                newFilterArray[iteration].title === 'Submission'
                            ) {
                                let status =
                                    data1.submissionStatus.toLowerCase()

                                let check = newFilterArray[
                                    iteration
                                ].searchfor.some((details) =>
                                    status.includes(details)
                                )

                                return check
                            }

                            return null
                        }
                    )
                    /** assign the new results */
                    newSearchedData = [...newResults]
                } else {
                    return
                }
            }
            // perform state update of the results
            //items collected
            const allItemsCollected = newSearchedData
            //total all items
            const totalItems = newSearchedData.length
            let itemsPerPage = perPage
            const currentPage = 1
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage
            const currentItems = allItemsCollected.slice(
                indexOfFirstItem,
                indexOfLastItem
            )
            const pageLength = Math.ceil(totalItems / itemsPerPage)
            setSearchData({
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                items: currentItems,
                allSearchItems: newSearchedData,
                totalItemsDisplayed: currentItems.length,
                totalSearchedItems: totalItems,
                totalPages: pageLength,
            })
        } else {
            /** filter info less than 2 and no searched data */
            /** set the records */
            const allItemsCollected = searchResults
            //total all items
            const totalItems = searchResults.length
            let itemsPerPage = perPage
            const currentPage = 1
            const indexOfLastItem = currentPage * itemsPerPage
            const indexOfFirstItem = indexOfLastItem - itemsPerPage

            const currentItems = allItemsCollected.slice(
                indexOfFirstItem,
                indexOfLastItem
            )

            const pageLength = Math.ceil(totalItems / itemsPerPage)

            setSearchData({
                currentPage: currentPage,
                itemsPerPage: itemsPerPage,
                items: currentItems,
                allSearchItems: searchResults,
                totalItemsDisplayed: currentItems.length,
                totalSearchedItems: totalItems,
                totalPages: pageLength,
            })
        }
    }

    /** handle the default search functionality */
    const handleDefaultSearch = (word) => {
        const searchResults = allDisplayData.allItems.filter((data1, index) => {
             let name = data1.student.studentName.toLowerCase()
            let registrationNo = data1.student.registrationNumber.toLowerCase()
            
             if (name.includes(searchWord)) {
                 return data1
             }

             if (registrationNo.includes(searchWord)) {
                 return data1
             }

             return null
        })


        const allItemsCollected = searchResults

        const totalItems = searchResults.length

        let itemsPerPage = perPage
        const currentPage = 1
        const indexOfLastItem = currentPage * itemsPerPage
        const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const currentItems = allItemsCollected.slice(
      indexOfFirstItem,
      indexOfLastItem
  )

  const pageLength = Math.ceil(totalItems / itemsPerPage)

  setSearchData({
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      items: currentItems,
      allSearchItems: searchResults,
      totalItemsDisplayed: currentItems.length,
      totalSearchedItems: totalItems,
      totalPages: pageLength,
  })

    }

    useEffect(() => {
        if (filterInfo.length > 0) {
            handleFilters()
        }
    }, [filterInfo, searchButtonState])

    useEffect(() => {
        if (searchButtonState === 'DefaultSearch' && searchWord) {
            if (searchWord !== '') {
              handleDefaultSearch(searchWord)  
            } else {

            }
            
        }
    }, [, searchButtonState, searchWord])

    /** function to handle general checkbox */
    const handleGeneralCheckbox = (e) => {
        if (e.target.checked) {
            if (searchActive) {
                if (searchData.allSearchItems.length > 0) {
                    let newDataToSave = searchData.allSearchItems.map(
                        (data) => {
                            return data
                        }
                    )

                    setExportData(newDataToSave)
                }
            } else {
                if (allDisplayData.allItems.length > 0) {
                    let newDataToSave = allDisplayData.allItems.map((data) => {
                        return data
                    })

                    setExportData(newDataToSave)
                }
            }
        } else {
            setExportData([])
        }
    }
    /** function to handle checkbox on each item */
    const handleIndivCheckbox = (e, data) => {
        if (exportData.length > 0) {
            let checkData = exportData.some(
                (datacheck, index) => data._id === datacheck._id
            )

            if (checkData) {
                let newChecksData = [...exportData]
                for (
                    let iteration = 0;
                    iteration < newChecksData.length;
                    iteration++
                ) {
                    if (newChecksData[iteration]._id === data._id) {
                        newChecksData.splice(iteration, 1)
                        setExportData([...newChecksData])

                        return
                    }
                }
            } else {
                setExportData([...exportData, data])
            }
        } else {
            setExportData([data])
        }
    }

    const handlePrev = () => {
        if (searchActive) {
            if (searchData.currentPage - 1 >= 1) {
                let page = searchData.currentPage - 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allSearchItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setSearchData(() => ({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                }))
            }
        } else {
            if (allDisplayData.currentPage - 1 >= 1) {
                let page = allDisplayData.currentPage - 1
                const indexOfLastItem = page * allDisplayData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allDisplayData.itemsPerPage

                const currentItems = allDisplayData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )

                setAllDisplayData({
                    ...allDisplayData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        }
    }

    const handleNext = () => {
        if (searchActive) {
            if (searchData.currentPage + 1 <= searchData.totalPages) {
                let page = searchData.currentPage + 1
                const indexOfLastItem = page * searchData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - searchData.itemsPerPage

                const currentItems = searchData.allSearchItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )
                setSearchData({
                    ...searchData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                })
            }
        } else {
            if (allDisplayData.currentPage + 1 <= allDisplayData.totalPages) {
                let page = allDisplayData.currentPage + 1
                const indexOfLastItem = page * allDisplayData.itemsPerPage
                const indexOfFirstItem =
                    indexOfLastItem - allDisplayData.itemsPerPage

                const currentItems = allDisplayData.allItems.slice(
                    indexOfFirstItem,
                    indexOfLastItem
                )
                setAllDisplayData(() => ({
                    ...allDisplayData,
                    currentPage: page,
                    itemsPerPage: perPage,
                    items: currentItems,
                    totalItemsDisplayed: currentItems.length,
                }))
            }
        }
    }

    /** function to handle data exportation */
    const handleExportation = async () => {
        if (exportData.length > 0) {
            let values = {
                tableName:
                    studentType === 'masters'
                        ? 'Master Students'
                        : 'PHD Students',
                data: exportData,
                projectTagData: projectTagData,
            }
            await window.electronAPI.exportStudentCSV(values)
        }
    }

    /** HANDLE PROJECT DELETION */
    const handleRemove = (ppId, name) => {
        if (ppId._id && name) {
            let rvalues = {
                name: name,
                projectId: ppId._id,
            }
            setRemoveDetails(() => rvalues)
            setRemoveActive(true)
        }
    }

    const onRemoveUpload = () => {
        if (removeDetails.projectId) {
            setIsSubmittingp(true)

            toast.dismiss()
            toast.promise(
                dispatch(projectDeletion(removeDetails)).then((res) => {
                    //console.log('res', res)
                    if (res.meta.requestStatus === 'rejected') {
                        let responseCheck = errorHandler(res)
                        throw new Error(responseCheck)
                    } else {
                        return res.payload.message
                    }
                }),
                {
                    loading: 'Deleting Student ....',
                    success: (data) => `Successfully Deleted`,
                    error: (err) => {
                        if (
                            err
                                .toString()
                                .includes('Check your internet connection')
                        ) {
                            return 'Check Internet Connection'
                        } else if (
                            err.toString().includes('Authentication required')
                        ) {
                            setTimeout(() => handleLogout(dispatch), 3000)
                            return 'Not Authenticated'
                        } else if (
                            err.toString().includes('Authentication expired')
                        ) {
                            setTimeout(() => handleLogout(dispatch), 3000)
                            return 'Authentication Expired'
                        } else {
                            return `${err}`
                        }
                    },
                }
            )
        }
    }

    const cancelRemoveUpload = () => {
        setRemoveActive(false)
        setRemoveDetails(null)
    }
    React.useEffect(() => {
        if (isError && isSubmittingp) {
            setIsSubmittingp(false)
            dispatch(reset())
            dispatch(areset())
        }
        if (isSuccess && message && isSubmittingp) {
            setIsSubmittingp(false)
            setRemoveActive(false)
            setRemoveDetails(null)

            dispatch(reset())
            dispatch(areset())
        }

        dispatch(reset())
    }, [isSuccess, message, isSubmittingp, isError])

    /** function to handle the columns table checkbox */
    const handleColumnsChange = (e, value) => {
        let ColumnData = [...mastersTableColumn]
        let newColumnssData = ColumnData.map((data) => {
            if (data.title === value) {
                let editedValue = {
                    ...data,
                    display: e.target.checked,
                }

                return editedValue
            } else {
                return data
            }
        })

        setMastersTableColumn(() => newColumnssData)
        localStorage.setItem('Ma_columnSet', JSON.stringify(newColumnssData))
    }

    const handleCompiledExaminers = (examinerDatas) => {
        let compiledExaminer = []

        if (examinerDatas.length > 1) {
            for (
                let iteration = 0;
                iteration < examinerDatas.length;
                iteration++
            ) {
                let totalIterations = iteration + 1
                if (examinerDatas[iteration].submissionType === 'normal') {
                    compiledExaminer.push(examinerDatas[iteration])
                }

                if (totalIterations === examinerDatas.length) {
                    return compiledExaminer
                }
            }
        } else {
            return []
        }
    }

    const handleCompiledResubmitExaminers = (examinerDatas) => {
        let compiledExaminer = []

        if (examinerDatas.length > 0) {
            for (
                let iteration = 0;
                iteration < examinerDatas.length;
                iteration++
            ) {
                let totalIterations = iteration + 1
                if (
                    examinerDatas[iteration].submissionType === 'resubmission'
                ) {
                    compiledExaminer.push(examinerDatas[iteration])
                }

                if (totalIterations === examinerDatas.length) {
                    return compiledExaminer
                }
            }
        } else {
            return []
        }
    }

    const handleCompiledExRp = (rpDatas) => {
        let compiledReports = []

        if (rpDatas.length > 0) {
            for (let iteration = 0; iteration < rpDatas.length; iteration++) {
                let totalIterations = iteration + 1
                if (rpDatas[iteration].submissionType === 'normal') {
                    compiledReports.push(rpDatas[iteration])
                }

                if (totalIterations === rpDatas.length) {
                    return compiledReports
                }
            }
        } else {
            return []
        }
    }

    const handleCompiledResubmittedRp = (rpDatas) => {
        let compiledReports = []

        if (rpDatas.length > 0) {
            for (let iteration = 0; iteration < rpDatas.length; iteration++) {
                let totalIterations = iteration + 1
                if (rpDatas[iteration].submissionType === 'resubmission') {
                    compiledReports.push(rpDatas[iteration])
                }

                if (totalIterations === rpDatas.length) {
                    return compiledReports
                }
            }
        } else {
            return []
        }
    }

    /** reports - final compiled (normal version) */
    const handleCompiledIEReports = (ceData, rpData) => {
        let compiledIEReports = []
        if (rpData.length > 0 && ceData.length > 0) {
            for (let iteration = 0; iteration < rpData.length; iteration++) {
                let totalIterations = iteration + 1
                let pushExaminerReport = {
                    ...rpData[iteration],
                    examinerName: '',
                }

                for (
                    let ceIteration = 0;
                    ceIteration < ceData.length;
                    ceIteration++
                ) {
                    let totalCeIteration = ceIteration + 1

                    if (
                        ceData[ceIteration].examinerId._id ===
                            pushExaminerReport.reportId.examiner &&
                        ceData[ceIteration].examinerId.typeOfExaminer ===
                            'Internal'
                    ) {
                        pushExaminerReport.examinerName =
                            ceData[ceIteration].examinerId.jobtitle +
                            ' ' +
                            ceData[ceIteration].examinerId.name
                        compiledIEReports.push(pushExaminerReport)
                    }

                    if (
                        totalCeIteration === ceData.length &&
                        totalIterations === rpData.length
                    ) {
                        return compiledIEReports
                    }
                }
            }
        } else {
            return []
        }
    }
    const handleCompiledEEReports = (ceData, rpData) => {
        let compiledEEReports = []
        if (rpData.length > 0 && ceData.length > 0) {
            for (let iteration = 0; iteration < rpData.length; iteration++) {
                let totalIterations = iteration + 1
                let pushExaminerReport = {
                    ...rpData[iteration],
                    examinerName: '',
                }

                for (
                    let ceIteration = 0;
                    ceIteration < ceData.length;
                    ceIteration++
                ) {
                    let totalCeIteration = ceIteration + 1

                    if (
                        ceData[ceIteration].examinerId._id ===
                            pushExaminerReport.reportId.examiner &&
                        ceData[ceIteration].examinerId.typeOfExaminer ===
                            'External'
                    ) {
                        pushExaminerReport.examinerName =
                            ceData[ceIteration].examinerId.jobtitle +
                            ' ' +
                            ceData[ceIteration].examinerId.name
                        compiledEEReports.push(pushExaminerReport)
                    }

                    if (
                        totalCeIteration === ceData.length &&
                        totalIterations === rpData.length
                    ) {
                        return compiledEEReports
                    }
                }
            }
        } else {
            return []
        }
    }

    /** reports - final compiled (resubmission version) */
    const handleCompiledIEResubmitted = (ceData, rpData) => {
        let compiledResubIEReports = []
        if (rpData.length > 0 && ceData.length > 0) {
            for (let iteration = 0; iteration < rpData.length; iteration++) {
                let totalIterations = iteration + 1
                let pushExaminerReport = {
                    ...rpData[iteration],
                    examinerName: '',
                }

                for (
                    let ceIteration = 0;
                    ceIteration < ceData.length;
                    ceIteration++
                ) {
                    let totalCeIteration = ceIteration + 1

                    if (
                        ceData[ceIteration].examinerId._id ===
                            pushExaminerReport.reportId.examiner &&
                        ceData[ceIteration].examinerId.typeOfExaminer ===
                            'Internal'
                    ) {
                        pushExaminerReport.examinerName =
                            ceData[ceIteration].examinerId.jobtitle +
                            ' ' +
                            ceData[ceIteration].examinerId.name
                        compiledResubIEReports.push(pushExaminerReport)
                    }

                    if (
                        totalCeIteration === ceData.length &&
                        totalIterations === rpData.length
                    ) {
                        return compiledResubIEReports
                    }
                }
            }
        } else {
            return []
        }
    }

    const handleCompiledEERebsubmitted = (ceData, rpData) => {
        let compiledResubEEReports = []
        if (rpData.length > 0 && ceData.length > 0) {
            for (let iteration = 0; iteration < rpData.length; iteration++) {
                let totalIterations = iteration + 1
                let pushExaminerReport = {
                    ...rpData[iteration],
                    examinerName: '',
                }

                for (
                    let ceIteration = 0;
                    ceIteration < ceData.length;
                    ceIteration++
                ) {
                    let totalCeIteration = ceIteration + 1

                    if (
                        ceData[ceIteration].examinerId._id ===
                            pushExaminerReport.reportId.examiner &&
                        ceData[ceIteration].examinerId.typeOfExaminer ===
                            'External'
                    ) {
                        pushExaminerReport.examinerName =
                            ceData[ceIteration].examinerId.jobtitle +
                            ' ' +
                            ceData[ceIteration].examinerId.name
                        compiledResubEEReports.push(pushExaminerReport)
                    }

                    if (
                        totalCeIteration === ceData.length &&
                        totalIterations === rpData.length
                    ) {
                        return compiledResubEEReports
                    }
                }
            }
        } else {
            return []
        }
    }

    return (
        <Container>
            {/** tab data */}
            <Stack
                direction='row'
                alignItems={'flex-end'}
                justifyContent={'space-between'}>
                <Tabs variant='unstyled'>
                    <TabList>
                        {filterTabData.map((data, index) => {
                            return (
                                <Tab
                                    key={index}
                                    _selected={{
                                        color: '#F14C54',
                                        fontWeight: '700',
                                        borderBottom: '2px solid #DB5A5A',
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
                </Tabs>

                <SearchActivity direction='row' alignItems='center'>
                    <Box
                        className='sactivity_indicator'
                        bg={searchActive ? 'green' : 'red'}
                    />
                    <Box className='sactivity_text'>Search</Box>
                    <TableButton>
                        <Button
                            onClick={handleExportation}
                            leftIcon={<BiDownload />}
                            disabled={exportData.length > 0 ? false : true}
                            className='btn__print'>
                            Export
                        </Button>
                    </TableButton>
                    <TableButton>
                        <Menu closeOnSelect={false}>
                            <MenuButton
                                h='32px'
                                w='188px'
                                className='btn__columns'
                                as={Button}
                                variant='solid'
                                leftIcon={<BiColumns />}
                                rightIcon={<IoIosArrowDown />}>
                                Columns
                            </MenuButton>
                            <MenuList>
                                {mastersTableColumn.map((data, index) => {
                                    let columnsTitle = data.title
                                        ? data.title.toLowerCase()
                                        : ''
                                    let activeColumn = data.display
                                    return (
                                        <MenuItem key={index}>
                                            <Checkbox
                                                onChange={(e) =>
                                                    handleColumnsChange(
                                                        e,
                                                        data.title
                                                    )
                                                }
                                                value={columnsTitle}
                                                isChecked={activeColumn}>
                                                {columnsTitle}
                                            </Checkbox>
                                        </MenuItem>
                                    )
                                })}
                            </MenuList>
                        </Menu>
                    </TableButton>
                </SearchActivity>
            </Stack>
            {/** student table */}
            {/** student table head */}
            <Box minH='50vh' className='table_wrapper'>
                <Table size='sm'>
                    <Thead>
                        <Tr>
                            <Th w='46px'>
                                <Checkbox
                                    isChecked={
                                        exportData.length > 0 ? true : false
                                    }
                                    onChange={handleGeneralCheckbox}
                                    bg='#ffffff'
                                    icon={<AiOutlineMinus />}
                                    colorScheme='pink'
                                />
                            </Th>

                            {mastersTableColumn.map((data, index) => {
                                if (data.display) {
                                    return (
                                        <Th key={index} className='table_head'>
                                            <Stack
                                                width='100%'
                                                direction='row'
                                                alignItems={'center'}>
                                                <Text>{data.title}</Text>

                                                {data.filter && (
                                                    <Stack
                                                        h='13px'
                                                        direction='column'
                                                        justifyContent={
                                                            'center'
                                                        }
                                                        spacing='2px'
                                                        padding='0'
                                                        m='0'>
                                                        <Box
                                                            h='30%'
                                                            color='#464F60'
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}>
                                                            <TiArrowSortedUp />
                                                        </Box>
                                                        <Box
                                                            color='#ABAAAF'
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}>
                                                            <TiArrowSortedDown />
                                                        </Box>
                                                    </Stack>
                                                )}
                                            </Stack>
                                        </Th>
                                    )
                                } else {
                                    return null
                                }
                            })}

                            <Th></Th>
                        </Tr>
                    </Thead>

                    {/** search table body */}
                    {searchActive ? (
                        <Tbody>
                            {searchData.items.length > 0 ? (
                                <>
                                    {searchData.items.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet
                                        if (
                                            data.projectStatus &&
                                            data.projectStatus.length > 0 &&
                                            projectTagData.length > 0
                                        ) {
                                            activeStatus =
                                                data.projectStatus.find(
                                                    (element) =>
                                                        element.projectStatusId
                                                            .active
                                                )
                                            if (activeStatus) {
                                                activeElementSet =
                                                    projectTagData.find(
                                                        (element) =>
                                                            element.tagName ===
                                                            activeStatus
                                                                .projectStatusId
                                                                .status
                                                    )
                                            }
                                        } else {
                                        }

                                        let allRegistrations = [
                                            ...data.registration,
                                        ]

                                        /** function to return latest registration */
                                        let returnedData =
                                            getLatestRegistration(
                                                allRegistrations
                                            )

                                        let includedInExport
                                        if (exportData.length > 0) {
                                            let checkData = exportData.some(
                                                (datacheck, index) =>
                                                    data._id === datacheck._id
                                            )

                                            includedInExport = checkData
                                        } else {
                                            includedInExport = false
                                        }

                                        /** examiners - compiled (normal version) */
                                        let compiledEx =
                                            handleCompiledExaminers(
                                                data.examiners
                                            )

                                        let compiledResubmitted =
                                            handleCompiledResubmitExaminers(
                                                data.examiners
                                            )

                                        /** examiners - compiled (resubmission) */
                                        let compiledExRp = handleCompiledExRp(
                                            data.examinerReports
                                        )
                                        let compiledResubmittedRp =
                                            handleCompiledResubmittedRp(
                                                data.examinerReports
                                            )

                                        /** reports - compiled (normal version) */
                                        let compiledInternalExaminerReports =
                                            handleCompiledIEReports(
                                                compiledEx,
                                                compiledExRp
                                            )
                                        let compiledExternalExaminerReports =
                                            handleCompiledEEReports(
                                                compiledEx,
                                                compiledExRp
                                            )

                                        /** reports - compiled (resubmission) */
                                        let compiledInternalResubmittedReports =
                                            handleCompiledIEResubmitted(
                                                compiledResubmitted,
                                                compiledResubmittedRp
                                            )
                                        let compiledExternalResubmittedReports =
                                            handleCompiledEERebsubmitted(
                                                compiledResubmitted,
                                                compiledResubmittedRp
                                            )

                                        return (
                                            <Tr
                                                className={`table_row ${
                                                    includedInExport
                                                        ? 'row_selected'
                                                        : ''
                                                }`}
                                                key={data._id}>
                                                {/** checkbox */}
                                                <Td w='46px'>
                                                    <Checkbox
                                                        isChecked={
                                                            includedInExport
                                                        }
                                                        onChange={(e) =>
                                                            handleIndivCheckbox(
                                                                e,
                                                                data
                                                            )
                                                        }
                                                        colorScheme='pink'
                                                    />
                                                </Td>
                                                {/** <Td>{index + 1}</Td> */}

                                                {/** <Td w='36px'>
                                                    <Box
                                                        onClick={handleDropDown}
                                                        ref={activeDrop}
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontSize: '16px',
                                                        }}>
                                                        {activityDrpdown ? (
                                                            <IoIosArrowDropdown />
                                                        ) : (
                                                            <IoIosArrowDropright />
                                                        )}
                                                    </Box>
                                                </Td> */}

                                                {/** student name */}
                                                {mastersTableColumn[0]
                                                    .display ? (
                                                    <Td
                                                        minW='150px'
                                                        maxW='150px'
                                                        className='studentName'
                                                        style={{
                                                            color: '#15151D',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                        }}>
                                                        {
                                                            data.student
                                                                .studentName
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** student registration name */}
                                                {mastersTableColumn[1]
                                                    .display ? (
                                                    <Td
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontWeight: 500,
                                                        }}>
                                                        {
                                                            data.student
                                                                .registrationNumber
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** gender */}
                                                {mastersTableColumn[2]
                                                    .display ? (
                                                    <Td
                                                        minW='150px'
                                                        maxW='150px'
                                                        className='studentName'
                                                        style={{
                                                            color: '#15151D',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                        }}>
                                                        {data.student.gender}
                                                    </Td>
                                                ) : null}

                                                {/** Award */}
                                                {mastersTableColumn[3]
                                                    .display ? (
                                                    <Td
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontWeight: 500,
                                                        }}>
                                                        {
                                                            data.student
                                                                .degree_program
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** topic */}
                                                {mastersTableColumn[4]
                                                    .display ? (
                                                    <Td
                                                        minW='250px'
                                                        maxW='250px'
                                                        style={{
                                                            fontWeight: 500,
                                                            color: '#15151D',
                                                        }}>
                                                        {data.topic}
                                                    </Td>
                                                ) : null}

                                                {/** school */}
                                                {mastersTableColumn[5]
                                                    .display ? (
                                                    <Td
                                                        minW='250px'
                                                        maxW='250px'
                                                        style={{
                                                            fontWeight: 500,
                                                            color: '#15151D',
                                                        }}>
                                                        {
                                                            data.student
                                                                .schoolName
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** status of student */}
                                                {mastersTableColumn[6]
                                                    .display ? (
                                                    <Td>
                                                        {' '}
                                                        <Stack>
                                                            <StatusItem
                                                                tcolors={
                                                                    activeElementSet &&
                                                                    activeElementSet.hex
                                                                        ? activeElementSet.hex
                                                                        : ''
                                                                }
                                                                bcolors={
                                                                    activeElementSet &&
                                                                    activeElementSet.rgba
                                                                        ? activeElementSet.rgba
                                                                        : ''
                                                                }
                                                                minW='260px'
                                                                direction='row'
                                                                alignItems='center'>
                                                                <div className='tag_point' />
                                                                <Text>
                                                                    {' '}
                                                                    {activeElementSet &&
                                                                    activeElementSet.tagName !==
                                                                        undefined
                                                                        ? activeElementSet.tagName
                                                                        : ''}
                                                                </Text>
                                                            </StatusItem>

                                                            {/** if status has timeline */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .timeline !==
                                                                undefined &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .timeline ===
                                                                'true' ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <TimelineCountdown
                                                                        expectedEndDate={
                                                                            activeStatus
                                                                                .projectStatusId
                                                                                .expectedEndDate
                                                                                ? activeStatus
                                                                                      .projectStatusId
                                                                                      .expectedEndDate
                                                                                : null
                                                                        }
                                                                        startDate={
                                                                            activeStatus
                                                                                .projectStatusId
                                                                                .startDate
                                                                                ? activeStatus
                                                                                      .projectStatusId
                                                                                      .startDate
                                                                                : null
                                                                        }
                                                                    />
                                                                </StatusItem>
                                                            ) : null}

                                                            {/** if statusDate */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .statusDate !==
                                                                undefined &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .statusDate ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <Text>
                                                                        {' '}
                                                                        {activeStatus &&
                                                                        activeStatus
                                                                            .projectStatusId
                                                                            .statusDate !==
                                                                            undefined
                                                                            ? Moments(
                                                                                  new Date(
                                                                                      activeStatus.projectStatusId.statusDate
                                                                                  )
                                                                              ).format(
                                                                                  'DD MMM YY'
                                                                              )
                                                                            : ''}
                                                                    </Text>
                                                                </StatusItem>
                                                            ) : null}

                                                            {/** if graduated */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .status ===
                                                                'Graduated' ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <Text>
                                                                        {' '}
                                                                        {activeStatus &&
                                                                        activeStatus
                                                                            .projectStatusId
                                                                            .status ===
                                                                            'Graduated'
                                                                            ? Moments(
                                                                                  new Date(
                                                                                      data.GraduationDate
                                                                                  )
                                                                              ).format(
                                                                                  'YYYY'
                                                                              )
                                                                            : ''}
                                                                    </Text>
                                                                </StatusItem>
                                                            ) : null}
                                                        </Stack>
                                                    </Td>
                                                ) : null}
                                                {/** number of examiners */}
                                                {mastersTableColumn[7]
                                                    .display ? (
                                                    <Td>
                                                        <Box
                                                            m='auto'
                                                            w='100%'
                                                            display='flex'
                                                            justifyContent={
                                                                'center'
                                                            }>
                                                            {data.examiners
                                                                .length < 1 ? (
                                                                <Tooltip
                                                                    color='#fbd2d4'
                                                                    borderRadius={
                                                                        '8px'
                                                                    }
                                                                    height='30px'
                                                                    hasArrow
                                                                    label={
                                                                        <Box
                                                                            style={{
                                                                                fontFamily:
                                                                                    'Inter',
                                                                                fontSize:
                                                                                    '14px',
                                                                            }}
                                                                            w='100%'
                                                                            h='100%'
                                                                            display='flex'
                                                                            alignItems={
                                                                                'center'
                                                                            }
                                                                            p='10px 5px 10px 5px'>
                                                                            Assign
                                                                            Examiners
                                                                        </Box>
                                                                    }>
                                                                    <Box className='add_examiners'>
                                                                        <AiOutlinePlus />
                                                                    </Box>
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip
                                                                    hasArrow
                                                                    color='#fbd2d4'
                                                                    borderRadius={
                                                                        '8px'
                                                                    }
                                                                    label={
                                                                        <Box
                                                                            style={{
                                                                                fontFamily:
                                                                                    'Inter',
                                                                                fontSize:
                                                                                    '14px',
                                                                            }}
                                                                            w='100%'
                                                                            h='100%'
                                                                            display='flex'
                                                                            flexDirection={
                                                                                'column'
                                                                            }
                                                                            alignItems={
                                                                                'center'
                                                                            }>
                                                                            <Box p='10px 5px 10px 5px'>
                                                                                Assign
                                                                                Examiners
                                                                            </Box>
                                                                            <Divider />
                                                                            <Box p='10px 5px 10px 5px'>
                                                                                View
                                                                                Examiners
                                                                            </Box>
                                                                        </Box>
                                                                    }>
                                                                    <Box className='examiner_item'>
                                                                        {
                                                                            data
                                                                                .examiners
                                                                                .length
                                                                        }
                                                                    </Box>
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                    </Td>
                                                ) : null}
                                                {/** internal examiners */}
                                                {mastersTableColumn[8]
                                                    .display ? (
                                                    <Td minW='250px'>
                                                        {/** normal reports */}
                                                        {compiledInternalExaminerReports.length >
                                                        0 ? (
                                                            <Stack direction='column'>
                                                                {compiledInternalExaminerReports.map(
                                                                    (
                                                                        internalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    internalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        internalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** status and marks */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** status and marks */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                internalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !internalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : (
                                                            <Stack direction='column'>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    className='subtype'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    -
                                                                </Box>
                                                            </Stack>
                                                        )}
                                                        {/** resubmitted reports */}
                                                        {compiledInternalResubmittedReports.length >
                                                        0 ? (
                                                            <Stack
                                                                mt='10px'
                                                                direction='column'>
                                                                <ResubmissionHead>
                                                                    Resubmitted
                                                                    reports
                                                                </ResubmissionHead>
                                                                {compiledInternalResubmittedReports.map(
                                                                    (
                                                                        internalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    internalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                {/** examiner name */}
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        internalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** umarked report status  */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** marked report status  */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                internalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !internalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : null}
                                                    </Td>
                                                ) : null}
                                                {/** external examiners */}
                                                {mastersTableColumn[9]
                                                    .display ? (
                                                    <Td minW='250px'>
                                                        {/** normal reports */}
                                                        {compiledExternalExaminerReports.length >
                                                        0 ? (
                                                            <Stack direction='column'>
                                                                {compiledExternalExaminerReports.map(
                                                                    (
                                                                        externalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Popover>
                                                                                <PopoverTrigger>
                                                                                    <Stack
                                                                                        className={`iereport_container ${
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus &&
                                                                                            externalEData.reportId.reportStatus.toLowerCase() ==
                                                                                                'passed'
                                                                                                ? 'passed'
                                                                                                : null
                                                                                        } ${
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus ===
                                                                                            'failed'
                                                                                                ? 'failed'
                                                                                                : null
                                                                                        } ${
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus ===
                                                                                            'pending'
                                                                                                ? 'pending'
                                                                                                : null
                                                                                        }`}
                                                                                        key={
                                                                                            iEIndex
                                                                                        }
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }
                                                                                        alignItems={
                                                                                            'center'
                                                                                        }
                                                                                        bg={
                                                                                            'red'
                                                                                        }
                                                                                        padding='0'
                                                                                        gap='0px'
                                                                                        direction='column'>
                                                                                        {/** examiner name */}
                                                                                        <Box
                                                                                            w='100%'
                                                                                            style={{
                                                                                                textTransform:
                                                                                                    'capitalize',
                                                                                                fontSize:
                                                                                                    '15px',

                                                                                                fontWeight:
                                                                                                    '500',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                                textAlign:
                                                                                                    'center',
                                                                                            }}
                                                                                            display='flex'
                                                                                            justifyContent={
                                                                                                'center'
                                                                                            }>
                                                                                            {
                                                                                                externalEData.examinerName
                                                                                            }
                                                                                        </Box>
                                                                                        {/** umarked report status  */}
                                                                                        {externalEData
                                                                                            .reportId
                                                                                            .marked ===
                                                                                        false ? (
                                                                                            <Box
                                                                                                style={{
                                                                                                    paddingLeft:
                                                                                                        '3px',
                                                                                                    textTransform:
                                                                                                        'uppercase',
                                                                                                    marginTop:
                                                                                                        '10px',
                                                                                                    fontSize:
                                                                                                        '11px',
                                                                                                    letterSpacing:
                                                                                                        '0.4px',
                                                                                                }}
                                                                                                w='100%'
                                                                                                display='flex'
                                                                                                justifyContent={
                                                                                                    'center'
                                                                                                }>
                                                                                                {
                                                                                                    externalEData
                                                                                                        .reportId
                                                                                                        .reportStatus
                                                                                                }
                                                                                            </Box>
                                                                                        ) : null}
                                                                                        {/** marked report status  */}
                                                                                        {externalEData
                                                                                            .reportId
                                                                                            .marked ===
                                                                                        false ? null : (
                                                                                            <Box
                                                                                                style={{
                                                                                                    textTransform:
                                                                                                        'uppercase',
                                                                                                    fontSize:
                                                                                                        '14px',
                                                                                                    marginTop:
                                                                                                        '4px',

                                                                                                    fontFamily:
                                                                                                        'Inter',
                                                                                                    fontWeight:
                                                                                                        '500',
                                                                                                    letterSpacing:
                                                                                                        '0.4px',
                                                                                                }}
                                                                                                w='100%'
                                                                                                display='flex'
                                                                                                justifyContent={
                                                                                                    'center'
                                                                                                }>
                                                                                                {
                                                                                                    externalEData
                                                                                                        .reportId
                                                                                                        .score
                                                                                                }

                                                                                                %{' '}
                                                                                                {
                                                                                                    '-'
                                                                                                }{' '}
                                                                                                <span
                                                                                                    style={{
                                                                                                        paddingLeft:
                                                                                                            '3px',
                                                                                                        fontSize:
                                                                                                            '11px',
                                                                                                        letterSpacing:
                                                                                                            '0.4px',
                                                                                                    }}>
                                                                                                    {
                                                                                                        externalEData
                                                                                                            .reportId
                                                                                                            .reportStatus
                                                                                                    }
                                                                                                </span>
                                                                                            </Box>
                                                                                        )}

                                                                                        {/** marked submission Date */}
                                                                                        {externalEData
                                                                                            .reportId
                                                                                            .marked ===
                                                                                            false &&
                                                                                        !externalEData
                                                                                            .reportId
                                                                                            .submissionDate ? null : (
                                                                                            <Box
                                                                                                w='100%'
                                                                                                style={{
                                                                                                    textTransform:
                                                                                                        'lowercase',
                                                                                                    fontSize:
                                                                                                        '14px',
                                                                                                    marginTop:
                                                                                                        '10px',

                                                                                                    fontFamily:
                                                                                                        'Inter',
                                                                                                    letterSpacing:
                                                                                                        '0.4px',
                                                                                                }}
                                                                                                display='flex'
                                                                                                justifyContent={
                                                                                                    'center'
                                                                                                }>
                                                                                                {Moments(
                                                                                                    new Date(
                                                                                                        externalEData.reportId.submissionDate
                                                                                                    )
                                                                                                ).format(
                                                                                                    'DD/MM/YYYY'
                                                                                                )}{' '}
                                                                                                {Moments(
                                                                                                    new Date(
                                                                                                        externalEData.reportId.submissionDate
                                                                                                    )
                                                                                                ).format(
                                                                                                    'hh:mm a'
                                                                                                )}
                                                                                            </Box>
                                                                                        )}
                                                                                    </Stack>
                                                                                </PopoverTrigger>

                                                                                <PopoverContent w='200px'>
                                                                                    <PopoverHeader
                                                                                        className='reportAction_title'
                                                                                        textAlign={
                                                                                            'center'
                                                                                        }>
                                                                                        Manage
                                                                                        Report
                                                                                    </PopoverHeader>
                                                                                    <PopoverArrow bg='blue.800' />
                                                                                    <PopoverCloseButton />
                                                                                    <PopoverBody>
                                                                                        <Stack direction='column'>
                                                                                            <Button
                                                                                                colorScheme={
                                                                                                    'red'
                                                                                                }
                                                                                                className='reportAction_button'
                                                                                                variant='solid'>
                                                                                                Edit
                                                                                                Report
                                                                                            </Button>

                                                                                            <Button
                                                                                                colorScheme={
                                                                                                    'red'
                                                                                                }
                                                                                                className='reportAction_button'
                                                                                                variant='solid'>
                                                                                                View
                                                                                                Report
                                                                                            </Button>
                                                                                        </Stack>
                                                                                    </PopoverBody>
                                                                                </PopoverContent>
                                                                            </Popover>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : (
                                                            <Stack direction='column'>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    className='subtype'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    -
                                                                </Box>
                                                            </Stack>
                                                        )}

                                                        {/** resubmitted reports */}
                                                        {compiledExternalResubmittedReports.length >
                                                        0 ? (
                                                            <Stack
                                                                mt='10px'
                                                                direction='column'>
                                                                <ResubmissionHead>
                                                                    Resubmitted
                                                                    reports
                                                                </ResubmissionHead>
                                                                {compiledExternalResubmittedReports.map(
                                                                    (
                                                                        externalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    externalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                {/** examiner name */}
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        externalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** umarked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** marked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                externalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !externalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : null}
                                                    </Td>
                                                ) : null}
                                                {/** registration status */}
                                                {mastersTableColumn[10]
                                                    .display ? (
                                                    <Td>
                                                        <Box className='registration'>
                                                            {returnedData}{' '}
                                                        </Box>
                                                    </Td>
                                                ) : null}
                                                {/** submission status */}
                                                {mastersTableColumn[11]
                                                    .display ? (
                                                    <Td>
                                                        <Box
                                                            m='auto'
                                                            w='100%'
                                                            display='flex'
                                                            className='subtype'
                                                            justifyContent={
                                                                'center'
                                                            }>
                                                            {
                                                                data.submissionStatus
                                                            }
                                                        </Box>
                                                    </Td>
                                                ) : null}

                                                {/** operation links  */}
                                                <Td>
                                                    <Menu>
                                                        <MenuButton>
                                                            <Box fontSize='20px'>
                                                                <TbDotsVertical />
                                                            </Box>
                                                        </MenuButton>
                                                        <MenuList zIndex={'10'}>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    routeNavigate(
                                                                        `${rpath}/projectreport/${data._id}`
                                                                    )
                                                                }>
                                                                View Student
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        data,
                                                                        data
                                                                            .student
                                                                            .studentName
                                                                    )
                                                                }>
                                                                Delete Student
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <Tr
                                    position='relative'
                                    h='48px'
                                    borderBottom={'1px solid #E1FCEF'}>
                                    <Box>
                                        <NoItems>No Records Found</NoItems>
                                    </Box>
                                </Tr>
                            )}
                        </Tbody>
                    ) : (
                        <Tbody>
                            {/** non-search table body (All items)  */}
                            {allDisplayData.items.length > 0 ? (
                                <>
                                    {allDisplayData.items.map((data, index) => {
                                        let activeStatus
                                        let activeElementSet
                                        if (
                                            data.projectStatus &&
                                            data.projectStatus.length > 0 &&
                                            projectTagData.length > 0
                                        ) {
                                            activeStatus =
                                                data.projectStatus.find(
                                                    (element) =>
                                                        element.projectStatusId
                                                            .active
                                                )
                                            if (activeStatus) {
                                                activeElementSet =
                                                    projectTagData.find(
                                                        (element) =>
                                                            element.tagName ===
                                                            activeStatus
                                                                .projectStatusId
                                                                .status
                                                    )
                                            }
                                        } else {
                                        }

                                        /** handle timeline countdown */

                                        let allRegistrations = [
                                            ...data.registration,
                                        ]

                                        /** function to return latest registration */
                                        let returnedData =
                                            getLatestRegistration(
                                                allRegistrations
                                            )

                                        let includedInExport
                                        if (exportData.length > 0) {
                                            let checkData = exportData.some(
                                                (datacheck, index) =>
                                                    data._id === datacheck._id
                                            )

                                            includedInExport = checkData
                                        } else {
                                            includedInExport = false
                                        }

                                        /** examiners - compiled (normal version) */
                                        let compiledEx =
                                            handleCompiledExaminers(
                                                data.examiners
                                            )

                                        let compiledResubmitted =
                                            handleCompiledResubmitExaminers(
                                                data.examiners
                                            )

                                        /** examiners - compiled (resubmission) */
                                        let compiledExRp = handleCompiledExRp(
                                            data.examinerReports
                                        )
                                        let compiledResubmittedRp =
                                            handleCompiledResubmittedRp(
                                                data.examinerReports
                                            )

                                        /** reports - compiled (normal version) */
                                        let compiledInternalExaminerReports =
                                            handleCompiledIEReports(
                                                compiledEx,
                                                compiledExRp
                                            )
                                        let compiledExternalExaminerReports =
                                            handleCompiledEEReports(
                                                compiledEx,
                                                compiledExRp
                                            )

                                        /** reports - compiled (resubmission) */
                                        let compiledInternalResubmittedReports =
                                            handleCompiledIEResubmitted(
                                                compiledResubmitted,
                                                compiledResubmittedRp
                                            )
                                        let compiledExternalResubmittedReports =
                                            handleCompiledEERebsubmitted(
                                                compiledResubmitted,
                                                compiledResubmittedRp
                                            )

                                        return (
                                            <Tr
                                                className={`table_row ${
                                                    includedInExport
                                                        ? 'row_selected'
                                                        : ''
                                                }`}
                                                key={data._id}>
                                                {/**checkbox */}
                                                <Td w='46px'>
                                                    <Checkbox
                                                        isChecked={
                                                            includedInExport
                                                        }
                                                        onChange={(e) =>
                                                            handleIndivCheckbox(
                                                                e,
                                                                data
                                                            )
                                                        }
                                                        colorScheme='pink'
                                                    />
                                                </Td>

                                                {/** student name */}
                                                {mastersTableColumn[0]
                                                    .display ? (
                                                    <Td
                                                        minW='150px'
                                                        maxW='150px'
                                                        className='studentName'
                                                        style={{
                                                            color: '#15151D',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                        }}>
                                                        {
                                                            data.student
                                                                .studentName
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** student registration name */}
                                                {mastersTableColumn[1]
                                                    .display ? (
                                                    <Td
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontWeight: 500,
                                                        }}>
                                                        {
                                                            data.student
                                                                .registrationNumber
                                                        }
                                                    </Td>
                                                ) : null}

                                                {/** gender */}
                                                {mastersTableColumn[2]
                                                    .display ? (
                                                    <Td
                                                        minW='150px'
                                                        maxW='150px'
                                                        className='studentName'
                                                        style={{
                                                            color: '#15151D',
                                                            fontWeight: 500,
                                                            fontSize: '13px',
                                                        }}>
                                                        {data.student.gender}
                                                    </Td>
                                                ) : null}

                                                {/** Award */}
                                                {mastersTableColumn[3]
                                                    .display ? (
                                                    <Td
                                                        style={{
                                                            color: '#5E5C60',
                                                            fontWeight: 500,
                                                        }}>
                                                        {
                                                            data.student
                                                                .degree_program
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** topic */}
                                                {mastersTableColumn[4]
                                                    .display ? (
                                                    <Td
                                                        minW='250px'
                                                        maxW='250px'
                                                        style={{
                                                            fontWeight: 500,
                                                            color: '#15151D',
                                                        }}>
                                                        {data.topic}
                                                    </Td>
                                                ) : null}

                                                {/** school */}
                                                {mastersTableColumn[5]
                                                    .display ? (
                                                    <Td
                                                        minW='250px'
                                                        maxW='250px'
                                                        style={{
                                                            fontWeight: 500,
                                                            color: '#15151D',
                                                        }}>
                                                        {
                                                            data.student
                                                                .schoolName
                                                        }
                                                    </Td>
                                                ) : null}
                                                {/** status of student */}
                                                {mastersTableColumn[6]
                                                    .display ? (
                                                    <Td>
                                                        {' '}
                                                        <Stack>
                                                            <StatusItem
                                                                tcolors={
                                                                    activeElementSet &&
                                                                    activeElementSet.hex
                                                                        ? activeElementSet.hex
                                                                        : ''
                                                                }
                                                                bcolors={
                                                                    activeElementSet &&
                                                                    activeElementSet.rgba
                                                                        ? activeElementSet.rgba
                                                                        : ''
                                                                }
                                                                minW='260px'
                                                                direction='row'
                                                                alignItems='center'>
                                                                <div className='tag_point' />
                                                                <Text>
                                                                    {' '}
                                                                    {activeElementSet &&
                                                                    activeElementSet.tagName !==
                                                                        undefined
                                                                        ? activeElementSet.tagName
                                                                        : ''}
                                                                </Text>
                                                            </StatusItem>

                                                            {/** if status has timeline */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .timeline !==
                                                                undefined &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .timeline ===
                                                                'true' ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <TimelineCountdown
                                                                        expectedEndDate={
                                                                            activeStatus
                                                                                .projectStatusId
                                                                                .expectedEndDate
                                                                                ? activeStatus
                                                                                      .projectStatusId
                                                                                      .expectedEndDate
                                                                                : null
                                                                        }
                                                                        startDate={
                                                                            activeStatus
                                                                                .projectStatusId
                                                                                .startDate
                                                                                ? activeStatus
                                                                                      .projectStatusId
                                                                                      .startDate
                                                                                : null
                                                                        }
                                                                    />
                                                                </StatusItem>
                                                            ) : null}

                                                            {/** if statusDate */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .statusDate !==
                                                                undefined &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .statusDate ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <Text>
                                                                        {' '}
                                                                        {activeStatus &&
                                                                        activeStatus
                                                                            .projectStatusId
                                                                            .statusDate !==
                                                                            undefined
                                                                            ? Moments(
                                                                                  new Date(
                                                                                      activeStatus.projectStatusId.statusDate
                                                                                  )
                                                                              ).format(
                                                                                  'DD MMM YY'
                                                                              )
                                                                            : ''}
                                                                    </Text>
                                                                </StatusItem>
                                                            ) : null}

                                                            {/** if graduated */}
                                                            {activeStatus &&
                                                            activeStatus
                                                                .projectStatusId
                                                                .status ===
                                                                'Graduated' ? (
                                                                <StatusItem
                                                                    tcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.hex
                                                                            ? activeElementSet.hex
                                                                            : ''
                                                                    }
                                                                    bcolors={
                                                                        activeElementSet &&
                                                                        activeElementSet.rgba
                                                                            ? '#eeeeef'
                                                                            : ''
                                                                    }
                                                                    minW='260px'
                                                                    direction='row'
                                                                    justifyContent='center'
                                                                    alignItems='center'>
                                                                    <Text>
                                                                        {' '}
                                                                        {activeStatus &&
                                                                        activeStatus
                                                                            .projectStatusId
                                                                            .status ===
                                                                            'Graduated'
                                                                            ? Moments(
                                                                                  new Date(
                                                                                      data.GraduationDate
                                                                                  )
                                                                              ).format(
                                                                                  'YYYY'
                                                                              )
                                                                            : ''}
                                                                    </Text>
                                                                </StatusItem>
                                                            ) : null}
                                                        </Stack>
                                                    </Td>
                                                ) : null}
                                                {/** number of examiners */}
                                                {mastersTableColumn[7]
                                                    .display ? (
                                                    <Td>
                                                        <Box
                                                            m='auto'
                                                            w='100%'
                                                            display='flex'
                                                            justifyContent={
                                                                'center'
                                                            }>
                                                            {data.examiners
                                                                .length < 1 ? (
                                                                <Tooltip
                                                                    color='#fbd2d4'
                                                                    borderRadius={
                                                                        '8px'
                                                                    }
                                                                    height='30px'
                                                                    hasArrow
                                                                    label={
                                                                        <Box
                                                                            style={{
                                                                                fontFamily:
                                                                                    'Inter',
                                                                                fontSize:
                                                                                    '14px',
                                                                            }}
                                                                            w='100%'
                                                                            h='100%'
                                                                            display='flex'
                                                                            alignItems={
                                                                                'center'
                                                                            }
                                                                            p='10px 5px 10px 5px'>
                                                                            Assign
                                                                            Examiners
                                                                        </Box>
                                                                    }>
                                                                    <Box className='add_examiners'>
                                                                        <AiOutlinePlus />
                                                                    </Box>
                                                                </Tooltip>
                                                            ) : (
                                                                <Tooltip
                                                                    hasArrow
                                                                    color='#fbd2d4'
                                                                    borderRadius={
                                                                        '8px'
                                                                    }
                                                                    label={
                                                                        <Box
                                                                            style={{
                                                                                fontFamily:
                                                                                    'Inter',
                                                                                fontSize:
                                                                                    '14px',
                                                                            }}
                                                                            w='100%'
                                                                            h='100%'
                                                                            display='flex'
                                                                            flexDirection={
                                                                                'column'
                                                                            }
                                                                            alignItems={
                                                                                'center'
                                                                            }>
                                                                            <Box p='10px 5px 10px 5px'>
                                                                                Assign
                                                                                Examiners
                                                                            </Box>
                                                                            <Divider />
                                                                            <Box p='10px 5px 10px 5px'>
                                                                                View
                                                                                Examiners
                                                                            </Box>
                                                                        </Box>
                                                                    }>
                                                                    <Box className='examiner_item'>
                                                                        {
                                                                            data
                                                                                .examiners
                                                                                .length
                                                                        }
                                                                    </Box>
                                                                </Tooltip>
                                                            )}
                                                        </Box>
                                                    </Td>
                                                ) : null}
                                                {/** internal examiners */}
                                                {mastersTableColumn[8]
                                                    .display ? (
                                                    <Td minW='250px'>
                                                        {/** normal reports */}
                                                        {compiledInternalExaminerReports.length >
                                                        0 ? (
                                                            <Stack direction='column'>
                                                                {compiledInternalExaminerReports.map(
                                                                    (
                                                                        internalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    internalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        internalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** status and marks */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** status and marks */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                internalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !internalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : (
                                                            <Stack direction='column'>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    className='subtype'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    -
                                                                </Box>
                                                            </Stack>
                                                        )}

                                                        {/** resubmitted reports */}

                                                        {compiledInternalResubmittedReports.length >
                                                        0 ? (
                                                            <Stack
                                                                mt='10px'
                                                                direction='column'>
                                                                <ResubmissionHead>
                                                                    Resubmitted
                                                                    reports
                                                                </ResubmissionHead>
                                                                {compiledInternalResubmittedReports.map(
                                                                    (
                                                                        internalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    internalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    internalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                {/** examiner name */}
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        internalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** umarked report status  */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** marked report status  */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            internalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                internalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {internalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !internalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                internalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : null}
                                                    </Td>
                                                ) : null}

                                                {/** external examiners */}
                                                {mastersTableColumn[9]
                                                    .display ? (
                                                    <Td minW='250px'>
                                                        {/** normal reports */}
                                                        {compiledExternalExaminerReports.length >
                                                        0 ? (
                                                            <Stack direction='column'>
                                                                {compiledExternalExaminerReports.map(
                                                                    (
                                                                        externalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    externalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                {/** examiner name */}
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        externalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** umarked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** marked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                externalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !externalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : (
                                                            <Stack direction='column'>
                                                                <Box
                                                                    m='auto'
                                                                    w='100%'
                                                                    display='flex'
                                                                    className='subtype'
                                                                    justifyContent={
                                                                        'center'
                                                                    }>
                                                                    -
                                                                </Box>
                                                            </Stack>
                                                        )}

                                                        {/** resubmitted reports */}
                                                        {compiledExternalResubmittedReports.length >
                                                        0 ? (
                                                            <Stack
                                                                mt='10px'
                                                                direction='column'>
                                                                <ResubmissionHead>
                                                                    Resubmitted
                                                                    reports
                                                                </ResubmissionHead>
                                                                {compiledExternalResubmittedReports.map(
                                                                    (
                                                                        externalEData,
                                                                        iEIndex
                                                                    ) => {
                                                                        return (
                                                                            <Stack
                                                                                className={`iereport_container ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus &&
                                                                                    externalEData.reportId.reportStatus.toLowerCase() ==
                                                                                        'passed'
                                                                                        ? 'passed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'failed'
                                                                                        ? 'failed'
                                                                                        : null
                                                                                } ${
                                                                                    externalEData
                                                                                        .reportId
                                                                                        .reportStatus ===
                                                                                    'pending'
                                                                                        ? 'pending'
                                                                                        : null
                                                                                }`}
                                                                                key={
                                                                                    iEIndex
                                                                                }
                                                                                display='flex'
                                                                                justifyContent={
                                                                                    'center'
                                                                                }
                                                                                alignItems={
                                                                                    'center'
                                                                                }
                                                                                bg={
                                                                                    'red'
                                                                                }
                                                                                padding='0'
                                                                                gap='0px'
                                                                                direction='column'>
                                                                                {/** examiner name */}
                                                                                <Box
                                                                                    w='100%'
                                                                                    style={{
                                                                                        textTransform:
                                                                                            'capitalize',
                                                                                        fontSize:
                                                                                            '15px',

                                                                                        fontWeight:
                                                                                            '500',
                                                                                        letterSpacing:
                                                                                            '0.4px',
                                                                                        textAlign:
                                                                                            'center',
                                                                                    }}
                                                                                    display='flex'
                                                                                    justifyContent={
                                                                                        'center'
                                                                                    }>
                                                                                    {
                                                                                        externalEData.examinerName
                                                                                    }
                                                                                </Box>
                                                                                {/** umarked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? (
                                                                                    <Box
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                '3px',
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            marginTop:
                                                                                                '10px',
                                                                                            fontSize:
                                                                                                '11px',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .reportStatus
                                                                                        }
                                                                                    </Box>
                                                                                ) : null}
                                                                                {/** marked report status  */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                false ? null : (
                                                                                    <Box
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'uppercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '4px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            fontWeight:
                                                                                                '500',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        w='100%'
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {
                                                                                            externalEData
                                                                                                .reportId
                                                                                                .score
                                                                                        }

                                                                                        %{' '}
                                                                                        {
                                                                                            '-'
                                                                                        }{' '}
                                                                                        <span
                                                                                            style={{
                                                                                                paddingLeft:
                                                                                                    '3px',
                                                                                                fontSize:
                                                                                                    '11px',
                                                                                                letterSpacing:
                                                                                                    '0.4px',
                                                                                            }}>
                                                                                            {
                                                                                                externalEData
                                                                                                    .reportId
                                                                                                    .reportStatus
                                                                                            }
                                                                                        </span>
                                                                                    </Box>
                                                                                )}

                                                                                {/** marked submission Date */}
                                                                                {externalEData
                                                                                    .reportId
                                                                                    .marked ===
                                                                                    false &&
                                                                                !externalEData
                                                                                    .reportId
                                                                                    .submissionDate ? null : (
                                                                                    <Box
                                                                                        w='100%'
                                                                                        style={{
                                                                                            textTransform:
                                                                                                'lowercase',
                                                                                            fontSize:
                                                                                                '14px',
                                                                                            marginTop:
                                                                                                '10px',

                                                                                            fontFamily:
                                                                                                'Inter',
                                                                                            letterSpacing:
                                                                                                '0.4px',
                                                                                        }}
                                                                                        display='flex'
                                                                                        justifyContent={
                                                                                            'center'
                                                                                        }>
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'DD/MM/YYYY'
                                                                                        )}{' '}
                                                                                        {Moments(
                                                                                            new Date(
                                                                                                externalEData.reportId.submissionDate
                                                                                            )
                                                                                        ).format(
                                                                                            'hh:mm a'
                                                                                        )}
                                                                                    </Box>
                                                                                )}
                                                                            </Stack>
                                                                        )
                                                                    }
                                                                )}
                                                            </Stack>
                                                        ) : null}
                                                    </Td>
                                                ) : null}
                                                {/** registration status */}
                                                {mastersTableColumn[10]
                                                    .display ? (
                                                    <Td>
                                                        <Box className='registration'>
                                                            {returnedData}{' '}
                                                        </Box>
                                                    </Td>
                                                ) : null}
                                                {/** submission status */}
                                                {mastersTableColumn[11]
                                                    .display ? (
                                                    <Td>
                                                        <Box
                                                            m='auto'
                                                            w='100%'
                                                            display='flex'
                                                            className='subtype'
                                                            justifyContent={
                                                                'center'
                                                            }>
                                                            {
                                                                data.submissionStatus
                                                            }
                                                        </Box>
                                                    </Td>
                                                ) : null}
                                                {/** operation links  */}
                                                <Td>
                                                    <Menu>
                                                        <MenuButton>
                                                            <Box fontSize='20px'>
                                                                <TbDotsVertical />
                                                            </Box>
                                                        </MenuButton>
                                                        <MenuList zIndex={'10'}>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    routeNavigate(
                                                                        `${rpath}/projectreport/${data._id}`
                                                                    )
                                                                }>
                                                                View Student
                                                            </MenuItem>
                                                            <MenuItem
                                                                onClick={() =>
                                                                    handleRemove(
                                                                        data,
                                                                        data
                                                                            .student
                                                                            .studentName
                                                                    )
                                                                }>
                                                                Delete Student
                                                            </MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        )
                                    })}
                                </>
                            ) : (
                                <Tr
                                    position='relative'
                                    h='48px'
                                    borderBottom={'1px solid #E1FCEF'}>
                                    <Box>
                                        <NoItems>No Records Found</NoItems>
                                    </Box>
                                </Tr>
                            )}
                        </Tbody>
                    )}
                </Table>
            </Box>

            {/** Pagination */}

            {searchActive ? (
                <Box w='100%'>
                    {searchData.items.length > 0 && (
                        <PaginationStack
                            direction='row'
                            h='56px'
                            pr='10px'
                            alignItems='center'
                            justifyContent={'space-between'}>
                            <Box className='pages'>
                                <span>
                                    {`${PaginationSFirstNumber}`} -{' '}
                                    {`${PaginationSLastNumber}`} of{' '}
                                    {`${searchData.totalSearchedItems}`}
                                </span>
                            </Box>
                            <Stack
                                h='90%'
                                direction='row'
                                spacing='20px'
                                p='10px'
                                alignItems='center'
                                className='pagination'>
                                <Box className='rows'>
                                    <h1>Rows per page:</h1>
                                    <span>{searchData.itemsPerPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box
                                        as={Button}
                                        className='left'
                                        onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box className='pageNumbs'>
                                        {searchData.currentPage}/
                                        {searchData.totalPages}
                                    </Box>
                                    <Box
                                        as={Button}
                                        className='right'
                                        onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Box>
            ) : (
                <Box w='100%'>
                    {allDisplayData.items.length > 0 && (
                        <PaginationStack
                            direction='row'
                            h='56px'
                            pr='10px'
                            alignItems='center'
                            justifyContent={'space-between'}>
                            <Box className='pages'>
                                <span>
                                    {`${PaginationFirstNumber}`} -{' '}
                                    {`${PaginationLastNumber}`} of{' '}
                                    {`${allDisplayData.totalAllItems}`}
                                </span>
                            </Box>
                            <Stack
                                h='90%'
                                direction='row'
                                spacing='20px'
                                p='10px'
                                alignItems='center'
                                className='pagination'>
                                <Box className='rows'>
                                    <h1>Rows per page:</h1>
                                    <span>{allDisplayData.itemsPerPage}</span>
                                </Box>

                                {/** pagination arrows */}
                                <Stack
                                    direction='row'
                                    alignItems='center'
                                    className='arrows'>
                                    <Box
                                        as={Button}
                                        className='left'
                                        onClick={handlePrev}>
                                        <MdKeyboardArrowLeft />
                                    </Box>
                                    <Box>
                                        {' '}
                                        {allDisplayData.currentPage}/
                                        {allDisplayData.totalPages}
                                    </Box>
                                    <Box
                                        as={Button}
                                        className='right'
                                        onClick={handleNext}>
                                        <MdKeyboardArrowRight />
                                    </Box>
                                </Stack>
                            </Stack>
                        </PaginationStack>
                    )}
                </Box>
            )}

            {/** handle delete registration */}
            <DeleteStudentModal
                cancelRemoveUpload={cancelRemoveUpload}
                removeActive={removeActive}
                removeDetails={removeDetails}
                onRemoveUpload={onRemoveUpload}
                isSubmittingp={isSubmittingp}
            />

            {/** temporarily remove before upload of new version */}

            <EditReportModal
                cancelRemoveUpload={cancelRemoveUpload}
                removeActive={removeActive}
                removeDetails={removeDetails}
                onRemoveUpload={onRemoveUpload}
                isSubmittingp={isSubmittingp}
            />
            <ViewReportModal
                cancelRemoveUpload={cancelRemoveUpload}
                removeActive={removeActive}
                removeDetails={removeDetails}
                onRemoveUpload={onRemoveUpload}
                isSubmittingp={isSubmittingp}
            />
        </Container>
    )
}

export default ProjectTable

const Container = styled(Stack)`
    font-family: 'Inter', sans-serif;
    .tab {
        font-family: 'Inter', sans-serif;
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

    .reviews {
        color: #aa5b00 !important;
        background: #fcf2e6 !important;

        div {
            background: #c97a20;
        }
    }

    .approved {
        color: #293ad1;
        background: #edeeff;

        div {
            background: #6054ef;
        }
    }

    .completed {
        color: #14804a;
        background: #e1fcef;
        div {
            background: #38a06c;
        }
    }

    .graduated {
        color: #5a6376;
        background: #e9edf5;
        div {
            background: #687182;
        }
    }

    .onhold {
        color: #d1293d;
        background: #ffedef;
        div {
            background: #ef5466;
        }
    }

    .table_wrapper {
        overflow-x: auto !important;
    }

    table {
        overflow-x: auto !important;
    }
    thead {
        background: rgba(247, 249, 252, 0.8);
        backdrop-filter: blur(8px);
    }

    .table_head {
        color: #5e5c60 !important;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px !important;
        height: 34px;
    }

    td {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 13px;
        color: #3a3a43;
    }

    .studentName {
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
        color: #464f60;
        font-size: 15px;
        background: #ffffff;
    }

    .examiner_item {
        width: 24px;
        height: 24px;
        background: #eeeeef;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .subtype {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12.5px;
        text-transform: capitalize;
        padding: 4px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eeeeef;
        border-radius: 4px;
    }

    .iereport_container {
        font-family: 'Inter', sans-serif;
        font-style: normal;

        font-size: 12.5px;
        text-transform: capitalize;
        padding: 8px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #eeeeef;
        border-radius: 4px;
        cursor: pointer;
    }

    .reportAction_title {
        font-weight: bold;
        font-family: 'Inter', sans-serif;
    }

    .reportAction_button {
        height: 32px;
        color: #ffffff;
        background: #edafb2;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #edafb2;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        letter-spacing: 0.02em;
        font-size: 14px;
    }

    .pending {
        color: #fff;
        background: #745f3ccb;
    }

    .failed {
        color: white;
        background: #f63636;
    }

    .passed {
        color: white;
        background: #02994b;
    }

    .registration {
        min-width: 140px;
        width: 100%;
        color: #3a3a43;
        padding: 4px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eeeeef;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        text-transform: uppercase;
    }

    .supervisor {
        background: #eeeeef;
        border-radius: 6px;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #3a3a43;
    }

    .table_row {
        &:hover {
            background: #fef9ef;
        }
    }

    .row_selected {
        background: #fef9ef;
    }
`

const StatusItem = styled(Stack)`
    border-radius: 4px;

    padding: 3px 8px 3px 8px;
    background: ${({ bcolors }) => bcolors};
    .tag_point {
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

const NoItems = styled(Box)`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
`

const PaginationStack = styled(Stack)`
    overflow: hidden;
    .pagination {
        color: #6b7280;
        align-items: center;
        justify-content: flex-end;

        background: #ffffff;
    }
    .pages {
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        line-height: 166%;
        color: #111827;
    }

    .rows {
        display: flex;
        align-items: center;
        h1 {
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 166%;
        }
        span {
            margin-left: 2px;
            font-family: 'Inter', sans-serif;
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 19px;

            letter-spacing: 0.3px;
            color: #111827;
        }
    }

    .arrows {
        min-width: 88px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Inter', sans-serif;
        font-style: normal;
        font-weight: bold !important;

        line-height: 19px;

        .left,
        .right {
            height: 30px;
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 29px;
            cursor: pointer;
            box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
            border-radius: 6px;
            &:hover {
                background: #fef9ef;
            }
        }
    }
`

const SearchActivity = styled(Stack)`
    .sactivity_indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .sactivity_text {
        font-family: 'Inter', sans-serif;
        font-style: italic;
        font-weight: normal;
        font-size: 12px;

        letter-spacing: 0.3px;
        color: #838389;
    }
`

const TableButton = styled(Box)`
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;

    font-size: 14px;
    line-height: 20px;
    .btn_table {
        height: 32px;
        color: #464f60;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
            0px 0px 0px 1px rgba(70, 79, 96, 0.16);
        border-radius: 6px;
        background: #ffffff;
        font-size: 14px;
        line-height: 20px;
    }

    .btn__print {
        height: 28px;
        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        letter-spacing: 0.02em;
        color: #868fa0;
        font-size: 14px;
        line-height: 20px;
    }

    .btn__columns {
        height: 28px;
        width: 150px;
        background: #f7f9fc;
        box-shadow: 0px 0px 0px 1px rgba(70, 79, 96, 0.2);
        border-radius: 6px;

        letter-spacing: 0.02em;
        color: #868fa0;
        font-size: 14px;
        line-height: 20px;
    }

    .btn__rule {
        height: 32px;
        background: #20202a;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px #33333c;
        border-radius: 6px;
        color: #ffffff;
        font-size: 14px;
        line-height: 20px;
    }
`
const ResubmissionHead = styled(Box)`
    width: 100%;
    text-align: center;
`
