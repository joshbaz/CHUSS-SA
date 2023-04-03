//import Cookies from 'js-cookie'
/** program type */
/** create program */
const createProgramType = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createProgramType(allValues)
    return response
}
/** edit program */
const updateProgramType = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateProgramType(allValues)
    return response
}
/** get all program */
const getProgramType = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getProgramType(allValues)
    return response
}

/** academic year */
/** create academic year */
const createAcademicYear = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createAcademicYear(allValues)
    return response
}
/** edit academic year */
const updateAcademicYear = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateAcademicYear(allValues)
    return response
}
/** get all academic year */
const getAcademicYear = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getAcademicYear(allValues)
    return response
}

let preferenceService = {
    createProgramType,
    updateProgramType,
    getProgramType,
    createAcademicYear,
    updateAcademicYear,
    getAcademicYear,
}

export default preferenceService
