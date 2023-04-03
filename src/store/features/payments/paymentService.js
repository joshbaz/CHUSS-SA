//import Cookies from 'js-cookie'
/** update payment */
const updatePayment = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updatePayments(allValues)

    return response
}
/** getPaginatedPayments */
const getPaginatedPayments = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getPaginatedPayment(allValues)

    return response
}
/** getSinglePayment */
const getSinglePayment = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getSinglePayment(allValues)

    return response
}
/** update payment */
const getAllPayments = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getAllPayments(allValues)

    return response
}

let paymentService = {
    updatePayment,
    getPaginatedPayments,
    getSinglePayment,
    getAllPayments,
}

export default paymentService
