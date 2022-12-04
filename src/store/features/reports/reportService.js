const updateExaminerReport = async (values) => {
    const response = await window.electronAPI.updateExamiiinerReport(values)
    return response
}

const getExaminerReport = async (id) => {
    const response = await window.electronAPI.getExaminerReport(id)
    return response
}

const getAllExaminerReports = async (values) => {
    const response = await window.electronAPI.getAllExaminerReports(values)
    return response
}

const removeExRpfiles = async (values) => {
    const response = await window.electronAPI.removeExRpfiles(values)
    return response
}

let reportService = {
    updateExaminerReport,
    getExaminerReport,
    getAllExaminerReports,
    removeExRpfiles,
}

export default reportService
