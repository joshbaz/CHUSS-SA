//import Cookies from 'js-cookie'
const projectDeletion = async (values)=> {
     let getToken = localStorage.getItem('_tk')
     let allValues = {
         ...values,
         getToken,
     }
   const response = await window.electronAPI.projectDeletion(allValues)

   return response 
}

const projectCreate = async (values) => {
      let getToken = localStorage.getItem('_tk')
      let allValues = {
          ...values,
          getToken,
      }
    const response = await window.electronAPI.projectCreation(allValues)

    return response
}

const projectUpdate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.projectUpdate(allValues)
console.log('response', response)
    return response
}

const getPProjects = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getPProjects(allValues)
    return response
}

const getAllProjects = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getAllProjects(allValues)
    return response
}

const getIndividualProject = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.getIndividualProject(allValues)
    return response
}

//project status update
const updateProjectStatus = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateProjectStatus(allValues)
    return response
}

//candidate files
const updateCandidateFiles = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateCandidateFiles(allValues)
    return response
}
//viva files
const updateVivaFiles = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateVivaFiles(allValues)
    return response
}

//viva defense
const updateVivaDefense = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateVivaDefense(allValues)
    return response
}

//final submission files
const updateFinalSubmission = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateFinalSubmission(allValues)
    return response
}

//final submission date
const updateSubmissionDate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateSubmissionDate(allValues)
    return response
}

//final graduation date
const updateGraduationDate = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateGraduationDate(allValues)
    return response
}

const updateResubmission = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updateResubmission(allValues)
    return response
}

//final graduation date
const deleteFileExaminer = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.deleteFileExaminer(allValues)
    return response
}

//final graduation date
const addFileExaminer = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.addFileExaminer(allValues)
    return response
}

//remove Examiner
const removeProjectExaminer = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.removeProjectExaminer(allValues)
    return response
}

//remove Examiner
const updateRrrport = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.updatesAllRedone(allValues)
    return response
}

const removeCaFiles = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.removeCaFiles(allValues)
    return response
}
const removeViFiles = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.removeViFiles(allValues)
    return response
}
const removeFinalSFiles = async (values) => {
    let getToken = localStorage.getItem('_tk')
    let allValues = {
        ...values,
        getToken,
    }
    const response = await window.electronAPI.removeFinalSFiles(allValues)
    return response
}

const projectService = {
    projectCreate,
    getPProjects,
    getAllProjects,
    getIndividualProject,
    projectUpdate,
    updateCandidateFiles,
    updateProjectStatus,
    updateVivaFiles,
    updateVivaDefense,
    updateFinalSubmission,
    updateSubmissionDate,
    updateGraduationDate,
    deleteFileExaminer,
    addFileExaminer,
    removeProjectExaminer,
    updateResubmission,
    updateRrrport,
    removeCaFiles,
    removeViFiles,
    removeFinalSFiles,
    projectDeletion,
}

export default projectService
