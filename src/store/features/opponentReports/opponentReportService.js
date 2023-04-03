//import Cookies from 'js-cookie'
const updateOpponentReport = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateOpponentReport(allValues)
    return response
}

const getOpponentReport = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getOpponentReport(allValues)
    return response
}

let opponentReportService = {
    updateOpponentReport,
    getOpponentReport,
}

export default opponentReportService
