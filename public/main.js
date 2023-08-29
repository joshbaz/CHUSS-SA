const { BrowserWindow, app, dialog, ipcMain, screen } = require('electron')
const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

const isDev = require('electron-is-dev')
const os = require('os')
const axios = require('axios')
const { BASE_API_ } = require('./base_url.config')
const Moments = require('moment-timezone')
const projectController = require('./controllers/projects')
const examinerController = require('./controllers/Examiners')
const supervisorController = require('./controllers/supervisors')
const doctoralMController = require('./controllers/doctoralMembers')
const opponentController = require('./controllers/opponents')
const tagController = require('./controllers/tags')
const preferenceController = require('./controllers/preferences')
const reportController = require('./controllers/reports')
const opponentReportController = require('./controllers/opponentReport')
const paymentController = require('./controllers/payments')
const facilitatorController = require('./controllers/facilitators')

const schoolController = require('./controllers/schools')
const registrationController = require('./controllers/registration')

const { autoUpdater } = require('electron-updater')

let mainWindow = null

require('@electron/remote/main').initialize()

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '/chuss512.ico'),
        width: width,
        height: height,
        minHeight: height,
        minWidth: width,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            enableRemoteModule: false,
            devTools: true,
        },
    })

    //mainWindow.maximize()
    //  installer()
    mainWindow.on('ready-to-show', mainWindow.show)

    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000#'
            : `file://${path.join(__dirname, '../build/index.html#')}`
    )

    // mainWindow.loadURL(
    //     isDev
    //         ? 'http://localhost:3000'
    //         : url.format({
    //               pathname: path.join(__dirname, 'index'),
    //               protocol: 'file',
    //               slashes: true,
    //           })
    // )
    // mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
    // mainWindow.loadURL(`file://${__dirname}/../build/index.html#`)
    mainWindow.on('closed', () => {
        mainWindow = null
        //localStorage.removeItem('user')
    })
}

//app.on('ready', createWindow)

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    /** deals with system auto update */
    /** check for any updates */
    autoUpdater.checkForUpdates()
    const messageOptions = {
        message: 'Checking for updates',
    }
    dialog.showMessageBox(null, messageOptions)
})

/** deals with system auto update */
/** an update of the system is available */
autoUpdater.on('update-available', (info) => {
    dialog.showMessageBox(null, { message: 'Update available.' })
    let pth = autoUpdater.downloadUpdate()
    dialog.showMessageBox(null, { message: pth })
})

/** deals with system auto update */
/** update not available */
autoUpdater.on('update-not-available', (info) => {
    dialog.showMessageBox(null, { message: 'No update available' })
})

/** deals with system auto update */
/** download of the system update complete */
autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(null, { message: 'Update downloaded' })
})

//installer
// async function installer() {
//     let percentage = 0
//     let installerInterval = setInterval(() => {
//         percentage += Math.random * 3

//         if (percentage >= 100) {
//             clearInterval(installerInterval)
//         }
//         mainWindow.webContents.send('install/progress', percentage)
//     }, 100)
// }

// async function handleFileOpen(e) {
//     const files = await dialog.showOpenDialog({
//         properties: ['openFile'],
//         filters: [
//             {
//                 name: 'files',
//                 extensions: ['doc', 'docx', 'pdf'],
//             },
//         ],
//     })

//     // console.log('files', files)
//     if (!files) {
//         return
//     } else {
//         const file = files[0]

//         //const fileContent = fs.readFileSync(file).toString();
//         return file
//     }
// }
//IPC HANDLERS
ipcMain.on('dialog-openFile', (event) => {
    if (os.platform() === 'linux' || os.platform() === 'win32') {
        dialog
            .showOpenDialog(
                {
                    properties: ['openFile'],
                },
                (files) => {
                    if (files) {
                        event.sender.send('selected-file', files[0])
                    }
                }
            )
            .then((result) => {
                return null
            })
    } else {
        //this is mac
        dialog.showOpenDialog(
            {
                properties: ['openFile', 'openDirectory'],
            },
            (files) => {
                if (files) {
                    event.sender.send('selected-file', files[0])
                    return files[0]
                }
            }
        )
    }
})

