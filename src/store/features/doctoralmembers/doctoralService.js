//import Cookies from 'js-cookie'
/** service to create examiner from project */
const projectDCMemberCreate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.createProjectDCMember(allValues)

    return response
}

/** service to assign examiner from project */
const assignDCMember = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.assignDCMember(allValues)

    return response
}

/** service to get all paginated examiners  */
const paginatedDCMember = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.paginatedDCMember(allValues)

    return response
}

/** service to get all  examiners  */
const allDCMembers = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.allDCMembers(allValues)

    return response
}

/** service to get individual  examiners  */
const getIndividualDCMember = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getIndividualDCMember(allValues)

    return response
}

/** service to create examiner from project */
const dcmemberUpdate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateDCmember(allValues)

    return response
}

/** service to remove supervisor from project */
const removeDCMember = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeDCMember(allValues)

    return response
}

/** service to migrate supervisor to dc member */
const migrateSupervisortoDCMember = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.migrateSupervisortoDCMember(
        allValues
    )

    return response
}


/** service to create examiner from project */
const dCMemberCreate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.dCMemberCreate(allValues)

    return response
}
let doctoralService = {
    projectDCMemberCreate,
    assignDCMember,
    paginatedDCMember,
    allDCMembers,
    getIndividualDCMember,
    migrateSupervisortoDCMember,

    dcmemberUpdate,
    removeDCMember,
    dCMemberCreate,
}

export default doctoralService
