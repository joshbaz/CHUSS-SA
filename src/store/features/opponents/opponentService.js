/** service to create examiner from project */
const projectOpponentCreate = async (values) => {
    const response = await window.electronAPI.createProjectOpponent(values)

    return response
}

/** service to assign examiner from project */
const assignOpponent = async (values) => {
    const response = await window.electronAPI.assignOpponent(values)

    return response
}

/** service to get all paginated examiners  */
const paginatedOpponent = async (values) => {
    const response = await window.electronAPI.paginatedOpponents(values)

    return response
}

/** service to get all  examiners  */
const allOpponent = async (values) => {
    const response = await window.electronAPI.allOpponents(values)

    return response
}

/** service to get individual  examiners  */
const getIndividualOpponent = async (id) => {
    const response = await window.electronAPI.getIndividualOpponent(id)

    return response
}

/** service to create examiner from project */
const opponentUpdate = async (values) => {
    const response = await window.electronAPI.updateExaminer(values)

    return response
}

//delete file opponent
const deleteFileOpponent = async (values) => {
    const response = await window.electronAPI.deleteFileOpponent(values)
    return response
}

//add file opponent
const addFileOpponent = async (values) => {
    const response = await window.electronAPI.addFileOpponent(values)
    return response
}

//remove project opponent
const removeProjectOpponent = async (values) => {
    const response = await window.electronAPI.removeProjectOpponent(values)
    return response
}
let examinerService = {
    projectOpponentCreate,
    assignOpponent,
    paginatedOpponent,
    allOpponent,
    getIndividualOpponent,

    opponentUpdate,
    deleteFileOpponent,
    addFileOpponent,
    removeProjectOpponent,
}

export default examinerService
