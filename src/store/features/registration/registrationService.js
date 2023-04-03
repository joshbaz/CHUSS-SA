//import Cookies from 'js-cookie'
const createRegistration = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createRegistration(allValues)
    return response
}

const updateRegistration = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateRegistration(allValues)
    return response
}

const removeRegistration = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeRegistration(allValues)
    return response
}

let registrationService = {
    createRegistration,
    updateRegistration,
    removeRegistration,
}

export default registrationService
