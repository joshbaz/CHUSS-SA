/** service to create examiner from project */
const examinerCreate = async (values) => {
    const response = await window.electronAPI.createExaminer(values)

    return response
}

/** service to create examiner from project */
const projectExaminerCreate = async (values) => {
    const response = await window.electronAPI.createProjectExaminer(values)

    return response
}

/** service to assign examiner from project */
const assignExaminer = async (values) => {
    const response = await window.electronAPI.assignExaminer(values)

    return response
}

/** service to get all paginated examiners  */
const paginatedExaminer = async (values) => {
    const response = await window.electronAPI.paginatedExaminers(values)

    return response
}

/** service to get all  examiners  */
const allExaminer = async (values) => {
    const response = await window.electronAPI.allExaminers(values)

    return response
}

/** service to get individual  examiners  */
const getIndividualExaminer = async (id) => {
    const response = await window.electronAPI.getIndividualExaminer(id)

    return response
}

/** service to get students by  examiners  */
const getStudentsByExaminer = async (id) => {
    const response = await window.electronAPI.allStudentsByExaminer(id)

    return response
}

/** service to create examiner from project */
const examinerUpdate = async (values) => {
    const response = await window.electronAPI.updateExaminer(values)

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
}

export default examinerService
