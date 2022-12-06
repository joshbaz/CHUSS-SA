const axios = require('axios')
const { BASE_API_ } = require('../base_url.config')
const FormData = require('form-data')
const fs = require('fs')
/** error handler */
let errorFunction = (error) => {
    let errorArray = []
    errorArray.push(error)

    let response = {
        message: '',
        type: 'error',
    }
    if (errorArray.length !== 0 && errorArray[0].response) {
        response.message = errorArray[0].response.data
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
        response.message = errorArray[0].message
    }

    return response
}

/** create  school */
exports.createSchool = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/school/v1/create`,
            values
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** paginated examiners */
exports.paginatedSchools = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/school/v1/pschools`,
            values
        )

        let data = {
            ...responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorArray = []
        errorArray.push(error)

        let response = {
            message: '',
            type: 'error',
        }
        if (errorArray.length !== 0 && errorArray[0].response) {
            response.message = errorArray[0].response.data
        } else if (errorArray.length !== 0 && !errorArray[0].response) {
            response.message = errorArray[0].message
        }

        return response
    }
}

/** all Schools */
exports.allSchools = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/school/v1/allschools`)

        let data = {
            ...responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** individual school */
exports.getIndividualSchool = async (event, id) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/school/v1/individual/${id}`
        )

        let data = {
            ...responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** update examiner */
exports.updateSchool = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/school/v1/update/${values.schoolId}`,
            values
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** create  department */
exports.createDepartment = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/department/v1/create/${values.schoolId}`,
            values
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** update department */
exports.updateDepartment = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/department/v1/update/${values.schoolId}`,
            values
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

exports.deleteDepartment = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/department/v1/delete/${values.schoolId}/${values.deptId}`
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

exports.deleteSchool = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/school/v1/delete/${values.schoolId}`
        )

        let data = {
            message: responseData.data,
            type: 'success',
        }
        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}
