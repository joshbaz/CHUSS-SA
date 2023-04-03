//import Cookies from 'js-cookie'
/** service to create examiner from project */
const projectOpponentCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.createProjectOpponent(allValues)

    return response
}

/** service to assign examiner from project */
const assignOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.assignOpponent(allValues)

    return response
}

/** service to get all paginated examiners  */
const paginatedOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.paginatedOpponents(allValues)

    return response
}

/** service to get all  examiners  */
const allOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.allOpponents(allValues)

    return response
}

/** service to get individual  examiners  */
const getIndividualOpponent = async (id) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...id,
         getToken,
     }
    const response = await window.electronAPI.getIndividualOpponent(allValues)

    return response
}

/** service to create examiner from project */
const opponentUpdate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.opponentUpdate(allValues)

    return response
}

//delete file opponent
const deleteFileOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.deleteFileOpponent(allValues)
    return response
}

//add file opponent
const addFileOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.addFileOpponent(allValues)
    return response
}

//remove project opponent
const removeProjectOpponent = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.removeProjectOpponent(allValues)
    return response
}


/** service to create examiner from project */
const OpponentMainCreate = async (values) => {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
    const response = await window.electronAPI.OpponentMainCreate(allValues)

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
    OpponentMainCreate,
}

export default examinerService
