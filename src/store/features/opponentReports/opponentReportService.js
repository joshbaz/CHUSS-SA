const updateOpponentReport = async (values) => {
    const response = await window.electronAPI.updateOpponentReport(values)
    return response
}

const getOpponentReport = async (id) => {
    const response = await window.electronAPI.getOpponentReport(id)
    return response
}

let opponentReportService = {
    updateOpponentReport,
    getOpponentReport,
}

export default opponentReportService
