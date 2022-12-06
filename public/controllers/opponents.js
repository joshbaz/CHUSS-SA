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

/** create project examiner */
exports.createProjectOpponent = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.examinerAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.examinerAppLetter.url),
                `opponentAppLetter${values.examinerAppLetter.ext}`
            )
        } else {
        }

        if (values.projectAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.projectAppLetter.url),
                `projectOppAppLetter${values.projectAppLetter.ext}`
            )
        } else {
        }

        fd.append('jobtitle', values.jobtitle)
        fd.append('name', values.name)
        fd.append('email', values.email)
        fd.append('phoneNumber', values.phoneNumber)
        fd.append('postalAddress', values.postalAddress)
        fd.append('countryOfResidence', values.countryOfResidence)
        fd.append('placeOfWork', values.placeOfWork)
        fd.append('otherTitles', values.otherTitles)
        fd.append('typeOfExaminer', values.typeOfExaminer)
        fd.append('preferredPayment', values.preferredPayment)
        fd.append('mobileOperator', values.mobileOperator)
        fd.append('mobileSubscriberName', values.mobileSubscriberName)
        fd.append('mobileNumber', values.mobileNumber)
        fd.append('bank', values.bank)
        fd.append('AccName', values.AccName)
        fd.append('AccNumber', values.AccNumber)
        fd.append('swift_bicCode', values.swift_bicCode)
        fd.append('bankCode', values.bankCode)
        fd.append('branchCode', values.branchCode)
        fd.append('bankAddress', values.bankAddress)
        fd.append('bankCity', values.bankCity)

        let responseData = await axios.post(
            `${BASE_API_}/opponent/v1/project/create/${values.projectId}`,
            fd
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
exports.assignOpponent = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/opponent/v1/project/assign/${values.projectId}`,
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
exports.paginatedOpponents = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/opponent/v1/popponents`,
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
exports.allOpponents = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/opponent/v1/getall`)

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
exports.getIndividualOpponent = async (event, id) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/opponent/v1/individual/${id}`
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

/** update opponent */
exports.updateOpponent = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/opponent/v1/update/${values.examinerId}`,
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

/** remove file from project opponent */
exports.removeProjectFileOpponent = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/opponent/v1/letter/projectopponent/delete/${values.projectId}/${values.fileId}`
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

/** add project file model */
exports.addProjectFileOpponent = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.projectAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.projectAppLetter.url),
                `projectAppLetter${values.projectAppLetter.ext}`
            )
        } else {
        }
        let responseData = await axios.patch(
            `${BASE_API_}/opponent/v1/letter/projectopponent/add/${values.projectId}/${values.examinerId}`,
            fd
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

/** remove opponent  */
/** remove examiners from project */
exports.removeProjectOpponentsR = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/opponent/v1/projectopponent/remove/${values.projectId}/${values.exId}/${values.secId}`,
            values
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
