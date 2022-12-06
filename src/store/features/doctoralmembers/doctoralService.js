/** service to create examiner from project */
const projectDCMemberCreate = async (values) => {
    const response = await window.electronAPI.createProjectDCMember(values)

    return response
}

/** service to assign examiner from project */
const assignDCMember = async (values) => {
    const response = await window.electronAPI.assignDCMember(values)

    return response
}

/** service to get all paginated examiners  */
const paginatedDCMember = async (values) => {
    const response = await window.electronAPI.paginatedDCMember(values)

    return response
}

/** service to get all  examiners  */
const allDCMembers = async (values) => {
    const response = await window.electronAPI.allDCMembers(values)

    return response
}

/** service to get individual  examiners  */
const getIndividualDCMember = async (id) => {
    const response = await window.electronAPI.getIndividualDCMember(id)

    return response
}

/** service to create examiner from project */
const dcmemberUpdate = async (values) => {
    const response = await window.electronAPI.updateDCmember(values)

    return response
}

/** service to remove supervisor from project */
const removeDCMember = async (values) => {
    const response = await window.electronAPI.removeDCMember(values)

    return response
}
let doctoralService = {
    projectDCMemberCreate,
    assignDCMember,
    paginatedDCMember,
    allDCMembers,
    getIndividualDCMember,

    dcmemberUpdate,
    removeDCMember,
}

export default doctoralService
