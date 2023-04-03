//import Cookies from 'js-cookie'
/** service to create examiner from project */
const examinerCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createExaminer(allValues)

    return response
}

/** service to create examiner from project */
const projectExaminerCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createProjectExaminer(allValues)

    return response
}

/** service to assign examiner from project */
const assignExaminer = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.assignExaminer(allValues)

    return response
}

/** service to get all paginated examiners  */
const paginatedExaminer = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.paginatedExaminers(allValues)

    return response
}

/** service to get all  examiners  */
const allExaminer = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.allExaminers(allValues)

    return response
}

/** service to get individual  examiners  */
const getIndividualExaminer = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getIndividualExaminer(allValues)

    return response
}

/** service to get students by  examiners  */
const getStudentsByExaminer = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.allStudentsByExaminer(allValues)

    return response
}

/** service to create examiner from project */
const examinerUpdate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateExaminer(allValues)

    return response
}

/** service to create examiner from project */
const examinerDeletes = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.deletesExaminer(allValues)

    return response
}

/** service to create examiner from project */
const examinerDeletesFiles = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.deletesFilesExaminer(allValues)

    return response
}
let examinerService = {
    projectExaminerCreate,
    assignExaminer,
    paginatedExaminer,
    allExaminer,
    getIndividualExaminer,
    examinerCreate,
    getStudentsByExaminer,
    examinerUpdate,
    examinerDeletes,
    examinerDeletesFiles,
}

export default examinerService
