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

/** Graduate program Type */
/** create program Type */
exports.createProgramType = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/preferences/v1/programType/create`,
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

/** get all program Type */
exports.getProgramType = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/preferences/v1/programType/getall`,

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

/** update program Type */
exports.updateProgramType = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/preferences/v1/programType/edit/${values._id}`,
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

/** Academic Year */
/** create Academic Year */
exports.createAcademicYear = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/preferences/v1/academicYear/create`,
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

/** get all Academic Year */
exports.getAcademicYear = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/preferences/v1/academicYear/getall`,

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

/** update Academic Year */
exports.updateAcademicYear = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/preferences/v1/academicYear/edit/${values._id}`,
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
