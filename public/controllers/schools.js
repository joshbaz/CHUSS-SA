const axios = require('axios')
const { BASE_API_ } = require('../base_url.config')

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
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            `${BASE_API_}/school/v1/pschools/${values.perPage}/${values.page}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
        let responseData = await axios.get(
            `${BASE_API_}/school/v1/allschools`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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

/** individual school */
exports.getIndividualSchool = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/school/v1/individual/${values.id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            `${BASE_API_}/department/v1/delete/${values.schoolId}/${values.deptId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
            `${BASE_API_}/school/v1/delete/${values.schoolId}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
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
