/** program type */
/** create program */
const createProgramType = async (values) => {
    const response = await window.electronAPI.createProgramType(values)
    return response
}
/** edit program */
const updateProgramType = async (values) => {
    const response = await window.electronAPI.updateProgramType(values)
    return response
}
/** get all program */
const getProgramType = async (values) => {
    const response = await window.electronAPI.getProgramType()
    return response
}

/** academic year */
/** create academic year */
const createAcademicYear = async (values) => {
    const response = await window.electronAPI.createAcademicYear(values)
    return response
}
/** edit academic year */
const updateAcademicYear = async (values) => {
    const response = await window.electronAPI.updateAcademicYear(values)
    return response
}
/** get all academic year */
const getAcademicYear = async (values) => {
    const response = await window.electronAPI.getAcademicYear()
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
