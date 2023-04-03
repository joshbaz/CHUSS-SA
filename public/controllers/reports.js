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

/** Reports */
/** update Examiner Report */
exports.updateExaminerssReport = async (event, values) => {
    try {
        const FormData = require('form-data')
        const fd = new FormData()

        // console.log('report values values', values)

        //  console.log('before report values values', values.reportFile)
        // fd.append(
        //     'reportssFiles',
        //     fs.createReadStream(values.reportFile.url),
        //     `${'reportfile'}${values.reportFile.ext}`
        // )
        // console.log('after report values values', values.reportFile)
        fd.append('score', values.score)
        fd.append('ungraded', values.ungraded)
        fd.append('remarks', values.remarks)
        //console.log('great pp', values.reportFile)

        let responseData = await axios.patch(
            `${BASE_API_}/reports/v1/update/${values._id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //  console.log('after report values values', values._id)
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

/** get examiner reports */
exports.getExaminerReport = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/reports/v1/getReport/${values.id}`,
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

/** get all examiner reports */
exports.getAllExaminerReports = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/reports/v1/allexaminerReports`,
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

/** remove report files */

exports.removeExRpFiles = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/reports/v1/remove/ExFiles/${values.reportId}/${values.fId}/${values.secId}`,
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

/** get  report stats*/
exports.getReportStats = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/reports/v1/stats`,
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

/** get  report reminders*/
exports.getReportReminders = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/reports/v1/reminders`,
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

/** get late  report*/
exports.getLateReports = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/reports/v1/late`, {
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


