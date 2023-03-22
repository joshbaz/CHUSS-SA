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

/** create tags */
exports.createTags = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/tags/v1/create`,
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

/** create tags */
exports.getTags = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/tags/v1/getall`,
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

/** update tags */
exports.updateTags = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/tags/v1/edit/${values._id}`,
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
