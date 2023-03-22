import Cookies from 'js-cookie'
const updateExaminerReport = async (values) => {
     let getToken = Cookies.get('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateExamiiinerReport(allValues)
    return response
}

const getExaminerReport = async (values) => {
     let getToken = Cookies.get('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getExaminerReport(allValues)
    return response
}

const getAllExaminerReports = async (values) => {
     let getToken = Cookies.get('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getAllExaminerReports(allValues)
    return response
}

const removeExRpfiles = async (values) => {
     let getToken = Cookies.get('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeExRpfiles(allValues)
    return response
}

let reportService = {
    updateExaminerReport,
    getExaminerReport,
    getAllExaminerReports,
    removeExRpfiles,
}

export default reportService
