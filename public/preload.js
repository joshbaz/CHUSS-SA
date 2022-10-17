const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.send("dialog-openFile"),
  oppDetail: () => ipcRenderer.invoke("get/file"),
  loginValidation: (values) => ipcRenderer.invoke("login-validation", values),
  /** projects */
  projectCreation: (values) => ipcRenderer.invoke("create-project", values),
  projectUpdate: (values) => ipcRenderer.invoke("update-project", values),
  getPProjects: (values) => ipcRenderer.invoke("get-p-project", values),
  getIndividualProject: (id) =>
    ipcRenderer.invoke("get-individual-project", id),
  updateProjectStatus: (values) =>
    ipcRenderer.invoke("update-project-statuses", values),
  updateVivaFiles: (values) => ipcRenderer.invoke("update-viva-files", values),
  updateVivaDefense: (values) =>
    ipcRenderer.invoke("update-viva-defensedate", values),
  updateFinalSubmission: (values) =>
    ipcRenderer.invoke("update-final-submission", values),
  updateSubmissionDate: (values) =>
    ipcRenderer.invoke("update-final-submissionDate", values),
  updateGraduationDate: (values) =>
    ipcRenderer.invoke("update-graduationdate", values),
  /** opponents */
  createProjectOpponent: (values) =>
    ipcRenderer.invoke("create-opponent-project", values),
  assignOpponent: (values) => ipcRenderer.invoke("assign-opponents", values),
  paginatedOpponents: (values) =>
    ipcRenderer.invoke("paginated-opponents", values),
  allOpponents: (values) => ipcRenderer.invoke("all-opponents", values),
  getIndividualOpponent: (id) => ipcRenderer.invoke("individual-opponent", id),
  /** examiners */
  createProjectExaminer: (values) =>
    ipcRenderer.invoke("create-examiner-project", values),
  assignExaminer: (values) => ipcRenderer.invoke("assign-examiners", values),
  paginatedExaminers: (values) =>
    ipcRenderer.invoke("paginated-examiners", values),
  allExaminers: (values) => ipcRenderer.invoke("all-examiners", values),
  getIndividualExaminer: (id) => ipcRenderer.invoke("individual-examiner", id),
  createExaminer: (values) => ipcRenderer.invoke("create-examiner", values),
  allStudentsByExaminer: (id) =>
    ipcRenderer.invoke("get-students-by-examiner", id),
  updateExaminer: (values) => ipcRenderer.invoke("update-examiner", values),
  /**reports */
  updateExaminerReport: (values) =>
    ipcRenderer.invoke("update-examiner-report", values),
  getExaminerReport: (id) => ipcRenderer.invoke("get-examiner-report", id),
  /** tags */
  createTags: (values) => ipcRenderer.invoke("create-tags", values),
  getAllTags: (values) => ipcRenderer.invoke("get-tags", values),
  updateTags: (values) => ipcRenderer.invoke("update-tags", values),
  /** preferences - Graduate program type */
  createProgramType: (values) =>
    ipcRenderer.invoke("create-programType", values),
  getProgramType: (values) => ipcRenderer.invoke("get-programType", values),
  updateProgramType: (values) =>
    ipcRenderer.invoke("update-programType", values),
  /** preferences - academic year */
  createAcademicYear: (values) =>
    ipcRenderer.invoke("create-academicYear", values),
  getAcademicYear: (values) => ipcRenderer.invoke("get-academicYear", values),
  updateAcademicYear: (values) =>
    ipcRenderer.invoke("update-academicYear", values),
  /** payments */
  getAllPayments: (values) => ipcRenderer.invoke("get-all-payments", values),
  getSinglePayment: (values) => ipcRenderer.invoke("single-payment", values),
  getPaginatedPayment: (values) =>
    ipcRenderer.invoke("paginated-payments", values),
  updatePayments: (values) => ipcRenderer.invoke("update-payment", values),
  /** file retrival */
  getViewFile: (id) => ipcRenderer.invoke("get-view-file", id),
  getdownloadFile: (values) => ipcRenderer.invoke("get-download-file", values),
  downloadFile: (values) => ipcRenderer.invoke("download-file", values),
});