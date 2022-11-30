/** service to create examiner from project */
const projectSupervisorCreate = async (values) => {
    const response = await window.electronAPI.createProjectSupervisor(values)

    return response
}

/** service to assign examiner from project */
const assignSupervisor = async (values) => {
    const response = await window.electronAPI.assignSupervisor(values)

    return response
}

/** service to get all paginated examiners  */
const paginatedSupervisor = async (values) => {
    const response = await window.electronAPI.paginatedSupervisor(values)

    return response
}

/** service to get all  examiners  */
const allSupervisors = async (values) => {
    const response = await window.electronAPI.allSupervisors(values)

    return response
}

/** service to get individual  examiners  */
const getIndividualSupervisor = async (id) => {
    const response = await window.electronAPI.getIndividualSupervisor(id)

    return response
}

/** service to create examiner from project */
const supervisorUpdate = async (values) => {
    const response = await window.electronAPI.updateSupervisor(values)

    return response
}

/** service to remove supervisor from project */
const supervisorRemove = async (values) => {
    const response = await window.electronAPI.removeSupervisor(values)

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
}

export default supervisorService
