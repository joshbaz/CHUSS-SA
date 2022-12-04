const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    openFile: () => ipcRenderer.send('dialog-openFile'),
    oppDetail: () => ipcRenderer.invoke('get/file'),
    loginValidation: (values) => ipcRenderer.invoke('login-validation', values),
    /** bridge for csv exportation */
    exportCSV: (values) => ipcRenderer.invoke('export-csv', values),
    /** projects */
    projectCreation: (values) => ipcRenderer.invoke('create-project', values),
    projectUpdate: (values) => ipcRenderer.invoke('update-project', values),
    getPProjects: (values) => ipcRenderer.invoke('get-p-project', values),
    getAllProjects: (values) => ipcRenderer.invoke('get-all-projects', values),
    getIndividualProject: (id) =>
        ipcRenderer.invoke('get-individual-project', id),
    updateProjectStatus: (values) =>
        ipcRenderer.invoke('update-project-statuses', values),
    updateCandidateFiles: (values) =>
        ipcRenderer.invoke('update-candidate-files', values),
    updateVivaFiles: (values) =>
        ipcRenderer.invoke('update-viva-files', values),
    updateVivaDefense: (values) =>
        ipcRenderer.invoke('update-viva-defensedate', values),
    updateFinalSubmission: (values) =>
        ipcRenderer.invoke('update-final-submission', values),
    updateSubmissionDate: (values) =>
        ipcRenderer.invoke('update-final-submissionDate', values),
    updateGraduationDate: (values) =>
        ipcRenderer.invoke('update-graduationdate', values),
    updateResubmission: (values) =>
        ipcRenderer.invoke('update-resubmission', values),
    updatesAllRedone: (values) =>
        ipcRenderer.invoke('updates-od-reportsss', values),
    deleteFileExaminer: (values) =>
        ipcRenderer.invoke('delete-fileproject-Examiner', values),
    addFileExaminer: (values) =>
        ipcRenderer.invoke('add-fileproject-Examiner', values),
    removeProjectExaminer: (values) =>
        ipcRenderer.invoke('remove-project-Examiner', values),
    /** remove project files */
    removeCaFiles: (values) => ipcRenderer.invoke('remove-cfiles', values),
    removeViFiles: (values) => ipcRenderer.invoke('remove-vifiles', values),
    removeFinalSFiles: (values) =>
        ipcRenderer.invoke('remove-fiSfiles', values),
    /** registration */
    createRegistration: (values) =>
        ipcRenderer.invoke('create-registration', values),
    updateRegistration: (values) =>
        ipcRenderer.invoke('update-registration', values),
    removeRegistration: (values) =>
        ipcRenderer.invoke('remove-registration', values),
    /** supervisors */
    createProjectSupervisor: (values) =>
        ipcRenderer.invoke('create-supervisor-project', values),
    assignSupervisor: (values) =>
        ipcRenderer.invoke('assign-supervisors', values),
    paginatedSupervisor: (values) =>
        ipcRenderer.invoke('paginated-supervisors', values),
    allSupervisors: (values) => ipcRenderer.invoke('all-supervisors', values),
    getIndividualSupervisor: (id) =>
        ipcRenderer.invoke('individual-supervisor', id),
    updateSupervisor: (values) =>
        ipcRenderer.invoke('update-supervisor', values),
    removeSupervisor: (values) =>
        ipcRenderer.invoke('remove-supervisor', values),
    /** doctoral committee members */
    createProjectDCMember: (values) =>
        ipcRenderer.invoke('create-dcmember-project', values),
    assignDCMember: (values) => ipcRenderer.invoke('assign-dcmembers', values),
    paginatedDCMember: (values) =>
        ipcRenderer.invoke('paginated-dcmembers', values),
    allDCMembers: (values) => ipcRenderer.invoke('all-dcmembers', values),
    getIndividualDCMember: (id) =>
        ipcRenderer.invoke('individual-dcmember', id),
    updateDCmember: (values) => ipcRenderer.invoke('update-dcmember', values),
    /** opponents */
    createProjectOpponent: (values) =>
        ipcRenderer.invoke('create-opponent-project', values),
    assignOpponent: (values) => ipcRenderer.invoke('assign-opponents', values),
    paginatedOpponents: (values) =>
        ipcRenderer.invoke('paginated-opponents', values),
    allOpponents: (values) => ipcRenderer.invoke('all-opponents', values),
    getIndividualOpponent: (id) =>
        ipcRenderer.invoke('individual-opponent', id),
    /** examiners */
    createProjectExaminer: (values) =>
        ipcRenderer.invoke('create-examiner-project', values),
    assignExaminer: (values) => ipcRenderer.invoke('assign-examiners', values),
    paginatedExaminers: (values) =>
        ipcRenderer.invoke('paginated-examiners', values),
    allExaminers: (values) => ipcRenderer.invoke('all-examiners', values),
    getIndividualExaminer: (id) =>
        ipcRenderer.invoke('individual-examiner', id),
    createExaminer: (values) => ipcRenderer.invoke('create-examiner', values),
    allStudentsByExaminer: (id) =>
        ipcRenderer.invoke('get-students-by-examiner', id),
    updateExaminer: (values) => ipcRenderer.invoke('update-examiner', values),
    /** opponent reports */
    updateOpponentReport: (values) =>
        ipcRenderer.invoke('update-opponent-report', values),
    getOpponentReport: (id) => ipcRenderer.invoke('get-opponent-report', id),
    /**reports */
    updateExamiiinerReport: (values) =>
        ipcRenderer.invoke('update-examiner-reportsss', values),
    getExaminerReport: (id) => ipcRenderer.invoke('get-examiner-report', id),
    getAllExaminerReports: (values) =>
        ipcRenderer.invoke('get-all-examiner-reports', values),
    /** remove examiner report files */
    removeExRpfiles: (values) => ipcRenderer.invoke('remove-exrpfiles', values),
    /** tags */
    createTags: (values) => ipcRenderer.invoke('create-tags', values),
    getAllTags: (values) => ipcRenderer.invoke('get-tags', values),
    updateTags: (values) => ipcRenderer.invoke('update-tags', values),
    /** preferences - Graduate program type */
    createProgramType: (values) =>
        ipcRenderer.invoke('create-programType', values),
    getProgramType: (values) => ipcRenderer.invoke('get-programType', values),
    updateProgramType: (values) =>
        ipcRenderer.invoke('update-programType', values),
    /** preferences - academic year */
    createAcademicYear: (values) =>
        ipcRenderer.invoke('create-academicYear', values),
    getAcademicYear: (values) => ipcRenderer.invoke('get-academicYear', values),
    updateAcademicYear: (values) =>
        ipcRenderer.invoke('update-academicYear', values),
    /** payments */
    getAllPayments: (values) => ipcRenderer.invoke('get-all-payments', values),
    getSinglePayment: (values) => ipcRenderer.invoke('single-payment', values),
    getPaginatedPayment: (values) =>
        ipcRenderer.invoke('paginated-payments', values),
    updatePayments: (values) => ipcRenderer.invoke('update-payment', values),
    /** file retrival */
    getViewFile: (id) => ipcRenderer.invoke('get-view-file', id),
    getdownloadFile: (values) =>
        ipcRenderer.invoke('get-download-file', values),
    downloadFile: (values) => ipcRenderer.invoke('download-file', values),
    /** schools */
    paginatedSchools: (values) =>
        ipcRenderer.invoke('paginated-schools', values),
    allSchools: (values) => ipcRenderer.invoke('all-schools', values),
    getIndividualSchool: (id) => ipcRenderer.invoke('individual-school', id),
    createSchool: (values) => ipcRenderer.invoke('create-school', values),
    updateSchool: (values) => ipcRenderer.invoke('update-school', values),
    createDepartment: (values) =>
        ipcRenderer.invoke('create-department', values),
    updateDepartment: (values) =>
        ipcRenderer.invoke('update-department', values),
})
