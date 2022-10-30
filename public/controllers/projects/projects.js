const axios = require("axios");
const { BASE_API_ } = require("../../base_url.config");
const FormData = require("form-data");
const fs = require("fs");
//create Project
exports.createProject = async (event, values) => {
  try {
    const fd = new FormData();

    if (values.scannedForm !== null) {
      fd.append(
        "projectFiles",
        fs.createReadStream(values.scannedForm.url),
        `Intent${values.scannedForm.ext}`
      );
    } else {
    }
    if (values.thesisfile !== null) {
      fd.append(
        "projectFiles",
        fs.createReadStream(values.thesisfile.url),
        `thesis${values.thesisfile.ext}`
      );
    } else {
    }

    fd.append("registrationNumber", values.registrationNumber);
    fd.append("studentName", values.studentName);
    fd.append("programType", values.programType);
    fd.append("degreeProgram", values.degreeProgram);
    fd.append("schoolName", values.schoolName);
    fd.append("departmentName", values.departmentName);
    fd.append("Topic", values.Topic);
    fd.append("email", values.email);
    fd.append("phoneNumber", values.phoneNumber);
    fd.append("alternativeEmail", values.alternativeEmail);
    fd.append("supervisor1", values.supervisor1);
    fd.append("supervisor2", values.supervisor2);
    fd.append("semesterRegistration", values.semesterRegistration);
    fd.append("academicYear", values.academicYear);

    let responseData = await axios.post(`${BASE_API_}/project/v1/create`, fd);
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

//update Project
exports.updateProject = async (event, values) => {
  try {
    const fd = new FormData();

    if (values.scannedForm !== null) {
      fd.append(
        "projectFiles",
        fs.createReadStream(values.scannedForm.url),
        `Intent${values.scannedForm.ext}`
      );
    } else {
    }
    if (values.thesisfile !== null) {
      fd.append(
        "projectFiles",
        fs.createReadStream(values.thesisfile.url),
        `thesis${values.thesisfile.ext}`
      );
    } else {
    }

    fd.append("registrationNumber", values.registrationNumber);
    fd.append("studentId", values.studentId);
    fd.append("studentName", values.studentName);
    fd.append("programType", values.programType);
    fd.append("degreeProgram", values.degreeProgram);
    fd.append("schoolName", values.schoolName);
    fd.append("departmentName", values.departmentName);
    fd.append("Topic", values.Topic);
    fd.append("email", values.email);
    fd.append("phoneNumber", values.phoneNumber);
    fd.append("alternativeEmail", values.alternativeEmail);
    fd.append("supervisor1", values.supervisor1);
    fd.append("supervisor2", values.supervisor2);
    fd.append("semesterRegistration", values.semesterRegistration);
    fd.append("academicYear", values.academicYear);

    let responseData = await axios.patch(
      `${BASE_API_}/project/v1/update/${values.id}`,
      fd
    );

    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

//get Project
exports.getProjects = async (event, values) => {
  try {
    let responseData = await axios.get(
      `${BASE_API_}/project/vl/pprojects?page=${values.page}`,
      values
    );
    console.log("values", responseData.data);
    let data = {
      ...responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** get individual project */

exports.getIndividualProjects = async (event, id) => {
  try {
    let responseData = await axios.get(
      `${BASE_API_}/project/v1/projects/${id}`
    );
    console.log("values", responseData.data);
    let data = {
      ...responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update project status */
exports.updateProjectStatuses = async (event, values) => {
  try {
    let responseData = await axios.put(
      `${BASE_API_}/project/vl/status/update/${values.projectId}`,
      values
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update viva files */
exports.updateVivaFiles = async (event, values) => {
  try {
    const fd = new FormData();

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
      fd
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update viva defense */
exports.updateVivaDefenseDate = async (event, values) => {
  try {
    let responseData = await axios.put(
      `${BASE_API_}/project/v1/vivadefense/update/${values.projectId}`,
      values
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update final submission */

exports.updateFinalSubmission = async (event, values) => {
  try {
    const fd = new FormData();

    if (values.finalsubmission !== null) {
      fd.append(
        "projectFiles",
        fs.createReadStream(values.finalsubmission.url),
        `finalSubmission${values.finalsubmission.ext}`
      );
    } else {
    }

    let responseData = await axios.put(
      `${BASE_API_}/project/v1/finalsubmission/update/${values.projectId}`,
      fd
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update dateofsubmission */
exports.updateSubmissionDate = async (event, values) => {
  try {
    let responseData = await axios.put(
      `${BASE_API_}/project/v1/dateofsubmission/update/${values.projectId}`,
      values
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};

/** update graduation */
exports.updateGraduationDate = async (event, values) => {
  try {
    let responseData = await axios.put(
      `${BASE_API_}/project/v1/graduation/update/${values.projectId}`,
      values
    );
    console.log("values", responseData.data);
    let data = {
      message: responseData.data,
      type: "success",
    };
    return data;
  } catch (error) {
    let errorArray = [];
    errorArray.push(error);

    let response = {
      message: "",
      type: "error",
    };
    if (errorArray.length !== 0 && errorArray[0].response) {
      response.message = errorArray[0].response.data;
    } else if (errorArray.length !== 0 && !errorArray[0].response) {
      response.message = errorArray[0].message;
    }

    return response;
  }
};
