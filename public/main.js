const { BrowserWindow, app, dialog, ipcMain } = require('electron')
const fs = require('fs')
const path = require('path')

const isDev = require('electron-is-dev')
const os = require('os')
const axios = require('axios')
const { BASE_API_ } = require('./base_url.config')

const projectController = require('./controllers/projects/projects')
const examinerController = require('./controllers/Examiners/Examiners')
const opponentController = require('./controllers/opponents')
const tagController = require('./controllers/tags')
const preferenceController = require('./controllers/preferences')
const reportController = require('./controllers/reports')
const paymentController = require('./controllers/payments')
const fileController = require('./controllers/files')

let mainWindow = null
require('@electron/remote/main').initialize()

function createWindow() {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, '/chuss512.ico'),
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            enableRemoteModule: true,
            devTools: true,
        },
    })

    // mainWindow.loadURL(
    //     isDev
    //         ? 'http://localhost:3000#'
    //         : `file://${path.join(__dirname, '../build/index.html#')}`
    // )
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
    mainWindow.loadURL(`file://${__dirname}/../build/index.html#`)
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    //ipcMain.handle('dialog:openFile', handleFileOpen);

    //template
    // const template = [
    //   {
    //     label: "File",
    //   },
    // ];

    //function openFile
    // function openFile() {
    //   //open file dialog
    //   const files = dialog.showOpenDialog(win, {
    //     properties: ["openFile"],
    //     filters: [
    //       {
    //         name: "files",
    //         extensions: ["doc", "docx", "pdf"],
    //       },
    //     ],
    //   });

    //   //no files
    //   if (!files) return;

    //   const file = files[0];
    //   const fileContent = fs.readFileSync(file).toString();
    //   console.log(fileContent);
    // }
}

app.on('ready', createWindow)

async function handleFileOpen(e) {
    const files = await dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'files',
                extensions: ['doc', 'docx', 'pdf'],
            },
        ],
    })

    console.log('files', files)
    if (!files) {
        return
    } else {
        const file = files[0]

        //const fileContent = fs.readFileSync(file).toString();
        return file
    }
}
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
            .then((result) => console.log('results'))
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
    console.log('fileType', fileType)
    console.log('fileDetails', fileDetails)
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
//handle login
ipcMain.handle('login-validation', async (event, values) => {
    try {
        let responseData = await axios.post(
            `${BASE_API_}/admin/v1/login`,
            values
        )
        console.log('values', responseData.data)
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

/**
 * Projects
 */
//handle createProject
ipcMain.handle('create-project', projectController.createProject)
//handle ipdateProject
ipcMain.handle('update-project', projectController.updateProject)

//handle paginatedProjects
ipcMain.handle('get-p-project', projectController.getProjects)

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
//handle paginated examiners
ipcMain.handle('paginated-opponents', opponentController.paginatedOpponents)
//handle all examiners
ipcMain.handle('all-opponents', opponentController.allOpponents)
//handle individual examiners
ipcMain.handle('individual-opponent', opponentController.getIndividualOpponent)

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
/** update examiner */
ipcMain.handle('update-examiner', examinerController.updateExaminer)

/** examiner reports */
/**
 * 1.handle update reports
 * 2.get reports
 */
ipcMain.handle('update-examiner-report', reportController.updateExaminerReport)
ipcMain.handle('get-examiner-report', reportController.getExaminerReport)

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

/** files */
//handle
ipcMain.handle('get-view-file', fileController.getFiles)

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
    console.log('dialogSaves', dialogSaves)

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