ipcMain.handle('get/file', async (event) => {
    let results = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            { name: 'Custom File Type', extensions: ['doc', 'docx', 'pdf'] },
        ],
    })

    if (results.canceled) {
        return null
    }

    const fileDetails = path.parse(results.filePaths[0])

    fileDetails.url = results.filePaths[0]
    let size = fs.statSync(results.filePaths[0]).size

    //file size
    const formatSize = (size) => {
        var i = Math.floor(Math.log(size) / Math.log(1024))
        return (
            (size / Math.pow(1024, i)).toFixed(2) * 1 +
            ' ' +
            ['B', 'KB', 'MB', 'GB', 'TB'][i]
        )
    }
    fileDetails.size = formatSize(size)

    //file type
    let fileType = fileDetails.ext.slice(1)
    fileDetails.fileType = fileType
    // console.log('fileType', fileType)
    //  console.log('fileDetails', fileDetails)
    const fileBuffer = Buffer.from(results.filePaths[0], 'base64')

    fileDetails.buffer = fileBuffer

    return fileDetails
})

//for MacOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
//for MacOS
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

/** handle API Calls */
ipcMain.handle('reload-app', () => {
    mainWindow.webContents.reloadIgnoringCache()
})
//handle login
ipcMain.handle('login-validation', async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/admin/v1/login`,
            values
        )
        //   console.log('values', responseData.data)
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
})

/** registration */
ipcMain.handle('create-registration', registrationController.createRegistration)
ipcMain.handle('update-registration', registrationController.updateRegistration)
ipcMain.handle('remove-registration', registrationController.removeRegistration)

/** remove project files */
ipcMain.handle('remove-cfiles', projectController.removeCaFiles)
ipcMain.handle('remove-vifiles', projectController.removeViFiles)
ipcMain.handle('remove-fiSfiles', projectController.removeFinalSFiles)
/** remove student and project */
ipcMain.handle('remove-student-project', projectController.deleteProject)

/** remove report files */
ipcMain.handle('remove-exrpfiles', reportController.removeExRpFiles)
/**
 * Projects
 */
//handle createProject
ipcMain.handle('create-project', projectController.createProject)
//handle ipdateProject
ipcMain.handle('update-project', projectController.updateProject)

//handle paginatedProjects
ipcMain.handle('get-p-project', projectController.getPProjects)

//handle all Projects
ipcMain.handle('get-all-projects', projectController.getAllProjects)

//handle individualProjects
ipcMain.handle(
    'get-individual-project',
    projectController.getIndividualProjects
)
//handle status project update
ipcMain.handle(
    'update-project-statuses',
    projectController.updateProjectStatuses
)

//handle candidate files
ipcMain.handle('update-candidate-files', projectController.updateCandidateFiles)
//handle viva files
ipcMain.handle('update-viva-files', projectController.updateVivaFiles)

//handle viva defense date
ipcMain.handle(
    'update-viva-defensedate',
    projectController.updateVivaDefenseDate
)

//handle final submission
ipcMain.handle(
    'update-final-submission',
    projectController.updateFinalSubmission
)
//handle final submission date
ipcMain.handle(
    'update-final-submissionDate',
    projectController.updateSubmissionDate
)

//handle final submission date
ipcMain.handle('update-graduationdate', projectController.updateGraduationDate)

ipcMain.handle(
    'delete-fileproject-Examiner',
    projectController.removeProjectFileExaminer
)
ipcMain.handle(
    'add-fileproject-Examiner',
    projectController.addProjectFileExaminer
)
ipcMain.handle(
    'remove-project-Examiner',
    projectController.removeProjectExaminersR
)
ipcMain.handle('update-resubmission', projectController.updateResubmission)

/**update a handle */
ipcMain.handle('updates-od-reportsss', projectController.createNewExUpdate)

/** remove opponent files */
ipcMain.handle(
    'delete-fileproject-Opponent',
    opponentController.removeProjectFileOpponent
)
ipcMain.handle(
    'add-fileproject-Opponent',
    opponentController.addProjectFileOpponent
)
ipcMain.handle(
    'remove-project-Opponent',
    opponentController.removeProjectOpponentsR
)

/**
 *
 * Opponents
 */
/** handle opponent creation from project */
ipcMain.handle(
    'create-opponent-project',
    opponentController.createProjectOpponent
)
//handle assign opponents
ipcMain.handle('assign-opponents', opponentController.assignOpponent)
//handle paginated opponent
ipcMain.handle('paginated-opponents', opponentController.paginatedOpponents)
//handle all opponent
ipcMain.handle('all-opponents', opponentController.allOpponents)
//handle individual opponent
ipcMain.handle('individual-opponent', opponentController.getIndividualOpponent)
ipcMain.handle('update-Opponent', opponentController.updateOpponent)
ipcMain.handle('create-main-opponent', opponentController.OpponentMainCreate)
/*
 * Supervisors
 *
 */
/** handle Supervisors creation from project */
ipcMain.handle(
    'create-supervisor-project',
    supervisorController.createProjectSupervisor
)
//handle assign Supervisors
ipcMain.handle('assign-supervisors', supervisorController.assignSupervisor)
//handle paginated Supervisors
ipcMain.handle(
    'paginated-supervisors',
    supervisorController.paginatedSupervisors
)
//handle all Supervisors
ipcMain.handle('all-supervisors', supervisorController.allSupervisors)
//handle individual Supervisors
ipcMain.handle(
    'individual-supervisor',
    supervisorController.getIndividualSupervisor
)

/** update Supervisors */
ipcMain.handle('update-supervisor', supervisorController.updateSupervisor)
/** remove Supervisors */
ipcMain.handle('remove-supervisor', supervisorController.removeSupervisor)
ipcMain.handle('create-supervisor', supervisorController.createSupervisor)
/*
 * Doctoral Members
 *
 */
/** handle Doctoral Members creation from project */
ipcMain.handle(
    'create-dcmember-project',
    doctoralMController.createProjectDCMember
)
//handle assign Doctoral Members
ipcMain.handle('assign-dcmembers', doctoralMController.assignDCMember)
//handle paginated Doctoral Members
ipcMain.handle('paginated-dcmembers', doctoralMController.paginatedDCMembers)
//handle all Doctoral Members
ipcMain.handle('all-dcmembers', doctoralMController.allDCMembers)
//handle individual Doctoral Members
ipcMain.handle('individual-dcmember', doctoralMController.getIndividualDCMember)

/** update Doctoral Members */
ipcMain.handle('update-dcmember', doctoralMController.updateDCMember)
/** remove DCMember */
ipcMain.handle('remove-dcmember', doctoralMController.removeDCMember)
ipcMain.handle(
    'migrate-supervisor-to-dcmember',
    doctoralMController.migrateSupervisortoDCMember
)
ipcMain.handle('create-dcmember-main', doctoralMController.createDcMember)
/*
 * Examiners
 *
 */
/** handle examiner creation from project */
ipcMain.handle(
    'create-examiner-project',
    examinerController.createProjectExaminer
)
//handle assign examiners
ipcMain.handle('assign-examiners', examinerController.assignExaminer)
//handle paginated examiners
ipcMain.handle('paginated-examiners', examinerController.paginatedExaminers)
//handle all examiners
ipcMain.handle('all-examiners', examinerController.allExaminers)
//handle individual examiners
ipcMain.handle('individual-examiner', examinerController.getIndividualExaminer)
/** create examiner from examiners */
ipcMain.handle('create-examiner', examinerController.createExaminer)
/** get students by examiner */
ipcMain.handle(
    'get-students-by-examiner',
    examinerController.allStudentsByExaminer
)

/**deletes file from the examiner */
ipcMain.handle('delete-file-ex-app', examinerController.removeFileExaminer)

ipcMain.handle('delete-examiner', examinerController.deleteExaminers)
/** update examiner */
ipcMain.handle('update-examiner', examinerController.updateExaminer)

/** examiner reports */
/**
 * 1.handle update reports
 * 2.get reports
 */
ipcMain.handle(
    'update-examiner-reportsss',
    reportController.updateExaminerssReport
)
ipcMain.handle('get-examiner-report', reportController.getExaminerReport)
ipcMain.handle(
    'get-all-examiner-reports',
    reportController.getAllExaminerReports
)
ipcMain.handle('get-reports-stats', reportController.getReportStats)

ipcMain.handle('get-reports-reminders', reportController.getReportReminders)
ipcMain.handle('get-late-reports', reportController.getLateReports)
/** opponent reports */
/**
 * 1.handle update opponent reports
 * 2.get opponent reports
 */
ipcMain.handle(
    'update-opponent-report',
    opponentReportController.updateOpponentReport
)
ipcMain.handle(
    'get-opponent-report',
    opponentReportController.getOpponentReport
)
/** tags */
//handle create tags
ipcMain.handle('create-tags', tagController.createTags)
//handle get tags
ipcMain.handle('get-tags', tagController.getTags)
//handle edit tags
ipcMain.handle('update-tags', tagController.updateTags)

/** program Type */
//handle program Type
ipcMain.handle('create-programType', preferenceController.createProgramType)
//handle program Type
ipcMain.handle('get-programType', preferenceController.getProgramType)
//handle program Type
ipcMain.handle('update-programType', preferenceController.updateProgramType)

/** Academic Year */
//handle Academic Year
ipcMain.handle('create-academicYear', preferenceController.createAcademicYear)
//handle Academic Year
ipcMain.handle('get-academicYear', preferenceController.getAcademicYear)
//handle Academic Year
ipcMain.handle('update-academicYear', preferenceController.updateAcademicYear)

/** payments */
//handle all payments
ipcMain.handle('get-all-payments', paymentController.getAllPayment)
//handle single payments
ipcMain.handle('single-payment', paymentController.getSinglePayment)
//handle paginated payments
ipcMain.handle('paginated-payments', paymentController.getPaginatedPayment)
//handle update payments
ipcMain.handle('update-payment', paymentController.updatePayment)

/*
 * Schools
 *
 */
//handle paginated schools
ipcMain.handle('paginated-schools', schoolController.paginatedSchools)
ipcMain.handle('all-schools', schoolController.allSchools)
ipcMain.handle('individual-school', schoolController.getIndividualSchool)
ipcMain.handle('create-school', schoolController.createSchool)
/** update examiner */
ipcMain.handle('update-school', schoolController.updateSchool)

/** delete school and departments */
ipcMain.handle('delete-department', schoolController.deleteDepartment)
ipcMain.handle('delete-school', schoolController.deleteSchool)
/** create department */
ipcMain.handle('create-department', schoolController.createDepartment)
ipcMain.handle('update-department', schoolController.updateDepartment)

/*
 * facilitators
 *
 */

ipcMain.handle('create-facilitator', facilitatorController.createfacilitator)
ipcMain.handle('all-facilitators', facilitatorController.allFacilitators)
ipcMain.handle('all-loginActivities', facilitatorController.allLoginActivities)
ipcMain.handle('update-facilitator', facilitatorController.updatefacilitator)
ipcMain.handle(
    'reset-facilitator-password',
    facilitatorController.resetfacilitatorPassword
)

ipcMain.handle(
    'new-facilitator-passkey',
    facilitatorController.newfacilitatorPasskey
)
ipcMain.handle('deactivate-facilitator', facilitatorController.deactivateAdmin)

/** files */
//handle
//ipcMain.handle('get-view-file', fileController.getFiles)

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

//handle downLoad single file
ipcMain.handle('get-download-file', async (event, values) => {
    try {
        let responseData = await axios.get(
            `${BASE_API_}/docs/download/${values}`
        )

        let data = responseData.data

        return data
    } catch (error) {
        let errorResult = errorFunction(error)
        return errorResult
    }
})

//handle downLoad single file
ipcMain.handle('download-file', async (event, values) => {
    const options = {
        defaultPath:
            app.getPath('documents') +
            `/${values.name}_${values.filename}.${values.extension}`,
        filters: [{ name: 'Custom File Type', extensions: [values.extension] }],
    }
    const dialogSaves = await dialog.showSaveDialog(null, options)
    //  console.log('dialogSaves', dialogSaves)

    if (dialogSaves.canceled) {
        return
    } else {
        //console.log("my values", values);
        fs.writeFile(
            dialogSaves.filePath,
            values.data,
            { encoding: 'base64' },
            function (err) {
                if (err) {
                    console.log('file failed')
                }
                //return;
                const newoptions = {
                    message: `File Saved - ${dialogSaves.filePath}`,
                }
                dialog.showMessageBox(null, newoptions)
            }
        )
    }
})

/** handler for export csv */

ipcMain.handle('export-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)
    // console.log('dialogSaves', dialogSaves)

    if (dialogSaves.canceled) {
        return
    } else {
        //console.log("my values", values);
        // fs.writeFile(
        //     dialogSaves.filePath,
        //     values.data,
        //     { encoding: 'base64' },
        //     function (err) {
        //         if (err) {
        //             console.log('file failed')
        //         }
        //         //return;
        //         const newoptions = {
        //             message: `File Saved - ${dialogSaves.filePath}`,
        //         }
        //         dialog.showMessageBox(null, newoptions)
        //     }
        // )

        const rowData = await values.data.map((data2, index) => {
            return {
                studentName: data2.studentName,
                studentContacts: data2.studentContacts,
                Topic: data2.topic,
                Status: data2.status,
            }
        })

        //  console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** handler for export student csv */

ipcMain.handle('export-student-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)
    // console.log('dialogSaves', dialogSaves)

    if (dialogSaves.canceled) {
        return
    } else {
        //console.log("my values", values);
        // fs.writeFile(
        //     dialogSaves.filePath,
        //     values.data,
        //     { encoding: 'base64' },
        //     function (err) {
        //         if (err) {
        //             console.log('file failed')
        //         }
        //         //return;
        //         const newoptions = {
        //             message: `File Saved - ${dialogSaves.filePath}`,
        //         }
        //         dialog.showMessageBox(null, newoptions)
        //     }
        // )

        /** handle function to give registration */
        const getLatestRegistration = (dataArray) => {
            let filDatas = dataArray.filter((data) => {
                if (
                    data.registrationId.registrationtype.toLowerCase() ===
                    'provisional admission'
                ) {
                    return data
                }
                if (
                    data.registrationId.registrationtype.toLowerCase() ===
                    'full admission'
                ) {
                    return data
                }
                if (
                    data.registrationId.registrationtype.toLowerCase() ===
                    'de-registered'
                ) {
                    return data
                }
            })

            if (filDatas.length > 1) {
                let latest = filDatas[0]

                filDatas.forEach((element) => {
                    if (
                        Moments(element.registrationId.date).isAfter(
                            latest.registrationId.date
                        )
                    ) {
                        latest = element
                    }
                })

                return latest.registrationId.registrationtype
            } else if (filDatas.length > 0 && filDatas.length === 1) {
                return filDatas[0].registrationId.registrationtype
            } else {
                return '-'
            }
        }

        const rowData = await values.data.map((data2, index) => {
            let allRegistrations = [...data2.registration]
            /** function to return latest registration */
            let returnedData = getLatestRegistration(allRegistrations)
            return {
                No: index + 1,
                'Student Name': data2.student.studentName,
                'Registration No.': data2.student.registrationNumber,
                Topic: data2.topic,
                Status: data2.activeStatus,
                Registration: returnedData.toUpperCase(),
                'Submission Status': data2.submissionStatus,
            }
        })

        //  console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** handler for export student csv */

ipcMain.handle('export-school-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        //console.log("my values", values);
        // fs.writeFile(
        //     dialogSaves.filePath,
        //     values.data,
        //     { encoding: 'base64' },
        //     function (err) {
        //         if (err) {
        //             console.log('file failed')
        //         }
        //         //return;
        //         const newoptions = {
        //             message: `File Saved - ${dialogSaves.filePath}`,
        //         }
        //         dialog.showMessageBox(null, newoptions)
        //     }
        // )

        /** handle function to give registration */

        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */

            return {
                No: index + 1,
                'School Name': data2.schoolName,
                Dean: data2.deanName,
                Designation: data2.deanDesignation,
                'Office Number': data2.officeNumber,
                Email: data2.email,
                'Department No.': data2.departments.length,
            }
        })

        //   console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** handler for export departments csv */

ipcMain.handle('export-departments-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */

            return {
                No: index + 1,
                'Department Name': data2.deptName,
                'Department Head': data2.deptHead,
                Email: data2.email,
                officeNumber: `${data2.officeNumber}`,
                'Creation Date': data2.creationDate,
            }
        })

        //  console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** export examiners */

ipcMain.handle('export-examiners-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */

            return {
                No: index + 1,
                'Examiner Name': `${data2.jobtitle + data2.name}`,
                Type: data2.typeOfExaminer.toUpperCase(),
                Email: data2.email,
                'Phone Number': data2.phoneNumber.toString(),
                'No. of Students': data2.studentsNo,
            }
        })

        //   console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** export reports adv */
/** export examiners */

ipcMain.handle('export-exportedDatas-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */
            // let currentDate = Moments(new Date())
            // let pastDate = Moments(data2.creationDate)
            // let diff = data2.creationDate
            //     ? currentDate.diff(pastDate, 'days')
            //     : 0
            //  let reportDelay = data2.submissionDate ? 0 : diff
            let creationDates = Moments(data2.creationDate)
                .tz('Africa/Kampala')
                .format('dddd DD MMM YYYY h:mm a')
            return {
                No: index + 1,
                'Student Name': data2.projectsData.student.studentName,
                'Student Registration No':
                    data2.projectsData.student.registrationNumber,
                'Student PhoneNumber': data2.projectsData.student.phoneNumber,
                'Student Email': data2.projectsData.student.email,
                Topic: data2.projectsData.topic,
                Examiner: `${data2.examiner.jobtitle + data2.examiner.name}`,
                'Examiner Email': data2.examiner.email,
                'Examiner PhoneNumber': data2.examiner.phoneNumber,
                'Report Status': data2.reportStatus,
                Created: `${creationDates}`,
            }
        })

        //   console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** export facilitators */

ipcMain.handle('export-facilitators-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */

            return {
                No: index + 1,
                'Facilitator Name': `${
                    data2.jobtitle + data2.firstname + ' ' + data2.lastname
                }`,
                Role: data2.role.toUpperCase(),
                Email: data2.email,
                'Phone Number': `${data2.contact}`,
                Privileges: `${data2.privileges}`,
            }
        })

        //   console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})

/** export general supervisors */

ipcMain.handle('export-general-superservisors-csv', async (event, values) => {
    const options = {
        defaultPath: app.getPath('documents') + `/${values.tableName}.${'csv'}`,
        filters: [
            {
                name: 'Custom File Type',
                extensions: ['xls', 'xlsx', 'xlsb', 'csv', 'ods'],
            },
        ],
    }
    const dialogSaves = await dialog.showSaveDialog(mainWindow, options)

    if (dialogSaves.canceled) {
        return
    } else {
        const rowData = await values.data.map((data2, index) => {
            /** function to return latest registration */

            return {
                No: index + 1,
                'Examiner Name': `${data2.jobtitle + data2.name}`,
                Type: 'Supervisor',
                Email: data2.email,
                'Phone Number': data2.phoneNumber.toString(),
            }
        })

        //   console.log('rows  data', rowData, rowData)

        const worksheet = XLSX.utils.json_to_sheet(rowData)
        worksheet['!cols'] = Array.from({ length: rowData.length }, () => {
            return { wch: 10 }
        })
        const workbook = XLSX.utils.book_new()

        XLSX.utils.book_append_sheet(workbook, worksheet, `${values.tableName}`)

        await XLSX.writeFile(workbook, dialogSaves.filePath)

        const newoptions = {
            message: `Export Successfully Saved - ${dialogSaves.filePath}`,
        }
        dialog.showMessageBox(mainWindow, newoptions)
    }
})
