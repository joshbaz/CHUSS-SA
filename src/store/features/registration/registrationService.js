const createRegistration = async (values) => {
    const response = await window.electronAPI.createRegistration(values)
    return response
}

const updateRegistration = async (values) => {
    const response = await window.electronAPI.updateRegistration(values)
    return response
}

const removeRegistration = async (values) => {
    const response = await window.electronAPI.removeRegistration(values)
    return response
}

let registrationService = {
    createRegistration,
    updateRegistration,
    removeRegistration,
}

export default registrationService
