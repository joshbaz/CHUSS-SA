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

/** create  examiner */
// exports.createDCMember = async (event, values) => {
//     try {
//         let responseData = await axios.post(
//             `${BASE_API_}/doctoralmember/v1/create`,
//             values
//         )

//         let data = {
//             message: responseData.data,
//             type: 'success',
//         }
//         return data
//     } catch (error) {
//         let errorResult = errorFunction(error)
//         return errorResult
//     }
// }

/** create project examiner */
exports.createProjectDCMember = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/doctoralmember/v1/project/create/${values.projectId}`,
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

/** assign examiner */
exports.assignDCMember = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/doctoralmember/v1/project/assign/${values.projectId}`,
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
exports.paginatedDCMembers = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/doctoralmember/v1/pdcmembers`,
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

/** all examiners */
exports.allDCMembers = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/doctoralmember/v1/getall`)

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

/** individual examiners */
exports.getIndividualDCMember = async (event, id) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/doctoralmember/v1/individual/${id}`
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
exports.updateDCMember = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/doctoralmember/v1/update/${values.examinerId}`,
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

/** remove supervisor */
exports.removeDCMember = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/doctoralmember/v1/project/remove/${values.projectId}/${values.supId}`,
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
