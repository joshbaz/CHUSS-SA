const updateExaminerReport = async (values) => {
    const response = await window.electronAPI.updateExaminerReport(values)
    return response
}

const getExaminerReport = async (id) => {
    const response = await window.electronAPI.getExaminerReport(id)
    return response
}

let reportService = {
    updateExaminerReport,
    getExaminerReport,
}

export default reportService
