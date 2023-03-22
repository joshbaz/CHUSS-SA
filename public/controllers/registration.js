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


/** Reports Registration */
/** create Registration */
exports.createRegistration = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.regfiles !== null) {
            let filename =
                values.filetypename === 'others'
                    ? values.othername
                    : values.filetypename
            fd.append(
                'projectFiles',
                fs.createReadStream(values.regfiles.url),
                `${filename}${values.regfiles.ext}`
            )

            fd.append('regDate', values.regDate)
            fd.append('regType', values.regType)
            fd.append('academicYear', values.academicYear)
            fd.append('semester', values.semester)

            let responseData = await axios.post(
                `${BASE_API_}/registration/v1/create/${values.projectId}`,
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
            let responseData = await axios.post(
                `${BASE_API_}/registration/v1/create/${values.projectId}`,
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
exports.updateRegistration = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.regfiles !== null) {
            let filename =
                values.filetypename === 'others'
                    ? values.othername
                    : values.filetypename
            fd.append(
                'projectFiles',
                fs.createReadStream(values.regfiles.url),
                `${filename}${values.regfiles.ext}`
            )

            fd.append('regDate', values.regDate)
            fd.append('regType', values.regType)
            fd.append('academicYear', values.academicYear)
            fd.append('semester', values.semester)

            let responseData = await axios.post(
                `${BASE_API_}/registration/v1/create/${values.projectId}`,
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
            let responseData = await axios.post(
                `${BASE_API_}/registration/v1/create/${values.projectId}`,
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

exports.removeRegistration = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/registration/v1/remove/${values.projectId}/${values.regId}`,
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
