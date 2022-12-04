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

const getAllProjects = async (values) => {
    const response = await window.electronAPI.getAllProjects(values)
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

//candidate files
const updateCandidateFiles = async (values) => {
    const response = await window.electronAPI.updateCandidateFiles(values)
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

//final submission files
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

const updateResubmission = async (values) => {
    const response = await window.electronAPI.updateResubmission(values)
    return response
}

//final graduation date
const deleteFileExaminer = async (values) => {
    const response = await window.electronAPI.deleteFileExaminer(values)
    return response
}

//final graduation date
const addFileExaminer = async (values) => {
    const response = await window.electronAPI.addFileExaminer(values)
    return response
}

//remove Examiner
const removeProjectExaminer = async (values) => {
    const response = await window.electronAPI.removeProjectExaminer(values)
    return response
}

//remove Examiner
const updateRrrport = async (values) => {
    const response = await window.electronAPI.updatesAllRedone(values)
    return response
}

const removeCaFiles = async (values) => {
    const response = await window.electronAPI.removeCaFiles(values)
    return response
}
const removeViFiles = async (values) => {
    const response = await window.electronAPI.removeViFiles(values)
    return response
}
const removeFinalSFiles = async (values) => {
    const response = await window.electronAPI.removeFinalSFiles(values)
    return response
}

const projectService = {
    projectCreate,
    getPProjects,
    getAllProjects,
    getIndividualProject,
    projectUpdate,
    updateCandidateFiles,
    updateProjectStatus,
    updateVivaFiles,
    updateVivaDefense,
    updateFinalSubmission,
    updateSubmissionDate,
    updateGraduationDate,
    deleteFileExaminer,
    addFileExaminer,
    removeProjectExaminer,
    updateResubmission,
    updateRrrport,
    removeCaFiles,
    removeViFiles,
    removeFinalSFiles,
}

export default projectService
