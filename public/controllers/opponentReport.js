const axios = require('axios')
const { BASE_API_ } = require('../base_url.config')
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



/** Reports */
/** update Opponent Report */
exports.updateOpponentReport = async (event, values) => {
    try {
        if (values.reportFile.url) {
            const FormData = require('form-data')
            // const { Blob } = require("buffer");
            const fd = new FormData()
            fd.append(
                'reportssFiles',
                fs.createReadStream(values.reportFile.url)
            )
           
          
            let responseData = await axios.patch(
                `${BASE_API_}/opponentreports/v1/update/${values._id}`,
                fd,
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
        } else {
            let responseData = await axios.patch(
                `${BASE_API_}/opponentreports/v1/update/${values._id}`,
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
        }
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** get opponent reports */
exports.getOpponentReport = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/opponentreports/v1/getReport/${values.id}`,
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
