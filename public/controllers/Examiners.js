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
exports.createExaminer = async (event, values) => {
    try {
        const fd = new FormData()

        if (values.examinerAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.examinerAppLetter.url),
                `examinerAppLetter${values.examinerAppLetter.ext}`
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
            `${BASE_API_}/examiner/v1/create`,
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
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** create project examiner */
exports.createProjectExaminer = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.examinerAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.examinerAppLetter.url),
                `examinerAppLetter${values.examinerAppLetter.ext}`
            )
        } else {
        }

        if (values.projectAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.projectAppLetter.url),
                `projectAppLetter${values.projectAppLetter.ext}`
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
            `${BASE_API_}/examiner/v1/project/create/${values.projectId}`,
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
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** assign examiner */
exports.assignExaminer = async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/examiner/v1/project/assign/${values.projectId}`,
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
exports.paginatedExaminers = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/examiner/v1/pexaminers/${values.perPage}/${values.page}`,
            values,
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

/** all examiners */
exports.allExaminers = async (event, values) => {
    try {
        let responseData = await axios.get(`${BASE_API_}/examiner/v1/getall`, {
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

/** individual examiners */
exports.getIndividualExaminer = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/examiner/v1/individual/${values.id}`,
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

/** all examiners */
exports.allStudentsByExaminer = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/examiner/v1/students/${values.id}`,
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
exports.updateExaminer = async (event, values) => {
    try {
        const fd = new FormData()

        if (values.examinerAppLetter !== null) {
            fd.append(
                'projectFiles',
                fs.createReadStream(values.examinerAppLetter.url),
                `examinerAppLetter${values.examinerAppLetter.ext}`
            )
        } else {
        }

        let preferredPayment = values.preferredPayment
            ? values.preferredPayment
            : ''

        let mobileOperator = values.mobileOperator ? values.mobileOperator : ''
        let mobileSubscriberName = values.mobileSubscriberName
            ? values.mobileSubscriberName
            : ''

        let mobileNumber = values.mobileNumber ? values.mobileNumber : ''
        let bank = values.bank ? values.bank : ''
        let AccName = values.AccName ? values.AccName : ''
        let AccNumber = values.AccNumber ? values.AccNumber : ''
        let swift_bicCode = values.swift_bicCode ? values.swift_bicCode : ''
        let bankCode = values.bankCode ? values.bankCode : ''
        let branchCode = values.branchCode ? values.branchCode : ''
        let bankAddress = values.bankAddress ? values.bankAddress : ''
        let bankCity = values.bankCity ? values.bankCity : ''

        fd.append('jobtitle', values.jobtitle)
        fd.append('name', values.name)
        fd.append('email', values.email)
        fd.append('phoneNumber', values.phoneNumber)
        fd.append('postalAddress', values.postalAddress)
        fd.append('countryOfResidence', values.countryOfResidence)
        fd.append('placeOfWork', values.placeOfWork)
        fd.append('otherTitles', values.otherTitles)
        fd.append('typeOfExaminer', values.typeOfExaminer)
        fd.append('preferredPayment', preferredPayment)
        fd.append('mobileOperator', mobileOperator)
        fd.append('mobileSubscriberName', mobileSubscriberName)
        fd.append('mobileNumber', mobileNumber)
        fd.append('bank', bank)
        fd.append('AccName', AccName)
        fd.append('AccNumber', AccNumber)
        fd.append('swift_bicCode', swift_bicCode)
        fd.append('bankCode', bankCode)
        fd.append('branchCode', branchCode)
        fd.append('bankAddress', bankAddress)
        fd.append('bankCity', bankCity)
        
        let responseData = await axios.patch(
            `${BASE_API_}/examiner/v1/update/${values.examinerId}`,
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
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
}

/** update examiner */
exports.deleteExaminers = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/examiner/v1/examiners/remove/${values.exId}`,
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

exports.removeFileExaminer = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/examiner/v1/examiners/files/removes/${values.exId}/${values.fileId}`,
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
