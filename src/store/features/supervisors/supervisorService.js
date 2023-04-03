//import Cookies from 'js-cookie'
/** service to create examiner from project */
const projectSupervisorCreate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.createProjectSupervisor(allValues)

    return response
}

/** service to assign examiner from project */
const assignSupervisor = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.assignSupervisor(allValues)

    return response
}

/** service to get all paginated examiners  */
const paginatedSupervisor = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.paginatedSupervisor(allValues)

    return response
}

/** service to get all  examiners  */
const allSupervisors = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.allSupervisors(allValues)

    return response
}

/** service to get individual  examiners  */
const getIndividualSupervisor = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.getIndividualSupervisor(allValues)

    return response
}

/** service to create examiner from project */
const supervisorUpdate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.updateSupervisor(allValues)

    return response
}

/** service to remove supervisor from project */
const supervisorRemove = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeSupervisor(allValues)

    return response
}

/** service to create examiner from project */
const SupervisorCreate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.createSupervisor(allValues)

    return response
}
let supervisorService = {
    projectSupervisorCreate,
    assignSupervisor,
    paginatedSupervisor,
    allSupervisors,
    getIndividualSupervisor,

    supervisorUpdate,
    supervisorRemove,
    SupervisorCreate,
}

export default supervisorService
