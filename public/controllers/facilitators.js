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

/** create facilitator */
exports.createfacilitator = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/admin/v1/create`,
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

/** all facilitators */
exports.allFacilitators = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/admin/v1/users`, {
            headers: {
                Authorization: 'Bearer ' + values.getToken,
            },
        })

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

/** all login activities */
exports.allLoginActivities = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/admin/v1/activities`, {
            headers: {
                Authorization: 'Bearer ' + values.getToken,
            },
        })

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

/** update facilitator */
exports.updatefacilitator = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/admin/v1/update/${values._id}`,
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

/** update facilitator */
exports.resetfacilitatorPassword = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/admin/v1/resetpassword/${values.exId}`,
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

/** update facilitator */
exports.newfacilitatorPasskey = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/admin/v1/newpasskey/update`,
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

exports.deactivateAdmin = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/admin/v1/deactivate/${values.exId}`,
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
