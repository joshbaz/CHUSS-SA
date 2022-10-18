const projectCreate = async (InfoData) => {
    const response = await window.electronAPI.projectCreation(InfoData)

    return response
}

const projectUpdate = async (InfoData) => {
    const response = await window.electronAPI.projectUpdate(InfoData)

    return response
}

const getPProjects = async (values) => {
    const response = await window.electronAPI.getPProjects(values)
    return response
}

const getIndividualProject = async (id) => {
    const response = await window.electronAPI.getIndividualProject(id)
    return response
}

//project status update
const updateProjectStatus = async (values) => {
    const response = await window.electronAPI.updateProjectStatus(values)
    return response
}
//viva files
const updateVivaFiles = async (values) => {
    const response = await window.electronAPI.updateVivaFiles(values)
    return response
}

//viva defense
const updateVivaDefense = async (values) => {
    const response = await window.electronAPI.updateVivaDefense(values)
    return response
}

//final submission
const updateFinalSubmission = async (values) => {
    const response = await window.electronAPI.updateFinalSubmission(values)
    return response
}

//final submission date
const updateSubmissionDate = async (values) => {
    const response = await window.electronAPI.updateSubmissionDate(values)
    return response
}

//final graduation date
const updateGraduationDate = async (values) => {
    const response = await window.electronAPI.updateGraduationDate(values)
    return response
}

const projectService = {
    projectCreate,
    getPProjects,
    getIndividualProject,
    projectUpdate,
    updateProjectStatus,
    updateVivaFiles,
    updateVivaDefense,
    updateFinalSubmission,
    updateSubmissionDate,
    updateGraduationDate,
}

export default projectService
