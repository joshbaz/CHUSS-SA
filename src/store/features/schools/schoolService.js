//import Cookies from 'js-cookie'
/** service to create school */
const schoolCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createSchool(allValues)

    return response
}


/** service to get all paginated examiners  */
const paginatedSchools = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.paginatedSchools(allValues)

    return response
}

/** service to get allSchools  */
const allSchools = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.allSchools(allValues)

    return response
}

/** service to get individual  examiners  */
const getIndividualSchool = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getIndividualSchool(allValues)

    return response
}

/** service to create examiner from project */
const schoolUpdate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateSchool(allValues)

    return response
}

/** service to create examiner from project */
const deleteSchool = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.deleteSchool(allValues)

    return response
}

/** service to create examiner from project */
const deleteDepartment = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.deleteDepartment(allValues)

    return response
}

/** add department */
const departmentCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createDepartment(allValues)

    return response
}

/** update department */
const departmentUpdate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateDepartment(allValues)

    return response
}
let schoolService = {
    paginatedSchools,
    allSchools,
    getIndividualSchool,
    schoolCreate,
    schoolUpdate,
    departmentCreate,
    departmentUpdate,
    deleteSchool,
    deleteDepartment,
}

export default schoolService
