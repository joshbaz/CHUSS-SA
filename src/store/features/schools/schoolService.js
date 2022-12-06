/** service to create school */
const schoolCreate = async (values) => {
    const response = await window.electronAPI.createSchool(values)

    return response
}


/** service to get all paginated examiners  */
const paginatedSchools = async (values) => {
    const response = await window.electronAPI.paginatedSchools(values)

    return response
}

/** service to get allSchools  */
const allSchools = async (values) => {
    const response = await window.electronAPI.allSchools(values)

    return response
}

/** service to get individual  examiners  */
const getIndividualSchool = async (id) => {
    const response = await window.electronAPI.getIndividualSchool(id)

    return response
}

/** service to create examiner from project */
const schoolUpdate = async (values) => {
    const response = await window.electronAPI.updateSchool(values)

    return response
}

/** service to create examiner from project */
const deleteSchool = async (values) => {
    const response = await window.electronAPI.deleteSchool(values)

    return response
}

/** service to create examiner from project */
const deleteDepartment = async (values) => {
    const response = await window.electronAPI.deleteDepartment(values)

    return response
}

/** add department */
const departmentCreate = async (values) => {
    const response = await window.electronAPI.createDepartment(values)

    return response
}

/** update department */
const departmentUpdate = async (values) => {
    const response = await window.electronAPI.updateDepartment(values)

    return response
}
let schoolService = {
    paginatedSchools,
    allSchools,
    getIndividualSchool,
    schoolCreate,
    schoolUpdate,
    departmentCreate,
    departmentUpdate,
    deleteSchool,
    deleteDepartment,
}

export default schoolService
