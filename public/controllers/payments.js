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

/** update Payment */
exports.updatePayment = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/payments/v1/update/${values._id}`,
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

/** get all payment */
exports.getAllPayment = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/payments/v1/getpayments`,
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

/** single payments */
exports.getSinglePayment = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/payments/v1/individual/${values.id}`,
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

/** paginated payments */
exports.getPaginatedPayment = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/payments/v1/paginated/${values.perPage}/${values.page}`,

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
