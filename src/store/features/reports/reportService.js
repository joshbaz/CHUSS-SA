//import Cookies from 'js-cookie'
const updateExaminerReport = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateExamiiinerReport(allValues)
    return response
}

const getExaminerReport = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getExaminerReport(allValues)
    return response
}

const getAllExaminerReports = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getAllExaminerReports(allValues)
    return response
}

const removeExRpfiles = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeExRpfiles(allValues)
    return response
}

const getReportStats = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getReportStats(allValues)
    return response
}

const getReportReminders = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getReportReminders(allValues)
    return response
}

const getLateReports = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getLateReports(allValues)
    return response
}

let reportService = {
    updateExaminerReport,
    getExaminerReport,
    getAllExaminerReports,
    removeExRpfiles,
    getReportStats,
    getReportReminders,
    getLateReports,
}

export default reportService
