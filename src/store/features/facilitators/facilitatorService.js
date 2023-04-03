//import Cookies from 'js-cookie'

/** service to create examiner from project */
const facilitatorCreate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.createfacilitator(allValues)

    return response
}

/** service to create examiner from project */
const facilitatorUpdate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updatefacilitator(allValues)

    return response
}

/** service to get all  examiners  */
const allFacilitators = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.allFacilitators(allValues)

    return response
}

const allLoginActivities = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.allLoginActivities(allValues)

    return response
}

/** service to create examiner from project */
const facilitatorResetPassword = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.resetfacilitatorPassword(
        allValues
    )

    return response
}


const deactivateFacilitator = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.deactivateFacilitator(allValues)

    return response
}
let facilitatorService = {
    allLoginActivities,
    allFacilitators,

    facilitatorUpdate,

    facilitatorCreate,
    facilitatorResetPassword,

    deactivateFacilitator,
}

export default facilitatorService
