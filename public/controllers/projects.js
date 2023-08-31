const axios = require('axios')
const { BASE_API_ } = require('../base_url.config')
const FormData = require('form-data')
const fs = require('fs')

//const Cookies = require('js-cookie')
//create Project

exports.createProject = async (event, values) => {
    try {
        const fd = new FormData()

        fd.append('registrationNumber', values.registrationNumber)
        fd.append('studentName', values.studentName)
         fd.append('gender', values.gender)
        fd.append('programType', values.programType)
        fd.append('degreeProgram', values.degreeProgram)
        fd.append('schoolName', values.schoolName)
        fd.append('departmentName', values.departmentName)
        fd.append('Topic', values.Topic)
        fd.append('email', values.email)
        fd.append('phoneNumber', values.phoneNumber)
        fd.append('alternativeEmail', values.alternativeEmail)
        fd.append('semesterRegistration', values.semesterRegistration)
        fd.append('academicYear', values.academicYear)
        fd.append('fundingType', values.fundingType)

        let responseData = await axios.post(
            `${BASE_API_}/project/v1/create`,
            fd,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //    console.log('values', responseData.data)
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

//update Project
exports.updateProject = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/project/v1/update/${values.id}`,
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

//get paginated Project
exports.getPProjects = async (event, values) => {
    try {
        // const getToken = Cookies.get('_tk')
        //     ? JSON.parse(Cookies.get('_tk'))
        //     : ''

        let responseData = await axios.get(
            `${BASE_API_}/project/vl/pprojects`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //    console.log('values', responseData.data)
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

//get all Projects
exports.getAllProjects = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/project/v1/allprojects`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //    console.log('values', responseData.data)
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

/** get individual project */

exports.getIndividualProjects = async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/project/v1/projects/${values.id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //  console.log('values', responseData.data)
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

/** update project status */
exports.updateProjectStatuses = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/project/vl/status/update/${values.projectId}`,
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //    console.log('values', responseData.data)
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

/** update candidate files */
exports.updateCandidateFiles = async (event, values) => {
    try {
        const fd = new FormData()

        if (values.candidatefiles !== null) {
            let filename =
                values.filetypename === 'others'
                    ? values.othername
                    : values.filetypename
            fd.append(
                'projectFiles',
                fs.createReadStream(values.candidatefiles.url),
                `${filename}${values.candidatefiles.ext}`
            )
        } else {
        }

        let responseData = await axios.put(
            `${BASE_API_}/project/v1/candidatefiles/update/${values.projectId}`,
            fd,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //console.log("values", responseData.data);
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

/** update viva files */
exports.updateVivaFiles = async (event, values) => {
    try {
        const fd = new FormData()

        if (values.vivafiles !== null) {
            let filename =
                values.filetypename === 'others'
                    ? values.othername
                    : values.filetypename
            fd.append(
                'projectFiles',
                fs.createReadStream(values.vivafiles.url),
                `${filename}${values.vivafiles.ext}`
            )
        } else {
        }

        let responseData = await axios.put(
            `${BASE_API_}/project/v1/vivafiles/update/${values.projectId}`,
            fd,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //   console.log('values', responseData.data)
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

/** update viva defense */
exports.updateVivaDefenseDate = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/project/v1/vivadefense/update/${values.projectId}`,
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //   console.log('values', responseData.data)
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

/** update final submission */

exports.updateFinalSubmission = async (event, values) => {
    try {
        const fd = new FormData()

        if (values.finalsubmitfiles !== null) {
            let filename =
                values.filetypename === 'others'
                    ? values.othername
                    : values.filetypename
            fd.append(
                'projectFiles',
                fs.createReadStream(values.finalsubmitfiles.url),
                `${filename}${values.finalsubmitfiles.ext}`
            )
        } else {
        }

        let responseData = await axios.put(
            `${BASE_API_}/project/v1/finalsubmission/update/${values.projectId}`,
            fd,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //  console.log('values', responseData.data)
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

/** update dateofsubmission */
exports.updateSubmissionDate = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/project/v1/dateofsubmission/update/${values.projectId}`,
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        //  console.log('values', responseData.data)
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

/** update graduation */
exports.updateGraduationDate = async (event, values) => {
    try {
        let responseData = await axios.put(
            `${BASE_API_}/project/v1/graduation/update/${values.projectId}`,
            values,
            {
                headers: {
                    Authorization: 'Bearer ' + values.getToken,
                },
            }
        )
        // console.log('values', responseData.data)
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

exports.removeProjectFileExaminer = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/examiner/v1/letter/projectexaminer/delete/${values.projectId}/${values.fileId}`,
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

exports.addProjectFileExaminer = async (event, values) => {
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
            `${BASE_API_}/examiner/v1/letter/projectexaminer/add/${values.projectId}/${values.examinerId}`,
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

/** remove examiners from project */
exports.removeProjectExaminersR = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/examiner/v1/projectexaminers/remove/${values.projectId}/${values.exId}/${values.secId}`,
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

/** update graduation */
exports.updateResubmission = async (event, values) => {
    try {
        let responseData = await axios.patch(
            `${BASE_API_}/project/v1/resubmission/update/${values.projectId}`,
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

exports.createNewExUpdate = async (event, values) => {
    try {
        const fd = new FormData()
        if (values.reportFile !== null) {
            fd.append(
                'reportssFiles',
                fs.createReadStream(values.reportFile.url),
                `examinerreport${values.reportFile.ext}`
            )
        } else {
        }

        fd.append('score', values.score)
        fd.append('ungraded', values.ungraded)
        fd.append('remarks', values.remarks)
        let responseData = await axios.patch(
            `${BASE_API_}/reports/v1/update/${values.reportId}`,
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

/** remove candidateFiles files */
exports.removeCaFiles = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/project/v1/remove/cfiles/${values.projectId}/${values.fId}/${values.secId}`,
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
/** remove viva files */

exports.removeViFiles = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/project/v1/remove/vfiles/${values.projectId}/${values.fId}/${values.secId}`,
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
/** remove final submission files */

exports.removeFinalSFiles = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/project/v1/remove/sfiles/${values.projectId}/${values.fId}/${values.secId}`,
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

/** delete project */
exports.deleteProject = async (event, values) => {
    try {
        let responseData = await axios.delete(
            `${BASE_API_}/project/v1/student/remove/${values.projectId}`,
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
