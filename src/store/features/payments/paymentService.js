/** update payment */
const updatePayment = async (values) => {
     const response = await window.electronAPI.updatePayments(values)

     return response
}
/** getPaginatedPayments */
const getPaginatedPayments = async (values) => {
     const response = await window.electronAPI.getPaginatedPayment(values)

     return response
}
/** getSinglePayment */
const getSinglePayment = async (values) => {
     const response = await window.electronAPI.getSinglePayment(values)

     return response
}
/** update payment */
const getAllPayments = async (values) => {
     const response = await window.electronAPI.getAllPayments(values)

     return response
}

let paymentService = {
    updatePayment,
    getPaginatedPayments,
    getSinglePayment,
    getAllPayments,
}

export default paymentService
